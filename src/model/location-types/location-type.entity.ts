import { Column, Entity } from 'typeorm';
import { CustomBaseEntity } from '../base.entity';

@Entity({ name: 'location_type' })
export class LocationType extends CustomBaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;
}
