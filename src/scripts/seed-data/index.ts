import { createConnection } from 'typeorm';
import { addFacilities } from './facility';
import { addLocations } from './location';
import { addLocationTypes } from './location-type/';
import { addServices } from './service';
import { addServiceTypes } from './service-type';
import { addRooms } from './room';

const processData = async () => {
  await createConnection('default');
  await addLocationTypes();
  await addLocations();
  await addFacilities();
  await addServiceTypes();
  await addServices();
  await addRooms();
};

processData().then(() => {
  console.log('Seed data succeeded !!!');
  process.exit();
});
