import { Injectable } from '@nestjs/common';
import { BaseRoomsService } from '../../base/rooms/room.service';
import { RoomRepository } from './room.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoomService extends BaseRoomsService{
    constructor(
        @InjectRepository(RoomRepository)
        private readonly roomRepository: RoomRepository,
      ) {
        super(roomRepository);
      }
}
