import {Column, CreateDateColumn, Entity, Generated, ManyToOne, PrimaryColumn, UpdateDateColumn,} from 'typeorm'
import Evaluation from "./Evaluation";

@Entity()
export default class EvaluationFeedback {
    @PrimaryColumn()
    @Generated('uuid')
    id: string

    @Column()
    message: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(() => Evaluation, (reference) => reference.feedbacks)
    evaluation: Evaluation

}
