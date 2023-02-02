import {ITag} from "./ITag"

export interface ICourse {
	id: string
	name: string
	description: string
	tags: ITag[]
	created_at: Date
	updated_at: Date
}
