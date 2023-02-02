import {Inject, Injectable, NotFoundException} from "@nestjs/common";
import {CoursesRepository} from "src/courses/typeorm/repositories/courses.repository";

@Injectable()
export class DeleteCourseService {

	@Inject(CoursesRepository)
	private readonly coursesRepository: CoursesRepository

	public async execute(id: string): Promise<void> {
		const course = await this.coursesRepository.findOne(id)

		if (!course) {
			throw new NotFoundException('Id não encontrado')
		}

		return await this.coursesRepository.delete(id)
	}
}
