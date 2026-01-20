// Content script that runs on codegym.cc pages

console.log("CodeGym GitHub Pusher: Content script loaded");

// Function to extract problem details from CodeGym
function extractProblemDetails() {
  try {
    // Extract problem title from the task panel tabs
    let problemTitle = "Unknown Problem";
    const taskButton = document.querySelector(
      ".task-panel-tabs__link.is-active"
    );
    if (taskButton) {
      problemTitle =
        taskButton.getAttribute("title") || taskButton.textContent.trim();
      // Remove file extension if present
      problemTitle = problemTitle.replace(/\.(java|js|py|cpp|c)$/, "");
      console.log("Title found:", problemTitle);
    }

    // Extract problem description
    let problemDescription = "No description available";
    const descriptionElement = document.querySelector(
      ".webide-task-condition__description"
    );
    if (descriptionElement) {
      // Clone to avoid modifying the actual DOM
      const clone = descriptionElement.cloneNode(true);

      // Get the text content
      let text = clone.textContent.trim();

      // Clean up excessive whitespace
      text = text.replace(/\n{3,}/g, "\n\n");
      text = text.replace(/\s{2,}/g, " ");

      if (text.length > 20) {
        problemDescription = text;
        console.log("Description found, length:", text.length);
      }
    }

    // Extract requirements
    let requirements = [];
    const requirementItems = document.querySelectorAll(
      ".task-requirements-status-list__item .status-item__label"
    );
    if (requirementItems.length > 0) {
      requirements = Array.from(requirementItems).map((item) =>
        item.textContent.trim()
      );
      console.log("Requirements found:", requirements.length);
    }

    // Append requirements to description
    if (requirements.length > 0) {
      problemDescription +=
        "\n\n**Requirements:**\n" +
        requirements.map((req, i) => `${i + 1}. ${req}`).join("\n");
    }

    // Get current URL
    const url = window.location.href;

    // Try to extract task ID from URL or button
    let taskId = "unknown";
    const urlMatch = url.match(/task(\d+)/);
    if (urlMatch) {
      taskId = urlMatch[1];
    }

    console.log("Extracted problem:", {
      title: problemTitle,
      descLength: problemDescription.length,
      taskId: taskId,
      url,
    });

    return {
      title: problemTitle,
      description: problemDescription,
      slug: taskId,
      url: url,
    };
  } catch (error) {
    console.error("Error extracting problem details:", error);
    return {
      title: "Unknown Problem",
      description: "No description available",
      slug: "unknown",
      url: window.location.href,
    };
  }
}

// Function to extract the code solution from ACE editor
function extractCodeSolution() {
  try {
    // Method 1: Try to get code from ACE editor's session
    if (window.ace && window.ace.edit) {
      // Find the editor element
      const editorElement = document.querySelector(".ace_editor");
      if (editorElement) {
        const editorId = editorElement.id;
        if (editorId) {
          const editor = window.ace.edit(editorId);
          if (editor) {
            const code = editor.getValue();
            if (code && code.trim().length > 0) {
              console.log("Code extracted from ACE editor session");
              return code;
            }
          }
        }
      }
    }

    // Method 2: Extract from ACE editor DOM structure
    const aceTextLayer = document.querySelector(".ace_text-layer");
    if (aceTextLayer) {
      const lines = aceTextLayer.querySelectorAll(".ace_line");
      if (lines.length > 0) {
        const code = Array.from(lines)
          .map((line) => {
            // Get text content from each line
            return line.textContent;
          })
          .join("\n");

        if (code && code.trim().length > 0) {
          console.log("Code extracted from ACE DOM");
          return code;
        }
      }
    }

    // Method 3: Try to find textarea
    const textarea = document.querySelector("textarea.ace_text-input");
    if (textarea && textarea.value) {
      console.log("Code extracted from textarea");
      return textarea.value;
    }

    console.warn("Could not extract code from any source");
    return null;
  } catch (error) {
    console.error("Error extracting code:", error);
    return null;
  }
}

