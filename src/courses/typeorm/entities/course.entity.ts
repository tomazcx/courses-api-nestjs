import {ICourse} from "src/courses/interfaces/models/ICourse"
import {BeforeInsert, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm"
import {Tag} from "./tag.entity"
import {v4 as uuid} from 'uuid'

@Entity('courses') //nome da tabela no banco de dados
export class Course implements ICourse {

	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column()
	name: string

	@Column()
	description: string

	@JoinTable({name: 'courses_tags'})
	@ManyToMany(() => Tag, tag => tag.courses, {
		cascade: true
	})
	tags: Tag[]

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
