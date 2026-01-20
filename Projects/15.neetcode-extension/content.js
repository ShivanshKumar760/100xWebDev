// // Content script that runs on neetcode.io pages

// console.log("NeetCode GitHub Pusher: Content script loaded");

// // Function to extract problem details
// function extractProblemDetails() {
//   try {
//     // Get the problem title - NeetCode specific
//     let problemTitle = "Unknown Problem";

//     // NeetCode title is in h1 inside question-tab div
//     const titleElement = document.querySelector(".question-tab h1");
//     if (titleElement && titleElement.textContent.trim()) {
//       problemTitle = titleElement.textContent.trim();
//       console.log("Title found:", problemTitle);
//     } else {
//       // Fallback selectors
//       const fallbackTitle =
//         document.querySelector("h1") ||
//         document.querySelector('[class*="title"]');
//       if (fallbackTitle) {
//         problemTitle = fallbackTitle.textContent.trim();
//         console.log("Title found (fallback):", problemTitle);
//       }
//     }

//     // Get the problem description from NeetCode's specific structure
//     let problemDescription = "No description available";

//     // Method 1: NeetCode's specific structure - app-article container
//     const articleContainer = document.querySelector(
//       ".my-article-component-container"
//     );
//     if (articleContainer) {
//       // Clone to avoid modifying the actual DOM
//       const clone = articleContainer.cloneNode(true);

//       // Remove ALL code blocks (pre tags) - these contain example code
//       const preBlocks = clone.querySelectorAll("pre");
//       preBlocks.forEach((block) => block.remove());

//       // Also remove inline code that might be large
//       const codeBlocks = clone.querySelectorAll("code");
//       codeBlocks.forEach((code) => {
//         // Keep small inline code (like variable names), remove large code blocks
//         if (code.textContent.length > 50) {
//           code.remove();
//         }
//       });

//       // Get the cleaned text
//       let text = clone.textContent.trim();

//       // Clean up excessive whitespace
//       text = text.replace(/\n{3,}/g, "\n\n"); // Max 2 newlines
//       text = text.replace(/\s{2,}/g, " "); // Max 1 space

//       if (text.length > 20) {
//         problemDescription = text;
//         console.log(
//           "Description found in article container, length:",
//           text.length
//         );
//       }
//     }

//     // Method 2: Try app-article element directly
//     if (problemDescription === "No description available") {
//       const appArticle = document.querySelector("app-article");
//       if (appArticle) {
//         const clone = appArticle.cloneNode(true);

//         // Remove code blocks
//         const preBlocks = clone.querySelectorAll("pre");
//         preBlocks.forEach((block) => block.remove());

//         const text = clone.textContent
//           .trim()
//           .replace(/\n{3,}/g, "\n\n")
//           .replace(/\s{2,}/g, " ");

//         if (text.length > 20) {
//           problemDescription = text;
//           console.log("Description found in app-article, length:", text.length);
//         }
//       }
//     }

//     // Method 3: Try question-tab div
//     if (problemDescription === "No description available") {
//       const questionTab = document.querySelector(".question-tab");
//       if (questionTab) {
//         const clone = questionTab.cloneNode(true);

//         // Remove code blocks
//         const preBlocks = clone.querySelectorAll("pre");
//         preBlocks.forEach((block) => block.remove());

//         // Remove title to avoid duplication
//         const title = clone.querySelector("h1");
//         if (title) title.remove();

//         const text = clone.textContent
//           .trim()
//           .replace(/\n{3,}/g, "\n\n")
//           .replace(/\s{2,}/g, " ");

//         if (text.length > 20) {
//           problemDescription = text;
//           console.log(
//             "Description found in question-tab, length:",
//             text.length
//           );
//         }
//       }
//     }

//     // Get current URL to extract problem info
//     const url = window.location.href;
//     const urlParts = url.split("/");
//     const problemSlug = urlParts[urlParts.length - 1] || "unknown";

//     console.log("Extracted problem:", {
//       title: problemTitle,
//       descLength: problemDescription.length,
//       slug: problemSlug,
//       url,
//     });

