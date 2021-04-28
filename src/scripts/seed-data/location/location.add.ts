import find from 'lodash/find';
import { CreateLocationDto } from 'src/dto';
import { createConnection, getConnectionManager } from 'typeorm';
import { Location, LocationType } from '../../../entities';
import locationData from '../Da_Nang_2021-02-15_18_43_16.json';
console.log(locationData[2].length);

const getLocationTypeIdForLocation = (
  locationTypes: LocationType[],
  locationName: string,
): string => {
  if (locationName.toLocaleLowerCase().includes('homestay')) {
    return find(
      locationTypes,
      (locationType: LocationType) => locationType.name === 'Homestay',
    ).id;
  } else {
    return find(
      locationTypes,
      (locationType: LocationType) => locationType.name === 'Hotel',
    ).id;
  }
};

const insertLocation = async (location, locationTypes: LocationType[]) => {
  try {
    const inputLocation: CreateLocationDto = {
      name: location.name,
      price: location.price,
      locationTypeId: getLocationTypeIdForLocation(
        locationTypes,
        location.name,
      ),
    };

    const newLocation = new Location(inputLocation);

    const locationScore = parseFloat(location.score.replace(',', '.')) || 0;

    newLocation.score = locationScore;
    newLocation.coordinates = {
      longitude: location.details.longitude,
      latitude: location.details.latitude,
    };

    console.log(`>> Inserting location "${location.name}"`);
    await newLocation.save();
    console.log(`>> Insert location "${location.name}" succeeded`);
  } catch (error) {
    console.error(
      `>> Insert location "${location.name}" fails due to: ${error.message}`,
    );
  }
};

export const addLocations = async (): Promise<void> => {
  const connectionManager = getConnectionManager();
  if (!connectionManager.has('default')) {
    // ? load connection options from ormconfig or environment
    await createConnection('default');
  }

  const locationTypes: LocationType[] = await LocationType.find();
  for (const locations of Object.values(locationData)) {
    await Promise.all(
      locations.map((location) => insertLocation(location, locationTypes)),
    );
  }
};
