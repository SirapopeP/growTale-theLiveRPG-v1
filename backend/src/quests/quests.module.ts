import { Module } from '@nestjs/common';
import { QuestsController } from './quests.controller';
import { QuestsService } from './quests.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [QuestsController],
  providers: [QuestsService, PrismaService],
  exports: [QuestsService],
})
export class QuestsModule {}
