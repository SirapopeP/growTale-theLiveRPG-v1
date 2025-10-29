import { Module } from '@nestjs/common';
import { NotificationsGateway } from './notifications.gateway';
import { PrismaService } from '../prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [NotificationsGateway, PrismaService],
  imports: [JwtModule],
})
export class WebSocketModule {}
