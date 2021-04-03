import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddCityIdForLocation1617438711453 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'location',
      new TableColumn({
        name: 'cityId',
        type: 'uuid',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('location', 'cityId');
  }
}
