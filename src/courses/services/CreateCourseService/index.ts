import {Inject, Injectable} from "@nestjs/common";
import {CreateCourseDto} from "src/courses/dto/create-course.dto";
import {ICourse} from "src/courses/interfaces/models/ICourse";
import {CoursesRepository} from "src/courses/typeorm/repositories/courses.repository";

@Injectable()
export class CreateCourseService {

	@Inject(CoursesRepository)
	private coursesRepository: CoursesRepository

	public async execute(data: CreateCourseDto): Promise<ICourse> {
		const course = await this.coursesRepository.create(data)

		return course
	}

}
