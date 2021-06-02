import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { default as request } from 'supertest';
// import { AdminLocationsModule } from './locations.module';
import { Connection } from 'typeorm';
import { configService } from '../../../config/config.service';
import { BaseLocationRepository } from '../../../modules/base/locations/location.repository';
import { CustomerLocationsModule } from '../../customer/locations/locations.module';
import { LocationType } from '../../../entities/location-type.entity';
import { Location } from '../../../entities/location.entity';

describe('Locations', () => {
  let app: INestApplication;
  let connection: Connection;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        // AdminLocationsModule,
        CustomerLocationsModule,
        TypeOrmModule.forRoot(configService.getTypeOrmConfigTestEnv()),
        BaseLocationRepository,
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    // app.enableShutdownHooks();
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

    const response = await request(app.getHttpServer()).get(
      '/customer/locations',
    );
    const result = JSON.parse(response.text);

    expect(result.total).toEqual(2);

    expect(result.data[0]).toMatchObject({
      name: 'location 1',
      locationTypeId: '00000000-0000-0000-0000-000000000000',
    });
  });
});
