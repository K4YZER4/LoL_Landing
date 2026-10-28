import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export type RiotHost = 'platform' | 'region';

@Injectable()
export class RiotHttpService {
  private static readonly MIN_REQUEST_INTERVAL_MS = 125;
  private static readonly MAX_RATE_LIMIT_RETRIES = 2;
  private readonly apiKey: string;
  private readonly platform: string;
  private readonly region: string;
  private readonly inFlight = new Map<string, Promise<unknown>>();
  private nextRequestAt = 0;
  private blockedUntil = 0;

  constructor(config: ConfigService) {
    this.apiKey = config.getOrThrow<string>('RIOT_API_KEY');
    this.platform = config.get<string>('RIOT_PLATFORM') ?? 'la1';
    this.region = config.get<string>('RIOT_REGION') ?? 'americas';
  }

  async get<T>(path: string, host: RiotHost = 'platform'): Promise<T> {
    const requestKey = `${host}:${path}`;
    const inFlightRequest = this.inFlight.get(requestKey);
    if (inFlightRequest) {
      return inFlightRequest as Promise<T>;
    }

    const base =
      host === 'platform'
        ? `https://${this.platform}.api.riotgames.com`
        : `https://${this.region}.api.riotgames.com`;

    const request = this.fetchWithRateLimit(`${base}${path}`).then(
      async (response) => {
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
      },
    );

    this.inFlight.set(requestKey, request);
    void request.finally(() => {
      if (this.inFlight.get(requestKey) === request) {
        this.inFlight.delete(requestKey);
      }
    }).catch(() => undefined);

    return request;
  }

  private async fetchWithRateLimit(url: string): Promise<Response> {
    for (let attempt = 0; ; attempt += 1) {
      await this.waitForRequestSlot();

      const response = await fetch(url, {
        headers: {
          'X-Riot-Token': this.apiKey,
          Accept: 'application/json',
        },
      });

      if (
        response.status !== 429 ||
        attempt >= RiotHttpService.MAX_RATE_LIMIT_RETRIES
      ) {
        return response;
      }

      const retryAfterSeconds = Number(response.headers.get('Retry-After'));
      const retryDelayMs = Number.isFinite(retryAfterSeconds)
        ? Math.max(1, retryAfterSeconds) * 1000
        : 1000;
      this.blockedUntil = Math.max(Date.now() + retryDelayMs, this.blockedUntil);
      await response.body?.cancel();
    }
  }

  private async waitForRequestSlot(): Promise<void> {
    const requestAt = Math.max(
      Date.now(),
      this.nextRequestAt,
      this.blockedUntil,
    );
    this.nextRequestAt = requestAt + RiotHttpService.MIN_REQUEST_INTERVAL_MS;
    const delayMs = requestAt - Date.now();

    if (delayMs > 0) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
}
