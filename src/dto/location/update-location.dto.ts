import {
  IsUUID,
  IsString,
  IsOptional,
  IsObject,
  IsPhoneNumber,
  IsEmail,
  IsArray,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class UpdateLocationDto {
  @ApiProperty({ required: false })
  @IsUUID()
  @IsOptional()
  locationTypeId: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  address?: string;

  @IsUUID()
  @IsOptional()
  @ApiProperty({ required: false })
  cityId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  workingTime?: any;

  @ApiProperty({ required: false })
  @IsPhoneNumber('VN')
  @IsOptional()
  contactPhoneNumber?: string;

  @ApiProperty({ required: false })
  @IsEmail()
  @IsOptional()
  contactEmail?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  price?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  thumbnail?: string;

  @ApiProperty({ required: false })
  @IsArray()
  @IsOptional()
  images?: string[];

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  @Exclude()
  isFeatured?: boolean;

  @Exclude()
  coordinates?: { longitude: string | number; latitude: string | number };
}
