import {CreateCourseDto} from "src/courses/dto/create-course.dto";
import {UpdateCourseDto} from "src/courses/dto/update-course.dto";
import {ICourse} from "../models/ICourse";
import {ITag} from "../models/ITag";

export interface ICoursesRepository {
	findAll(): Promise<ICourse[]>
	findOne(id: string): Promise<ICourse>
	create(data: CreateCourseDto): Promise<ICourse>
	update(id: string, data: UpdateCourseDto): Promise<ICourse>
	delete(id: string): Promise<void>
	preloadTagByName(name: string): Promise<ITag>
}
