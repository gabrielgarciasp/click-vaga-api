import {Router} from "express";
import AuthorizationMiddleware from "../middlewares/AuthorizationMiddleware";
import {
    createCurriculum,
    deleteCurriculum,
    getCurriculums,
    getCurriculumsByCandidateId,
    updateCurriculum
} from "../services/CurriculumService";
import validate from "../utils/validate";
import CurriculumCreateSchema from "../schemas/curriculum/CurriculumCreateSchema";
import CandidateAuthorizationMiddleware from "../middlewares/CandidateAuthorizationMiddleware";
import EvaluatorAuthorizationMiddleware from "../middlewares/EvaluatorAuthorizationMiddleware";

const routes = Router()

routes.get('/candidate', AuthorizationMiddleware, CandidateAuthorizationMiddleware, async (req, res, next) => {
    try {
        const response = await getCurriculumsByCandidateId(String(req.headers.authorizationId))
        res.send(response)
    } catch (err) {
        next(err)
    }
})

routes.get('/evaluator', AuthorizationMiddleware, EvaluatorAuthorizationMiddleware, async (req, res, next) => {
    try {
        const response = await getCurriculums()
        res.send(response)
    } catch (err) {
        next(err)
    }
})

routes.post('/', AuthorizationMiddleware, CandidateAuthorizationMiddleware, async (req, res, next) => {
    try {
        req.body.candidateId = req.headers.authorizationId
        const values = validate(CurriculumCreateSchema, req.body)
        await createCurriculum(values)
        res.status(204).send()
    } catch (err) {
        next(err)
    }
})

routes.put('/:id', AuthorizationMiddleware, CandidateAuthorizationMiddleware, async (req, res, next) => {
    try {
        req.body.id = req.params.id
        req.body.candidateId = req.headers.authorizationId
        const values = validate(CurriculumCreateSchema, req.body)
        await updateCurriculum(values)
        res.status(204).send()
    } catch (err) {
        next(err)
    }
})

routes.delete('/:id', AuthorizationMiddleware, CandidateAuthorizationMiddleware, async (req, res, next) => {
    try {
        await deleteCurriculum(req.params.id, String(req.headers.authorizationId))
        res.status(204).send()
    } catch (err) {
        next(err)
    }
})

export default routes
