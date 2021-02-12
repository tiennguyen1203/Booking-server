import { Test, TestingModule } from '@nestjs/testing';
import { LocationTypesController } from './location-types.controller';

describe('LocationTypesController', () => {
  let controller: LocationTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationTypesController],
    }).compile();

    controller = module.get<LocationTypesController>(LocationTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
