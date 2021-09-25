import {Column, CreateDateColumn, Entity, Generated, ManyToOne, PrimaryColumn, UpdateDateColumn} from 'typeorm'
import Candidate from './Candidate'

@Entity()
export default class CandidatePhone {
    @PrimaryColumn()
    @Generated('uuid')
    id: string

    @Column()
    phone: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(() => Candidate, (reference) => reference.phones)
    candidate: Candidate

}
