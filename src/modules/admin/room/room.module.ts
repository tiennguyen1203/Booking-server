import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { passportModule } from '../auth/auth.module';
import { RoomRepository } from './room.repository';
@Module({
  imports: [
    TypeOrmModule.forFeature([RoomRepository]),
    passportModule,
  ],
  controllers: [RoomController],
  providers: [RoomService]
})
export class RoomModule {}
