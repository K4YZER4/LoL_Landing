# Backend NestJS — LoL Landing

Backend de la landing personal de **N3ST#HTTP** (LAN / `la1`). Consume la API de Riot usando el `PUUID` guardado en variables de entorno, así el sitio sigue funcionando aunque cambie el nick.

Esta es la **Etapa 1**: solo consumo de Riot y manejo de datos. Todavía no hay cache, rate limiting, Helmet, filtros globales ni tests de producción.

## Requisitos

- Node.js 20+
- pnpm 11+
- Una **Development API Key** de Riot (expira cada 24 h)

## Configuración

```bash
cd backend
pnpm install
cp .env.example .env
```

> En PowerShell con la ExecutionPolicy restringida, usa `pnpm.cmd` en lugar de `pnpm`.

Rellena `.env`:

```env
RIOT_API_KEY=RGAPI-...
OWNER_PUUID=tu-puuid
RIOT_PLATFORM=la1
RIOT_REGION=americas
PORT=3001
```

> `.env` está en `.gitignore`. Nunca subas la API key al repositorio.

## Ejecutar

```bash
pnpm run start:dev   # desarrollo, con watch
pnpm run build       # compilar
pnpm run start:prod  # producción (node dist/main.js)
```

La API queda en `http://localhost:3001/api`.

## Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/health` | Estado del servicio |
| GET | `/api/account/me` | Riot ID actual (`gameName`, `tagLine`, `puuid`) |
| GET | `/api/account/resolve/:gameName/:tagLine` | Resolver Riot ID → PUUID |
| GET | `/api/summoner/me` | Nivel, icono y datos del invocador |
| GET | `/api/league/me` | Solo/Duo y Flex resumidos |
| GET | `/api/league/raw` | Entradas crudas de League |
| GET | `/api/mastery/top?count=5` | Top campeones por maestría |
| GET | `/api/matches?count=5&start=0` | Partidas mapeadas desde una posición |
| GET | `/api/profile?count=5` | **Todo unido** para el frontend |

En `/api/matches`, `count` está limitado entre 1 y 20 y `start` debe ser un índice mayor o igual a 0.
Esto permite cargar 20 partidas con `/api/matches?count=20&start=0` y dividirlas en 4 páginas desde el frontend.
El endpoint `/api/profile` acepta entre 0 y 10 partidas. Con `count=0` omite la carga de detalles de partidas.

### Ejemplo

```bash
curl http://localhost:3001/api/profile?count=5
```

```json
{
  "perfil": {
    "gameName": "N3ST",
    "tagLine": "HTTP",
    "level": 796,
    "profileIconUrl": "https://ddragon.../profileicon/6542.png"
  },
  "ranked": {
    "soloDuo": { "tier": "DIAMOND", "rank": "III", "lp": 94, "wins": 243, "losses": 225, "winrate": 52 },
    "flex": { "tier": "MASTER", "rank": "I", "lp": 351, "wins": 283, "losses": 270, "winrate": 51 }
  },
  "stats": {
    "efficiency": 0,
    "primaryRole": { "role": "TOP", "games": 2, "wins": 0, "winrate": 0 },
    "secondaryRole": { "role": "BOTTOM", "games": 1, "wins": 0, "winrate": 0 },
    "topChampions": []
  },
  "matches": []
}
```

## Arquitectura

```text
src/
├── main.ts                 # bootstrap, prefijo /api, CORS abierto
├── app.module.ts           # ConfigModule global + módulos
├── riot/                   # cliente HTTP único hacia Riot
├── ddragon/                # versión, campeones, hechizos, iconos
├── account/                # Riot ID actual y resolución Riot ID → PUUID
├── summoner/               # nivel e icono
├── league/                 # Solo/Duo y Flex
├── mastery/                # top campeones
├── matches/                # IDs + detalle + mapper
└── profile/                # agregador final
```

### Decisiones técnicas

- **PUUID fijo** en `OWNER_PUUID`: el nick puede cambiar sin romper la landing.
- **`summoner-v4` ya no devuelve `summonerId`**. Por eso League se consulta con `/lol/league/v4/entries/by-puuid/{puuid}`.
- **Account y Match** usan el host regional `americas`; Summoner, League y Mastery usan `la1`.
- **Data Dragon** se usa solo para construir URLs (campeón, item, hechizo, icono de perfil). La versión y los mapas estáticos se cargan una vez en memoria.
- **Las partidas se piden en paralelo** con `Promise.all` (máximo 10). En la Etapa 2 se agrega cache y límite de concurrencia.

## Etapa 2 (pendiente)

- Cache en memoria con TTL y single-flight.
- `Cache-Control` para Cloudflare.
- Rate limiting, Helmet, CORS cerrado, validación y filtro global de errores.
- Docker y despliegue.