//     return {
//       title: problemTitle,
//       description: problemDescription,
//       slug: problemSlug,
//       url: url,
//     };
//   } catch (error) {
//     console.error("Error extracting problem details:", error);
//     return {
//       title: "Unknown Problem",
//       description: "No description available",
//       slug: "unknown",
//       url: window.location.href,
//     };
//   }
// }

// // Function to extract the code solution
// function extractCodeSolution() {
//   try {
//     // Method 1: Try to get code from Monaco editor's model
//     if (window.monaco && window.monaco.editor) {
//       const editors = window.monaco.editor.getModels();
//       if (editors && editors.length > 0) {
//         // Get the first editor model (usually the code editor)
//         const code = editors[0].getValue();
//         if (code && code.trim().length > 0) {
//           console.log("Code extracted from Monaco model");
//           return code;
//         }
//       }
//     }

//     // Method 2: Try to extract from Monaco editor DOM
//     const editorElement = document.querySelector(".monaco-editor");
//     if (editorElement) {
//       const lines = editorElement.querySelectorAll(".view-line");
//       if (lines.length > 0) {
//         const code = Array.from(lines)
//           .map((line) => {
//             // Get text content, preserving spaces
//             const spans = line.querySelectorAll("span");
//             return Array.from(spans)
//               .map((span) => span.textContent)
//               .join("");
//           })
//           .join("\n");

//         if (code && code.trim().length > 0) {
//           console.log("Code extracted from Monaco DOM");
//           return code;
//         }
//       }
//     }

//     // Method 3: Try to find textarea
//     const textarea =
//       document.querySelector('textarea[class*="code"]') ||
//       document.querySelector("textarea");
//     if (textarea && textarea.value) {
//       console.log("Code extracted from textarea");
//       return textarea.value;
//     }

//     console.warn("Could not extract code from any source");
//     return null;
//   } catch (error) {
//     console.error("Error extracting code:", error);
//     return null;
//   }
// }

// // Function to get the selected language
// function getLanguage() {
//   try {
//     // NeetCode specific: Language is in span.selected-language
//     const selectedLangSpan = document.querySelector(".selected-language");
//     if (selectedLangSpan) {
//       const langText = selectedLangSpan.textContent.trim().toLowerCase();
//       console.log("Language detected from .selected-language:", langText);
//       return langText;
//     }

//     // Fallback: Try button with language selector
//     const langButton = document.querySelector("button.editor-language-btn");
//     if (langButton) {
//       const langText = langButton.textContent.trim().toLowerCase();
//       console.log("Language detected from button:", langText);
//       return langText;
//     }

//     // Another fallback: Look for any element with language info
//     const langElement = document.querySelector('[class*="language"]');
//     if (langElement) {
//       const langText = langElement.textContent.trim().toLowerCase();
//       if (langText && langText.length < 20) {
//         // Sanity check
//         console.log("Language detected from generic selector:", langText);
//         return langText;
//       }
//     }

//     // Check URL for language hints
//     const url = window.location.href;
//     if (url.includes("lang=python") || url.includes("language=python")) {
//       console.log("Python detected from URL");
//       return "python";
//     }

//     // NeetCode default is Python
//     console.log("Defaulting to Python");
//     return "python";
//   } catch (error) {
//     console.error("Error detecting language:", error);
//     return "python"; // Safe default
//   }
// }

// // Function to get file extension based on language
// function getFileExtension(language) {
//   const extensions = {
//     python: "py",
//     javascript: "js",
//     java: "java",
//     cpp: "cpp",
//     "c++": "cpp",
//     c: "c",
//     go: "go",
//     rust: "rs",
//     typescript: "ts",
//   };
//   return extensions[language] || "txt";
// }

// // Monitor for submit button clicks
// function monitorSubmitButton() {
//   // Look for submit button
//   const submitButton =
//     document.querySelector('button[type="submit"]') ||
//     Array.from(document.querySelectorAll("button")).find((btn) =>
//       btn.textContent.toLowerCase().includes("submit")
//     );

