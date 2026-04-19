# Components guide (easy)

This folder has all React components split by purpose.

## Folder map

- `sections/` -> main page blocks
- `layout/` -> global page structure (navbar, footer, loading)
- `ui/` -> small reusable pieces
- `data/` -> static data used by components

## If you want to change something, open this file

- Hero (title, level, hero visuals)
  - `sections/HeroSection.jsx`

- Current Elo block (cards + history title)
  - `sections/CurrentEloSection.jsx`

- Match history card layout (one match row)
  - `ui/MatchHistoryCard.jsx`

- Match history data (texts, LP, win/lose, etc.)
  - `data/historyMatches.js`

- Roles and Champions block
  - `sections/ArsenalSection.jsx`

- Single champion mini card
  - `ui/ChampionSlot.jsx`

- Social section (Connect + links)
  - `sections/SocialSection.jsx`

- Single social button
  - `ui/SocialLink.jsx`

- Social icons map (SVG per platform)
  - `ui/socialIconMap.jsx`

- Top navbar
  - `layout/Navbar.jsx`

- Footer + floating button
  - `layout/Footer.jsx`

- Initial loading screen
  - `layout/LoadingScreen.jsx`

## Super simple rules

1. Edit text/content in `.jsx` files.
2. Edit look/spacing/colors in `src/styles/...` CSS files.
3. If data repeats (like matches), change it in `data/`.

## Fast examples

- "I want to change 'Connect' text"
  - Edit `sections/SocialSection.jsx`

- "I want to change match 1 LP"
  - Edit `data/historyMatches.js`

- "I want Kaneki image bigger in Arsenal"
  - Edit class `.arsenalSectionKaneki` in `src/styles/components/ArsenalSection.css`
