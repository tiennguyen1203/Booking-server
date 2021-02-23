import { exit } from 'process';
import { createConnection } from 'typeorm';
import { Location, LocationType } from '../../entities';
import locationData from './Da_Nang_2021-02-15_18_43_16.json';
import find from 'lodash/find';
import { CreateLocationDto } from 'src/dto';
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
    newLocation.geoLocation = {
      type: 'Point',
      coordinates: [location.details.longitude, location.details.latitude],
      crs: {
        type: 'name',
        properties: {
          name: 'urn:ogc:def:crs:EPSG::4326',
        },
      },
    };
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

const addLocationType = async (): Promise<void> => {
  await createConnection('default');
  const locationTypes: LocationType[] = await LocationType.find();
  for (const locations of Object.values(locationData)) {
    await Promise.all(
      locations.map((location) => insertLocation(location, locationTypes)),
    );
  }
};

const processData = async (): Promise<void> => {
  await addLocationType();
};

processData().then(() => {
  console.log('Done !!!');
  exit();
});
