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
import CurriculumSkill from "./CurriculumSkill";
import CurriculumFormation from "./CurriculumFormation";
import CurriculumFormationAdditional from "./CurriculumFormationAdditional";
import CurriculumExperience from "./CurriculumExperience";
import CurriculumEvent from "./CurriculumEvent";
import CurriculumInformation from "./CurriculumInformation";
import Candidate from "./Candidate";

@Entity()
export default class Curriculum {
    @PrimaryColumn()
    @Generated('uuid')
    id: string

    @Column()
    name: string

    @Column({nullable: true})
    picture?: string

    @Column({default: false})
    evaluated: boolean

    @Column({nullable: true})
    goals?: string

    @OneToMany(() => CurriculumSkill, (reference) => reference.curriculum, {
        cascade: ['insert', 'remove'],
    })
    skills: CurriculumSkill[]

    @OneToMany(() => CurriculumFormation, (reference) => reference.curriculum, {
        cascade: ['insert', 'remove'],
    })
    formations: CurriculumFormation[]

    @OneToMany(() => CurriculumFormationAdditional, (reference) => reference.curriculum, {
        cascade: ['insert', 'remove'],
    })
    formationsAdditional: CurriculumFormationAdditional[]

    @OneToMany(() => CurriculumExperience, (reference) => reference.curriculum, {
        cascade: ['insert', 'remove'],
    })
    experiences: CurriculumExperience[]

    @OneToMany(() => CurriculumEvent, (reference) => reference.curriculum, {
        cascade: ['insert', 'remove'],
    })
    events: CurriculumEvent[]

    @OneToMany(() => CurriculumInformation, (reference) => reference.curriculum, {
        cascade: ['insert', 'remove'],
    })
    information: CurriculumInformation[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(() => Candidate, (reference) => reference.curriculums)
    candidate: Candidate

}
