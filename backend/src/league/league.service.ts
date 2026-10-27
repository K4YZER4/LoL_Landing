import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RiotHttpService } from '../riot/riot-http.service.js';
import { LeagueEntryDto, RankedQueue, RankedSummary } from './league.types.js';

const SOLO_DUO_QUEUE = 'RANKED_SOLO_5x5';
const FLEX_QUEUE = 'RANKED_FLEX_SR';

@Injectable()
export class LeagueService {
  private readonly puuid: string;

  constructor(
    private readonly riot: RiotHttpService,
    config: ConfigService,
  ) {
    this.puuid = config.getOrThrow<string>('OWNER_PUUID');
  }

  getEntries(): Promise<LeagueEntryDto[]> {
    return this.riot.get<LeagueEntryDto[]>(
      `/lol/league/v4/entries/by-puuid/${this.puuid}`,
      'platform',
    );
  }

  async getRanked(): Promise<RankedSummary> {
    const entries = await this.getEntries();

    return {
      soloDuo: toRankedQueue(entries.find((entry) => entry.queueType === SOLO_DUO_QUEUE)),
      flex: toRankedQueue(entries.find((entry) => entry.queueType === FLEX_QUEUE)),
    };
  }
}

function toRankedQueue(entry?: LeagueEntryDto): RankedQueue | null {
  if (!entry) {
    return null;
  }

  const totalGames = entry.wins + entry.losses;

  return {
    tier: entry.tier,
    rank: entry.rank,
    lp: entry.leaguePoints,
    wins: entry.wins,
    losses: entry.losses,
    winrate: totalGames > 0 ? Math.round((entry.wins / totalGames) * 100) : 0,
  };
}
