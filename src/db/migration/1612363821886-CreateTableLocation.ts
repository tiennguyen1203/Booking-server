import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableLocation1612363821886 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "postgis"');
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
            isNullable: true,
          },
          {
            name: 'city',
            type: 'varchar',
            isNullable: true,
          },
          // {
          //   name: 'geoLocation',
          //   type: 'geometry(Point, 4326)',
          //   isNullable: true,
          // },
          {
            name: 'workingTime',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'contactPhoneNumber',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'contactEmail',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'score',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'price',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'thumbnail',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'images',
            type: 'text[]',
            isNullable: true,
          },
          {
            name: 'isFeatured',
            type: 'boolean',
            default: false,
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
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('location');
  }
}
