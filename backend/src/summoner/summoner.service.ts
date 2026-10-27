import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RiotHttpService } from '../riot/riot-http.service.js';
import { SummonerDto } from './summoner.types.js';

@Injectable()
export class SummonerService {
  private readonly puuid: string;

  constructor(
    private readonly riot: RiotHttpService,
    config: ConfigService,
  ) {
    this.puuid = config.getOrThrow<string>('OWNER_PUUID');
  }

  getMe(): Promise<SummonerDto> {
    return this.riot.get<SummonerDto>(
      `/lol/summoner/v4/summoners/by-puuid/${this.puuid}`,
      'platform',
    );
  }
}
