import {NotFoundException} from '@nestjs/common'
import {v4 as uuid} from 'uuid'
import {ShowCourseService} from '..'

describe('ShowCourseService', () => {
	let service: ShowCourseService
	let id: string
	let date: Date

	beforeEach(async () => {
		service = new ShowCourseService()
		id = uuid()
		date = new Date()
	})

	it('should show the course with the informed id', async () => {

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
			findOne: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse))
		}

		//@ts-expect-error defined part of methods
		service['coursesRepository'] = mockCourseRepository

		const courses = await service.execute(id)

		expect(mockCourseRepository.findOne).toBeCalled()
		expect(courses).toStrictEqual(expectOutputCourse)
	})

	it('should throw an error when informing an unexistent id', async () => {
		const wrongId = uuid()
		const mockCourseRepository = {
			findOne: jest.fn().mockReturnValue(Promise.resolve(undefined)),
		}

		//@ts-expect-error defined part of methods
		service['coursesRepository'] = mockCourseRepository


		expect(service.execute(wrongId)).rejects.toBeInstanceOf(NotFoundException)
	})
})
