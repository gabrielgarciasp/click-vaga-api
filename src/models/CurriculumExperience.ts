import {Column, CreateDateColumn, Entity, Generated, ManyToOne, PrimaryColumn, UpdateDateColumn} from 'typeorm'
import Curriculum from "./Curriculum";

@Entity()
export default class CurriculumExperience {
    @PrimaryColumn()
    @Generated('uuid')
    id: string

    @Column()
    company: string

    @Column()
    position: string

    @Column()
    description: string

    @Column()
    startDate: Date

    @Column({nullable: true})
    endDate?: Date

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(() => Curriculum, (reference) => reference.experiences, {
        onDelete: 'CASCADE'
    })
    curriculum: Curriculum

}
