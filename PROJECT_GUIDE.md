# Andarak website — owner and maintainer guide

Updated: 12 October 2026. This guide describes the checked-in source, not a promise that every proposed feature has been implemented.

## 1. What the website contains

The website is a bilingual English/Russian React application about Andarak. The main portal includes home, culture, gallery, and about pages, plus placeholders for future sections. The history experience is a separate full-screen presentation.

| Address | Purpose | Main file |
| --- | --- | --- |
| `/` | Main village website | `frontend/src/pages/HomePage.jsx` |
| `/history` | Scroll-driven historical presentation | `frontend/src/pages/HistorySlides.jsx` |
| `/history/classic` | Redirects to `/history`; the old version is not offered | `frontend/src/App.js` |
| `/culture` | Culture page | `frontend/src/pages/CulturePage.jsx` |
| `/gallery` | Photo gallery and individual photo viewing | `frontend/src/pages/GalleryPage.jsx` |
| `/about` | About page | `frontend/src/pages/AboutPage.jsx` |
| `/soon` | Coming-soon content | `frontend/src/pages/ComingSoonPage.jsx` |

Unknown paths currently show the coming-soon page rather than a dedicated 404 page.

## 2. Technologies

- React 19 and React DOM render the interface.
- React Router handles page addresses without full-page reloads.
- Create React App (`react-scripts` 5) and CRACO 7 provide the development server and production build. CRACO defines the `@` alias for `frontend/src`.
- Tailwind CSS 3 and ordinary CSS provide styling. Lucide supplies icons; Radix UI supplies accessible UI primitives, including the weather dialog.
- Framer Motion is used in existing components. The current presentation uses native scrolling, a sticky stage, React state, and CSS transforms for its zoom transitions. Lenis remains in the older presentation source.
- The repository also contains a Python FastAPI backend with Motor/MongoDB. It is a basic status API, not a finished content-management system.

Exact dependency versions are in `frontend/package.json` and `backend/requirements.txt`. An installed package does not necessarily mean the website uses its features.

## 3. Where to make changes

| Change wanted | File or folder |
| --- | --- |
| Routes, shared language and theme | `frontend/src/App.js` |
| Navigation and language/theme controls | `frontend/src/components/portal/Header.jsx` |
| Portal wording and navigation data | `frontend/src/data/portal.js` |
| Main styling and theme variables | `frontend/src/index.css`, `frontend/src/App.css` |
| Historical titles, dates, full text and lessons | `frontend/src/data/chapters.js`: `CHAPTERS` |
| Introduction and shared history labels | `frontend/src/data/chapters.js`: `UI` |
| Short slide descriptions and presentation behavior | `frontend/src/pages/HistorySlides.jsx`: `SUMMARIES` and component |
| Presentation layout, phone sizing, reading panels | `frontend/src/pages/HistorySlides.css` |
| Chapter music assignments | `frontend/src/data/chapters.js`: `YT_TRACKS` |
| Music player and playback lifecycle | `frontend/src/components/ReadingMusic.jsx` |
| Gallery photo list and captions | `frontend/src/data/chapters.js`: `GALLERY` |
| Gallery layout and interactions | `frontend/src/pages/GalleryPage.jsx`, `GalleryPage.css` |
| Weather behavior and styling | `frontend/src/components/portal/HeaderWeather.jsx`, `HeaderWeather.css` |
| Presentation artwork | `frontend/public/art/` |
| Gallery photos | `frontend/public/gallery/` |

`HistoryPage.jsx`, `Chapter.jsx`, `Hero.jsx`, and `Chrome.jsx` retain the earlier presentation implementation. Editing them will not change the current `/history` experience.

## 4. Presentation behavior

There are 12 scenes: a text-only introduction, 10 historical chapters, and a text-only closing. The opening has the full introduction and a Begin button. The ending says “The fire is still burning” in the selected language.

The stage stays fixed while scrolling changes image/title scale and fades into the next chapter. A transition occupies approximately 1.8 viewport heights of scroll distance. Previous/next buttons move to chapter resting positions. Reduced-motion preferences disable the zoom.

At rest, chapter images use `object-fit: contain` to preserve the whole picture. During the requested zoom transition, edges can move outside the viewport; this is intentional animation, not permanent cropping. Phone layouts allocate remaining vertical space to the photo and place the text below it.

Each chapter has its own Learn more panel containing its full description and lesson. Opening a panel locks the scene scroll; the text panel scrolls independently. Closing it, pressing Escape while focus is in the panel, or navigating to another chapter removes that panel. Visible image captions are not shown in the current presentation.

Keep the order of `SUMMARIES` aligned with `CHAPTERS` when reordering or adding chapters. Update chapter numbers and both languages together.

## 5. Music

`YT_TRACKS` maps each chapter ID to a YouTube video ID. `ReadingMusic.jsx` creates a visible YouTube player only when that chapter's reading panel is open. It attempts playback on readiness at 40% volume. Play/pause, a volume slider, and quieter/louder buttons are provided.

Closing the panel destroys the player immediately. A different chapter gets a separate player, so previous music should not continue. The current new player starts tracks at their beginning; old start offsets in `useYouTubeScore.js` do not control it.

Browser autoplay rules may require another tap on Play. Some phones require hardware volume buttons. Ads, embed restrictions, removed videos, connectivity, and YouTube availability can affect playback. The site does not download or host these songs. Keep the visible player and check permission/licensing before replacing songs with hosted audio files.

## 6. Weather

The header requests Open-Meteo forecasts directly from the browser, without an API key in this implementation. The configured location is latitude `39.76849`, longitude `69.46398`, timezone `Asia/Bishkek`.

