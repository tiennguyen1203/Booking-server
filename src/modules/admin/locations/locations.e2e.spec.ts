import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseLocationRepository } from '../../../modules/base/locations/location.repository';
import { default as request } from 'supertest';
import { configService } from '../../../config/config.service';
import { AdminLocationsModule } from './locations.module';
import { Connection } from 'typeorm';
import { Location, LocationType } from '../../../entities';

describe('Locations', () => {
  let app: INestApplication;
  let connection: Connection;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        AdminLocationsModule,
        TypeOrmModule.forRoot(configService.getTypeOrmConfigTestEnv()),
        BaseLocationRepository,
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.enableShutdownHooks();
    await app.init();
    connection = app.get(Connection);
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /admin/locations', async () => {
    const locationTypeRepository = connection.getRepository(LocationType);
    const locationRepository = connection.getRepository(Location);
    await locationTypeRepository.save([
      { name: 'locationType', id: '00000000-0000-0000-0000-000000000000' },
    ]);
    locationRepository.save([
      {
        name: 'location 1',
        locationTypeId: '00000000-0000-0000-0000-000000000000',
      },
      {
        name: 'location 2',
        locationTypeId: '00000000-0000-0000-0000-000000000000',
      },
    ]);

    const response = await request(app.getHttpServer()).get('/admin/locations');
    const result = JSON.parse(response.text);

    expect(result.page_total).toEqual(2);
    expect(result.total).toEqual(2);

    expect(result.results[0]).toMatchObject({
      name: 'location 1',
      locationTypeId: '00000000-0000-0000-0000-000000000000',
    });
  });
});
