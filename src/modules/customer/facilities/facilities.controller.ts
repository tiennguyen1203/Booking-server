import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Facility } from './../../../entities/facility.entity';
import { FacilitiesService } from './facilities.service';

@Crud({
  model: {
    type: Facility,
  },
  routes: {
    only: ['getOneBase', 'getManyBase'],
  },
  query: {
    limit: 10,
    alwaysPaginate: true,
  },
})
@Controller('customer/facilities')
export class FacilitiesController implements CrudController<Facility> {
  constructor(public service: FacilitiesService) {}
}
