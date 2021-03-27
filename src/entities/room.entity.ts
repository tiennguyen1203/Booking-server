import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne } from 'typeorm';
import { CustomBaseEntity } from './base.entity';
import { Location } from './location.entity';

@Entity({ name: 'room' })
export class Room extends CustomBaseEntity {
  @Column({ type: 'uuid' })
  @ApiProperty()
  locationId: string;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  price: string;

  @Column()
  @ApiProperty()
  capacity: string;

  @Column()
  @ApiProperty()
  description: string;

  @ManyToOne(() => Location)
  location?: Location;
}
