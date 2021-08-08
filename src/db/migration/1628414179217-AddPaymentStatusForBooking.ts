import { PAYMENT_STATUS } from '../../constant';
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddPaymentStatusForBooking1628414179217
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'booking',
      new TableColumn({
        name: 'paymentStatus',
        type: 'varchar(255)',
        default: `'${PAYMENT_STATUS.CREATED}'`,
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('location', 'paymentStatus');
  }
}
