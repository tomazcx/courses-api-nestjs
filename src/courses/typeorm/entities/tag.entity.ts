import {ITag} from "src/courses/interfaces/models/ITag";
import {BeforeInsert, Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Course} from "./course.entity";
import {v4 as uuid} from 'uuid'

@Entity('tags')
export class Tag implements ITag {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column({unique: true})
	name: string

	@ManyToMany(() => Course, course => course.tags)
	courses: Course[]

	@CreateDateColumn({type: 'timestamp'})
	created_at: Date

	@UpdateDateColumn({type: 'timestamp'})
	updated_at: Date

	@BeforeInsert()
	generateId() {
		if (this.id) {
			return
		}

		this.id = uuid()
	}

}
