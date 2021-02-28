import { createConnection, getConnectionManager } from 'typeorm';
import { LocationType } from '../../../entities';

export const addLocationTypes = async (): Promise<void> => {
  const connectionManager = getConnectionManager();
  if (!connectionManager.has('default')) {
    // ? load connection options from ormconfig or environment
    await createConnection('default');
  }

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
