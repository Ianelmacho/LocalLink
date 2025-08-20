# 🌍 **FindMyGuide**
> ✨ *Your personal tour guide companion — like Uber, but for exploring the world.*

<div align="center">
  <img src="app/frontend/src/photos/Original_Logo.png" alt="FindMyGuide" height="80"/>
</div>

---

## 📖 About
**FindMyGuide** connects travelers with local guides. The site is frontend-first right now (backend-ready hooks included) with a clean, modern UI and shared components across pages.

---

## 🧭 Pages (Current)
- 🏠 **Home** (`home.html`) — Highlights popular guides and city cards  
- 🔍 **Explore** (`search_guides.html`) — Search guides/spots with debounced search, filter pills, skeleton loaders  
- 🙋 **My Profile** (`my_profile.html`) — Favorite spots & activities with inline **Edit Mode** (add/remove pills), recent guides  
- ⭐ **Featured Guides** (`featured_guides.html` + individual pages: `guide_nyc.html`, `guide_paris.html`, `guide_tokyo.html`, `guide_rome.html`)  
- ❓ **Help Component** (`question_style.css` + inline block) — Floating help icon in top-right with a sleek, centered modal  
- 🔐 **Auth (UI only)** — `login.html`, `create_account.html`, `register.html`

> The **Profile Popup** (`profile_popup.html` + `profile_popup_style.css`) is injected and works across pages. It uses a **white background, red outline, black text**, and a **red logout** button with a glide-in animation.

---

## 🎨 Design System
- Brand gradient backgrounds with red accents  
- Poppins font; white→silver headline gradients for readability  
- Modern cards, pill buttons, and smooth micro-interactions  
- Consistent navbar across pages (`navbar_style.css`)

---

## ⚙️ Quick Start
Serve the site as static files (any simple HTTP server works).

**Option A: VS Code Live Server (easiest)**
1. Open the folder in VS Code  
2. Install the **Live Server** extension  
3. Right-click `home.html` → **Open with Live Server**

**Option B: Node static server**
```bash
npm i -g http-server
http-server . -p 8080
# Open http://localhost:8080/home.html
