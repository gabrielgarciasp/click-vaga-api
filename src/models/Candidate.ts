import {Column, CreateDateColumn, Entity, Generated, OneToMany, PrimaryColumn, UpdateDateColumn,} from 'typeorm'
import CandidatePhone from './CandidatePhone'

@Entity()
export default class Candidate {
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
    gender: string

    @OneToMany(() => CandidatePhone, (reference) => reference.candidate)
    phones: CandidatePhone[]

    @Column({nullable: true})
    birdDate?: Date

    @Column({nullable: true})
    cep?: string

    @Column({nullable: true})
    address?: string

    @Column({nullable: true})
    number?: string

    @Column({nullable: true})
    district?: string

    @Column({nullable: true})
    city?: string

    @Column({nullable: true})
    state?: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

}
