import { createConnection } from 'typeorm';
import { LocationType } from '../../entities';

const addLocationType = async (): Promise<void> => {
  await createConnection('default');
  const locationType1 = new LocationType();

  locationType1.name = 'Hotel';
  locationType1.createdAt = new Date();
  locationType1.updatedAt = new Date();
  await locationType1.save();

  const locationType2 = new LocationType();
  locationType2.name = 'Homestay';
  locationType2.createdAt = new Date();
  locationType2.updatedAt = new Date();
  await locationType2.save();
};

const processData = async (): Promise<void> => {
  await addLocationType();
};

processData().then(() => {
  console.log('Done !!!');
});
