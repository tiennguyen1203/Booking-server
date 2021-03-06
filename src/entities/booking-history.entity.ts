import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { CustomBaseEntity } from './base.entity';

@Entity({ name: 'booking_history' })
export class BookingHistory extends CustomBaseEntity {
  @Column()
  @ApiProperty()
  locationId: string;

  @Column()
  @ApiProperty()
  roomId: string;

  @Column()
  @ApiProperty()
  bookingId: string;

  @Column()
  @ApiProperty()
  accepterId: string;

  @Column()
  @ApiProperty()
  previousStatus: string;

  @Column()
  @ApiProperty()
  currentStatus: string;
}
