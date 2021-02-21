import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { CustomBaseEntity } from './base.entity';

@Entity({ name: 'location_type' })
export class LocationType extends CustomBaseEntity {
  @Column()
  @ApiProperty()
  name: string;

  @Column({ nullable: true, type: 'text' })
  @ApiProperty()
  description?: string;
}
