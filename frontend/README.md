# Frontend — LoL Landing

React + Vite frontend for the personal League of Legends landing. All dynamic
data comes from the NestJS API in `../backend`.

The main request is:

```text
GET /api/profile?count=5
```

## 1. Configure the API URL

```bash
cd frontend
cp .env.example .env
```

`.env`:

```env
VITE_API_BASE_URL=http://localhost:3001/api
```

`VITE_API_BASE_URL` must include the `/api` prefix. For production, point it to
the deployed API URL.

## 2. Run locally

Terminal 1 — backend:

```bash
cd backend
pnpm start:dev
```

Terminal 2 — frontend:

```bash
cd frontend
npm install
npm run dev
```

- Frontend: `http://localhost:5173`
- API: `http://localhost:3001/api`

The frontend uses the `package-lock.json` already present in this folder, so the
commands above use `npm`.

## Data flow

- `src/api/client.ts` reads `VITE_API_BASE_URL` and centralizes fetch/error handling.
- `src/api/profile.ts` requests the aggregated profile.
- `src/hooks/useProfile.ts` manages loading, errors and retry.
- `src/App.tsx` passes the profile to the hero, elo, history and champion sections.
- `src/types/profile.ts` mirrors the backend response contract.

If the API is not running, the page shows a connection error with a retry button.
