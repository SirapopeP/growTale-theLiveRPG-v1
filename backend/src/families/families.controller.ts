import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { FamiliesService } from './families.service';
import { CreateFamilyDto } from './dto/create-family.dto';
import { JoinFamilyDto } from './dto/join-family.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('families')
@UseGuards(JwtAuthGuard)
export class FamiliesController {
  constructor(private familiesService: FamiliesService) {}

  // Minimal current user shape used by this controller
  private getUserId(user: { id: number }): number {
    return user.id;
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles('Parent')
  async createFamily(
    @CurrentUser() user: { id: number },
    @Body() createFamilyDto: CreateFamilyDto,
  ) {
    return this.familiesService.createFamily(
      this.getUserId(user),
      createFamilyDto,
    );
  }

  @Post('join')
  async joinFamily(
    @CurrentUser() user: { id: number },
    @Body() joinFamilyDto: JoinFamilyDto,
  ) {
    return this.familiesService.joinFamily(this.getUserId(user), joinFamilyDto);
  }

  @Get('my-family')
  async getMyFamily(@CurrentUser() user: { id: number }) {
    return this.familiesService.getUserFamily(this.getUserId(user));
  }

  @Get(':id')
  async getFamily(
    @Param('id', ParseIntPipe) familyId: number,
    @CurrentUser() user: { id: number },
  ) {
    return this.familiesService.getFamily(familyId, this.getUserId(user));
  }

  @Get(':id/members')
  async getFamilyMembers(
    @Param('id', ParseIntPipe) familyId: number,
    @CurrentUser() user: { id: number },
  ) {
    return this.familiesService.getFamilyMembers(
      familyId,
      this.getUserId(user),
    );
  }
}
