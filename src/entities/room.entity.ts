import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { CustomBaseEntity } from './base.entity';

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
}