//   if (submitButton && !submitButton.dataset.listenerAdded) {
//     submitButton.dataset.listenerAdded = "true";
//     submitButton.addEventListener("click", handleSubmit);
//     console.log("NeetCode GitHub Pusher: Submit button listener added");
//   }
// }

// // Handle submit event
// async function handleSubmit() {
//   console.log("NeetCode GitHub Pusher: Submit button clicked");

//   // Wait a bit for the submission to process
//   setTimeout(async () => {
//     // Check if submission was successful
//     // Look for success indicators
//     const successIndicators =
//       document.querySelector('[class*="success"]') ||
//       document.querySelector('[class*="accepted"]') ||
//       Array.from(document.querySelectorAll("*")).find(
//         (el) =>
//           el.textContent.includes("Accepted") ||
//           el.textContent.includes("Success")
//       );

//     if (successIndicators) {
//       console.log(
//         "NeetCode GitHub Pusher: Solution accepted, preparing to push..."
//       );

//       const problemDetails = extractProblemDetails();
//       const code = extractCodeSolution();
//       const language = getLanguage();

//       if (problemDetails && code) {
//         // Send data to background script
//         chrome.runtime.sendMessage(
//           {
//             action: "pushToGitHub",
//             data: {
//               problem: problemDetails,
//               code: code,
//               language: language,
//             },
//           },
//           (response) => {
//             if (response && response.success) {
//               console.log(
//                 "NeetCode GitHub Pusher: Successfully pushed to GitHub!"
//               );
//               showNotification("✓ Pushed to GitHub successfully!");
//             } else {
//               console.error(
//                 "NeetCode GitHub Pusher: Failed to push:",
//                 response?.error
//               );
//               showNotification("✗ Failed to push to GitHub", true);
//             }
//           }
//         );
//       }
//     }
//   }, 2000);
// }

// // Show notification to user
// function showNotification(message, isError = false) {
//   const notification = document.createElement("div");
//   notification.textContent = message;
//   notification.style.cssText = `
//     position: fixed;
//     top: 20px;
//     right: 20px;
//     padding: 15px 20px;
//     background: ${isError ? "#ef4444" : "#10b981"};
//     color: white;
//     border-radius: 8px;
//     font-size: 14px;
//     font-weight: 500;
//     z-index: 10000;
//     box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//     animation: slideIn 0.3s ease-out;
//   `;

//   document.body.appendChild(notification);

//   setTimeout(() => {
//     notification.style.animation = "slideOut 0.3s ease-out";
//     setTimeout(() => notification.remove(), 300);
//   }, 3000);
// }

// // Add CSS animations
// const style = document.createElement("style");
// style.textContent = `
//   @keyframes slideIn {
//     from {
//       transform: translateX(400px);
//       opacity: 0;
//     }
//     to {
//       transform: translateX(0);
//       opacity: 1;
//     }
//   }

//   @keyframes slideOut {
//     from {
//       transform: translateX(0);
//       opacity: 1;
//     }
//     to {
//       transform: translateX(400px);
//       opacity: 0;
//     }
//   }
// `;
// document.head.appendChild(style);

// // Initial check and periodic monitoring
// monitorSubmitButton();
// setInterval(monitorSubmitButton, 2000);

