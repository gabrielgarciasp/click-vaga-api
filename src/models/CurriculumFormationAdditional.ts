import {Column, CreateDateColumn, Entity, Generated, ManyToOne, PrimaryColumn, UpdateDateColumn} from 'typeorm'
import Curriculum from "./Curriculum";

@Entity()
export default class CurriculumFormationAdditional {
    @PrimaryColumn()
    @Generated('uuid')
    id: string

    @Column()
    course: string

    @Column()
    hours: number

    @Column()
    institution: string

    @Column()
    finishDate: Date

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(() => Curriculum, (reference) => reference.formationsAdditional, {
        onDelete: 'CASCADE'
    })
    curriculum: Curriculum

}
