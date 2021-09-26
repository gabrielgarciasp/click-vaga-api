import {Column, CreateDateColumn, Entity, Generated, ManyToOne, PrimaryColumn, UpdateDateColumn} from 'typeorm'
import Curriculum from "./Curriculum";

@Entity()
export default class CurriculumInformation {
    @PrimaryColumn()
    @Generated('uuid')
    id: string

    @Column()
    description: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(() => Curriculum, (reference) => reference.information, {
        onDelete: 'CASCADE'
    })
    curriculum: Curriculum

}
