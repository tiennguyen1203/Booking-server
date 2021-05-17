import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { PaginationOptionsInterface } from '../paginate/pagination.options.interface';

export class QueryDto implements PaginationOptionsInterface {
  @Min(0)
  @Max(200)
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  @ApiPropertyOptional()
  take: number;

  @IsInt()
  @Type(() => Number)
  @IsOptional()
  @Min(0)
  @ApiPropertyOptional()
  skip: number;

  @IsOptional()
  @ApiPropertyOptional()
  order?: string;
}
