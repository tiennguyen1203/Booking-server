import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableBookingHistory1618675768196
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
            name: 'userId',
            type: 'uuid',
          },
          {
            name: 'locationId',
            type: 'uuid',
          },
          {
            name: 'roomId',
            type: 'uuid',
          },
          {
            name: 'startTime',
            type: 'timestamptz',
          },
          {
            name: 'endTime',
            type: 'timestamptz',
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
