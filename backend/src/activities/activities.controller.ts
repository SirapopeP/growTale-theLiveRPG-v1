import { Controller, Get, Param, Query, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('activities')
@UseGuards(JwtAuthGuard)
export class ActivitiesController {
  constructor(private activitiesService: ActivitiesService) {}

  @Get()
  async getActivities(
    @CurrentUser() user: any,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ) {
    return this.activitiesService.getActivities(user.id, limit, offset);
  }

  @Get('recent')
  async getRecentActivities(
    @CurrentUser() user: any,
    @Query('hours') hours?: number,
  ) {
    return this.activitiesService.getRecentActivities(user.id, hours);
  }

  @Get('stats')
  async getActivityStats(@CurrentUser() user: any) {
    return this.activitiesService.getActivityStats(user.id);
  }

  @Get('type/:type')
  async getActivitiesByType(
    @Param('type') type: string,
    @CurrentUser() user: any,
    @Query('limit') limit?: number,
  ) {
    return this.activitiesService.getActivitiesByType(user.id, type, limit);
  }

  @Get(':id')
  async getActivity(
    @Param('id', ParseIntPipe) activityId: number,
    @CurrentUser() user: any,
  ) {
    return this.activitiesService.getActivity(activityId, user.id);
  }
}
