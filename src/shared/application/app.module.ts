import {Module} from '@nestjs/common';
import {CoursesModule} from 'src/courses/courses.modules';
import {DatabaseModule} from '../database/database.module';

@Module({
	imports: [CoursesModule, DatabaseModule]
})
export class AppModule {}
