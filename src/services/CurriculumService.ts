import Curriculum from "../models/Curriculum";
import {CurriculumCreateRequest} from "../types/curriculum/CurriculumCreateRequest";
import {getCandidateById} from "./CandidateService";
import {getRepository} from "typeorm";
import CurriculumSkill from "../models/CurriculumSkill";
import CurriculumFormation from "../models/CurriculumFormation";
import CurriculumFormationAdditional from "../models/CurriculumFormationAdditional";
import CurriculumExperience from "../models/CurriculumExperience";
import CurriculumEvent from "../models/CurriculumEvent";
import CurriculumInformation from "../models/CurriculumInformation";

const createCurriculum = async (entity: CurriculumCreateRequest) => {
    const curriculum = new Curriculum()
    curriculum.candidate = await getCandidateById(entity.candidateId)
    curriculum.name = entity.name
    curriculum.goals = entity.goals
    curriculum.picture = entity.picture

    curriculum.skills = []
    entity.skills.forEach(skill => {
        const curriculumSkill = new CurriculumSkill()
        curriculumSkill.name = skill.name
        curriculum.skills.push(curriculumSkill)
    })

    curriculum.formations = []
    entity.formations.forEach(formation => {
        const curriculumFormation = new CurriculumFormation()
        curriculumFormation.type = formation.type
        curriculumFormation.course = formation.course
        curriculumFormation.institution = formation.institution
        curriculumFormation.finishDate = formation.finishDate
        curriculum.formations.push(curriculumFormation)
    })

    curriculum.formationsAdditional = []
    entity.formationsAdditional.forEach(formationAdditional => {
        const curriculumFormationAdditional = new CurriculumFormationAdditional()
        curriculumFormationAdditional.course = formationAdditional.course
        curriculumFormationAdditional.hours = formationAdditional.hours
        curriculumFormationAdditional.institution = formationAdditional.institution
        curriculumFormationAdditional.finishDate = formationAdditional.finishDate
        curriculum.formationsAdditional.push(curriculumFormationAdditional)
    })

    curriculum.experiences = []
    entity.experiences.forEach(experience => {
        const curriculumExperience = new CurriculumExperience();
        curriculumExperience.company = experience.company
        curriculumExperience.position = experience.position
        curriculumExperience.description = experience.description
        curriculumExperience.startDate = experience.startDate
        curriculumExperience.endDate = experience.endDate
        curriculum.experiences.push(curriculumExperience)
    })

    curriculum.events = []
    entity.events.forEach(event => {
        const curriculumEvent = new CurriculumEvent()
        curriculumEvent.name = event.name
        curriculumEvent.description = event.description
        curriculum.events.push(curriculumEvent)
    })

    curriculum.information = []
    entity.information.forEach(information => {
        const curriculumInformation = new CurriculumInformation()
        curriculumInformation.description = information.description
        curriculum.information.push(curriculumInformation)
    })

    await getRepository(Curriculum).save(curriculum)
}

export {createCurriculum}
