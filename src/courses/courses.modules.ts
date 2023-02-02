import {Module} from '@nestjs/common';
import {DatabaseModule} from 'src/shared/database/database.module';
import {CoursesController} from './controllers/courses.controller';
import {coursesProviders} from './providers/courses.providers';
import {CreateCourseService} from './services/CreateCourseService';
import {DeleteCourseService} from './services/DeleteCourseService';
import {ShowAllCoursesService} from './services/ShowAllCoursesService';
import {ShowCourseService} from './services/ShowCourseService';
import {UpdateCourseService} from './services/UpdateCourseService';
import {CoursesRepository} from './typeorm/repositories/courses.repository';

@Module({
	imports: [DatabaseModule],
	controllers: [CoursesController],
	providers: [...coursesProviders, CoursesRepository, ShowAllCoursesService, ShowCourseService, CreateCourseService, UpdateCourseService, DeleteCourseService]
})
export class CoursesModule {}
