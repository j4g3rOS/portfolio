# Deployment guide — MacBook Air M4 · Homebrew · ZSH

Complete step-by-step CLI instructions to get your portfolio live on Cloudflare Pages via GitLab.

---

## Prerequisites (one-time setup)

### 1 — Install Homebrew (if not already installed)

```zsh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# After install, follow the "Next steps" prompt to add brew to your PATH:
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"

# Verify
brew --version
```

### 2 — Install Git

```zsh
brew install git

# Verify
git --version
```

### 3 — Configure Git identity (once per machine)

```zsh
git config --global user.name  "Krzysztof Scibiorek"
git config --global user.email "kris@kenziservices.co.uk"
git config --global init.defaultBranch main
git config --global core.editor "code --wait"   # VS Code as default editor (optional)
```

### 4 — Generate an SSH key for GitLab

```zsh
# Generate (Ed25519 is modern and fast)
ssh-keygen -t ed25519 -C "kris@kenziservices.co.uk" -f ~/.ssh/id_ed25519_gitlab

# Start the SSH agent and add the key
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519_gitlab

# Copy the PUBLIC key to your clipboard
cat ~/.ssh/id_ed25519_gitlab.pub | pbcopy
```

Now paste it into GitLab:
**GitLab → Profile picture → Preferences → SSH Keys → Add new key**  
Title: `MacBook Air M4`  Paste → Save.

### 5 — Verify SSH connection to GitLab

```zsh
ssh -T git@gitlab.com
# Expected: "Welcome to GitLab, @yourhandle!"
```

---

## Part 1 — Push portfolio to GitLab

### Step 1 — Create the repository on GitLab

1. Go to **https://gitlab.com/projects/new**
2. Choose **Create blank project**
3. Name it: `portfolio` (or `kris-portfolio`)
4. Visibility: `Public` (required for free Cloudflare Pages connection) or `Private` (use Cloudflare API token)
5. **Uncheck** "Initialize repository with a README" (you have your own)
6. Click **Create project**
7. Copy the **SSH clone URL** — looks like: `git@gitlab.com:yourusername/portfolio.git`

### Step 2 — Initialise and push

```zsh
# Navigate to the portfolio folder (adjust path if needed)
cd ~/portfolio

# Initialise git
git init

# Stage everything
git add .

# First commit
git commit -m "feat: initial portfolio launch"

# Add your GitLab remote (replace with your actual URL)
git remote add origin git@gitlab.com:YOURUSERNAME/portfolio.git

# Push
git push -u origin main
```

> **Tip:** Every time you update the site in future:
> ```zsh
> cd ~/portfolio
> git add .
> git commit -m "chore: update tutorials section"
> git push
> ```
> Cloudflare will auto-deploy within ~30 seconds.

---

## Part 2 — Connect to Cloudflare Pages

### Method A — Connect GitLab repo directly (recommended)

1. Log in to **https://dash.cloudflare.com**
2. Left sidebar → **Workers & Pages** → **Create** → **Pages** tab → **Connect to Git**
3. Click **Connect GitLab** — authorise Cloudflare to read your repos
4. Select your `portfolio` repository
5. Configure the build (no build step needed — pure static site):

| Setting | Value |
|---|---|
| Production branch | `main` |
| Framework preset | **None** |
| Build command | *(leave blank)* |
| Build output directory | `/` (root) |

6. Click **Save and Deploy**
7. Wait ~30 seconds → Cloudflare provides a URL like `portfolio-abc.pages.dev` ✅

### Method B — Deploy via Cloudflare Wrangler CLI

```zsh
# Install Wrangler
brew install cloudflare-wrangler
# OR via npm:
# npm install -g wrangler

# Authenticate
wrangler login
# Opens browser → authorise → returns to terminal

# Deploy (from the portfolio root directory)
cd ~/portfolio
wrangler pages deploy . --project-name portfolio

# Wrangler will print your deployment URL:
# https://portfolio.pages.dev
```

> **Re-deploy after changes:**
> ```zsh
> cd ~/portfolio
> wrangler pages deploy . --project-name portfolio
> ```

---

## Part 3 — Custom domain (optional)

Once deployed, you can attach your own domain:

1. Cloudflare Dashboard → Workers & Pages → your project → **Custom domains** → **Set up a custom domain**
2. Enter your domain (e.g. `www.kenziservices.co.uk`)
3. Cloudflare auto-creates the DNS records if your domain is managed by Cloudflare

If your domain is managed **elsewhere** (GoDaddy, Namecheap, etc.):
```zsh
# Add a CNAME record pointing to your pages URL
Type:   CNAME
Name:   www   (or @)
Value:  portfolio-abc.pages.dev
TTL:    Auto
```

---

## Part 4 — Useful daily workflow

```zsh
# Edit the site locally — start a local preview server
cd ~/portfolio
python3 -m http.server 8080
# Open: http://localhost:8080

# Or use VS Code's Live Server extension for hot-reload

# When done with changes:
git add .
git commit -m "feat: add Intune tutorial"
git push
# → Cloudflare auto-deploys in ~30 seconds
```

---

## Part 5 — Optional: Prettier Git log aliases (ZSH)

Add to your `~/.zshrc`:

```zsh
# Git shortcuts
alias gs="git status"
alias ga="git add ."
alias gc="git commit -m"
alias gp="git push"
alias gl="git log --oneline --graph --decorate --all"

# Quick deploy alias
alias portfolio-push='cd ~/portfolio && git add . && git commit -m "chore: update $(date +%Y-%m-%d)" && git push'
```

Reload:
```zsh
source ~/.zshrc
```

---

## Checklist before going live

- [ ] `git remote -v` shows your GitLab remote
- [ ] `git push` succeeds without errors
- [ ] Cloudflare Pages shows "Success" deployment status
- [ ] Visit your `*.pages.dev` URL and verify it loads correctly
- [ ] Test light/dark toggle
- [ ] Test on mobile (Chrome DevTools → responsive mode)
- [ ] Verify all links (LinkedIn, GitHub, email) work

---

*Questions? kris@kenziservices.co.uk*
