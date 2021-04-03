import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Room } from '../../../entities/room.entity';
import { CustomerRoomsService } from './rooms.service';

@Crud({
  model: {
    type: Room,
  },
  routes: {
    only: ['getManyBase', 'getOneBase'],
  },
  query: {
    limit: 10,
    alwaysPaginate: true,
  },
  params: {
    id: { type: 'uuid', primary: true, field: 'id' },
  },
})
@Controller('customer/rooms')
export class CustomerRoomsController implements CrudController<Room> {
  constructor(public service: CustomerRoomsService) {}
}
