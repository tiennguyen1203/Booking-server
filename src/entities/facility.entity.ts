import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { CustomBaseEntity } from './base.entity';

@Entity({ name: 'facility' })
export class Facility extends CustomBaseEntity {
  @Column()
  @ApiProperty()
  name: string;

  @Column({ nullable: true, type: 'text' })
  @ApiProperty()
  icon?: string;

  @Column({ nullable: true, type: 'text' })
  @ApiProperty()
  description?: string;
}
