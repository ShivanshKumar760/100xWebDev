#!/usr/bin/env node

/**
 * LazyGit Clone - Node.js Terminal UI for Git with Animation
 *
 * Installation:
 * npm install blessed blessed-contrib simple-git chalk cli-spinners
 *
 * Usage:
 * node lazygit.js
 */

const blessed = require("blessed");
const contrib = require("blessed-contrib");
const simpleGit = require("simple-git");
const chalk = require("chalk");

// Initialize git
const git = simpleGit();

// Create screen
const screen = blessed.screen({
  smartCSR: true,
  title: "LazyGit (Node.js)",
});

// Create layout
const grid = new contrib.grid({ rows: 12, cols: 12, screen: screen });

// Status panel
const statusBox = grid.set(0, 0, 8, 6, blessed.list, {
  label: " Unstaged Files ",
  keys: true,
  vi: true,
  mouse: true,
  style: {
    selected: { bg: "blue", fg: "white" },
    border: { fg: "cyan" },
    label: { fg: "green" },
  },
  border: { type: "line" },
  scrollbar: {
    ch: "█",
    style: { fg: "cyan" },
  },
});

// Staged files panel
const stagedBox = grid.set(0, 6, 8, 6, blessed.list, {
  label: " Staged Files ",
  keys: true,
  vi: true,
  mouse: true,
  style: {
    selected: { bg: "green", fg: "white" },
    border: { fg: "cyan" },
    label: { fg: "green" },
  },
  border: { type: "line" },
  scrollbar: {
    ch: "█",
    style: { fg: "cyan" },
  },
});

// Info panel
const infoBox = grid.set(8, 0, 2, 12, blessed.box, {
  label: " Branch Info ",
  content: "",
  style: {
    border: { fg: "yellow" },
    label: { fg: "green" },
  },
  border: { type: "line" },
});

// Command help panel
const helpBox = grid.set(10, 0, 2, 12, blessed.box, {
  label: " Commands ",
  content:
    "[Space] Stage/Unstage | [a] Stage All | [c] Commit | [p] Push | [P] Pull | [r] Refresh | [q] Quit",
  style: {
    border: { fg: "magenta" },
    label: { fg: "green" },
  },
  border: { type: "line" },
});

let unstagedFiles = [];
let stagedFiles = [];
let currentFocus = "unstaged";
let animationInterval = null;

// Animation frames
const spinnerFrames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
const arrowFrames = ["→  ", " → ", "  →", "   ", "  →", " → ", "→  "];
const uploadFrames = [
  "▁",
  "▂",
  "▃",
  "▄",
  "▅",
  "▆",
  "▇",
  "█",
  "▇",
  "▆",
  "▅",
  "▄",
  "▃",
  "▂",
];

// Load git status
async function loadStatus() {
  try {
    const status = await git.status();
    const branch = await git.branch();

    // Get unstaged files
    unstagedFiles = [
      ...status.modified.map((f) => ({ name: f, status: "M" })),
      ...status.not_added.map((f) => ({ name: f, status: "?" })),
      ...status.deleted.map((f) => ({ name: f, status: "D" })),
    ];

    // Get staged files
    stagedFiles = status.staged.map((f) => ({ name: f, status: "A" }));

    // Update UI
    statusBox.setItems(unstagedFiles.map((f) => `[${f.status}] ${f.name}`));
    stagedBox.setItems(stagedFiles.map((f) => `[${f.status}] ${f.name}`));

    // Update info
    const remote = branch.current;
    const ahead = status.ahead || 0;
    const behind = status.behind || 0;
    infoBox.setContent(
      `Branch: ${remote}\n` +
        `Ahead: ${ahead} | Behind: ${behind}\n` +
        `Unstaged: ${unstagedFiles.length} | Staged: ${stagedFiles.length}`
    );

    screen.render();
  } catch (error) {
    showMessage("Error loading status: " + error.message, "red");
  }
}

// Animated staging
async function stageFile() {
  try {
    if (currentFocus === "unstaged") {
      const selected = statusBox.selected;
      if (selected >= 0 && selected < unstagedFiles.length) {
        const file = unstagedFiles[selected];

        // Show staging animation
        await showStagingAnimation(file.name);

        await git.add(file.name);
        await loadStatus();
      }
    } else {
      const selected = stagedBox.selected;
      if (selected >= 0 && selected < stagedFiles.length) {
        const file = stagedFiles[selected];

        // Show unstaging animation
        await showUnstagingAnimation(file.name);

        await git.reset(["HEAD", file.name]);
        await loadStatus();
      }
    }
  } catch (error) {
    showMessage("Error: " + error.message, "red");
  }
}

