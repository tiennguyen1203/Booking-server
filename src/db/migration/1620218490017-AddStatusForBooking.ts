import { BookingStatus } from '../../constant';
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddStatusForBooking1620218490017 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'booking',
      new TableColumn({
        name: 'status',
        type: 'enum',
        enum: [
          BookingStatus.ACCEPTED,
          BookingStatus.PENDING,
          BookingStatus.REJECTED,
        ],
        default: `'${BookingStatus.PENDING}'`,
        enumName: 'bookingStatus',
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('booking', 'status');
  }
}