// Function to get the selected language from the file tab
function getLanguage() {
  try {
    // CodeGym specific: Language is in the active tab button title
    const taskButton = document.querySelector(
      ".task-panel-tabs__link.is-active"
    );
    if (taskButton) {
      const fileName =
        taskButton.getAttribute("title") || taskButton.textContent.trim();
      console.log("File name:", fileName);

      // Extract language from file extension
      if (fileName.endsWith(".java")) {
        console.log("Language detected: Java");
        return "java";
      } else if (fileName.endsWith(".js")) {
        console.log("Language detected: JavaScript");
        return "javascript";
      } else if (fileName.endsWith(".py")) {
        console.log("Language detected: Python");
        return "python";
      } else if (fileName.endsWith(".cpp") || fileName.endsWith(".cc")) {
        console.log("Language detected: C++");
        return "cpp";
      } else if (fileName.endsWith(".c")) {
        console.log("Language detected: C");
        return "c";
      }
    }

    // Check if Java is mentioned in the description
    const description = document.querySelector(
      ".webide-task-condition__description"
    );
    if (description && description.textContent.toLowerCase().includes("java")) {
      console.log("Java detected from description");
      return "java";
    }

    // CodeGym default is Java
    console.log("Defaulting to Java");
    return "java";
  } catch (error) {
    console.error("Error detecting language:", error);
    return "java"; // Safe default for CodeGym
  }
}

// Monitor for verify/submit button clicks
function monitorSubmitButton() {
  const verifyButton = document.querySelector("button.webide-button--verify");

  if (!verifyButton) return;

  if (!verifyButton.dataset.listenerAdded) {
    verifyButton.dataset.listenerAdded = "true";
    verifyButton.addEventListener("click", handleSubmit, true);
    console.log("CodeGym GitHub Pusher: Verify button listener added");
  }
}

// Handle submit event
async function handleSubmit() {
  console.log("CodeGym GitHub Pusher: Verify button clicked");

  // Wait for the verification to process
  setTimeout(async () => {
    // Check if submission was successful
    // Look for success indicators in CodeGym
    const successIndicators =
      document.querySelector('[class*="success"]') ||
      document.querySelector('[class*="correct"]') ||
      document.querySelector('[class*="passed"]') ||
      Array.from(document.querySelectorAll("*")).find(
        (el) =>
          el.textContent.includes("Correct") ||
          el.textContent.includes("Success") ||
          el.textContent.includes("Passed") ||
          el.textContent.includes("Well done")
      );

    if (successIndicators) {
      console.log(
        "CodeGym GitHub Pusher: Solution accepted, preparing to push..."
      );

      const problemDetails = extractProblemDetails();
      const code = extractCodeSolution();
      const language = getLanguage();

      if (problemDetails && code) {
        // Send data to background script
        chrome.runtime.sendMessage(
          {
            action: "pushToGitHub",
            data: {
              problem: problemDetails,
              code: code,
              language: language,
            },
          },
          (response) => {
            if (response && response.success) {
              console.log(
                "CodeGym GitHub Pusher: Successfully pushed to GitHub!"
              );
              showNotification("✓ Pushed to GitHub successfully!");
            } else {
              console.error(
                "CodeGym GitHub Pusher: Failed to push:",
                response?.error
              );
              showNotification("✗ Failed to push to GitHub", true);
            }
          }
        );
      } else {
        console.warn("Could not extract problem details or code");
        if (!code) {
          showNotification("✗ Could not extract code", true);
        }
      }
    }
  }, 2500); // Slightly longer wait for CodeGym's verification
}

// Show notification to user
function showNotification(message, isError = false) {
  const notification = document.createElement("div");
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    background: ${isError ? "#ef4444" : "#10b981"};
    color: white;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    z-index: 10000;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    animation: slideIn 0.3s ease-out;
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease-out";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Add CSS animations
const style = document.createElement("style");
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Initial check and periodic monitoring
monitorSubmitButton();
setInterval(monitorSubmitButton, 2000);

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "extractCurrentProblem") {
    const problemDetails = extractProblemDetails();
    const code = extractCodeSolution();
    const language = getLanguage();

    sendResponse({
      success: true,
      data: {
        problem: problemDetails,
        code: code,
        language: language,
      },
    });
  }
  return true;
});
