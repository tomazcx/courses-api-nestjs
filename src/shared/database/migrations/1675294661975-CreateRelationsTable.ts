import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm"

export class CreateRelationsTable1675294661975 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'courses_tags',
			columns: [
				{
					name: 'id',
					type: 'uuid',
					isPrimary: true,
					generationStrategy: 'uuid',
					default: 'uuid_generate_v4()'
				},
				{
					name: 'coursesId',
					type: 'uuid',
					isNullable: true
				},
				{
					name: 'tagsId',
					type: 'uuid',
					isNullable: true
				},
				{
					name: 'created_at',
					type: 'timestamp with time zone',
					default: 'CURRENT_TIMESTAMP'
				}
			]
		}))

		await queryRunner.createForeignKey('courses_tags', new TableForeignKey({
			name: 'courses_tag_courses',
			columnNames: ['coursesId'],
			referencedColumnNames: ['id'],
			referencedTableName: 'courses'
		}))

		await queryRunner.createForeignKey('courses_tags', new TableForeignKey({
			name: 'courses_tag_tags',
			columnNames: ['tagsId'],
			referencedColumnNames: ['id'],
			referencedTableName: 'tags'
		}))

	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('courses_tags', 'courses_tags_tags')
		await queryRunner.dropForeignKey('courses_tags', 'courses_tags_courses')
		await queryRunner.dropTable('courses_tags')
	}

}
