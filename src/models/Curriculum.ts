import {
    Column,
    CreateDateColumn,
    Entity,
    Generated,
    ManyToOne,
    OneToMany,
    PrimaryColumn,
    UpdateDateColumn
} from 'typeorm'
import Candidate from './Candidate'
import CurriculumSkill from "./CurriculumSkill";
import CurriculumFormation from "./CurriculumFormation";
import CurriculumFormationAdditional from "./CurriculumFormationAdditional";
import CurriculumExperience from "./CurriculumExperience";
import CurriculumEvent from "./CurriculumEvent";
import CurriculumInformation from "./CurriculumInformation";

@Entity()
export default class Curriculum {
    @PrimaryColumn()
    @Generated('uuid')
    id: string

    @Column({default: false})
    evaluated: boolean

    @Column({nullable: true})
    goals?: string

    @OneToMany(() => CurriculumSkill, (reference) => reference.curriculum)
    skills: CurriculumSkill[]

    @OneToMany(() => CurriculumFormation, (reference) => reference.curriculum)
    formations: CurriculumFormation[]

    @OneToMany(() => CurriculumFormationAdditional, (reference) => reference.curriculum)
    formationsAdditional: CurriculumFormationAdditional[]

    @OneToMany(() => CurriculumExperience, (reference) => reference.curriculum)
    experiences: CurriculumExperience[]

    @OneToMany(() => CurriculumEvent, (reference) => reference.curriculum)
    events: CurriculumEvent[]

    @OneToMany(() => CurriculumInformation, (reference) => reference.curriculum)
    information: CurriculumInformation[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(() => Candidate, (reference) => reference.phones)
    candidate: Candidate

}
