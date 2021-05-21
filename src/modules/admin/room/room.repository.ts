import { EntityRepository } from 'typeorm';
import { BaseRoomRepository } from '../../../modules/base/rooms/room.repository';
import { Room } from '../../../entities';

@EntityRepository(Room)
export class RoomRepository extends BaseRoomRepository {}
