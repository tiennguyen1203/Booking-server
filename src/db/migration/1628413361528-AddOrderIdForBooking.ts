import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddOrderIdForBooking1628413361528 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'booking',
      new TableColumn({
        name: 'orderId',
        type: 'varchar(255)',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('location', 'orderId');
  }
}
