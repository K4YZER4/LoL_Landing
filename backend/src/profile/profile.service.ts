import { Injectable } from '@nestjs/common';
import { AccountService } from '../account/account.service.js';
import { DdragonService } from '../ddragon/ddragon.service.js';
import { LeagueService } from '../league/league.service.js';
import { MasteryService } from '../mastery/mastery.service.js';
import { MatchViewModel } from '../matches/match.types.js';
import { MatchesService } from '../matches/matches.service.js';
import { SummonerService } from '../summoner/summoner.service.js';
import { ProfileChampion, ProfileResponse, RoleStat } from './profile.types.js';

@Injectable()
export class ProfileService {
  constructor(
    private readonly account: AccountService,
    private readonly summoner: SummonerService,
    private readonly league: LeagueService,
    private readonly mastery: MasteryService,
    private readonly matches: MatchesService,
    private readonly ddragon: DdragonService,
  ) {}

  async getProfile(count = 5): Promise<ProfileResponse> {
    const [account, summoner, ranked, mastery, matches] = await Promise.all([
      this.account.getMe(),
      this.summoner.getMe(),
      this.league.getRanked(),
      this.mastery.getTop(5),
      this.matches.getRecent(count),
    ]);

    const profileIconUrl = await this.ddragon.profileIconUrl(
      summoner.profileIconId,
    );

    const roleStats = buildRoleStats(matches);
    const totalWins = matches.filter((match) => match.win).length;

    const topChampions = mastery.map((champion): ProfileChampion => {
      const recentGames = matches.filter(
        (match) => match.championName === champion.championName,
      );
      const wins = recentGames.filter((match) => match.win).length;

      return {
        championId: champion.championId,
        championName: champion.championName,
        iconUrl: champion.iconUrl,
        championLevel: champion.championLevel,
        championPoints: champion.championPoints,
        games: recentGames.length,
        wins,
        winrate:
          recentGames.length > 0
            ? Math.round((wins / recentGames.length) * 100)
            : 0,
      };
    });

    return {
      perfil: {
        puuid: account.puuid,
        gameName: account.gameName,
        tagLine: account.tagLine,
        level: summoner.summonerLevel,
        profileIconUrl,
      },
      ranked,
      stats: {
        efficiency:
          matches.length > 0
            ? Math.round((totalWins / matches.length) * 100)
            : 0,
        primaryRole: roleStats[0] ?? null,
        secondaryRole: roleStats[1] ?? null,
        topChampions,
      },
      matches,
    };
  }
}

function buildRoleStats(matches: MatchViewModel[]): RoleStat[] {
  const roles = new Map<string, { games: number; wins: number }>();

  for (const match of matches) {
    const role = match.role || 'UNKNOWN';
    const current = roles.get(role) ?? { games: 0, wins: 0 };

    current.games += 1;
    if (match.win) {
      current.wins += 1;
    }

    roles.set(role, current);
  }

  return [...roles.entries()]
    .map(([role, { games, wins }]) => ({
      role,
      games,
      wins,
      winrate: Math.round((wins / games) * 100),
    }))
    .sort((a, b) => b.games - a.games);
}
