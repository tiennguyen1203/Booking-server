import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { CustomBaseEntity } from './base.entity';

@Entity({ name: 'service_type' })
export class ServiceType extends CustomBaseEntity {
  @Column()
  @ApiProperty()
  name: string;

  @Column({ nullable: true, type: 'text' })
  @ApiProperty()
  description?: string;

  @Column({ nullable: true, type: 'text' })
  @ApiProperty()
  icon?: string;
}
