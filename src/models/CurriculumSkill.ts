import {Column, CreateDateColumn, Entity, Generated, ManyToOne, PrimaryColumn, UpdateDateColumn} from 'typeorm'
import Curriculum from "./Curriculum";

@Entity()
export default class CurriculumSkill {
    @PrimaryColumn()
    @Generated('uuid')
    id: string

    @Column()
    name: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(() => Curriculum, (reference) => reference.skills, {
        onDelete: 'CASCADE',
    })
    curriculum: Curriculum

}
