import { Column, Entity, BaseEntity } from 'typeorm';
import { CustomBaseEntity } from '../base.entity';
// import { BaseEntity } from '../base.entity';
import { CreateLocationDto } from './dto/create-location.dto';

@Entity({ name: 'location' })
export class Location extends CustomBaseEntity {
  @Column()
  name: string;

  @Column({ type: 'uuid' })
  locationTypeId: string;

  @Column()
  description: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column({ type: 'geometry' })
  geoLocation: any;

  @Column({ type: 'jsonb' })
  workingTime: any;

  @Column()
  contactPhoneNumber: string;

  @Column()
  contactEmail: string;

  @Column()
  score: number;

  @Column()
  price: string;

  @Column()
  thumbnail: string;

  @Column('varchar', { array: true })
  images: string[];

  @Column({ default: false })
  isFeatured: boolean;

  constructor(input?: CreateLocationDto) {
    super();
    for (const element in input) {
      this[element] = element;
    }
  }
}
