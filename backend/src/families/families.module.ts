import { Module } from '@nestjs/common';
import { FamiliesController } from './families.controller';
import { FamiliesService } from './families.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [FamiliesController],
  providers: [FamiliesService, PrismaService],
  exports: [FamiliesService],
})
export class FamiliesModule {}
