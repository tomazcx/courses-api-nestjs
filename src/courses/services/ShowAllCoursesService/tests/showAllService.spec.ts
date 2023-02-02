import {v4 as uuid} from 'uuid'
import {ShowAllCoursesService} from '..'

describe('ShowAllCoursesService', () => {
	let service: ShowAllCoursesService
	let id: string
	let date: Date

	beforeEach(async () => {
		service = new ShowAllCoursesService()
		id = uuid()
		date = new Date()
	})

	it('should show all courses', async () => {

		const expectOutputTags = [
			{
				id,
				name: 'test-tag',
				updated_at: date,
				created_at: date,
				courses: []
			}
		]
		const expectOutputCoursesList = [{
			id,
			name: 'test',
			description: 'test-description',
			tags: expectOutputTags,
			created_at: date,
			updated_at: date
		}]

		const mockCourseRepository = {
			findAll: jest.fn().mockReturnValue(Promise.resolve(expectOutputCoursesList))
		}

		//@ts-expect-error defined part of methods
		service['coursesRepository'] = mockCourseRepository

		const courses = await service.execute()

		expect(mockCourseRepository.findAll).toBeCalled()
		expect(courses).toStrictEqual(expectOutputCoursesList)
	})
})
