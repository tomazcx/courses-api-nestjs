import {IsArray, IsString} from "class-validator"

export class CreateCourseDto {

	@IsString()
	readonly name: string

	@IsString()
	readonly description: string

	@IsString({each: true}) //validate each content of the array
	@IsArray()
	readonly tags: string[]
}
