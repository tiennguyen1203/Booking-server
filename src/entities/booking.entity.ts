import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { PAYMENT_STATUS } from '../constant';
import { CustomBaseEntity } from './base.entity';
import { Location } from './location.entity';
import { Room } from './room.entity';
import { User } from './user.entity';

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
  status: string;

  @Column()
  @ApiProperty()
  startTime: string;

  @Column()
  @ApiProperty()
  endTime: string;

  @Column()
  @ApiProperty()
  orderId: string;

  @Column()
  @ApiProperty()
  paymentStatus: PAYMENT_STATUS | string;

  @ManyToOne(() => Room, { eager: true })
  @JoinColumn()
  room?: Room;

  @ManyToOne(() => Location, { eager: true })
  @JoinColumn()
  location?: Location;

  @ManyToOne(() => User)
  @JoinColumn()
  user?: User;
}
