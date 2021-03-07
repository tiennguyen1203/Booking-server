import { Controller, ForbiddenException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudAuth, CrudController } from '@nestjsx/crud';
import { Location } from '../../../entities';
import { Role } from './../../../constant/index';
import { CreateLocationDto } from './../../../dto/location/create-location.dto';
import { JwtBody } from './../../customer/auth/auth.service';
import { SuperAdminLocationsService } from './locations.service';

@Crud({
  model: {
    type: Location,
  },
  routes: {
    only: ['createOneBase'],
  },
  dto: {
    create: CreateLocationDto,
  },
})
@Controller('super-admin/locations')
@UseGuards(AuthGuard())
@CrudAuth({
  property: 'user',
  filter: (user: JwtBody) => {
    if (user.role !== Role.SUPER_ADMIN) {
      throw new ForbiddenException('Only allow super-admin role');
    }
  },
})
export class SuperAdminLocationsController implements CrudController<Location> {
  constructor(public service: SuperAdminLocationsService) {}

  // @Post()
  // @ApiCreatedResponse({ type: Location })
  // createLocation(
  //   @Body(ValidationPipe) createLocationDto: CreateLocationDto,
  // ): Promise<Location> {
  //   return this.superAdminLocationsService.createLocation(createLocationDto);
  // }

  // get base(): CrudController<Location> {
  //   return this;
  // }
  // @Override()
  // createOne(
  //   // @AuthSuperAdmin() user: JwtBody,
  //   @Body() createLocationDto: any,
  //   @ParsedRequest()
  //   req: CrudRequest,
  // ) {
  //   console.log('123123123cccccc', req);
  //   return this.base.createOneBase(req, createLocationDto);
  // }
}
