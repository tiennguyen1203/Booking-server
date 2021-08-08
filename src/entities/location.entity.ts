import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { CreateLocationDto } from '../dto/location/create-location.dto';
import { CustomBaseEntity } from './base.entity';
import { City } from './city.entity';
import { LocationType } from './location-type.entity';
import { Room } from './room.entity';
import { ServiceType } from './service-type.entity';

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

  @Column()
  @ApiProperty()
  cityId?: string;

  @Column()
  @ApiProperty()
  userId?: string;

  @Column()
  @ApiProperty()
  paypalMerchantId?: string;

  @ManyToOne(() => LocationType, { eager: true })
  @JoinColumn({
    name: 'locationTypeId',
    referencedColumnName: 'id',
  })
  locationType?: LocationType;

  @OneToMany(() => Room, (room) => room.location, { eager: true })
  rooms?: Room[];

  @ManyToOne(() => City, { eager: true })
  @JoinColumn({
    name: 'cityId',
    referencedColumnName: 'id',
  })
  city?: City;

  @ManyToMany(() => ServiceType)
  @JoinTable({
    name: 'location_service_type',
  })
  serviceTypes: ServiceType[];

  constructor(input?: CreateLocationDto) {
    super();
    for (const element in input) {
      this[element] = input[element];
    }
  }
}
