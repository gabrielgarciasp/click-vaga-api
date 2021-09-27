import {Router} from "express";
import AuthorizationMiddleware from "../middlewares/AuthorizationMiddleware";
import {
    __createCurriculum,
    __deleteCurriculum,
    __getCurriculum,
    __getCurriculumsCandidate,
    __getCurriculumsEvaluator,
    __updateCurriculum
} from "../services/CurriculumService";
import validate from "../utils/validate";
import CurriculumCreateSchema from "../schemas/curriculum/CurriculumCreateSchema";
import CandidateAuthorizationMiddleware from "../middlewares/CandidateAuthorizationMiddleware";
import EvaluatorAuthorizationMiddleware from "../middlewares/EvaluatorAuthorizationMiddleware";

const routes = Router()

routes.post('/', AuthorizationMiddleware, CandidateAuthorizationMiddleware, async (req, res, next) => {
    try {
        req.body.candidateId = req.headers.authorizationId
        const values = validate(CurriculumCreateSchema, req.body)
        await __createCurriculum(values)
        res.status(204).send()
    } catch (err) {
        next(err)
    }
})

routes.get('/:id', AuthorizationMiddleware, CandidateAuthorizationMiddleware, async (req, res, next) => {
    try {
        const response = await __getCurriculum(req.params.id)
        res.send(response)
    } catch (err) {
        next(err)
    }
})

routes.put('/:id', AuthorizationMiddleware, CandidateAuthorizationMiddleware, async (req, res, next) => {
    try {
        req.body.id = req.params.id
        req.body.candidateId = req.headers.authorizationId
        const values = validate(CurriculumCreateSchema, req.body)
        await __updateCurriculum(values)
        res.status(204).send()
    } catch (err) {
        next(err)
    }
})

routes.delete('/:id', AuthorizationMiddleware, CandidateAuthorizationMiddleware, async (req, res, next) => {
    try {
        await __deleteCurriculum(req.params.id, String(req.headers.authorizationId))
        res.status(204).send()
    } catch (err) {
        next(err)
    }
})

routes.get('/candidate', AuthorizationMiddleware, CandidateAuthorizationMiddleware, async (req, res, next) => {
    try {
        const response = await __getCurriculumsCandidate(String(req.headers.authorizationId))
        res.send(response)
    } catch (err) {
        next(err)
    }
})

routes.get('/evaluator', AuthorizationMiddleware, EvaluatorAuthorizationMiddleware, async (req, res, next) => {
    try {
        const response = await __getCurriculumsEvaluator()
        res.send(response)
    } catch (err) {
        next(err)
    }
})

export default routes
