import { Controller, Get, Query } from '@nestjs/common';
import { MatchesService } from './matches.service.js';
import { MatchViewModel } from './match.types.js';

@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Get()
  getRecent(@Query('count') count?: string): Promise<MatchViewModel[]> {
    const parsed = Number(count ?? 5);
    const safeCount = Number.isFinite(parsed)
      ? Math.min(Math.max(Math.trunc(parsed), 1), 10)
      : 5;

    return this.matchesService.getRecent(safeCount);
  }
}
