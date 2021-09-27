import {EvaluationCreateRequest} from "../types/evaluation/EvaluationCreateRequest";
import Evaluation from "../models/Evaluation";
import {getEvaluatorById} from "./EvaluatorService";
import {getCurriculumById, setCurriculumEvaluated} from "./CurriculumService";
import {getRepository} from "typeorm";

async function __getEvaluations(curriculumId: string): Promise<Evaluation[]> {
    return await getRepository(Evaluation).find({
        where: {
            curriculum: {
                id: curriculumId,
            }
        },
        order: {
            createdAt: "ASC"
        }
    })
}

async function __createEvaluation(entity: EvaluationCreateRequest) {
    const evaluation = new Evaluation()
    evaluation.evaluator = await getEvaluatorById(entity.evaluatorId)
    evaluation.curriculum = await getCurriculumById(entity.curriculumId)
    evaluation.approved = entity.approved
    evaluation.message = entity.message

    await getRepository(Evaluation).save(evaluation)

    await setCurriculumEvaluated(evaluation.curriculum.id, true)
}

export {__getEvaluations, __createEvaluation}
