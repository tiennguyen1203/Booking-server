import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsOptional } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CreateLocationDto } from '../dto/location/create-location.dto';
import { CustomBaseEntity } from './base.entity';
import { LocationType } from './location-type.entity';

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
  description?: string;

  @Column()
  @ApiProperty({ required: false })
  @IsOptional()
  address?: string;

  @Column()
  @ApiProperty()
  city?: string;

  @Column({ type: 'geometry' })
  @ApiProperty()
  geoLocation?: any;

  @Column({ type: 'jsonb' })
  @ApiProperty()
  workingTime?: any;

  @Column()
  @ApiProperty()
  contactPhoneNumber?: string;

  @Column()
  @ApiProperty()
  contactEmail?: string;

  @Column()
  @ApiProperty()
  score?: number;

  @Column()
  @ApiProperty()
  price?: string;

  @Column()
  @ApiProperty()
  thumbnail?: string;

  @Column('varchar', { array: true })
  @ApiProperty()
  images?: string[];

  @Column({ default: false })
  @ApiProperty()
  isFeatured?: boolean;

  @Column({ nullable: true, type: 'jsonb' })
  @ApiProperty()
  coordinates?: { longitude: string | number; latitude: string | number };

  @ManyToOne(() => LocationType)
  @JoinColumn({
    name: 'locationTypeId',
    referencedColumnName: 'id',
  })
  locationType?: LocationType[];

  constructor(input?: CreateLocationDto) {
    super();
    for (const element in input) {
      this[element] = input[element];
    }
  }
}
