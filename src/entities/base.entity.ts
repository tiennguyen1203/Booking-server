import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
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

  @ApiProperty()
  @Column()
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => new Date(Date.now()).toISOString(),
  })
  createdAt?: Date | string;

  @ApiProperty()
  @Column()
  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => new Date(Date.now()).toISOString(),
  })
  updatedAt?: Date | string;

  @BeforeInsert()
  updateDateCreation() {
    this.createdAt = new Date(Date.now()).toISOString();
    this.updatedAt = new Date(Date.now()).toISOString();
  }

  @BeforeUpdate()
  updateDateUpdate() {
    this.updatedAt = new Date(Date.now()).toISOString();
  }
}