// Staging animation
function showStagingAnimation(filename) {
  return new Promise((resolve) => {
    const animBox = blessed.box({
      parent: screen,
      top: "center",
      left: "center",
      width: 60,
      height: 7,
      content: "",
      border: { type: "line" },
      style: {
        fg: "green",
        border: { fg: "green" },
      },
    });

    let frame = 0;
    const interval = setInterval(() => {
      const spinner = spinnerFrames[frame % spinnerFrames.length];
      const arrow = arrowFrames[frame % arrowFrames.length];

      animBox.setContent(
        `\n  ${spinner} Staging file...\n\n` +
          `  📄 ${filename} ${arrow} 📦 Staged Area\n`
      );
      screen.render();
      frame++;

      if (frame > 20) {
        clearInterval(interval);
        animBox.destroy();
        showMessage(`✓ Staged: ${filename}`, "green");
        resolve();
      }
    }, 80);
  });
}

// Unstaging animation
function showUnstagingAnimation(filename) {
  return new Promise((resolve) => {
    const animBox = blessed.box({
      parent: screen,
      top: "center",
      left: "center",
      width: 60,
      height: 7,
      content: "",
      border: { type: "line" },
      style: {
        fg: "yellow",
        border: { fg: "yellow" },
      },
    });

    let frame = 0;
    const interval = setInterval(() => {
      const spinner = spinnerFrames[frame % spinnerFrames.length];
      const arrow =
        arrowFrames[(arrowFrames.length - 1 - frame) % arrowFrames.length];

      animBox.setContent(
        `\n  ${spinner} Unstaging file...\n\n` +
          `  📦 Staged Area ${arrow} 📄 ${filename}\n`
      );
      screen.render();
      frame++;

      if (frame > 20) {
        clearInterval(interval);
        animBox.destroy();
        showMessage(`✓ Unstaged: ${filename}`, "yellow");
        resolve();
      }
    }, 80);
  });
}

// Stage all files with animation
async function stageAll() {
  try {
    if (unstagedFiles.length === 0) {
      showMessage("No files to stage", "yellow");
      return;
    }

    const animBox = blessed.box({
      parent: screen,
      top: "center",
      left: "center",
      width: 60,
      height: 9,
      content: "",
      border: { type: "line" },
      style: {
        fg: "green",
        border: { fg: "green" },
      },
    });

    let frame = 0;
    const totalFiles = unstagedFiles.length;

    const interval = setInterval(() => {
      const spinner = spinnerFrames[frame % spinnerFrames.length];
      const progress = Math.min(frame * 5, 100);
      const bars = Math.floor(progress / 5);
      const progressBar = "█".repeat(bars) + "░".repeat(20 - bars);

      animBox.setContent(
        `\n  ${spinner} Staging all files...\n\n` +
          `  [${progressBar}] ${progress}%\n\n` +
          `  📦 Staging ${totalFiles} file(s)\n`
      );
      screen.render();
      frame++;

      if (progress >= 100) {
        clearInterval(interval);
        animBox.destroy();

        git.add(".").then(async () => {
          showMessage(`✓ Staged ${totalFiles} file(s)`, "green");
          await loadStatus();
        });
      }
    }, 50);
  } catch (error) {
    showMessage("Error staging all: " + error.message, "red");
  }
}

// Commit dialog
function commitDialog() {
  const form = blessed.form({
    parent: screen,
    keys: true,
    left: "center",
    top: "center",
    width: 60,
    height: 10,
    border: { type: "line" },
    style: {
      border: { fg: "cyan" },
    },
  });

  blessed.text({
    parent: form,
    content: "Enter commit message:",
    top: 1,
    left: 2,
  });

  const input = blessed.textarea({
    parent: form,
    name: "message",
    top: 3,
    left: 2,
    width: 54,
    height: 3,
    border: { type: "line" },
    style: {
      border: { fg: "white" },
    },
    inputOnFocus: true,
  });

  blessed.text({
    parent: form,
    content: "[Enter] Commit | [Esc] Cancel",
    bottom: 1,
    left: 2,
    style: { fg: "gray" },
  });

  input.key("enter", async () => {
    const message = input.getValue().trim();
    if (message) {
      form.destroy();
      await showCommitAnimation(message);
    } else {
      form.destroy();
      screen.render();
    }
  });

  input.key("escape", () => {
    form.destroy();
    screen.render();
  });

  input.focus();
  screen.render();
}

// Commit animation
async function showCommitAnimation(message) {
  const animBox = blessed.box({
    parent: screen,
    top: "center",
    left: "center",
    width: 70,
    height: 9,
    content: "",
    border: { type: "line" },
    style: {
      fg: "cyan",
      border: { fg: "cyan" },
    },
  });

  let frame = 0;
  const interval = setInterval(() => {
    const spinner = spinnerFrames[frame % spinnerFrames.length];
    const dots = ".".repeat((frame % 3) + 1) + " ".repeat(3 - (frame % 3));

    animBox.setContent(
      `\n  ${spinner} Creating commit${dots}\n\n` +
        `  💬 "${message}"\n\n` +
        `  📦 → 🔒 Committing changes...\n`
    );
    screen.render();
    frame++;

    if (frame > 25) {
      clearInterval(interval);
      animBox.destroy();

      git
        .commit(message)
        .then(async () => {
          showMessage(`✓ Committed: ${message}`, "green");
          await loadStatus();
        })
        .catch((error) => {
          showMessage("Commit error: " + error.message, "red");
        });
    }
  }, 100);
}

