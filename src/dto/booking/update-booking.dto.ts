import { Type } from 'class-transformer';
import { IsEnum } from 'class-validator';
import { BookingStatus } from '../../constant';

export class UpdateBookingDto {
  @Type(() => String)
  @IsEnum(BookingStatus)
  status: BookingStatus;
}
