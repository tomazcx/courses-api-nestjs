import {Inject, Injectable, NotFoundException} from "@nestjs/common";
import {ICourse} from "src/courses/interfaces/models/ICourse";
import {CoursesRepository} from "src/courses/typeorm/repositories/courses.repository";

@Injectable()
export class ShowCourseService {

	@Inject(CoursesRepository)
	private coursesRepository: CoursesRepository

	public async execute(id: string): Promise<ICourse> {
		const course = await this.coursesRepository.findOne(id)

		if (!course) {
			throw new NotFoundException('Course not found')
		}

		return course
	}

}
