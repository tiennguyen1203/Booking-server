import { ApiProperty } from '@nestjs/swagger';

import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsJSON,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateLocationDto {
  @IsNotEmpty()
  @IsString()
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
  @ApiProperty()
  city: string;

  @IsJSON()
  @ApiProperty({ required: false })
  workingTime: any;

  @IsPhoneNumber()
  @ApiProperty({ required: false })
  contactPhoneNumber: string;

  @IsEmail()
  @ApiProperty({ required: false })
  contactEmail: string;

  @IsString()
  @ApiProperty({ required: false })
  price: string;

  @IsString()
  @ApiProperty({ required: false })
  description: string;

  @IsString()
  @ApiProperty({ required: false })
  thumbnail: string;

  @IsArray()
  @ApiProperty({ required: false })
  images: string[];

  @IsBoolean()
  @ApiProperty({ required: false })
  isFeatured: boolean;
}
