import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { BookingStatus } from '../../constant';

export class CreateTableBookingHistory1620224365892
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'booking_history',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isUnique: true,
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'accepterId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'locationId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'roomId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'bookingId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'previousStatus',
            type: 'enum',
            enum: [
              BookingStatus.ACCEPTED,
              BookingStatus.PENDING,
              BookingStatus.REJECTED,
            ],
            default: `'${BookingStatus.PENDING}'`,
            enumName: 'bookingStatus',
            isNullable: false,
          },
          {
            name: 'currentStatus',
            type: 'enum',
            enum: [
              BookingStatus.ACCEPTED,
              BookingStatus.PENDING,
              BookingStatus.REJECTED,
            ],
            default: `'${BookingStatus.PENDING}'`,
            enumName: 'bookingStatus',
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'timestamptz',
            isNullable: true,
          },
          {
            name: 'updatedAt',
            type: 'timestamptz',
            isNullable: true,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('booking_history');
  }
}
