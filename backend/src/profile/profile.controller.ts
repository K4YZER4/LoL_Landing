import { Controller, Get, Query } from '@nestjs/common';
import { ProfileService } from './profile.service.js';
import { ProfileResponse } from './profile.types.js';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  getProfile(@Query('count') count?: string): Promise<ProfileResponse> {
    const parsed = Number(count ?? 5);
    const safeCount = Number.isFinite(parsed)
      ? Math.min(Math.max(Math.trunc(parsed), 0), 10)
      : 5;

    return this.profileService.getProfile(safeCount);
  }
}
