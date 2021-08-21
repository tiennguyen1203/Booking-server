import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Room } from 'src/entities';
import { AuthAdmin } from '../../../decorators/auth-admin.decorator';
import { QueryDto } from '../../../dto';
import { StoreRoomDto } from '../../../dto/room/store-room.dto';
import { UpdateRoomDto } from '../../../dto/room/update-room.dto';
import { Pagination } from '../../../paginate';
import { QueryParamsPipe } from '../../../pipes';
import { AdminJwtBody } from '../auth/interfaces/index';
import { RoomService } from './room.service';

@UseGuards(AuthGuard())
@Controller('admin/room')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Get()
  getRooms(
    @Query(QueryParamsPipe) queryDto: QueryDto,
    @AuthAdmin() { location: { id: locationId } }: AdminJwtBody,
  ): Promise<Pagination<Room>> {
    return this.roomService.getRooms(locationId, queryDto);
  }

  @Post('/create')
  storeRooms(
    @AuthAdmin() { location: { id: locationId } }: AdminJwtBody,
    @Body() storeRoomDto: StoreRoomDto,
  ): Promise<Room> {
    return this.roomService.storeRooms(locationId, storeRoomDto);
  }
  @Put(':id/update')
  updateRoom(
    @Param('id') roomId: string,
    @Body() updateRoomDto: UpdateRoomDto,
  ): Promise<Room> {
    return this.roomService.updateRoom(roomId, updateRoomDto);
  }

  @Get(':id/bookings')
  async getBookings(
    @Param('id') roomId: string,
    @Query(QueryParamsPipe) queryDto: QueryDto,
    @AuthAdmin() { location: { id: locationId } }: AdminJwtBody,
  ) {
    const room = await this.roomService.findOne(roomId);
    if (!room) {
      throw new NotFoundException('Room not found');
    }

    if (room.locationId !== locationId) {
      throw new ForbiddenException('Permission denied');
    }

    return this.roomService.getBookings(roomId, queryDto);
  }
}
