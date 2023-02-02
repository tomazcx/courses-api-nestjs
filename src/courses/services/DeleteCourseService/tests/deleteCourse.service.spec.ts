import {DeleteCourseService} from ".."
import {v4 as uuid} from 'uuid'
import {NotFoundException} from "@nestjs/common"

describe('DeleteCourseService', () => {
	let service: DeleteCourseService
	let id: string
	let date: Date

	beforeEach(async () => {
		service = new DeleteCourseService()
		id = uuid()
		date = new Date()
	})

	it('should delete a course', async () => {

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
			delete: jest.fn().mockReturnValue(Promise.resolve())
		}


		//@ts-expect-error defined part of methods
		service['coursesRepository'] = mockCourseRepository

		await service.execute(id)

		expect(mockCourseRepository.findOne).toBeCalled()
		expect(mockCourseRepository.delete).toBeCalled()
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
