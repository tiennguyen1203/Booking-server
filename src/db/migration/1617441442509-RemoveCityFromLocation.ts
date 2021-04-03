import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class RemoveCityFromLocation1617441442509 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('location', 'city');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'location',
      new TableColumn({
        name: 'city',
        type: 'string',
        isNullable: true,
      }),
    );
  }
}
