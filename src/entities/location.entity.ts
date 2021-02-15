import { Column, Entity } from 'typeorm';
import { CustomBaseEntity } from './base.entity';
import { CreateLocationDto } from '../dto/location/create-location.dto';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'location' })
export class Location extends CustomBaseEntity {
  @Column()
  @ApiProperty()
  name: string;

  @Column({ type: 'uuid' })
  @ApiProperty()
  locationTypeId: string;

  @Column()
  @ApiProperty()
  description: string;

  @Column()
  @ApiProperty()
  address: string;

  @Column()
  @ApiProperty()
  city: string;

  @Column({ type: 'geometry' })
  @ApiProperty()
  geoLocation: any;

  @Column({ type: 'jsonb' })
  @ApiProperty()
  workingTime: any;

  @Column()
  @ApiProperty()
  contactPhoneNumber: string;

  @Column()
  @ApiProperty()
  contactEmail: string;

  @Column()
  @ApiProperty()
  score: number;

  @Column()
  @ApiProperty()
  price: string;

  @Column()
  @ApiProperty()
  thumbnail: string;

  @Column('varchar', { array: true })
  @ApiProperty()
  images: string[];

  @Column({ default: false })
  @ApiProperty()
  isFeatured: boolean;

  constructor(input?: CreateLocationDto) {
    super();
    for (const element in input) {
      this[element] = element;
    }
  }
}
