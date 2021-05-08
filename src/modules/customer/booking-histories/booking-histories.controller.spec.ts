import { Test, TestingModule } from '@nestjs/testing';
import { BookingHistoriesController } from './booking-histories.controller';

describe('BookingHistoriesController', () => {
  let controller: BookingHistoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingHistoriesController],
    }).compile();

    controller = module.get<BookingHistoriesController>(BookingHistoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
