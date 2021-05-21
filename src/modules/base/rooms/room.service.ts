import { Injectable, NotFoundException } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryDto } from '../../../dto';
import { Pagination } from '../../../paginate';
import { Room } from '../../../entities/room.entity';
import { BaseRoomRepository } from './room.repository';
import { StoreRoomDto } from '../../../dto/room/store-room.dto';
import { UpdateRoomDto } from '../../../dto/room/update-room.dto';

@Injectable()
export class BaseRoomsService extends TypeOrmCrudService<Room> {
  constructor(
    @InjectRepository(Room)
    private readonly baseRoomRepository: BaseRoomRepository,
  ) {
    super(baseRoomRepository);
  }

  async getRooms(locationId: string,queryDto: QueryDto): Promise<Pagination<Room>> {
    const [results, total] = await this.baseRoomRepository.getRooms(
      locationId,
      queryDto,
    );

    return new Pagination<Room>({
      results,
      total,
    });
  }
  async storeRooms(
    locationId: string,
    storeRoomDto: StoreRoomDto
  ): Promise<Room> {
    return this.baseRoomRepository.storeRoom(locationId, storeRoomDto);
  }
  
  async updateRoom(
    id: string,
    updateRoomDto: UpdateRoomDto
  ): Promise<Room> {
    let owner = await this.baseRoomRepository.getRoomById(id);
    if(!owner) {
      throw new NotFoundException('Room not found');
    }
    return this.baseRoomRepository.updateRoomById(id, updateRoomDto);
  }
}
