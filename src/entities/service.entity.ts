import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { CustomBaseEntity } from './base.entity';

@Entity({ name: 'service' })
export class Service extends CustomBaseEntity {
  @Column()
  @ApiProperty()
  name: string;

  @Column({ type: 'uuid' })
  @ApiProperty({ type: 'uuid' })
  serviceTypeId: string;

  @Column({ nullable: true, type: 'text' })
  @ApiProperty()
  description?: string;

  @Column({ nullable: true, type: 'text' })
  @ApiProperty()
  icon?: string;
}
