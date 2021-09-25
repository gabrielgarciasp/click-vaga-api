import {Column, CreateDateColumn, Entity, Generated, OneToMany, PrimaryColumn, UpdateDateColumn,} from 'typeorm'
import Evaluation from "./Evaluation";

@Entity()
export default class Evaluator {
    @PrimaryColumn()
    @Generated('uuid')
    id: string

    @Column({unique: true})
    email: string

    @Column()
    password: string

    @Column()
    name: string

    @Column()
    phone: string

    @OneToMany(() => Evaluation, (reference) => reference.evaluator)
    evaluations: Evaluation[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

}
