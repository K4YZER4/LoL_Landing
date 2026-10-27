import { Controller, Get } from '@nestjs/common';
import { LeagueService } from './league.service.js';
import { LeagueEntryDto, RankedSummary } from './league.types.js';

@Controller('league')
export class LeagueController {
  constructor(private readonly leagueService: LeagueService) {}

  @Get('me')
  getMe(): Promise<RankedSummary> {
    return this.leagueService.getRanked();
  }

  @Get('raw')
  getRaw(): Promise<LeagueEntryDto[]> {
    return this.leagueService.getEntries();
  }
}
