import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Room } from '../../../entities/room.entity';
import { CustomerRoomRepository } from './room.repository';

@Injectable()
export class CustomerRoomsService extends TypeOrmCrudService<Room> {
  constructor(private readonly customerRoomRepository: CustomerRoomRepository) {
    super(customerRoomRepository);
  }
}
