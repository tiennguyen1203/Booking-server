import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { CustomBaseEntity } from './base.entity';

@Entity({ name: 'city' })
export class City extends CustomBaseEntity {
  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  totalLocations: number;

  @Column()
  @ApiProperty()
  averagePrice: string;

  @Column({ nullable: true, type: 'text' })
  @ApiProperty()
  thumbnail?: string;

  @Column({ nullable: true, type: 'text' })
  @ApiProperty()
  description?: string;
}