// // Listen for messages from popup
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.action === "extractCurrentProblem") {
//     const problemDetails = extractProblemDetails();
//     const code = extractCodeSolution();
//     const language = getLanguage();

//     sendResponse({
//       success: true,
//       data: {
//         problem: problemDetails,
//         code: code,
//         language: language,
//       },
//     });
//   }
//   return true;
// });

// Content script that runs on neetcode.io pages

console.log("NeetCode GitHub Pusher: Content script loaded");

// Function to extract problem details
function extractProblemDetails() {
  try {
    // Get the problem title - NeetCode specific
    let problemTitle = "Unknown Problem";

    // NeetCode title is in h1 inside question-tab div
    const titleElement = document.querySelector(".question-tab h1");
    if (titleElement && titleElement.textContent.trim()) {
      problemTitle = titleElement.textContent.trim();
      console.log("Title found:", problemTitle);
    } else {
      // Fallback selectors
      const fallbackTitle =
        document.querySelector("h1") ||
        document.querySelector('[class*="title"]');
      if (fallbackTitle) {
        problemTitle = fallbackTitle.textContent.trim();
        console.log("Title found (fallback):", problemTitle);
      }
    }

    // Get the problem description from NeetCode's specific structure
    let problemDescription = "No description available";

    // Method 1: NeetCode's specific structure - app-article container
    const articleContainer = document.querySelector(
      ".my-article-component-container"
    );
    if (articleContainer) {
      // Clone to avoid modifying the actual DOM
      const clone = articleContainer.cloneNode(true);

      // Remove ALL code blocks (pre tags) - these contain example code
      const preBlocks = clone.querySelectorAll("pre");
      preBlocks.forEach((block) => block.remove());

      // Also remove inline code that might be large
      const codeBlocks = clone.querySelectorAll("code");
      codeBlocks.forEach((code) => {
        // Keep small inline code (like variable names), remove large code blocks
        if (code.textContent.length > 50) {
          code.remove();
        }
      });

      // Get the cleaned text
      let text = clone.textContent.trim();

      // Clean up excessive whitespace
      text = text.replace(/\n{3,}/g, "\n\n"); // Max 2 newlines
      text = text.replace(/\s{2,}/g, " "); // Max 1 space

      if (text.length > 20) {
        problemDescription = text;
        console.log(
          "Description found in article container, length:",
          text.length
        );
      }
    }

    // Method 2: Try app-article element directly
    if (problemDescription === "No description available") {
      const appArticle = document.querySelector("app-article");
      if (appArticle) {
        const clone = appArticle.cloneNode(true);

        // Remove code blocks
        const preBlocks = clone.querySelectorAll("pre");
        preBlocks.forEach((block) => block.remove());

        const text = clone.textContent
          .trim()
          .replace(/\n{3,}/g, "\n\n")
          .replace(/\s{2,}/g, " ");

        if (text.length > 20) {
          problemDescription = text;
          console.log("Description found in app-article, length:", text.length);
        }
      }
    }

    // Method 3: Try question-tab div
    if (problemDescription === "No description available") {
      const questionTab = document.querySelector(".question-tab");
      if (questionTab) {
        const clone = questionTab.cloneNode(true);

        // Remove code blocks
        const preBlocks = clone.querySelectorAll("pre");
        preBlocks.forEach((block) => block.remove());

        // Remove title to avoid duplication
        const title = clone.querySelector("h1");
        if (title) title.remove();

        const text = clone.textContent
          .trim()
          .replace(/\n{3,}/g, "\n\n")
          .replace(/\s{2,}/g, " ");

        if (text.length > 20) {
          problemDescription = text;
          console.log(
            "Description found in question-tab, length:",
            text.length
          );
        }
      }
    }

    // Get current URL to extract problem info
    const url = window.location.href;
    const urlParts = url.split("/");
    const problemSlug = urlParts[urlParts.length - 1] || "unknown";

    console.log("Extracted problem:", {
      title: problemTitle,
      descLength: problemDescription.length,
      slug: problemSlug,
      url,
    });

    return {
      title: problemTitle,
      description: problemDescription,
      slug: problemSlug,
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

// Function to extract the code solution
function extractCodeSolution() {
  try {
    // Method 1: Try to get code from Monaco editor's model (BEST METHOD)
    if (window.monaco && window.monaco.editor) {
      const editors = window.monaco.editor.getModels();
      if (editors && editors.length > 0) {
        // Get the first editor model (usually the code editor)
        const code = editors[0].getValue();
        if (code && code.trim().length > 0) {
          console.log("Code extracted from Monaco model");
          return code;
        }
      }
    }

    // Method 2: Try to extract from Monaco editor DOM (CAREFUL - can duplicate)
    const editorElement = document.querySelector(".monaco-editor");
    if (editorElement) {
      // First try to get the editor instance directly
      const editorInstance =
        editorElement.editor ||
        editorElement.monacoEditor ||
        window.monacoEditor;

      if (editorInstance && typeof editorInstance.getValue === "function") {
        const code = editorInstance.getValue();
        if (code && code.trim().length > 0) {
          console.log("Code extracted from Monaco editor instance");
          return code;
        }
      }

      // If direct access fails, try DOM extraction
      // Monaco creates multiple layers - we need to get the RIGHT one
      const viewLines = editorElement.querySelector(".view-lines");
      if (viewLines) {
        const lines = viewLines.querySelectorAll(".view-line");
        if (lines.length > 0) {
          const code = Array.from(lines)
            .map((line) => {
              // Each view-line contains spans, but Monaco duplicates content
              // We need to get ONLY the visible text layer
              // The visible text is in the first level spans
              const spans = Array.from(line.children).filter(
                (child) =>
                  child.tagName === "SPAN" &&
                  !child.classList.contains("hidden")
              );

              if (spans.length > 0) {
                // Get text from all top-level spans only
                return spans.map((span) => span.textContent).join("");
              }

              // Fallback: use innerText which should handle visibility
              return line.innerText || "";
            })
            .join("\n");

          if (code && code.trim().length > 0) {
            console.log("Code extracted from Monaco DOM");
            return code;
          }
        }
      }
    }

    // Method 3: Try to find textarea
    const textarea =
      document.querySelector('textarea[class*="code"]') ||
      document.querySelector("textarea");
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

// Function to get the selected language
function getLanguage() {
  try {
    // NeetCode specific: Language is in span.selected-language
    const selectedLangSpan = document.querySelector(".selected-language");
    if (selectedLangSpan) {
      const langText = selectedLangSpan.textContent.trim().toLowerCase();
      console.log("Language detected from .selected-language:", langText);
      return langText;
    }

    // Fallback: Try button with language selector
    const langButton = document.querySelector("button.editor-language-btn");
    if (langButton) {
      const langText = langButton.textContent.trim().toLowerCase();
      console.log("Language detected from button:", langText);
      return langText;
    }

    // Another fallback: Look for any element with language info
    const langElement = document.querySelector('[class*="language"]');
    if (langElement) {
      const langText = langElement.textContent.trim().toLowerCase();
      if (langText && langText.length < 20) {
        // Sanity check
        console.log("Language detected from generic selector:", langText);
        return langText;
      }
    }

    // Check URL for language hints
    const url = window.location.href;
    if (url.includes("lang=python") || url.includes("language=python")) {
      console.log("Python detected from URL");
      return "python";
    }

    // NeetCode default is Python
    console.log("Defaulting to Python");
    return "python";
  } catch (error) {
    console.error("Error detecting language:", error);
    return "python"; // Safe default
  }
}

// Monitor for submit button clicks
function monitorSubmitButton() {
  // Look for submit button
  const submitButton =
    document.querySelector('button[type="submit"]') ||
    Array.from(document.querySelectorAll("button")).find((btn) =>
      btn.textContent.toLowerCase().includes("submit")
    );

  if (submitButton && !submitButton.dataset.listenerAdded) {
    submitButton.dataset.listenerAdded = "true";
    submitButton.addEventListener("click", handleSubmit);
    console.log("NeetCode GitHub Pusher: Submit button listener added");
  }
}

// Handle submit event
async function handleSubmit() {
  console.log("NeetCode GitHub Pusher: Submit button clicked");

  // Wait a bit for the submission to process
  setTimeout(async () => {
    // Check if submission was successful
    // Look for success indicators
    const successIndicators =
      document.querySelector('[class*="success"]') ||
      document.querySelector('[class*="accepted"]') ||
      Array.from(document.querySelectorAll("*")).find(
        (el) =>
          el.textContent.includes("Accepted") ||
          el.textContent.includes("Success")
      );

    if (successIndicators) {
      console.log(
        "NeetCode GitHub Pusher: Solution accepted, preparing to push..."
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
                "NeetCode GitHub Pusher: Successfully pushed to GitHub!"
              );
              showNotification("✓ Pushed to GitHub successfully!");
            } else {
              console.error(
                "NeetCode GitHub Pusher: Failed to push:",
                response?.error
              );
              showNotification("✗ Failed to push to GitHub", true);
            }
          }
        );
      }
    }
  }, 2000);
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
