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
export class FamiliesController {
  constructor(private familiesService: FamiliesService) {}

  // Minimal current user shape used by this controller
  private getUserId(user: { id: number }): number {
    return user.id;
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
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

  @UseGuards(JwtAuthGuard)
  @Post('join')
  async joinFamily(
    @CurrentUser() user: { id: number },
    @Body() joinFamilyDto: JoinFamilyDto,
  ) {
    return this.familiesService.joinFamily(this.getUserId(user), joinFamilyDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-family')
  async getMyFamily(@CurrentUser() user: { id: number }) {
    return this.familiesService.getUserFamily(this.getUserId(user));
  }

  // Public search must be declared before param routes to avoid being captured by :id
  @Get('search')
  async searchFamilies(@Param('q') q: string) {
    return this.familiesService.searchFamilies(q || '');
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getFamily(
    @Param('id', ParseIntPipe) familyId: number,
    @CurrentUser() user: { id: number },
  ) {
    return this.familiesService.getFamily(familyId, this.getUserId(user));
  }

  @UseGuards(JwtAuthGuard)
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


  @Post('join-by-id')
  @UseGuards(JwtAuthGuard)
  async joinById(
    @CurrentUser() user: { id: number },
    @Body('familyId', ParseIntPipe) familyId: number,
  ) {
    return this.familiesService.joinById(this.getUserId(user), familyId);
  }
}
