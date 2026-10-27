import { Controller, Get, Query } from '@nestjs/common';
import { MasteryService } from './mastery.service.js';
import { ChampionMasteryView } from './mastery.types.js';

@Controller('mastery')
export class MasteryController {
  constructor(private readonly masteryService: MasteryService) {}

  @Get('top')
  getTop(@Query('count') count?: string): Promise<ChampionMasteryView[]> {
    const parsed = Number(count ?? 5);
    const safeCount = Number.isFinite(parsed)
      ? Math.min(Math.max(Math.trunc(parsed), 1), 10)
      : 5;

    return this.masteryService.getTop(safeCount);
  }
}
