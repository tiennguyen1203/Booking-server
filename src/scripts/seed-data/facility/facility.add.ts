import uniq from 'lodash/uniq';
import { createConnection, getConnectionManager } from 'typeorm';
import { Facility } from '../../../entities';
import locationData from '../Da_Nang_2021-02-15_18_43_16.json';
let addedFacilities: string[];

const insertFacility = async (facility) => {
  try {
    const newFacility = new Facility();
    newFacility.name = facility;
    console.log(`>> Inserting facility "${facility}"`);
    await newFacility.save();
    console.log(`>> Inserted facility "${facility}"`);
  } catch (error) {
    console.log(
      `^^ Error: Insert facility "${facility}" fails due to: ${error.message}`,
    );
  }
};

const insertFacilities = async ({
  addedFacilities,
  currentFacilities,
}: {
  addedFacilities: string[];
  currentFacilities: string[];
}) => {
  const unAddedFacilities = currentFacilities.filter(
    (facility) => !addedFacilities.includes(facility),
  );

  await Promise.all(
    uniq(unAddedFacilities).map((facility) => insertFacility(facility)),
  );

  addedFacilities.push(...uniq(unAddedFacilities));
  console.log(
    `^^^^^ Pushed list facilities just added into DB into addedFacilities array`,
  );
};

export const addFacilities = async (): Promise<void> => {
  const connectionManager = getConnectionManager();
  if (!connectionManager.has('default')) {
    // ? load connection options from ormconfig or environment
    await createConnection('default');
  }

  addedFacilities = (await Facility.find()).map((facility) => facility.name);

  for (const locations of Object.values(locationData)) {
    for (const location of locations) {
      console.log(`>> Inserting facilities`);
      await insertFacilities({
        addedFacilities,
        currentFacilities: location.details.important_facilities,
      });

      console.log(`>> Inserted facilities succeeded`);
    }
  }

  console.log('total facilities added:', addedFacilities.length);
};
