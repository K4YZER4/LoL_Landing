# CSS structure (simple guide)

This project uses a very simple CSS structure so it is easy to find things:

1. `base.css`
   - Global styles for the whole app
   - Body defaults, scrollbar, shared visual basics

2. `shared.css`
   - Styles reused by multiple sections
   - Shared section container/background behavior

3. `components/`
   - One CSS file per React component
   - Example: `HeroSection.css` styles only the hero section

## Quick map ("where do I edit?")

- Hero styles: `styles/components/HeroSection.css`
- Current Elo styles: `styles/components/CurrentEloSection.css`
- Match history card styles: `styles/components/HistoryMatchCard.css`
- Arsenal (roles/champs) styles: `styles/components/ArsenalSection.css`
- Social styles: `styles/components/SocialSection.css`
- Navbar styles: `styles/components/Navbar.css`
- Footer + floating button styles: `styles/components/Footer.css`
- Loading screen styles: `styles/components/LoadingScreen.css`

## Rule of thumb

- If the style affects the whole page, put it in `base.css`.
- If two or more sections share the same behavior, put it in `shared.css`.
- If it belongs to one component, put it in that component file inside `components/`.
