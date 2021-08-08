import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddPaypalMerchantIdForLocation1628398779603
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'location',
      new TableColumn({
        name: 'paypalMerchantId',
        type: 'varchar(255)',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('location', 'paypalMerchantId');
  }
}
