import { IsNotEmpty, IsString } from 'class-validator';

export class BookingDto {
  @IsString()
  @IsNotEmpty()
  startTime: string;

  @IsString()
  @IsNotEmpty()
  endTime: string;

  @IsString()
  @IsNotEmpty()
  roomId: string;

  @IsString()
  @IsNotEmpty()
  returnUrl: string;

  @IsString()
  @IsNotEmpty()
  cancelUrl: string;
}

export class GetLocationBookingsDto {
  @IsString()
  @IsNotEmpty()
  startTime: string;

  @IsString()
  @IsNotEmpty()
  endTime: string;
}
