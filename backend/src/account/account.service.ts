import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RiotHttpService } from '../riot/riot-http.service.js';
import { AccountDto } from './account.types.js';

@Injectable()
export class AccountService {
  private readonly puuid: string;

  constructor(
    private readonly riot: RiotHttpService,
    config: ConfigService,
  ) {
    this.puuid = config.getOrThrow<string>('OWNER_PUUID');
  }

  getMe(): Promise<AccountDto> {
    return this.riot.get<AccountDto>(
      `/riot/account/v1/accounts/by-puuid/${this.puuid}`,
      'region',
    );
  }

  resolveRiotId(gameName: string, tagLine: string): Promise<AccountDto> {
    const name = encodeURIComponent(gameName);
    const tag = encodeURIComponent(tagLine);

    return this.riot.get<AccountDto>(
      `/riot/account/v1/accounts/by-riot-id/${name}/${tag}`,
      'region',
    );
  }
}
