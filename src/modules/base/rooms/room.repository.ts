import { EntityRepository, Repository } from 'typeorm';
import { Room } from '../../../entities/room.entity';
import { QueryDto } from '../../../dto';
import { StoreRoomDto } from '../../../dto/room/store-room.dto';
import { UpdateRoomDto } from '../../../dto/room/update-room.dto';

@EntityRepository(Room)
export class BaseRoomRepository extends Repository<Room> {
    async getRooms(locationId: string, queryDto: QueryDto): Promise<[Room[], number]> {
        const { take, skip } = queryDto;
        return this.findAndCount({ 
            where: { locationId: locationId },
            take,
            skip 
        });
    }

    async storeRoom(
        locationId: string,
        storeRoomDto: StoreRoomDto
    ): Promise<Room> {
        const room = new Room();
        room.locationId = locationId;
        room.name = storeRoomDto.name;
        room.price = storeRoomDto.price;
        room.capacity = storeRoomDto.capacity;
        room.description = storeRoomDto.description;
        room.save();
        return room;
    }

    async getRoomById(
        id: string
    ): Promise<Room> {
        return await this.findOne({where: { id: id }})
    }

    async updateRoomById(
        roomId: string,
        updateRoomDto: UpdateRoomDto
    ): Promise<Room> {
        let room = await this.getRoomById(roomId);
        room.name = updateRoomDto.name;
        room.price = updateRoomDto.price;
        room.description = updateRoomDto.description;
        room.capacity = updateRoomDto.capacity;
        room.save();
        return room;
    }
}
