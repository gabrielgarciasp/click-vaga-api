import {Column, CreateDateColumn, Entity, Generated, PrimaryColumn, UpdateDateColumn,} from 'typeorm'

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

    @Column()
    phone: string

    @Column({nullable: true})
    birthDate?: Date

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

    @Column({nullable: true})
    picture?: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

}
