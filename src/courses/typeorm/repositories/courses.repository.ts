import {Inject} from "@nestjs/common";
import {CreateCourseDto} from "src/courses/dto/create-course.dto";
import {UpdateCourseDto} from "src/courses/dto/update-course.dto";
import {ICourse} from "src/courses/interfaces/models/ICourse";
import {ITag} from "src/courses/interfaces/models/ITag";
import {ICoursesRepository} from "src/courses/interfaces/repositories/ICoursesRepository";
import {Repository} from "typeorm";
import {Course} from "../entities/course.entity";
import {Tag} from "../entities/tag.entity";

export class CoursesRepository implements ICoursesRepository {
	@Inject('COURSES_REPOSITORY')
	private readonly ormRepository: Repository<Course>

	@Inject('TAGS_REPOSITORY')
	private readonly tagRepository: Repository<Tag>


	public async findAll(): Promise<ICourse[]> {
		const courses = await this.ormRepository.find({relations: ['tags']})
		return courses
	}

	public async findOne(id: string): Promise<ICourse> {
		const course = await this.ormRepository.findOne({where: {id}, relations: ['tags']})
		return course
	}

	public async create(data: CreateCourseDto): Promise<ICourse> {
		const tags = await Promise.all(
			data.tags.map((name) => this.preloadTagByName(name))
		)
		const createdCourse = this.ormRepository.create({
			...data,
			tags
		})
		await this.ormRepository.save(createdCourse)
		return createdCourse
	}

	public async update(id: string, data: UpdateCourseDto): Promise<ICourse> {

		const tags = data.tags && (
			await Promise.all(
				data.tags.map(name => this.preloadTagByName(name))
			)
		)

		const course = await this.ormRepository.preload({
			id,
			...data,
			tags
		})

		await this.ormRepository.save(course)

		return course
	}

	public async delete(id: string): Promise<void> {
		await this.ormRepository.delete({id})
	}

	public async preloadTagByName(name: string): Promise<ITag> {
		const tag = await this.tagRepository.findOne({where: {name}})

		if (tag) {
			return tag
		}

		return this.tagRepository.create({name})
	}
}
