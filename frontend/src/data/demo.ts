import type {
  MatchViewModel,
  ProfileChampion,
  ProfileResponse,
  RoleStat,
} from "../types/profile";

// Snapshot de demostración usado solo cuando la API no responde.
// Mantiene la landing visible mientras Riot revisa el sitio o la key expira.
// No contiene credenciales: la API key vive únicamente en el backend.

const DDRAGON_VERSION = "15.1.1";
const DDRAGON_CDN = `https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}`;

const DEMO_CHAMPIONS = [
  { name: "Ahri", role: "MIDDLE" },
  { name: "Kaisa", role: "BOTTOM" },
  { name: "LeeSin", role: "JUNGLE" },
  { name: "Yone", role: "TOP" },
  { name: "Leona", role: "UTILITY" },
] as const;

const HOUR_MS = 3_600_000;
const BASE_TIME = Date.now();

function championIconUrl(name: string): string {
  return `${DDRAGON_CDN}/img/champion/${name}.png`;
}

export const DEMO_MATCHES: MatchViewModel[] = Array.from(
  { length: 20 },
  (_, index) => {
    const champion = DEMO_CHAMPIONS[index % DEMO_CHAMPIONS.length];

    return {
      matchId: `DEMO_${index + 1}`,
      queueId: index % 2 === 0 ? 420 : 440,
      queueName: index % 2 === 0 ? "Ranked Solo/Duo" : "Ranked Flex",
      playedAt: BASE_TIME - (index + 1) * 6 * HOUR_MS,
      durationSeconds: 1_500 + (index % 5) * 180,
      win: index % 3 !== 0,
      championName: champion.name,
      championIconUrl: championIconUrl(champion.name),
      role: champion.role,
      kills: 4 + (index % 7),
      deaths: 2 + (index % 4),
      assists: 5 + (index % 9),
      itemUrls: Array.from({ length: 7 }, () => null),
      spellUrls: [null, null],
    };
  },
);

function buildRoleStats(matches: MatchViewModel[]): RoleStat[] {
  const roles = new Map<string, { games: number; wins: number }>();

  for (const match of matches) {
    const current = roles.get(match.role) ?? { games: 0, wins: 0 };
    current.games += 1;
    if (match.win) current.wins += 1;
    roles.set(match.role, current);
  }

  return [...roles.entries()]
    .map(([role, { games, wins }]) => ({
      role,
      games,
      wins,
      winrate: Math.round((wins / games) * 100),
    }))
    .sort((first, second) => second.games - first.games);
}

function buildTopChampions(matches: MatchViewModel[]): ProfileChampion[] {
  const champions = new Map<string, ProfileChampion>();

  for (const match of matches) {
    const current = champions.get(match.championName) ?? {
      championId: 0,
      championName: match.championName,
      iconUrl: match.championIconUrl,
      championLevel: 7,
      championPoints: 120_000,
      games: 0,
      wins: 0,
      winrate: 0,
    };

    current.games += 1;
    if (match.win) current.wins += 1;
    current.winrate = Math.round((current.wins / current.games) * 100);
    champions.set(match.championName, current);
  }

  return [...champions.values()]
    .sort((first, second) => second.games - first.games)
    .slice(0, 5);
}

const demoRoleStats = buildRoleStats(DEMO_MATCHES);
const demoWins = DEMO_MATCHES.filter((match) => match.win).length;

export const DEMO_PROFILE: ProfileResponse = {
  perfil: {
    puuid: "demo-puuid",
    gameName: "N3ST",
    tagLine: "HTTP",
    level: 796,
    profileIconUrl: `${DDRAGON_CDN}/img/profileicon/6542.png`,
  },
  ranked: {
    soloDuo: {
      tier: "DIAMOND",
      rank: "III",
      lp: 94,
      wins: 243,
      losses: 225,
      winrate: 52,
    },
    flex: {
      tier: "MASTER",
      rank: "I",
      lp: 351,
      wins: 283,
      losses: 270,
      winrate: 51,
    },
  },
  stats: {
    efficiency: Math.round((demoWins / DEMO_MATCHES.length) * 100),
    primaryRole: demoRoleStats[0] ?? null,
    secondaryRole: demoRoleStats[1] ?? null,
    topChampions: buildTopChampions(DEMO_MATCHES),
  },
  matches: [],
};
