import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsPhoneNumber, IsString, IsUUID } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  fullName: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  address?: string;

  @IsUUID()
  @IsOptional()
  @ApiProperty({ required: false })
  city?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  avatar: string;

  @ApiProperty({ required: false })
  @IsPhoneNumber('VN')
  @IsOptional()
  phoneNumber?: string;
}
