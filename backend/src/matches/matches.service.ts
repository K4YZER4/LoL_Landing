import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RiotHttpService } from '../riot/riot-http.service.js';
import { MatchMapper } from './match.mapper.js';
import { MatchViewModel, RiotMatchDto } from './match.types.js';

@Injectable()
export class MatchesService {
  private readonly puuid: string;

  constructor(
    private readonly riot: RiotHttpService,
    private readonly mapper: MatchMapper,
    config: ConfigService,
  ) {
    this.puuid = config.getOrThrow<string>('OWNER_PUUID');
  }

  async getRecent(count = 5, start = 0): Promise<MatchViewModel[]> {
    const matchIds = await this.riot.get<string[]>(
      `/lol/match/v5/matches/by-puuid/${this.puuid}/ids?start=${start}&count=${count}`,
      'region',
    );

    const matches = await Promise.all(
      matchIds.map((matchId) =>
        this.riot.get<RiotMatchDto>(
          `/lol/match/v5/matches/${matchId}`,
          'region',
        ),
      ),
    );

    return Promise.all(
      matches.map((match) => this.mapper.toViewModel(match, this.puuid)),
    );
  }
}
