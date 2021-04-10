import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableLocationServiceType1618024650377
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'location_service_type',
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
            name: 'locationId',
            type: 'uuid',
          },
          {
            name: 'serviceTypeId',
            type: 'uuid',
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
    await queryRunner.dropTable('location_service_type');
  }
}
