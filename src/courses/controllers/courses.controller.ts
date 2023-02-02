import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post} from '@nestjs/common';
import {CreateCourseDto} from '../dto/create-course.dto';
import {UpdateCourseDto} from '../dto/update-course.dto';
import {CreateCourseService} from '../services/CreateCourseService';
import {DeleteCourseService} from '../services/DeleteCourseService';
import {ShowAllCoursesService} from '../services/ShowAllCoursesService';
import {ShowCourseService} from '../services/ShowCourseService';
import {UpdateCourseService} from '../services/UpdateCourseService';

@Controller('courses')
export class CoursesController {

	constructor(
		private readonly showAllCoursesService: ShowAllCoursesService,
		private readonly showCourseService: ShowCourseService,
		private readonly createCourseService: CreateCourseService,
		private readonly updateCouseService: UpdateCourseService,
		private readonly deleteCourseService: DeleteCourseService
	) {}

	@Get('all')
	findAll() {
		return this.showAllCoursesService.execute()
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.showCourseService.execute(id)
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	create(@Body() body: CreateCourseDto) {
		return this.createCourseService.execute(body)
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() body: UpdateCourseDto) {
		return this.updateCouseService.execute(id, body)
	}

	@Delete(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	destroy(@Param('id') id: string) {
		return this.deleteCourseService.execute(id)
	}
}
