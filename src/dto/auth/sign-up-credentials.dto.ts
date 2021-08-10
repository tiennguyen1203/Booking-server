import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
  IsPhoneNumber,
} from 'class-validator';

export class SignUpCredentialsDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
  @MinLength(4)
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ required: false })
  @IsString()
  @MinLength(1)
  @IsOptional()
  fullName?: string;

  @ApiProperty({ required: false })
  @IsString()
  @MinLength(1)
  @IsOptional()
  address?: string;

  @ApiProperty({ required: false })
  @IsString()
  @MinLength(1)
  @IsOptional()
  city?: string;

  @ApiProperty({ required: false })
  @IsString()
  @MinLength(1)
  @IsOptional()
  avatar?: string;

  @IsPhoneNumber('VN')
  @IsOptional()
  @ApiProperty({ required: false })
  phoneNumber?: string;
}
