import {CreateCourseService} from ".."
import {v4 as uuid} from 'uuid'
import {CreateCourseDto} from "src/courses/dto/create-course.dto"

describe('CreateCourseService', () => {
	let service: CreateCourseService
	let id: string
	let date: Date

	beforeEach(async () => {
		service = new CreateCourseService()
		id = uuid()
		date = new Date()
	})

	it('it should create a course', async () => {
		const expectOutputTags = [
			{
				id,
				name: 'test-tag',
				updated_at: date,
				created_at: date,
				courses: []
			}
		]
		const expectOutputCourse = {
			id,
			name: 'test',
			description: 'test-description',
			tags: expectOutputTags,
			created_at: date,
			updated_at: date
		}

		const mockCourseRepository = {
			create: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse))
		}

		//@ts-expect-error defined part of methods
		service['coursesRepository'] = mockCourseRepository

		const CreateCourseDto: CreateCourseDto = {
			name: 'test',
			description: 'test-description',
			tags: ['test-tag']
		}

		const createdCourse = await service.execute(CreateCourseDto)

		expect(mockCourseRepository.create).toHaveBeenCalled()
		expect(createdCourse).toStrictEqual(expectOutputCourse)
	})
})
