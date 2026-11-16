# Opening Feranmi Estates in Visual Studio Code

Two ways to get the site running locally. **Option A** is the simplest.

---

## Option A — Unzip and open (recommended)

1. **Download and unzip** `feranmi-estates-vscode.zip` anywhere on your computer
   (e.g. `Documents/Projects/`).
2. **Open the folder in VS Code**
   - *File → Open Folder…* → select the `feranmi-estates` folder, **or**
   - right-click the folder → *Open with Code*.
   - If VS Code suggests extensions, click **Install** (ESLint, Prettier, Live Server…).
3. **Install the dependencies** — open the built-in terminal with **Ctrl + `** (backtick) and run:

   ```bash
   npm install
   ```

   *(You need [Node.js](https://nodejs.org) 18 or newer. Check with `node -v`.)*

4. **Start the site** — any of these:
   - press **F5** and pick *Feranmi Estates · Chrome (dev server)*, or
   - **Ctrl + Shift + B** to run the default build task (*2 · Start dev server*), or
   - type `npm run dev` in the terminal.
5. Open **http://localhost:5173** in your browser. The page reloads automatically as you
   edit files.

---

## Option B — Clone into a fresh folder from this project

If you already have the files in a shared folder and just want to work in VS Code:

```bash
cd path/to/feranmi-estates
npm install
code .
npm run dev
```

---

## The VS Code bits that are already configured

| File | What it does |
| --- | --- |
| `.vscode/tasks.json` | **Ctrl + Shift + B** menu: install, dev server, production build, preview, single-file build |
| `.vscode/launch.json` | **F5** opens the site in Chrome or Edge with the debugger attached |
| `.vscode/extensions.json` | Recommends ESLint, Prettier, Live Server, Auto Rename Tag, Path Intellisense |
| `.vscode/settings.json` | 2-space indent, Emmet for JSX, hides `node_modules`/`dist` from search |
| `feranmi-estates.code-workspace` | Optional workspace file — double-click it to open the project with its own title bar |

### Keyboard shortcuts

| Action | Shortcut |
| --- | --- |
| Run a task (dev server, build…) | `Ctrl + Shift + B` |
| Start debugging in Chrome | `F5` |
| Toggle terminal | `` Ctrl + ` `` |
| Quick open a file | `Ctrl + P` |
| Search the whole project | `Ctrl + Shift + F` |

---

## Project structure

```
feranmi-estates/
├─ .vscode/                  ← tasks, launch, settings, extensions
├─ public/
│  └─ favicon.svg
├─ src/
│  ├─ assets/
│  │  ├─ images/             ← all property photos (bundled by Vite)
│  │  └─ fonts/              ← Fraunces + Manrope (self-hosted)
│  ├─ components/            ← Header, Footer, PropertyCard, ServiceRow, Reveal…
│  ├─ data/                  ← site.js, properties.js, services.js, branches.js
│  ├─ hooks/                 ← useInView, useCountUp, useScrollY
│  ├─ pages/                 ← Home, About, Services, Properties, Locations, Contact
│  ├─ styles/global.css      ← design tokens + shared styles
│  ├─ App.jsx                ← routes
│  ├─ main.jsx               ← entry point
│  └─ images.js              ← image barrel
├─ index.html
├─ package.json
├─ vite.config.js
├─ vite.config.preview.js    ← builds the single-file version
└─ README.md
```

---

## Where to edit common things

| I want to change… | Edit this file |
| --- | --- |
| Company name, email, phone, address, hours, socials | `src/data/site.js` |
| The 9 property listings (titles, prices, photos) | `src/data/properties.js` |
| The 6 services and their bullet points | `src/data/services.js` |
| The 37 branch offices | `src/data/branches.js` |
| Colours, fonts, spacing, buttons | `src/styles/global.css` (the `:root` block at the top) |
| Home page sections | `src/pages/Home.jsx` + `src/pages/Home.css` |
| The contact form and its validation rules | `src/pages/Contact.jsx` |

---

## Building a version to upload to a web host

```bash
npm run build
```

This creates a `dist/` folder containing the finished site. Upload **the contents of
`dist/`** to your host (Netlify, Vercel, cPanel, GitHub Pages…). Because `vite.config.js`
uses a relative `base`, the build also works if you drop it into a sub-folder.

Want one file you can double-click or email? Run:

```bash
npm run build:single
```

That produces `dist-preview/index.html` — the entire site, images and fonts included, in a
single HTML file.

---

## Troubleshooting

| Problem | Fix |
| --- | --- |
| `npm: command not found` | Install Node.js from [nodejs.org](https://nodejs.org), then restart VS Code. |
| `vite: not found` / `Cannot find package 'vite'` | Run `npm install` again inside the `feranmi-estates` folder. |
| Port 5173 already in use | Run `npm run dev -- --port 3000` and open that port instead. |
| Page looks unstyled in the editor's preview | Open it through the dev server (`localhost:5173`), not by double-clicking `index.html` — the source needs Vite to compile JSX. Use the single-file build for offline viewing. |
| Blank page after opening `dist/index.html` directly | Browsers block module scripts on `file://`. Use `npm run preview` or the single-file build instead. |
| F5 does nothing | Install the built-in *JavaScript Debugger* (bundled with VS Code) and start the dev server first. |
