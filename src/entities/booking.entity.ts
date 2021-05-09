import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CustomBaseEntity } from './base.entity';
import { Location } from './location.entity';
import { Room } from './room.entity';

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

  @ManyToOne(() => Room, { eager: true })
  @JoinColumn()
  room: Room;

  @ManyToOne(() => Location, { eager: true })
  @JoinColumn()
  location: Location;
}
