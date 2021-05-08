import { Test, TestingModule } from '@nestjs/testing';
import { BookingHistoriesService } from './booking-histories.service';

describe('BookingHistoriesService', () => {
  let service: BookingHistoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookingHistoriesService],
    }).compile();

    service = module.get<BookingHistoriesService>(BookingHistoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
