import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { FamiliesModule } from './families/families.module';
import { QuestsModule } from './quests/quests.module';
import { RewardsModule } from './rewards/rewards.module';
import { ActivitiesModule } from './activities/activities.module';
import { WebSocketModule } from './websocket/websocket.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    FamiliesModule,
    QuestsModule,
    RewardsModule,
    ActivitiesModule,
    WebSocketModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
