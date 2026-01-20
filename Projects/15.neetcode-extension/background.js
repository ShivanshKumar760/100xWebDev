// Background service worker for GitHub API interactions

console.log("NeetCode GitHub Pusher: Background script loaded");

// GitHub API helper functions
class GitHubAPI {
  constructor(token, username, repo) {
    this.token = token;
    this.username = username;
    this.repo = repo;
    this.baseUrl = "https://api.github.com";
  }

  async makeRequest(endpoint, method = "GET", body = null) {
    const options = {
      method: method,
      headers: {
        Authorization: `token ${this.token}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, options);

    if (!response.ok) {
      let errorMessage = "GitHub API request failed";
      try {
        const error = await response.json();
        errorMessage = error.message || errorMessage;
      } catch (e) {
        errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }

    return response.json();
  }

  async getFile(path) {
    try {
      return await this.makeRequest(
        `/repos/${this.username}/${this.repo}/contents/${path}`
      );
    } catch (error) {
      // File doesn't exist (404) or other errors - return null
      return null;
    }
  }

  async createOrUpdateFile(path, content, message, sha = null) {
    const body = {
      message: message,
      content: btoa(unescape(encodeURIComponent(content))), // Base64 encode
      ...(sha && { sha: sha }),
    };

    try {
      return await this.makeRequest(
        `/repos/${this.username}/${this.repo}/contents/${path}`,
        "PUT",
        body
      );
    } catch (error) {
      // If repo is empty and this is the first commit, try initializing with README
      if (
        error.message.includes("empty") ||
        error.message.includes("Git Repository is empty")
      ) {
        console.log("Repository is empty, initializing with first commit...");
        // Retry the request - GitHub will initialize the repo
        return await this.makeRequest(
          `/repos/${this.username}/${this.repo}/contents/${path}`,
          "PUT",
          body
        );
      }
      throw error;
    }
  }

  async createFile(path, content, message) {
    return await this.createOrUpdateFile(path, content, message);
  }

  async updateFile(path, content, message, sha) {
    return await this.createOrUpdateFile(path, content, message, sha);
  }
}

// Format problem title for folder/file names
function formatTitle(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

// Generate README content
function generateReadme(problem) {
  // Clean up the description - remove excessive whitespace and format nicely
  let description = problem.description;

  // Remove "Solved" text and checkmark if present at the beginning
  description = description.replace(/^\s*Solved\s*✓?\s*/i, "");
  description = description.replace(/^\s*Solved\s*/i, "");

  // Remove multiple consecutive newlines (keep max 2)
  description = description.replace(/\n{3,}/g, "\n\n");

  // Remove excessive spaces (keep max 1)
  description = description.replace(/ {2,}/g, " ");

  // Remove any remaining code artifacts (sometimes text like "language-python" remains)
  description = description.replace(/language-\w+/g, "");
  description = description.replace(/tabindex="\d+"/g, "");

  // Trim each line and remove empty lines at start/end
  description = description
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .join("\n\n") // Add spacing between paragraphs
    .trim();

  // If description is too short, add a note
  if (description.length < 50) {
    description = "See the original problem on NeetCode for full description.";
  }

  const readme = `# ${problem.title}

**🔗 Problem Link:** [View on NeetCode](${problem.url})

---

## 📋 Problem Description

${description}

---

## 💡 Solution

Check the \`solution.py\` file in this directory for the complete implementation.

---

## 📊 Complexity Analysis

*Add your complexity analysis here after solving*

- **Time Complexity:** O(?)
- **Space Complexity:** O(?)

---

<sub>This problem was automatically synced from NeetCode using [NeetCode GitHub Pusher](https://github.com/)</sub>
`;
  return readme;
}

// Generate solution file content with header
function generateSolutionFile(problem, code, language) {
  const header = `"""
Problem: ${problem.title}
URL: ${problem.url}
Language: ${language}

Solution by NeetCode GitHub Pusher
"""

`;

  // For Python, add the header comment
  if (language === "python") {
    return header + code;
  }

  // For other languages, adapt the comment style
  const commentStyles = {
    javascript: { start: "/*", end: "*/" },
    java: { start: "/*", end: "*/" },
    cpp: { start: "/*", end: "*/" },
    c: { start: "/*", end: "*/" },
  };

  const style = commentStyles[language];
  if (style) {
    const adaptedHeader = `${style.start}
Problem: ${problem.title}
URL: ${problem.url}
Language: ${language}

Solution by NeetCode GitHub Pusher
${style.end}

`;
    return adaptedHeader + code;
  }

  return code;
}

// Get file extension based on language
function getFileExtension(language) {
  // Normalize language string
  const lang = language.toLowerCase().trim();

  const extensions = {
    python: "py",
    python3: "py",
    py: "py",
    javascript: "js",
    js: "js",
    java: "java",
    cpp: "cpp",
    "c++": "cpp",
    c: "c",
    go: "go",
    golang: "go",
    rust: "rs",
    typescript: "ts",
    ts: "ts",
  };

  // Check if language matches any key
  for (const [key, ext] of Object.entries(extensions)) {
    if (lang.includes(key)) {
      console.log(`Language "${language}" mapped to extension: .${ext}`);
      return ext;
    }
  }

  // Default to Python
  console.log(`Language "${language}" not recognized, defaulting to .py`);
  return "py";
}

// Main push function
async function pushToGitHub(problemData) {
  try {
    // Get stored settings
    const settings = await chrome.storage.sync.get([
      "githubToken",
      "githubUsername",
      "repoName",
    ]);

    if (
      !settings.githubToken ||
      !settings.githubUsername ||
      !settings.repoName
    ) {
      throw new Error(
        "GitHub settings not configured. Please set up in extension popup."
      );
    }

    const github = new GitHubAPI(
      settings.githubToken,
      settings.githubUsername,
      settings.repoName
    );

    const { problem, code, language } = problemData;

    // Validate problem data
    if (!problem || !problem.title) {
      throw new Error("Invalid problem data");
    }

    if (!code || code.trim().length === 0) {
      throw new Error("No code found to push");
    }

    const folderName = formatTitle(problem.title);
    const fileExtension = getFileExtension(language);

    // Create paths
    const readmePath = `${folderName}/README.md`;
    const solutionPath = `${folderName}/solution.${fileExtension}`;

    // Generate content
    const readmeContent = generateReadme(problem);
    const solutionContent = generateSolutionFile(problem, code, language);

    console.log(`Pushing to GitHub: ${folderName}`);

    // Check if files exist and get their SHAs
    const existingReadme = await github.getFile(readmePath);
    const existingSolution = await github.getFile(solutionPath);

    // Push README first
    console.log("Pushing README...");
    if (existingReadme && existingReadme.sha) {
      await github.updateFile(
        readmePath,
        readmeContent,
        `Update README for ${problem.title}`,
        existingReadme.sha
      );
    } else {
      await github.createFile(
        readmePath,
        readmeContent,
        `Add README for ${problem.title}`
      );
    }

    // Push Solution
    console.log("Pushing solution...");
    if (existingSolution && existingSolution.sha) {
      await github.updateFile(
        solutionPath,
        solutionContent,
        `Update solution for ${problem.title}`,
        existingSolution.sha
      );
    } else {
      await github.createFile(
        solutionPath,
        solutionContent,
        `Add solution for ${problem.title}`
      );
    }

    console.log("Successfully pushed to GitHub!");
    return { success: true };
  } catch (error) {
    console.error("Error pushing to GitHub:", error);

    // Provide more helpful error messages
    let errorMessage = error.message;
    if (error.message.includes("401")) {
      errorMessage = "Invalid GitHub token. Please check your settings.";
    } else if (error.message.includes("404")) {
      errorMessage =
        "Repository not found. Please check repository name and permissions.";
    } else if (error.message.includes("empty")) {
      errorMessage = "Repository initialization in progress. Please try again.";
    }

    return { success: false, error: errorMessage };
  }
}

// Listen for messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "pushToGitHub") {
    pushToGitHub(request.data).then(sendResponse);
    return true; // Keep channel open for async response
  }

  if (request.action === "testConnection") {
    testGitHubConnection(request.settings).then(sendResponse);
    return true;
  }
});

// Test GitHub connection
async function testGitHubConnection(settings) {
  try {
    const github = new GitHubAPI(
      settings.githubToken,
      settings.githubUsername,
      settings.repoName
    );

    // Try to get repo info
    await github.makeRequest(
      `/repos/${settings.githubUsername}/${settings.repoName}`
    );

    return { success: true, message: "Connection successful!" };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
