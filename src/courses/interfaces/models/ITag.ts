import {ICourse} from "./ICourse"

export interface ITag {
	id: string
	name: string
	created_at: Date
	updated_at: Date
	courses: ICourse[]
}
