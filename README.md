# Krzysztof Scibiorek — Portfolio

Professional IT portfolio for Krzysztof Marek Scibiorek, IT Specialist & Cloud Infrastructure Strategist.

**Stack:** Pure HTML5 · CSS3 (custom properties, grid, animations) · Vanilla JS  
**Hosting:** Cloudflare Pages  
**Repo:** GitLab  

## Features

- ⚡ Zero dependencies — no build tools, no frameworks
- 🌗 Light / dark theme with vibrant purple contrast, persisted via `localStorage` & respecting OS preference
- 📱 Fully responsive (mobile-first)
- ♿ Accessible — keyboard navigable, ARIA labels, `prefers-reduced-motion` aware
- 🔒 Security headers via `_headers` (Cloudflare Pages)
- 🎯 Scroll-reveal animations with `IntersectionObserver`
- 📧 Contact form → native `mailto:` (no server needed for static hosting)

## File structure

```
portfolio/
├── index.html          # Single-page application
├── _headers            # Cloudflare security headers
├── _redirects          # Cloudflare redirects
├── .gitignore
├── README.md
└── assets/
    ├── css/
    │   └── style.css
    └── js/
        └── main.js
```

## Local development

No build step required.

```zsh
# Option A — Python quick server (built-in)
cd portfolio
python3 -m http.server 8080
open http://localhost:8080

# Option B — npx serve
npx serve .
```

## Deployment

See the full CLI guide below, or just push to your GitLab/GitHub repo and connect to Cloudflare Pages.

---

*Built with precision — deployed on Cloudflare.*