It requests current temperature/weather, seven daily forecasts, and hourly conditions. It uses a 15-minute in-memory cache and a 10-second request timeout. The popup lets visitors select a day to inspect its hourly forecast. This is forecast/model data, not a live camera or guaranteed observation at the village. Network failures display a fallback/retry state.

Provider: https://open-meteo.com/ — check current usage terms and attribution requirements before public or commercial deployment; do not assume unlimited free use.

## 7. Language, theme, and storage

The portal stores preferences in the visitor's browser under `andarak-lang` and `andarak-theme`. These are local to that browser/device, not shared accounts. The presentation receives the shared language state; it intentionally has its own dark cinematic styling rather than mirroring the portal's light theme.

Most content is stored in source files and image folders, then shipped with the frontend. Editing the deployed site's text currently requires changing files and deploying again. Weather comes from Open-Meteo; music comes from YouTube. Neither is stored in the project's MongoDB.

## 8. Run locally

Open a terminal in the project's `frontend` folder. Node.js must be installed and available on `PATH`, including to child processes.

With the existing installed dependencies, the command used for this project is:

```sh
DISABLE_ESLINT_PLUGIN=true WATCHPACK_POLLING=true PORT=3001 HOST=127.0.0.1 BROWSER=none node node_modules/@craco/craco/dist/bin/craco.js start
```

Wait for “Compiled successfully.” Open `http://127.0.0.1:3001` or `/history`. Keep the terminal running; Ctrl+C stops the server. Do not reinstall dependencies merely to start the site.

For phone testing on trusted Wi-Fi, replace `HOST=127.0.0.1` with `HOST=0.0.0.0`. Both devices must use the same network. Open `http://YOUR_LAPTOP_LAN_IP:3001/history` on the phone. The laptop IP may change. Binding to `0.0.0.0` exposes the development server to reachable network devices; this is not public hosting. Stop it after testing.

### Dependency-install caveat

The package manifest currently declares Yarn 1, while a pnpm lockfile is also present from local development. Choose and standardize one package manager before setting up fresh-install CI; do not casually regenerate dependencies using several managers. The local untracked `pnpm-workspace.yaml` contains placeholder build-approval values and is not part of this upload. A successful build against existing dependencies is not a verified clean install.

### Production build

```sh
DISABLE_ESLINT_PLUGIN=true node node_modules/@craco/craco/dist/bin/craco.js build
```

Output: `frontend/build/`. The build was checked successfully on 12 October 2026. ESLint was disabled to match the working local setup; this does not replace a lint/security audit. Development warnings about ESLint and deprecated Node APIs should be addressed separately.

## 9. Backend status — important

`backend/server.py` currently implements:

- `GET /api/`: basic greeting.
- `POST /api/status`: create a status record.
- `GET /api/status`: list up to 1,000 status records.

It requires `MONGO_URL` and `DB_NAME` in the backend environment. `CORS_ORIGINS` controls allowed origins. Credentials belong in environment files or hosting secrets, never in React source or GitHub.

There is no implemented admin login, gallery-upload API, public suggestions system, or moderation dashboard in this checkout. Installed authentication libraries and an auth test-ID file do not establish these features. The status endpoints have no authentication; do not expose them as an admin service. Review CORS and authentication before deploying a backend publicly. The frontend history/gallery/weather features do not require this basic backend to run.

## 10. Add photos safely

1. Put the real image file in `frontend/public/gallery/`.
2. Use a simple unique filename, such as `andarak-river-summer.jpg`.
3. Add an entry to `GALLERY` with `src: "/gallery/andarak-river-summer.jpg"`, an appropriate `span`, and English/Russian captions.
4. Match filename spelling, capitalization, and extension exactly. Renaming `.png` to `.jpg` does not convert image data.
5. Check gallery grid and individual viewing on desktop and phone.

Files under `public` are publicly accessible after deployment, even if not displayed on a page. Never put private documents there. Confirm permission to publish photos, particularly social-media images, and retain required credits.

## 11. GitHub and publishing

GitHub stores the source history. A push alone is not proof of a live deployment; hosting may have separate automation. This task does not configure hosting or domains.

A typical update workflow is to review `git status` and `git diff`, test, stage only intended source/assets, commit with a useful message, then push. Never force-push to resolve a disagreement without investigating. Do not commit `node_modules`, build output, `.env` files, passwords, tokens, or database backups.

For production hosting, configure the frontend build output and an SPA fallback to `index.html`, so direct visits to `/history` and `/gallery` work. The current build assumes the site is hosted at the domain root, not a GitHub Pages repository subpath.

## 12. Before public launch

- Check EN/RU text, mobile portrait/landscape, browser Back, all gallery images, weather errors, each chapter track, pause/volume, and sound stopping on close/navigation.
- Check keyboard focus, reduced motion, text contrast, and long-text scrolling.
- Confirm image/music permissions and required credits.
- Review historical claims separately. The presentation preserves the supplied wording; its local origin story and chronology are not fully fact-checked. In particular, slide 9 still associates the Kyrgyz SSR with 1924 rather than its 1936 establishment.
- Standardize the package manager, verify a clean install, and run a dependency/security review.
- Do not publish private data or assume an admin system exists.

## Verification for this update

The production bundle compiled successfully using the existing local dependencies. A scan for common secret patterns in frontend/backend files found no matches; this is a limited check, not a guarantee or a full security audit. Previous interactive checks covered presentation scroll-driven zoom, reading panels, phone layout, and initial YouTube playback. Full automated end-to-end coverage is not present.
