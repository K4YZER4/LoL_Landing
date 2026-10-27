import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DdragonService } from '../ddragon/ddragon.service.js';
import { RiotHttpService } from '../riot/riot-http.service.js';
import { ChampionMasteryView, MasteryEntryDto } from './mastery.types.js';

@Injectable()
export class MasteryService {
  private readonly puuid: string;

  constructor(
    private readonly riot: RiotHttpService,
    private readonly ddragon: DdragonService,
    config: ConfigService,
  ) {
    this.puuid = config.getOrThrow<string>('OWNER_PUUID');
  }

  async getTop(count = 5): Promise<ChampionMasteryView[]> {
    const entries = await this.riot.get<MasteryEntryDto[]>(
      `/lol/champion-mastery/v4/champion-masteries/by-puuid/${this.puuid}/top?count=${count}`,
      'platform',
    );

    const champions = await this.ddragon.getChampionMap();

    return Promise.all(
      entries.map(async (entry): Promise<ChampionMasteryView> => {
        const champion = champions.get(entry.championId);

        return {
          championId: entry.championId,
          championName: champion?.name ?? `Champion ${entry.championId}`,
          championLevel: entry.championLevel,
          championPoints: entry.championPoints,
          lastPlayTime: entry.lastPlayTime,
          iconUrl: champion ? await this.ddragon.championIconUrl(champion.id) : '',
        };
      }),
    );
  }
}
