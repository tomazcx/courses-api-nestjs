import {Inject, Injectable} from "@nestjs/common";
import {ICourse} from "src/courses/interfaces/models/ICourse";
import {CoursesRepository} from "src/courses/typeorm/repositories/courses.repository";

@Injectable()
export class ShowAllCoursesService {

	@Inject(CoursesRepository)
	private coursesRepository: CoursesRepository

	public async execute(): Promise<ICourse[]> {
		const courses = await this.coursesRepository.findAll()

		return courses
	}

}
