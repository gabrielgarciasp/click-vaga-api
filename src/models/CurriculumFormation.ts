import {Column, CreateDateColumn, Entity, Generated, ManyToOne, PrimaryColumn, UpdateDateColumn} from 'typeorm'
import Curriculum from "./Curriculum";

@Entity()
export default class CurriculumFormation {
    @PrimaryColumn()
    @Generated('uuid')
    id: string

    @Column()
    type: string

    @Column()
    course: string

    @Column()
    institution: string

    @Column()
    finishDate: Date

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(() => Curriculum, (reference) => reference.formations, {
        onDelete: 'CASCADE'
    })
    curriculum: Curriculum

}
