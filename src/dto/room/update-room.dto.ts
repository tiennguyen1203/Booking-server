import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateRoomDto {
  @IsOptional()
  name: string;

  @IsOptional()
  @IsString()
  price: string;

  @IsOptional()
  @IsString()
  capacity: string;

  @IsOptional()
  @IsString()
  description: string;
}
