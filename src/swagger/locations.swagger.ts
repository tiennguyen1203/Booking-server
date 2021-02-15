import { ApiProperty } from '@nestjs/swagger';
import { Location } from '../entities';
import { Pagination } from '../paginate';

export class getLocationsResponse extends Pagination<Location> {
  @ApiProperty({ type: [Location] })
  public results: Location[];
}
