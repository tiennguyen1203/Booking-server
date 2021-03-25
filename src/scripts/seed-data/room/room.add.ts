import { exit } from 'process';
import { createConnection } from 'typeorm';
import { Location, Room } from '../../../entities';
// import locationData from '../Da_Nang_2021-02-15_18_43_16.json';
import roomData from '../location_detail_file.json';

const getCapacity = (soLuongString: string): number | null => {
  const splitSoLuong = soLuongString?.split('.');
  const a = splitSoLuong?.map(
    (soLuong) => soLuong.split(' ')[soLuong.split(' ').length - 1],
  );
  return (
    a?.reduce((previous, current) => previous + parseInt(current), 0) || null
  );
};

export const addRooms = async (): Promise<void> => {
  console.log('>> Creating connection');
  await createConnection('default');
  console.log('>> Created connection succeeded');

  for (const room of roomData) {
    const location = await Location.findOne({
      where: { name: room.location_name },
    });
    if (location) {
      const existLocation = new Location();
      existLocation.id = location.id;
      existLocation.address = room.address;
      existLocation.images = room.images;
      existLocation.description = room.description;
      await existLocation.save();

      if (room?.loai_cho_o?.length) {
        for (const loaiChoO of room.loai_cho_o) {
          const newRoom = new Room();
          newRoom.name = loaiChoO.name;
          const capacity = getCapacity(loaiChoO.so_luong);
          newRoom.capacity = capacity?.toString();
          newRoom.locationId = location.id;
          await newRoom.save();
        }
      }
    }
  }
};

const processData = async (): Promise<void> => {
  await addRooms();
};

processData().then(() => {
  console.log('Done !!!');
  exit();
});
