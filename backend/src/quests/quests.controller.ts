import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, ParseIntPipe } from '@nestjs/common';
import { QuestsService } from './quests.service';
import { CreateQuestDto } from './dto/create-quest.dto';
import { SubmitQuestDto } from './dto/submit-quest.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('quests')
@UseGuards(JwtAuthGuard)
export class QuestsController {
  constructor(private questsService: QuestsService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles('Parent')
  async createQuest(
    @CurrentUser() user: any,
    @Body() createQuestDto: CreateQuestDto,
  ) {
    return this.questsService.createQuest(user.id, createQuestDto);
  }

  @Get()
  async getQuests(
    @CurrentUser() user: any,
    @Query('status') status?: string,
    @Query('assignedTo') assignedTo?: number,
  ) {
    return this.questsService.getQuests(user.id, status, assignedTo);
  }

  @Get(':id')
  async getQuest(
    @Param('id', ParseIntPipe) questId: number,
    @CurrentUser() user: any,
  ) {
    return this.questsService.getQuest(questId, user.id);
  }

  @Patch(':id/start')
  async startQuest(
    @Param('id', ParseIntPipe) questId: number,
    @CurrentUser() user: any,
  ) {
    return this.questsService.startQuest(questId, user.id);
  }

  @Patch(':id/submit')
  async submitQuest(
    @Param('id', ParseIntPipe) questId: number,
    @CurrentUser() user: any,
    @Body() submitQuestDto: SubmitQuestDto,
  ) {
    return this.questsService.submitQuest(questId, user.id, submitQuestDto);
  }

  @Patch(':id/verify')
  @UseGuards(RolesGuard)
  @Roles('Parent')
  async verifyQuest(
    @Param('id', ParseIntPipe) questId: number,
    @CurrentUser() user: any,
    @Body('approved') approved: boolean,
  ) {
    return this.questsService.verifyQuest(questId, user.id, approved);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('Parent')
  async deleteQuest(
    @Param('id', ParseIntPipe) questId: number,
    @CurrentUser() user: any,
  ) {
    return this.questsService.deleteQuest(questId, user.id);
  }
}
