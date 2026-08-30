# Andarak — Village Portal & A History in Fire

## Original problem statement
Rebuild and upgrade a single-file HTML scrollytelling piece ("Andarak — A History in Fire": 10 chapters, 2,500 years of history of a Tajik-Persian village in the Fergana valley) into the React app, with AI-generated historic artwork per chapter, per-scene ambient audio with smooth crossfade, and an EN/RU language toggle. Quality bar: award-worthy motion design.

**EXPANDED (2026-08-29)**: Grow the site into a full VILLAGE PORTAL per user's detailed 22-section plan (home, culture, people & sport, diaspora, news, gallery, directories: medicine/business/schools/tourists/transport/administration, students, calendar, contact/support, about, safety, suggestions/discussion, interactive map, audio voices). History presentation stays UNCHANGED as its own section. Pilot version: no real names/contacts — neutral placeholders ("контакты уточняются"). Languages RU (default) / EN now, Tajik later. Slow rural internet: light pages, lazy images.

## User-approved phased plan
- Phase 1 Step 1 (DONE 2026-08-29): Home + navigation + routing + History as section + Culture + Gallery + About + ComingSoon + emergency button
- Phase 1 Step 2 (NEXT): People & Sport + Diaspora + News + Events Calendar + Suggestions/Discussion (comments, no pre-moderation) — needs BACKEND (FastAPI+Mongo) and simple password admin (/admin) for news & events (user confirmed: "yes, if i want to log in and add the story")
- Phase 1 Step 3: Medicine, Business, Schools, Tourists, Transport, Administration, Students, Safety, Contact/Support (donation goals with progress bar, "реквизиты уточняются", NO real payments) + site-wide search
- Phase 2 (later, one at a time): Interactive map (Mapbox/Leaflet), scrollytelling upgrades, audio "voices of community", dynamic weather background on home, Tajik language
- Jobs/vacancies section: intentionally HIDDEN/empty in phase 1 (user's instruction)

## Architecture
- React SPA, react-router 7. Backend currently default FastAPI health endpoint (will be used in Step 2 for news/comments/admin)
- PORTAL (light mountain theme): `/` home, `/culture`, `/gallery`, `/about`, `/soon`, wrapped in PortalLayout (Header + Footer + EmergencyButton)
  - Design per /app/design_guidelines.json: bg #F8F7F3, ink #1A2433, slate #4A6278, terracotta #C25934, gold #D4AF37, fonts Cormorant Garamond + Manrope + JetBrains Mono, kilim SVG ornaments
  - `/app/frontend/src/data/portal.js` — ALL portal strings RU/EN (NAV, T, HOME_TEASERS, HOME_SOON, CULTURE_TOPICS ×9, CULTURE_PAGE, GALLERY_PAGE, ABOUT_PAGE)
  - `/app/frontend/src/components/portal/` — Header (glass sticky, dropdowns, mobile menu via createPortal — NOTE: backdrop-filter on header creates containing block for fixed descendants, menu MUST stay portaled to body), Footer (+EmergencyButton 101/102/103/112), Kilim (SVG ornaments)
  - `/app/frontend/src/pages/` — HomePage (parallax hero /gallery/valley-green.png, slogan "Земля, где встречаются эпохи", teasers), CulturePage (9-card bento + modal), GalleryPage (masonry + lightbox prev/next/Esc), AboutPage (4 blocks + pilot note), ComingSoonPage
  - Portal lang: RU default, persisted localStorage 'andarak-lang'
- HISTORY (dark fire theme, UNCHANGED content): `/history` → `/app/frontend/src/pages/HistoryPage.jsx` (former App.js). Own Lenis, chrome controls, audio engine, village gallery, + "exit to portal" link (data-testid='exit-to-portal'). DO NOT regenerate its art/music.
  - `/app/frontend/src/data/chapters.js` — 10 chapters EN/RU, GALLERY (5 real photos), YT_TRACKS (all 10 blocked by YouTube — embed error 150 AND server download 403; only user-uploaded MP3s can replace; `audio` field per chapter ready)
  - hooks: useAmbience (procedural), useTrack (direct audio crossfade), useYouTubeScore (blocked-video failover)
- Real photos: /app/frontend/public/gallery/ (valley-green, mosque-winter, memorial-arch, village-street.webp, winter-street); AI art: /public/art/
- Full code doc for user: /app/frontend/public/ANDARAK_FULL_CODE.txt (served at site root URL)

## Implemented
- 2026-08-25: full scrollytelling history (hero, marquee, 10 chapters, flame chrome, 3-tier audio, EN/RU), AI art 1–8, real photos ch9/10, video loops ch1/4/5
- 2026-08-25: village gallery section in history page (5 author photos)
- 2026-08-29: PORTAL Step 1 — routing, light theme, Home/Culture/Gallery/About/Soon pages, grouped nav + mobile menu (portaled), footer, emergency modal, lang persistence. Tested by testing agent: 43/44 → mobile menu clipping fixed (createPortal) + chevron layout fixed, verified 390px viewport.
- 2026-08-30: Visual edits per user: removed flame logo + header subtitle, removed hero eyebrow, new hero text ("Таджикское село в Кыргызстане… тысячи лет"), hero photo → /gallery/memorial-arch.png (user will send a better photo), home teasers reduced to Gallery + About only (removed section heading, History/Culture teasers, soon-cards), removed footer RU/EN duplicate toggle.

## Backlog / remaining
- P0: Step 2 — People & Sport, Diaspora, News (admin-published), Calendar, Suggestions/comments + FastAPI/Mongo backend + /admin password login
- P1: Step 3 — directories + donations placeholder + search
- P1: User to upload MP3 files for history chapters (YouTube fully blocked)
- P2: Phase 2 items (map, voices, weather bg, TJ language)
