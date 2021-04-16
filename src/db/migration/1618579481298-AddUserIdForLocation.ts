import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddUserIdForLocation1618579481298 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'location',
      new TableColumn({
        name: 'userId',
        type: 'uuid',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('location', 'userId');
  }
}
