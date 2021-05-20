import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class StoreRoomDto {
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  price: string;

  @IsString()
  @IsNotEmpty()
  capacity: string;

  @IsString()
  @IsOptional()
  description: string;
}
