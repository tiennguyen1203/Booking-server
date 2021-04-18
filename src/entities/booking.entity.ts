import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { CustomBaseEntity } from './base.entity';

@Entity({ name: 'booking' })
export class Booking extends CustomBaseEntity {
  @Column()
  @ApiProperty()
  locationId: string;

  @Column()
  @ApiProperty()
  roomId: string;

  @Column()
  @ApiProperty()
  userId: string;

  @Column()
  @ApiProperty()
  startTime: string;

  @Column()
  @ApiProperty()
  endTime: string;
}
