import {
    Column,
    CreateDateColumn,
    Entity,
    Generated,
    ManyToOne,
    OneToMany,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm'
import Evaluator from "./Evaluator";
import EvaluationFeedback from "./EvaluationFeedback";

@Entity()
export default class Evaluation {
    @PrimaryColumn()
    @Generated('uuid')
    id: string

    @OneToMany(() => EvaluationFeedback, (reference) => reference.evaluation)
    feedbacks: EvaluationFeedback[]

    @Column()
    approved: boolean

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(() => Evaluator, (reference) => reference.evaluations)
    evaluator: Evaluator

}
