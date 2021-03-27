import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddFullNameForUsers1616847763672 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'fullName',
        type: 'varchar',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'fullName');
  }
}
