import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export type RiotHost = 'platform' | 'region';

@Injectable()
export class RiotHttpService {
  private readonly apiKey: string;
  private readonly platform: string;
  private readonly region: string;

  constructor(config: ConfigService) {
    this.apiKey = config.getOrThrow<string>('RIOT_API_KEY');
    this.platform = config.get<string>('RIOT_PLATFORM') ?? 'la1';
    this.region = config.get<string>('RIOT_REGION') ?? 'americas';
  }

  async get<T>(path: string, host: RiotHost = 'platform'): Promise<T> {
    const base =
      host === 'platform'
        ? `https://${this.platform}.api.riotgames.com`
        : `https://${this.region}.api.riotgames.com`;

    const response = await fetch(`${base}${path}`, {
      headers: {
        'X-Riot-Token': this.apiKey,
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      const body = await response.text();

      throw new HttpException(
        {
          statusCode: response.status,
          message: `Riot API respondió ${response.status}`,
          riotResponse: body,
        },
        response.status,
      );
    }

    return (await response.json()) as T;
  }
}
