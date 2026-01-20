// Popup script for settings management

document.addEventListener("DOMContentLoaded", async () => {
  // Load saved settings
  const settings = await chrome.storage.sync.get([
    "githubToken",
    "githubUsername",
    "repoName",
  ]);

  if (settings.githubToken) {
    document.getElementById("githubToken").value = settings.githubToken;
  }
  if (settings.githubUsername) {
    document.getElementById("githubUsername").value = settings.githubUsername;
  }
  if (settings.repoName) {
    document.getElementById("repoName").value = settings.repoName;
  }

  // Show status if all settings are configured
  if (settings.githubToken && settings.githubUsername && settings.repoName) {
    showSettingsStatus("Configured ✓", "success");
  }

  // Save settings button
  document
    .getElementById("saveSettings")
    .addEventListener("click", async () => {
      const token = document.getElementById("githubToken").value.trim();
      const username = document.getElementById("githubUsername").value.trim();
      const repo = document.getElementById("repoName").value.trim();

      if (!token || !username || !repo) {
        showStatus("Please fill in all fields", "error");
        return;
      }

      // Basic token validation
      if (!token.startsWith("ghp_") && !token.startsWith("github_pat_")) {
        showStatus(
          'Invalid token format. GitHub tokens start with "ghp_" or "github_pat_"',
          "error"
        );
        return;
      }

      try {
        await chrome.storage.sync.set({
          githubToken: token,
          githubUsername: username,
          repoName: repo,
        });

        showStatus("Settings saved successfully!", "success");
        showSettingsStatus("Configured ✓", "success");
      } catch (error) {
        showStatus("Failed to save settings: " + error.message, "error");
      }
    });

  // Test connection button
  document
    .getElementById("testConnection")
    .addEventListener("click", async () => {
      const token = document.getElementById("githubToken").value.trim();
      const username = document.getElementById("githubUsername").value.trim();
      const repo = document.getElementById("repoName").value.trim();

      if (!token || !username || !repo) {
        showStatus("Please fill in all fields first", "error");
        return;
      }

      const btn = document.getElementById("testConnection");
      const originalText = btn.textContent;
      btn.disabled = true;
      btn.innerHTML = '<span class="loading"></span>Testing...';

      try {
        const response = await chrome.runtime.sendMessage({
          action: "testConnection",
          settings: {
            githubToken: token,
            githubUsername: username,
            repoName: repo,
          },
        });

        if (response.success) {
          showStatus("✓ Connection successful! Repository found.", "success");
          showSettingsStatus("Connected ✓", "success");
        } else {
          showStatus("✗ Connection failed: " + response.error, "error");
          showSettingsStatus("Not Connected", "error");
        }
      } catch (error) {
        showStatus("✗ Connection test failed: " + error.message, "error");
      } finally {
        btn.disabled = false;
        btn.textContent = originalText;
      }
    });
});

function showStatus(message, type) {
  const statusEl = document.getElementById("statusMessage");
  statusEl.textContent = message;
  statusEl.className = `status ${type}`;

  if (type === "success") {
    setTimeout(() => {
      statusEl.style.display = "none";
    }, 5000);
  }
}

function showSettingsStatus(text, type) {
  const statusEl = document.getElementById("settingsStatus");
  const statusText = document.getElementById("statusText");
  statusEl.style.display = "block";
  statusText.textContent = text;
  statusText.style.color = type === "success" ? "#10b981" : "#ef4444";
}
