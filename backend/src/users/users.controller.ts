import { Controller, Get, Patch, Body, Param, UseGuards, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  async getProfile(@CurrentUser() user: any) {
    return this.usersService.getProfile(user.id);
  }

  @Patch('me')
  async updateProfile(
    @CurrentUser() user: any,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateProfile(user.id, updateUserDto);
  }

  @Get(':id/profile')
  async getUserProfile(
    @Param('id', ParseIntPipe) userId: number,
    @CurrentUser() requester: any,
  ) {
    return this.usersService.getUserProfile(userId, requester.id);
  }

  @Get('level-info/:level')
  async getLevelUpInfo(@Param('level', ParseIntPipe) level: number) {
    return this.usersService.getLevelUpInfo(level);
  }
}
