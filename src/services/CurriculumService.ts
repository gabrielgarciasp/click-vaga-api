import Curriculum from "../models/Curriculum";
import {CurriculumSaveRequest} from "../types/curriculum/CurriculumSaveRequest";
import {getCandidateById} from "./CandidateService";
import {getRepository} from "typeorm";
import CurriculumSkill from "../models/CurriculumSkill";
import CurriculumFormation from "../models/CurriculumFormation";
import CurriculumFormationAdditional from "../models/CurriculumFormationAdditional";
import CurriculumExperience from "../models/CurriculumExperience";
import CurriculumEvent from "../models/CurriculumEvent";
import CurriculumInformation from "../models/CurriculumInformation";
import {CurriculumCreateRequest} from "../types/curriculum/CurriculumCreateRequest";
import {CurriculumUpdateRequest} from "../types/curriculum/CurriculumUpdateRequest";
import NotFoundError from "../exceptions/NotFoundError";
import ForbiddenError from "../exceptions/ForbiddenError";

async function getCurriculumById(id: string, ...relations: string[]): Promise<Curriculum> {
    const curriculum = await getRepository(Curriculum).findOne(id, {
        relations: relations,
    })

    if (curriculum == undefined) {
        throw new NotFoundError('Curriculum not found')
    }

    return curriculum
}

async function setCurriculumEvaluated(curriculumId: string, evaluated: boolean) {
    const curriculum = await getCurriculumById(curriculumId);
    curriculum.evaluated = evaluated;

    await getRepository(Curriculum).save(curriculum)
}

async function _saveCurriculum(entity: CurriculumSaveRequest) {
    const curriculum = new Curriculum()
    if (entity.id != undefined) {
        curriculum.id = entity.id
    }

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

async function __getCurriculumsCandidate(candidateId: string): Promise<Curriculum[]> {
    return await getRepository(Curriculum).find({
        where: {
            candidate: {
                id: candidateId
            }
        },
        order: {
            evaluated: "DESC",
            name: "ASC"
        }
    })
}

async function __getCurriculumsEvaluator(): Promise<Curriculum[]> {
    return await getRepository(Curriculum).find({
        relations: ['candidate'],
        order: {
            evaluated: "DESC",
            updatedAt: "ASC"
        }
    })
}

async function __createCurriculum(entity: CurriculumCreateRequest) {
    await _saveCurriculum({
        ...entity,
        id: undefined,
    })
}

async function __updateCurriculum(entity: CurriculumUpdateRequest) {
    const curriculum = await getCurriculumById(entity.id, 'candidate')

    const candidate = await curriculum.candidate;

    if (candidate.id !== entity.candidateId) {
        throw new ForbiddenError('This candidate does not owner this curriculum.')
    }

    const where = {
        curriculum: {
            id: entity.id,
        },
    }

    // delete all children
    await getRepository(CurriculumSkill).delete(where)
    await getRepository(CurriculumFormation).delete(where)
    await getRepository(CurriculumFormationAdditional).delete(where)
    await getRepository(CurriculumExperience).delete(where)
    await getRepository(CurriculumEvent).delete(where)
    await getRepository(CurriculumInformation).delete(where)

    await _saveCurriculum(entity)
}

async function __deleteCurriculum(curriculumId: string, candidateId: string) {
    const curriculum = await getCurriculumById(curriculumId, 'candidate')

    if (curriculum.candidate.id !== candidateId) {
        throw new ForbiddenError('This candidate does not owner this curriculum.')
    }

    await getRepository(Curriculum).delete({id: curriculumId})
}

async function __getCurriculum(curriculumId: string): Promise<Curriculum> {
    return getCurriculumById(curriculumId)
}

export {
    getCurriculumById,
    setCurriculumEvaluated,
    __getCurriculumsCandidate,
    __getCurriculumsEvaluator,
    __createCurriculum,
    __updateCurriculum,
    __deleteCurriculum,
    __getCurriculum
}
