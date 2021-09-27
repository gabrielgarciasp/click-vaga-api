import {Column, CreateDateColumn, Entity, Generated, ManyToOne, PrimaryColumn, UpdateDateColumn,} from 'typeorm'
import Evaluator from "./Evaluator";
import Curriculum from "./Curriculum";

@Entity()
export default class Evaluation {
    @PrimaryColumn()
    @Generated('uuid')
    id: string

    @Column()
    approved: boolean

    @Column()
    message: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(() => Evaluator, (reference) => reference.evaluations)
    evaluator: Evaluator

    @ManyToOne(() => Curriculum, (reference) => reference.evaluations)
    curriculum: Curriculum

}
