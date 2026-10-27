import { Controller, Get, Param } from '@nestjs/common';
import { AccountService } from './account.service.js';
import { AccountDto } from './account.types.js';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get('me')
  getMe(): Promise<AccountDto> {
    return this.accountService.getMe();
  }

  @Get('resolve/:gameName/:tagLine')
  resolve(
    @Param('gameName') gameName: string,
    @Param('tagLine') tagLine: string,
  ): Promise<AccountDto> {
    return this.accountService.resolveRiotId(gameName, tagLine);
  }
}
