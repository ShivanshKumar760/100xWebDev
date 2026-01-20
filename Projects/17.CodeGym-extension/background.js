// Background service worker for GitHub API interactions

console.log("CodeGym GitHub Pusher: Background script loaded");

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
      return null;
    }
  }

  async createOrUpdateFile(path, content, message, sha = null) {
    const body = {
      message: message,
      content: btoa(unescape(encodeURIComponent(content))),
      ...(sha && { sha: sha }),
    };

    try {
      return await this.makeRequest(
        `/repos/${this.username}/${this.repo}/contents/${path}`,
        "PUT",
        body
      );
    } catch (error) {
      if (
        error.message.includes("empty") ||
        error.message.includes("Git Repository is empty")
      ) {
        console.log("Repository is empty, initializing with first commit...");
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
  let description = problem.description;

  // Clean up the description
  description = description.replace(/^\s*Solved\s*✓?\s*/i, "");
  description = description.replace(/\n{3,}/g, "\n\n");
  description = description.replace(/ {2,}/g, " ");
  description = description.trim();

  if (description.length < 50) {
    description = "See the original problem on CodeGym for full description.";
  }

  const readme = `# ${problem.title}

**🔗 Problem Link:** [View on CodeGym](${problem.url})

---

## 📋 Problem Description

${description}

---

## 💡 Solution

Check the solution file in this directory for the complete implementation.

---

## 📊 Complexity Analysis

*Add your complexity analysis here after solving*

- **Time Complexity:** O(?)
- **Space Complexity:** O(?)

---

<sub>This problem was automatically synced from CodeGym using [CodeGym GitHub Pusher](https://github.com/)</sub>
`;
  return readme;
}

// Generate solution file content with header
function generateSolutionFile(problem, code, language) {
  // Java comment style
  const javaHeader = `/*
 * Problem: ${problem.title}
 * URL: ${problem.url}
 * Language: ${language}
 * 
 * Solution by CodeGym GitHub Pusher
 */

`;

  // Python comment style
  const pythonHeader = `"""
Problem: ${problem.title}
URL: ${problem.url}
Language: ${language}

Solution by CodeGym GitHub Pusher
"""

`;

  // C-style comment
  const cStyleHeader = `/*
 * Problem: ${problem.title}
 * URL: ${problem.url}
 * Language: ${language}
 * 
 * Solution by CodeGym GitHub Pusher
 */

`;

  // Choose header based on language
  if (language === "python") {
    return pythonHeader + code;
  } else if (
    language === "java" ||
    language === "javascript" ||
    language === "cpp" ||
    language === "c"
  ) {
    return cStyleHeader + code;
  }

  return code;
}

// Get file extension based on language
function getFileExtension(language) {
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

  for (const [key, ext] of Object.entries(extensions)) {
    if (lang.includes(key)) {
      console.log(`Language "${language}" mapped to extension: .${ext}`);
      return ext;
    }
  }

  console.log(`Language "${language}" not recognized, defaulting to .java`);
  return "java"; // CodeGym default
}

// Main push function
async function pushToGitHub(problemData) {
  try {
    console.log("=== PUSH TO GITHUB STARTED ===");
    console.log("Problem data received:", problemData);

    const settings = await chrome.storage.sync.get([
      "githubToken",
      "githubUsername",
      "repoName",
    ]);

    console.log("Settings loaded:", {
      hasToken: !!settings.githubToken,
      username: settings.githubUsername,
      repo: settings.repoName,
    });

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

    console.log("Validating data...");
    console.log("Problem title:", problem?.title);
    console.log("Code length:", code?.length);
    console.log("Language:", language);

    if (!problem || !problem.title) {
      throw new Error("Invalid problem data");
    }

    if (!code || code.trim().length === 0) {
      throw new Error("No code found to push");
    }

    const folderName = formatTitle(problem.title);
    const fileExtension = getFileExtension(language);

    console.log("Folder name:", folderName);
    console.log("File extension:", fileExtension);

    const readmePath = `${folderName}/README.md`;
    const solutionPath = `${folderName}/solution.${fileExtension}`;

    console.log("README path:", readmePath);
    console.log("Solution path:", solutionPath);

    const readmeContent = generateReadme(problem);
    const solutionContent = generateSolutionFile(problem, code, language);

    console.log("Content generated, README length:", readmeContent.length);
    console.log("Content generated, Solution length:", solutionContent.length);

    console.log(`Pushing to GitHub: ${folderName}`);

    const existingReadme = await github.getFile(readmePath);
    const existingSolution = await github.getFile(solutionPath);

    console.log(
      "Existing README:",
      existingReadme ? "Found (will update)" : "Not found (will create)"
    );
    console.log(
      "Existing Solution:",
      existingSolution ? "Found (will update)" : "Not found (will create)"
    );

    console.log("Pushing README...");
    if (existingReadme && existingReadme.sha) {
      await github.updateFile(
        readmePath,
        readmeContent,
        `Update README for ${problem.title}`,
        existingReadme.sha
      );
      console.log("✓ README updated");
    } else {
      await github.createFile(
        readmePath,
        readmeContent,
        `Add README for ${problem.title}`
      );
      console.log("✓ README created");
    }

    console.log("Pushing solution...");
    if (existingSolution && existingSolution.sha) {
      await github.updateFile(
        solutionPath,
        solutionContent,
        `Update solution for ${problem.title}`,
        existingSolution.sha
      );
      console.log("✓ Solution updated");
    } else {
      await github.createFile(
        solutionPath,
        solutionContent,
        `Add solution for ${problem.title}`
      );
      console.log("✓ Solution created");
    }

    console.log("=== Successfully pushed to GitHub! ===");
    return { success: true };
  } catch (error) {
    console.error("Error pushing to GitHub:", error);

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
    return true;
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

    await github.makeRequest(
      `/repos/${settings.githubUsername}/${settings.repoName}`
    );

    return { success: true, message: "Connection successful!" };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
