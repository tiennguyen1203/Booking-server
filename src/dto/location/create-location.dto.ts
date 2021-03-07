import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateLocationDto {
  @IsNotEmpty()
  @IsUUID()
  @IsDefined({ always: true })
  @ApiProperty()
  locationTypeId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @IsDefined({ always: true })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: false })
  @IsDefined({ always: true })
  address?: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @ApiProperty()
  @IsDefined({ always: true })
  city?: string;

  @IsOptional()
  @IsObject()
  @ApiProperty({ required: false })
  workingTime?: any;

  @IsPhoneNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  contactPhoneNumber?: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty({ required: false })
  contactEmail?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  price?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  description?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  thumbnail?: string;

  @IsArray()
  @IsOptional()
  @ApiProperty({ required: false })
  images?: string[];

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false })
  @Exclude()
  isFeatured?: boolean;

  @Exclude()
  coordinates?: { longitude: string | number; latitude: string | number };
}
