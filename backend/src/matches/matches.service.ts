import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RiotHttpService } from '../riot/riot-http.service.js';
import { MatchMapper } from './match.mapper.js';
import { MatchViewModel, RiotMatchDto } from './match.types.js';
import { CacheService } from '../cache/cache.service.js';

const MATCH_DETAIL_CONCURRENCY = 4;
const MATCH_PERSISTENT_CACHE_TTL_MS = 30_000;

@Injectable()
export class MatchesService {
  private readonly puuid: string;
  private readonly refreshes = new Map<string, Promise<MatchViewModel[]>>();

  constructor(
    private readonly riot: RiotHttpService,
    private readonly mapper: MatchMapper,
    private readonly cache: CacheService,
    config: ConfigService,
  ) {
    this.puuid = config.getOrThrow<string>('OWNER_PUUID');
  }

  async getRecent(count = 5, start = 0): Promise<MatchViewModel[]> {
    const cacheKey = `${start}:${count}`;
    const persistentKey = `matches:${cacheKey}`;
    const cached = await this.cache.read<MatchViewModel[]>(persistentKey);
    if (cached) {
      return cached;
    }

    const stale = await this.cache.readStale<MatchViewModel[]>(persistentKey);
    const refresh = this.refreshes.get(persistentKey) ?? this.refresh(count, start, persistentKey);

    if (stale) {
      void refresh.catch(() => undefined);
      return stale;
    }

    return refresh;
  }

  private refresh(
    count: number,
    start: number,
    cacheKey: string,
  ): Promise<MatchViewModel[]> {
    const value = this.fetchRecent(count, start)
      .then(async (matches) => {
        await this.cache.write(cacheKey, matches, MATCH_PERSISTENT_CACHE_TTL_MS);
        return matches;
      })
      .finally(() => {
        this.refreshes.delete(cacheKey);
      });

    this.refreshes.set(cacheKey, value);
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
