import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateSubscribers1646936370254 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'subscribers',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          { name: 'name', type: 'varchar' },
          { name: 'email', type: 'varchar' },
          { name: 'id_at_core', type: 'varchar' },
          { name: 'tag_id', type: 'uuid' },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
          { name: 'deleted_at', type: 'timestamp', isNullable: true },
        ],
        foreignKeys: [
          {
            name: 'SubscribersTag',
            columnNames: ['tag_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'tags',
            onUpdate: 'CASCADE',
          },
        ],
      }),
      true,
    );
  }

  public async down(_: QueryRunner): Promise<void> {}
}
