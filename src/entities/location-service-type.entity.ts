import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { CustomBaseEntity } from './base.entity';

@Entity({ name: 'location_service_type' })
export class LocationServiceType extends CustomBaseEntity {
  @Column()
  @ApiProperty()
  locationId: string;

  @Column()
  @ApiProperty()
  serviceTypeId: string;
}
