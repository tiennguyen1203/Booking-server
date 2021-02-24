import uniq from 'lodash/uniq';
import { exit } from 'process';
import { createConnection } from 'typeorm';
import { Service, ServiceType } from '../../../entities';
import locationData from '../Da_Nang_2021-02-15_18_43_16.json';
let addedServices: string[];

const insertService = async ({
  serviceTypeId,
  name,
}: {
  serviceTypeId: string;
  name: string;
}) => {
  try {
    const newService = new Service();
    newService.name = name;
    newService.serviceTypeId = serviceTypeId;
    console.log(`>> Inserting service "${name}"`);
    await newService.save();
    console.log(`>> Inserted service "${name}"`);
  } catch (error) {
    console.log(
      `^^ Error: Insert service "${name}" fails due to: ${error.message}`,
    );
  }
};

const insertServices = async ({
  addedServices,
  servicesOffered,
}: {
  addedServices: string[];
  servicesOffered: [{ value: string[]; type: string }];
}) => {
  for (const services of servicesOffered) {
    const unAddedServices: string[] = services.value.filter(
      (service) => !addedServices.includes(service),
    );
    if (unAddedServices?.length) {
      const serviceType = await ServiceType.find({
        where: { name: services.type },
      });
      await Promise.all(
        uniq(unAddedServices).map((service) =>
          insertService({ serviceTypeId: serviceType[0].id, name: service }),
        ),
      );
    }

    addedServices.push(...uniq(unAddedServices));
  }

  console.log(
    `^^^^^ Pushed list Services just added into DB into addedServices array`,
  );
};

export const addServices = async (): Promise<void> => {
  console.log('>> Creating connection');
  await createConnection('default');
  console.log('>> Created connection succeeded');

  addedServices = (await Service.find()).map((service) => service.name);
  for (const locations of Object.values(locationData)) {
    for (const location of locations) {
      console.log(`>> Inserting Services`);
      await insertServices({
        addedServices,
        servicesOffered: location.details.services_offered as [
          { type: string; value: string[] },
        ],
      });

      console.log(`>> Inserted services succeeded`);
    }
  }

  console.log(addedServices.length);
};

const processData = async (): Promise<void> => {
  await addServices();
};

processData().then(() => {
  console.log('Done !!!');
  exit();
});
