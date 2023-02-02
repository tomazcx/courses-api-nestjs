import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication, ValidationPipe} from '@nestjs/common';
import * as request from 'supertest';
import {DataSource} from 'typeorm';
import {Course} from '../../src/courses/typeorm/entities/course.entity';
import {Tag} from '../../src/courses/typeorm/entities/tag.entity';
import {CreateTables1675275277641} from '../../src/shared/database/migrations/1675275277641-CreateTables'
import {CreateRelationsTable1675294661975} from '../../src/shared/database/migrations/1675294661975-CreateRelationsTable'

const databaseProviders = [
	{
		provide: 'DATA_SOURCE',
		useFactory: async () => {
			const dataSource = new DataSource({
				type: 'postgres',
				host: 'dbtest',
				port: 5434,
				username: 'postgres',
				password: 'docker',
				database: 'testdb',
				entities: [
					__dirname + '/../../dist/courses/typeorm/entities/*.entity.js'
				],
				migrations: [
					CreateTables1675275277641,
					CreateRelationsTable1675294661975
				],
				synchronize: true
			})

		}
	}]

describe('Courses: /courses', () => {
	let app: INestApplication;

	beforeAll(async () => {

		const moduleFixture: TestingModule = await Test.createTestingModule({
			providers: [...databaseProviders],
			exports: [...databaseProviders]
		}).compile();

		app = moduleFixture.createNestApplication();

		app.useGlobalPipes(
			new ValidationPipe({
				whitelist: true,
				forbidNonWhitelisted: true,
				transform: true
			})
		)

		await app.init();
	});

	afterAll(async () => [
		await app.close()
	])

	it.todo('Create POST /courses')
});
