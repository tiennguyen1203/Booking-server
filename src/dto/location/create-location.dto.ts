import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
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
  @ApiProperty()
  locationTypeId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  address: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @ApiProperty()
  city: string;

  @IsOptional()
  @IsObject()
  @ApiProperty({ required: false })
  workingTime: any;

  @IsPhoneNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  contactPhoneNumber: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty({ required: false })
  contactEmail: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  price: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  description: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  thumbnail: string;

  @IsArray()
  @IsOptional()
  @ApiProperty({ required: false })
  images: string[];

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false })
  isFeatured: boolean;
}
