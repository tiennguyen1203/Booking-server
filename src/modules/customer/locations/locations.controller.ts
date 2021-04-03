import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Location } from './../../../entities/location.entity';
import { CustomerLocationsService } from './locations.service';

@Crud({
  model: {
    type: Location,
  },
  routes: {
    only: ['getManyBase', 'getOneBase'],
  },
  query: {
    limit: 10,
    alwaysPaginate: true,
    join: {
      locationType: {
        allow: ['name', 'description'],
      },
      rooms: {},
    },
  },
  params: {
    id: { type: 'uuid', primary: true, field: 'id' },
  },
})
@Controller('customer/locations')
export class CustomerLocationsController implements CrudController<Location> {
  constructor(public service: CustomerLocationsService) {}
}
