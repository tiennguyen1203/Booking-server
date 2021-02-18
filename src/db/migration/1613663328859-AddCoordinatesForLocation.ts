import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddCoordinatesForLocation1613663328859
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'location',
      new TableColumn({
        name: 'coordinates',
        type: 'jsonb',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('location', 'coordinates');
  }
}
