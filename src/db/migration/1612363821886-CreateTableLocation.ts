import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableLocation1612363821886 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "postgis"');
    await queryRunner.createTable(
      new Table({
        name: 'location',
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
            name: 'locationTypeId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'address',
            type: 'varchar',
          },
          {
            name: 'city',
            type: 'varchar',
          },
          {
            name: 'geoLocation',
            type: 'geometry(Point, 4326)',
          },
          {
            name: 'workingTime',
            type: 'jsonb',
          },
          {
            name: 'contactPhoneNumber',
            type: 'varchar',
          },
          {
            name: 'contactEmail',
            type: 'varchar',
          },
          {
            name: 'score',
            type: 'float',
          },
          {
            name: 'price',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'text',
          },
          {
            name: 'thumbnail',
            type: 'text',
          },
          {
            name: 'images',
            type: 'text[]',
          },
          {
            name: 'isFeatured',
            type: 'boolean',
            default: false,
          },
          {
            name: 'createdAt',
            type: 'timestamptz',
          },
          {
            name: 'updatedAt',
            type: 'timestamptz',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('location');
  }
}
