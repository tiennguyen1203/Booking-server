import { createConnection, getConnectionManager } from 'typeorm';
import { Location, LocationServiceType, ServiceType } from '../../../entities';
import locationData from '../Da_Nang_2021-02-15_18_43_16.json';
console.log(locationData[2].length);

export const addLocationServiceTypes = async (): Promise<void> => {
  const connectionManager = getConnectionManager();
  if (!connectionManager.has('default')) {
    // ? load connection options from ormconfig or environment
    await createConnection('default');
  }

  // const locationTypes: LocationType[] = await LocationType.find();
  for (const locations of Object.values(locationData)) {
    await Promise.all(
      locations.map(async (location) => {
        const hotel = (
          await Location.find({ where: { name: location.name } })
        )?.[0];
        if (!hotel) {
          return;
        }

        const serviceTypeNames = location.details?.services_offered?.map(
          (serviceType) => serviceType.type,
        );

        console.log(`>>> Finding serviceTypes`);
        const serviceTypes = await ServiceType.createQueryBuilder('serviceType')
          .where('serviceType.name IN (:...serviceTypeNames)', {
            serviceTypeNames,
          })
          .getMany();
        console.log('>>> found serviceTypes: ', serviceTypes.length);
        if (!serviceTypes?.length) {
          return;
        }

        const locationServiceTypes = serviceTypes.map((serviceType) => ({
          locationId: hotel.id,
          serviceTypeId: serviceType.id,
        }));

        await LocationServiceType.createQueryBuilder('locationServiceType')
          .insert()
          .into(LocationServiceType)
          .values(locationServiceTypes)
          .execute();
        console.log(
          `>>> add ${locationServiceTypes.length} locationServiceTypes`,
        );
      }),
    );
  }
};

addLocationServiceTypes();
