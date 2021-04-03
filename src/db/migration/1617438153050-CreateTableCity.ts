import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableCity1617438153050 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'city',
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
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'totalLocations',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'thumbnail',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'averagePrice',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
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
    await queryRunner.dropTable('city');
  }
}
