import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Role } from '../../../../constant';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;

  @IsString()
  @IsNotEmpty()
  fullName: string;
}
