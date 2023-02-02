import {UpdateCourseService} from ".."
import {v4 as uuid} from 'uuid'
import {NotFoundException} from "@nestjs/common"

describe('UpdateCourseService', () => {
	let service: UpdateCourseService
	let id: string
	let date: Date

	beforeEach(() => {
		service = new UpdateCourseService()
		id = uuid()
		date = new Date()
	})

	it('should update the data from the course with the informed id', async () => {
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
			findOne: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
			update: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse))
		}

		//@ts-expect-error defined part of methods
		service['coursesRepository'] = mockCourseRepository

		const updateCourseDto = {
			name: 'test',
			description: 'test-description',
			tags: ['test-tag'],
		}

		const updatedCourse = await service.execute(id, updateCourseDto)

		expect(mockCourseRepository.findOne).toBeCalled()
		expect(mockCourseRepository.update).toBeCalled()
		expect(updatedCourse).toStrictEqual(expectOutputCourse)

	})

	it('should fail due to non existent id', async () => {
		const wrongId = uuid()

		const updateCourseDto = {
			name: 'test',
			description: 'test-description',
			tags: ['test-tag'],
		}

		const mockCourseRepository = {
			findOne: jest.fn().mockReturnValue(undefined)
		}

		//@ts-expect-error defined part of methods
		service['coursesRepository'] = mockCourseRepository

		await expect(service.execute(wrongId, updateCourseDto)).rejects.toBeInstanceOf(NotFoundException)
	})
})
