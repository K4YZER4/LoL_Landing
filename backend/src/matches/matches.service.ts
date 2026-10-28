import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RiotHttpService } from '../riot/riot-http.service.js';
import { MatchMapper } from './match.mapper.js';
import { MatchViewModel, RiotMatchDto } from './match.types.js';

const MATCH_DETAIL_CONCURRENCY = 4;
const MATCH_CACHE_TTL_MS = 135_000;

interface MatchCacheEntry {
  expiresAt: number;
  value: Promise<MatchViewModel[]>;
}

@Injectable()
export class MatchesService {
  private readonly puuid: string;
  private readonly cache = new Map<string, MatchCacheEntry>();

  constructor(
    private readonly riot: RiotHttpService,
    private readonly mapper: MatchMapper,
    config: ConfigService,
  ) {
    this.puuid = config.getOrThrow<string>('OWNER_PUUID');
  }

  async getRecent(count = 5, start = 0): Promise<MatchViewModel[]> {
    const cacheKey = `${start}:${count}`;
    const cached = this.cache.get(cacheKey);

    if (cached && cached.expiresAt > Date.now()) {
      return cached.value;
    }

    const value = this.fetchRecent(count, start);
    this.cache.set(cacheKey, {
      expiresAt: Date.now() + MATCH_CACHE_TTL_MS,
      value,
    });

    void value.catch(() => {
      if (this.cache.get(cacheKey)?.value === value) {
        this.cache.delete(cacheKey);
      }
    });

    return value;
  }

  private async fetchRecent(
    count: number,
    start: number,
  ): Promise<MatchViewModel[]> {
    const matchIds = await this.riot.get<string[]>(
      `/lol/match/v5/matches/by-puuid/${this.puuid}/ids?start=${start}&count=${count}`,
      'region',
    );

    const matches = await mapWithConcurrency(
      matchIds,
      MATCH_DETAIL_CONCURRENCY,
      (matchId) =>
        this.riot.get<RiotMatchDto>(
          `/lol/match/v5/matches/${matchId}`,
          'region',
        ),
    );

    return Promise.all(
      matches.map((match) => this.mapper.toViewModel(match, this.puuid)),
    );
  }
}

async function mapWithConcurrency<T, R>(
  values: T[],
  concurrency: number,
  mapper: (value: T) => Promise<R>,
): Promise<R[]> {
  const results: R[] = Array.from({ length: values.length });
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < values.length) {
      const index = nextIndex++;
      results[index] = await mapper(values[index]);
    }
  }

  const workerCount = Math.min(Math.max(1, concurrency), values.length);
  await Promise.all(Array.from({ length: workerCount }, () => worker()));

  return results;
}
