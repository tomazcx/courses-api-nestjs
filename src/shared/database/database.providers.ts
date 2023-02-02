import {DataSource} from "typeorm"
import {CreateTables1675275277641} from "./migrations/1675275277641-CreateTables"
import {CreateRelationsTable1675294661975} from "./migrations/1675294661975-CreateRelationsTable"

export const databaseProviders = [
	{
		provide: 'DATA_SOURCE',
		useFactory: async () => {
			const dataSource = new DataSource({
				type: 'postgres',
				host: 'db',
				port: 5432,
				username: 'postgres',
				password: 'docker',
				database: 'cursonestjs',
				entities: [
					__dirname + '/../../**/*.entity.js'
				],
				migrations: [
					CreateTables1675275277641,
					CreateRelationsTable1675294661975
				],
				synchronize: false
			})

			return dataSource.initialize()
		}
	}
]

export const dataSource = new DataSource({
	type: 'postgres',
	host: 'db',
	port: 5432,
	username: 'postgres',
	password: 'docker',
	database: 'cursonestjs',
	entities: [
		__dirname + '/../../**/*.entity.js'
	],
	migrations: [
		CreateTables1675275277641,
		CreateRelationsTable1675294661975
	],
	synchronize: false
})
