# LazyGit Node 🚀

A beautiful, interactive terminal UI for Git - like LazyGit but built with Node.js. Perfect for developers who want a simple, visual way to stage, commit, and push code.

![LazyGit Node](./assets/lazygit_banner.png)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- 📦 **Visual File Staging** - See unstaged and staged files side-by-side
- 🎬 **Beautiful Animations** - Smooth animations for all Git operations
- ⚡ **Fast & Intuitive** - Keyboard shortcuts for everything
- 🔐 **SSH Support** - Works with your existing SSH keys
- 🌐 **Push/Pull** - Easy GitHub integration
- 🎨 **Color-coded UI** - Clear visual feedback

## 🎥 Demo

```
┌─ Unstaged Files ──────────┐  ┌─ Staged Files ────────────┐
│ [M] src/index.js          │  │ [A] README.md             │
│ [M] package.json          │  │ [A] src/utils.js          │
│ [?] src/newfile.js        │  │                           │
└───────────────────────────┘  └───────────────────────────┘

┌─ Branch Info ─────────────────────────────────────────────┐
│ Branch: main                                              │
│ Ahead: 2 | Behind: 0                                      │
│ Unstaged: 3 | Staged: 2                                   │
└───────────────────────────────────────────────────────────┘
```

## 📋 Prerequisites

- **Node.js** (v14 or higher)
- **npm** (comes with Node.js)
- **Git** installed and configured

## 🚀 Installation

### Method 1: Global NPM Install (Recommended) ⭐

This works on **Windows, macOS, and Linux**.

1. Clone the repository:

```bash
git clone https://github.com/ShivanshKumar760/lazygit-node.git
cd lazygit-node
```

2. Install dependencies:

```bash
npm install
```

3. Install globally:

```bash
npm install -g .
```

4. Run from anywhere:

```bash
cd /path/to/your/project
lazygit-node
```

### Method 2: Manual Installation

#### 🪟 Windows

**Option A: Using npm (Easiest)**

```cmd
npm install -g .
```

**Option B: Using Batch File**

1. Create `lazygit-node.bat` in the same folder as `lazygit.js`:

```batch
@echo off
node "%~dp0lazygit.js" %*
```

2. Add to PATH:

   - Press `Win + X` → System
   - Click "Advanced system settings"
   - Click "Environment Variables"
   - Under "System Variables", find "Path" and click "Edit"
   - Click "New" and add the folder path containing `lazygit-node.bat`
   - Click OK on all dialogs
   - Restart your terminal

3. Run:

```cmd
lazygit-node
```

#### 🍎 macOS

1. Make the file executable:

```bash
chmod +x lazygit.js
```

2. Create a symbolic link:

```bash
sudo ln -s "$(pwd)/lazygit.js" /usr/local/bin/lazygit-node
```

Or move it directly:

```bash
sudo cp lazygit.js /usr/local/bin/lazygit-node
```

3. Run from anywhere:

```bash
cd ~/projects/my-repo
lazygit-node
```

#### 🐧 Linux

1. Make the file executable:

```bash
chmod +x lazygit.js
```

2. Move to bin directory:

```bash
sudo cp lazygit.js /usr/local/bin/lazygit-node
```

Or add to your local bin:

```bash
mkdir -p ~/.local/bin
cp lazygit.js ~/.local/bin/lazygit-node
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

3. Run from anywhere:

```bash
cd ~/projects/my-repo
lazygit-node
```

## 📦 Dependencies

The following npm packages will be installed automatically:

```json
{
  "blessed": "^0.1.81",
  "blessed-contrib": "^4.11.0",
  "simple-git": "^3.21.0",
  "chalk": "^4.1.2"
}
```

## ⌨️ Keyboard Shortcuts

| Key     | Action                      |
| ------- | --------------------------- |
| `↑/↓`   | Navigate files              |
| `Space` | Stage/Unstage selected file |
| `a`     | Stage all files             |
| `c`     | Commit staged files         |
| `p`     | Push to remote              |
| `P`     | Pull from remote            |
| `Tab`   | Switch between panels       |
| `r`     | Refresh status              |
| `q`     | Quit                        |

## 🔧 Configuration

### Setting up SSH for GitHub

If you don't have SSH keys set up:

1. Generate SSH key:

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

2. Add to SSH agent:

```bash
# macOS/Linux
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# Windows (PowerShell)
Start-Service ssh-agent
ssh-add ~\.ssh\id_ed25519
```

3. Copy public key:

```bash
# macOS
pbcopy < ~/.ssh/id_ed25519.pub

# Linux
xclip -selection clipboard < ~/.ssh/id_ed25519.pub

# Windows
type %USERPROFILE%\.ssh\id_ed25519.pub | clip
```

4. Add to GitHub:

   - Go to https://github.com/settings/ssh/new
   - Paste your key
   - Click "Add SSH key"

5. Test connection:

```bash
ssh -T git@github.com
```

### Converting HTTPS to SSH

If your repo uses HTTPS, convert it to SSH:

```bash
git remote set-url origin git@github.com:username/repo.git
```

## 🎯 Usage Examples

### Basic Workflow

1. Navigate to your Git repository:

```bash
cd my-project
lazygit-node
```

2. Stage files:

   - Use `↑/↓` to select a file
   - Press `Space` to stage it
   - Or press `a` to stage all

3. Commit:

   - Press `c`
   - Type your commit message
   - Press `Enter`

4. Push to GitHub:
   - Press `p`
   - Watch the animated push progress!

### Quick Commands

```bash
# Stage all and commit in one go
# 1. Press 'a' to stage all
# 2. Press 'c' to commit
# 3. Type message and Enter
# 4. Press 'p' to push
```

## 🐛 Troubleshooting

### "Not a git repository"

Make sure you're in a Git repository:

```bash
git init
```

### "Permission denied (publickey)"

Your SSH key isn't set up. Follow the SSH configuration steps above.

### "Command not found: lazygit-node"

- **npm install**: Run `npm install -g .` again
- **PATH issue**: Make sure the installation directory is in your PATH
- **Restart terminal**: Close and reopen your terminal

### Windows: "cannot be loaded because running scripts is disabled"

Enable scripts in PowerShell:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Dependencies not found

Install dependencies manually:

```bash
npm install blessed blessed-contrib simple-git chalk
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Acknowledgments

- Inspired by [LazyGit](https://github.com/jesseduffield/lazygit) by Jesse Duffield
- Built with [Blessed](https://github.com/chjj/blessed) for terminal UI
- Uses [simple-git](https://github.com/steveukx/git-js) for Git operations

## 📞 Support

If you encounter any issues or have questions:

- 🐛 [Open an issue](https://github.com/ShivanshKumar760/lazygit-node/issues)
- 💬 [Start a discussion](https://github.com/ShivanshKumar760/lazygit-node/discussions)

## ⭐ Show Your Support

If you find this project useful, please consider giving it a star on GitHub!

---

Made with ❤️ by Shivansh Kumar

**Happy Gitting! 🎉**
