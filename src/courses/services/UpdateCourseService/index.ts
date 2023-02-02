import {Inject, Injectable, NotFoundException} from "@nestjs/common";
import {UpdateCourseDto} from "src/courses/dto/update-course.dto";
import {ICourse} from "src/courses/interfaces/models/ICourse";
import {CoursesRepository} from "src/courses/typeorm/repositories/courses.repository";

@Injectable()
export class UpdateCourseService {

	@Inject(CoursesRepository)
	private readonly coursesRepository: CoursesRepository

	public async execute(id: string, data: UpdateCourseDto): Promise<ICourse> {
		const course = await this.coursesRepository.findOne(id)

		if (!course) {
			throw new NotFoundException("Id não encontrado")
		}

		const updatedCourse = await this.coursesRepository.update(id, data)

		return updatedCourse
	}

}
