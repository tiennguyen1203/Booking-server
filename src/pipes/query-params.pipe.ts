import { PipeTransform } from '@nestjs/common';
import { QueryDto } from '../dto';

export class QueryParamsPipe implements PipeTransform {
  private addTakeAndSkipForQueryDto(queryDto) {
    if (!queryDto.skip) {
      queryDto.skip = 0;
    }
    if (!queryDto.take) {
      queryDto.take = 10;
    }
  }

  transform(queryDto: QueryDto): QueryDto {
    this.addTakeAndSkipForQueryDto(queryDto);

    return queryDto;
  }
}
