# AbdelXP.exe 🪟

*A Retro Windows XP Style Portfolio App (Yes, it's 2026 and we're still vibin' with XP)*

---

## English Version 🇬🇧

### 🎮 What is this?

**AbdelXP.exe** is a nostalgic portfolio and resume application styled like Windows XP — because sometimes the vintage aesthetic just hits different. Welcome to a desktop experience from the early 2000s, but make it *portfolio*.

### ✨ Features

- **Retro Desktop Environment** - Draggable windows, start menu, taskbar, and all the XP nostalgia you can handle
- **Multi-Language Support** - Switch between English 🇬🇧 and French 🇫🇷 on the fly
- **Interactive Windows Apps** - About, Education, Experience, Projects, Skills, Hobbies, Contact, and Resume windows
- **PDF Resume Viewer** - Language-based resume display with download functionality
- **Sound Effects** - Toggle sound on/off with authentic boot sounds and alerts
- **Zoom Controls** - Adjust UI size from 80% to 130% (yes, for accessibility AND nostalgia)
- **Customizable Wallpapers** - Multiple Windows XP-inspired backgrounds
- **Tip Balloon** - Random fun facts about me that pop up during the session

### 🛠️ Tech Stack

- **React 19** - Component-based UI magic
- **Vite** - Lightning-fast build tool
- **CSS3** - Pixelated perfection with CSS Grid & Flexbox
- **localStorage** - To remember your preferences (because we're thoughtful like that)

### 📁 Project Structure

```
resume-app/
├── src/
│   ├── App.jsx              # Main component (the brain)
│   ├── main.jsx             # Entry point
│   ├── index.css            # All the retro styling
│   └── resumeData.js        # App config & data
├── public/
│   ├── images/              # Icons & wallpapers
│   ├── music/               # Sound effects (beep boop)
│   └── docs/                # Resume PDFs
├── index.html               # HTML entry
├── package.json             # Dependencies
└── vite.config.js           # Vite configuration
```

### 🎯 How It Works

1. **Boot Screen** - Splash animation with AbdelXP.exe branding
2. **User Picker** - Select your profile (just me, really)
3. **Desktop** - Interact with draggable app windows
4. **Preferences** - Stored in localStorage (language, zoom, sound, wallpaper)
5. **Taskbar** - Clock, language switcher, zoom controls, sound toggle, and start menu

### 🚀 Getting Started

```bash
npm install      # Install dependencies
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Check code quality
```

### 🎨 Customization

- **Add New App Window?** Update `resumeData.js` with new app entry and add routing in `App.jsx`
- **Change Colors?** CSS variables in `index.css` control the XP theme
- **Add Sounds?** Drop audio files in `/public/music/` and reference them in the sound system
- **Modify Content?** Edit `resumeData.js` for personal info, projects, and skills

### 📸 Fun Facts

- Written in React... but styled like it's 1995 🕰️
- Fully responsive (even XP can be mobile!)
- Supports light & dark wallpapers
- Tooltips appear randomly with personal tidbits
- F1 tips include my love for Max Verstappen 🏎️ Tu Tu Turu!

---

## 📝 License

Built with ❤️ and nostalgia — Enjoy the retro vibes!
