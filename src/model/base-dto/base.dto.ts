import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';
import { PaginationOptionsInterface } from './../../paginate/pagination.options.interface';

export class QueryDto implements PaginationOptionsInterface {
  @Min(0)
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  take: number;

  @IsInt()
  @Type(() => Number)
  @IsOptional()
  @Min(0)
  skip: number;
}
