import { EntityRepository } from 'typeorm';
import { Room } from './../../../entities/room.entity';
import { BaseRoomRepository } from '../../base/rooms/room.repository';

@EntityRepository(Room)
export class CustomerRoomRepository extends BaseRoomRepository {}
