import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class CustomBaseEntity extends BaseEntity {
  @Column({ type: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ type: 'uuid' })
  @PrimaryColumn()
  id: string;

  @Column()
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  createdAt?: Date;

  @Column()
  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  updatedAt?: Date;
}
