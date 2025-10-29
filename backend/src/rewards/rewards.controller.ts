import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, ParseIntPipe } from '@nestjs/common';
import { RewardsService } from './rewards.service';
import { CreateRewardDto } from './dto/create-reward.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('rewards')
@UseGuards(JwtAuthGuard)
export class RewardsController {
  constructor(private rewardsService: RewardsService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles('Parent')
  async createReward(
    @CurrentUser() user: any,
    @Body() createRewardDto: CreateRewardDto,
  ) {
    return this.rewardsService.createReward(user.id, createRewardDto);
  }

  @Get()
  async getRewards(@CurrentUser() user: any) {
    return this.rewardsService.getRewards(user.id);
  }

  @Get('redeem-requests')
  @UseGuards(RolesGuard)
  @Roles('Parent')
  async getRedeemRequests(@CurrentUser() user: any) {
    return this.rewardsService.getRedeemRequests(user.id);
  }

  @Get(':id')
  async getReward(
    @Param('id', ParseIntPipe) rewardId: number,
    @CurrentUser() user: any,
  ) {
    return this.rewardsService.getReward(rewardId, user.id);
  }

  @Post(':id/redeem')
  async redeemReward(
    @Param('id', ParseIntPipe) rewardId: number,
    @CurrentUser() user: any,
  ) {
    return this.rewardsService.redeemReward(rewardId, user.id);
  }

  @Patch(':redeemId/approve')
  @UseGuards(RolesGuard)
  @Roles('Parent')
  async approveRedeem(
    @Param('redeemId', ParseIntPipe) redeemId: number,
    @CurrentUser() user: any,
    @Body('approved') approved: boolean,
  ) {
    return this.rewardsService.approveRedeem(redeemId, user.id, approved);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('Parent')
  async updateReward(
    @Param('id', ParseIntPipe) rewardId: number,
    @CurrentUser() user: any,
    @Body() updateData: Partial<CreateRewardDto>,
  ) {
    return this.rewardsService.updateReward(rewardId, user.id, updateData);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('Parent')
  async deleteReward(
    @Param('id', ParseIntPipe) rewardId: number,
    @CurrentUser() user: any,
  ) {
    return this.rewardsService.deleteReward(rewardId, user.id);
  }
}
