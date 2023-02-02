import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm"

export class CreateTables1675275277641 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'courses',
			columns: [
				{
					name: 'id',
					type: 'uuid',
					isPrimary: true,
				},
				{
					name: 'name',
					type: 'varchar'
				},
				{
					name: 'description',
					type: 'varchar'
				},
				{
					name: 'created_at',
					type: 'timestamp with time zone',
					default: "CURRENT_TIMESTAMP"
				},
				{
					name: 'updated_at',
					type: 'timestamp with time zone',
					default: "CURRENT_TIMESTAMP"
				}
			]
		}))

		await queryRunner.createTable(new Table({
			name: 'tags',
			columns: [
				{
					name: 'id',
					type: 'uuid',
					isPrimary: true,
				},
				{
					name: 'name',
					type: 'varchar',
					isUnique: true
				},
				{
					name: 'created_at',
					type: 'timestamp with time zone',
					default: "CURRENT_TIMESTAMP"
				},
				{
					name: 'updated_at',
					type: 'timestamp with time zone',
					default: "CURRENT_TIMESTAMP"
				}
			]
		}))

	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('courses')
		await queryRunner.dropTable('tags')
	}

}
