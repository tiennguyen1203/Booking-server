import { Role } from '../constant';
import { Column, Entity, Unique } from 'typeorm';
import { CustomBaseEntity } from './base.entity';

@Entity({ name: 'users' })
@Unique(['email'])
export class User extends CustomBaseEntity {
  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  fullName: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  avatar: string;

  @Column()
  phoneNumber: string;

  @Column({ enum: Role })
  role: string;
}
