import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerRoomRepository } from './room.repository';
import { CustomerRoomsController } from './rooms.controller';
import { CustomerRoomsService } from './rooms.service';

@Module({
  controllers: [CustomerRoomsController],
  providers: [CustomerRoomsService],
  imports: [TypeOrmModule.forFeature([CustomerRoomRepository])],
})
export class CustomerRoomsModule {}