// Push animation
async function pushToRemote() {
  try {
    const branch = await git.branch();

    const animBox = blessed.box({
      parent: screen,
      top: "center",
      left: "center",
      width: 70,
      height: 11,
      content: "",
      border: { type: "line" },
      style: {
        fg: "magenta",
        border: { fg: "magenta" },
      },
    });

    let frame = 0;
    let phase = 0; // 0: connecting, 1: uploading, 2: done

    const interval = setInterval(() => {
      const spinner = spinnerFrames[frame % spinnerFrames.length];
      const upload = uploadFrames[frame % uploadFrames.length];

      let content = "";

      if (phase === 0) {
        content =
          `\n  ${spinner} Connecting to GitHub...\n\n` +
          `  🌐 origin/${branch.current}\n\n` +
          `  [${"━".repeat(frame % 20)}${"─".repeat(20 - (frame % 20))}]\n`;

        if (frame > 30) phase = 1;
      } else if (phase === 1) {
        const progress = Math.min((frame - 30) * 3, 100);
        const bars = Math.floor(progress / 5);
        const progressBar = upload.repeat(bars) + "░".repeat(20 - bars);

        content =
          `\n  ${spinner} Pushing to GitHub...\n\n` +
          `  📦 → ☁️  Uploading objects\n\n` +
          `  [${progressBar}] ${progress}%\n`;

        if (progress >= 100) phase = 2;
      }

      animBox.setContent(content);
      screen.render();
      frame++;

      if (phase === 2) {
        clearInterval(interval);
        animBox.destroy();

        git
          .push("origin", branch.current)
          .then(async () => {
            showMessage(
              `✓ Successfully pushed to origin/${branch.current}`,
              "green"
            );
            await loadStatus();
          })
          .catch((error) => {
            showMessage("Push error: " + error.message, "red");
          });
      }
    }, 80);
  } catch (error) {
    showMessage("Push error: " + error.message, "red");
  }
}

// Pull animation
async function pullFromRemote() {
  try {
    const animBox = blessed.box({
      parent: screen,
      top: "center",
      left: "center",
      width: 70,
      height: 11,
      content: "",
      border: { type: "line" },
      style: {
        fg: "blue",
        border: { fg: "blue" },
      },
    });

    let frame = 0;
    let phase = 0;

    const interval = setInterval(() => {
      const spinner = spinnerFrames[frame % spinnerFrames.length];
      const download =
        uploadFrames[(uploadFrames.length - 1 - frame) % uploadFrames.length];

      let content = "";

      if (phase === 0) {
        content =
          `\n  ${spinner} Fetching from GitHub...\n\n` +
          `  🌐 Checking for updates\n\n` +
          `  [${"━".repeat(frame % 20)}${"─".repeat(20 - (frame % 20))}]\n`;

        if (frame > 25) phase = 1;
      } else if (phase === 1) {
        const progress = Math.min((frame - 25) * 4, 100);
        const bars = Math.floor(progress / 5);
        const progressBar = download.repeat(bars) + "░".repeat(20 - bars);

        content =
          `\n  ${spinner} Pulling changes...\n\n` +
          `  ☁️  → 📦 Downloading objects\n\n` +
          `  [${progressBar}] ${progress}%\n`;

        if (progress >= 100) phase = 2;
      }

      animBox.setContent(content);
      screen.render();
      frame++;

      if (phase === 2) {
        clearInterval(interval);
        animBox.destroy();

        git
          .pull()
          .then(async () => {
            showMessage("✓ Successfully pulled from remote", "green");
            await loadStatus();
          })
          .catch((error) => {
            showMessage("Pull error: " + error.message, "red");
          });
      }
    }, 70);
  } catch (error) {
    showMessage("Pull error: " + error.message, "red");
  }
}

// Show temporary message
function showMessage(msg, color = "white") {
  const msgBox = blessed.box({
    parent: screen,
    top: "center",
    left: "center",
    width: "shrink",
    height: "shrink",
    content: ` ${msg} `,
    padding: 1,
    border: { type: "line" },
    style: {
      fg: color,
      border: { fg: color },
    },
  });

  screen.render();

  setTimeout(() => {
    msgBox.destroy();
    screen.render();
  }, 2500);
}

// Key bindings
screen.key(["space"], stageFile);
screen.key(["a"], stageAll);
screen.key(["c"], commitDialog);
screen.key(["p"], pushToRemote);
screen.key(["P"], pullFromRemote);
screen.key(["r"], loadStatus);
screen.key(["tab"], () => {
  currentFocus = currentFocus === "unstaged" ? "staged" : "unstaged";
  if (currentFocus === "unstaged") {
    statusBox.focus();
  } else {
    stagedBox.focus();
  }
  screen.render();
});
screen.key(["q", "C-c"], () => process.exit(0));

// Focus handlers
statusBox.on("focus", () => {
  currentFocus = "unstaged";
});
stagedBox.on("focus", () => {
  currentFocus = "staged";
});

// Initial setup
statusBox.focus();
loadStatus();

screen.render();
