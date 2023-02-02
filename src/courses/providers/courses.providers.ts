import {Course} from "src/courses/typeorm/entities/course.entity";
import {Tag} from "src/courses/typeorm/entities/tag.entity";
import {DataSource} from "typeorm";

export const coursesProviders = [
	{
		provide: 'COURSES_REPOSITORY',
		useFactory: (dataSource: DataSource) => dataSource.getRepository(Course),
		inject: ['DATA_SOURCE']
	},
	{
		provide: 'TAGS_REPOSITORY',
		useFactory: (dataSource: DataSource) => dataSource.getRepository(Tag),
		inject: ['DATA_SOURCE']
	}
]
