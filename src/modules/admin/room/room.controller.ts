import {
    Body,
    Controller,
    ForbiddenException,
    Get,
    Param,
    Post,
    Put,
    Query,
    UseGuards,
    UsePipes,
    ValidationPipe,
  } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoomService } from './room.service';
import { QueryDto } from '../../../dto';
import { QueryParamsPipe } from '../../../pipes';
import { Room } from 'src/entities';
import { Pagination } from '../../../paginate';
import { AuthAdmin } from '../../../decorators/auth-admin.decorator';
import { AdminJwtBody } from '../auth/interfaces/index';
import { StoreRoomDto } from '../../../dto/room/store-room.dto';
import { UpdateRoomDto } from '../../../dto/room/update-room.dto';

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
        @Body() storeRoomDto: StoreRoomDto
    ): Promise<Room> {
        return this.roomService.storeRooms(locationId, storeRoomDto);
    }
    @Put(':id/update')
    updateRoom(
        @Param('id') roomId: string,
        @Body() updateRoomDto: UpdateRoomDto
    ): Promise<Room> {
        return this.roomService.updateRoom(roomId, updateRoomDto);
    }

}
