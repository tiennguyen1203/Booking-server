import { createConnection, getConnectionManager } from 'typeorm';
import { City } from '../../../entities';
import citiesJSONData from '../cities.json';

const insertCity = async (city: {
  name: string;
  totalLocations?: number;
  averagePrice?: string;
  thumbnail?: string;
}) => {
  try {
    const newCity = new City();

    for (const e in city) {
      newCity[e] = city[e];
    }
    console.log(`>> Inserting city "${JSON.stringify(city)}"`);
    await newCity.save();
    console.log(`>> Inserted city "${JSON.stringify(city)}"`);
  } catch (error) {
    console.log(
      `^^ Error: Insert city "${JSON.stringify(city)}" fails due to: ${
        error.message
      }`,
    );
  }
};

export const addCities = async (): Promise<void> => {
  const connectionManager = getConnectionManager();
  if (!connectionManager.has('default')) {
    await createConnection('default');
  }

  for (const city of citiesJSONData) {
    await insertCity({ ...city });
  }
};
