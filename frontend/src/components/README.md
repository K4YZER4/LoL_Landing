# Components guide (easy)

This folder has all React components split by purpose.

## Folder map

- `sections/` -> main page blocks
- `layout/` -> global page structure (navbar, footer, loading, API error)
- `ui/` -> small reusable pieces

API data is loaded in `src/api`, typed in `src/types`, and managed by
`src/hooks/useProfile.ts`.

## If you want to change something, open this file

- Hero (Riot ID, level, hero visuals)
  - `sections/HeroSection.tsx`

- Current Elo block (cards + match history)
  - `sections/CurrentEloSection.tsx`

- Match history card layout (one match row)
  - `ui/MatchHistoryCard.tsx`

- Roles and champions block
  - `sections/ArsenalSection.tsx`

- Single champion mini card
  - `ui/ChampionSlot.tsx`

- Social section (Connect + links)
  - `sections/SocialSection.tsx`

- Single social button
  - `ui/SocialLink.tsx`

- Social icons map (SVG per platform)
  - `ui/socialIconMap.tsx`

- Top navbar
  - `layout/Navbar.tsx`

- Footer + floating button
  - `layout/Footer.tsx`

- Initial loading screen
  - `layout/LoadingScreen.tsx`

- API connection error + retry
  - `layout/DataError.tsx`

## Super simple rules

1. Edit text/content in `.tsx` files.
2. Edit look/spacing/colors in `src/styles/...` CSS files.
3. API data is not hardcoded anymore. Change the request in `src/api/profile.ts`
   or the types in `src/types/profile.ts`.

## Fast examples

- "I want to change the API host"
  - Edit `frontend/.env` (copy it from `.env.example` if it does not exist).

- "I want to change the match history layout"
  - Edit `ui/MatchHistoryCard.tsx`.

- "I want Kaneki image bigger in Arsenal"
  - Edit class `.arsenalSectionKaneki` in `src/styles/components/ArsenalSection.css`.
