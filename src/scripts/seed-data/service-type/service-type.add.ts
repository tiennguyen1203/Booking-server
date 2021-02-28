import uniq from 'lodash/uniq';
import { createConnection, getConnectionManager } from 'typeorm';
import { ServiceType } from '../../../entities';
import locationData from '../Da_Nang_2021-02-15_18_43_16.json';
let addedServiceTypes: string[];

const insertServiceType = async (serviceType) => {
  try {
    const newServiceType = new ServiceType();
    newServiceType.name = serviceType;
    console.log(`>> Inserting serviceType "${serviceType}"`);
    await newServiceType.save();
    console.log(`>> Inserted serviceType "${serviceType}"`);
  } catch (error) {
    console.log(
      `^^ Error: Insert serviceType "${serviceType}" fails due to: ${error.message}`,
    );
  }
};

const insertServiceTypes = async ({
  addedServiceTypes,
  currentServiceTypes,
}: {
  addedServiceTypes: string[];
  currentServiceTypes: string[];
}) => {
  const unAddedServiceTypes = currentServiceTypes.filter(
    (serviceType) => !addedServiceTypes.includes(serviceType),
  );

  await Promise.all(
    uniq(unAddedServiceTypes).map((serviceType) =>
      insertServiceType(serviceType),
    ),
  );

  addedServiceTypes.push(...uniq(unAddedServiceTypes));
  console.log(
    `^^^^^ Pushed list ServiceTypes just added into DB into addedServiceTypes array`,
  );
};

export const addServiceTypes = async (): Promise<void> => {
  const connectionManager = getConnectionManager();
  if (!connectionManager.has('default')) {
    // ? load connection options from ormconfig or environment
    await createConnection('default');
  }

  addedServiceTypes = (await ServiceType.find()).map(
    (serviceType) => serviceType.name,
  );

  for (const locations of Object.values(locationData)) {
    for (const location of locations) {
      console.log(`>> Inserting ServiceTypes`);
      await insertServiceTypes({
        addedServiceTypes,
        currentServiceTypes: location.details.services_offered.map(
          (service) => service.type,
        ),
      });

      console.log(`>> Inserted serviceTypes succeeded`);
    }
  }

  console.log(addedServiceTypes.length);
};
