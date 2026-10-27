import { Controller, Get } from '@nestjs/common';
import { SummonerService } from './summoner.service.js';
import { SummonerDto } from './summoner.types.js';

@Controller('summoner')
export class SummonerController {
  constructor(private readonly summonerService: SummonerService) {}

  @Get('me')
  getMe(): Promise<SummonerDto> {
    return this.summonerService.getMe();
  }
}
