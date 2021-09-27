import {Router} from "express";
import AuthorizationMiddleware from "../middlewares/AuthorizationMiddleware";
import EvaluatorAuthorizationMiddleware from "../middlewares/EvaluatorAuthorizationMiddleware";
import validate from "../utils/validate";
import EvaluationCreateSchema from "../schemas/evaluation/EvaluationCreateSchema";
import {__createEvaluation, __getEvaluations} from "../services/EvaluationService";

const routes = Router()

routes.get('/:curriculumId', AuthorizationMiddleware, async (req, res, next) => {
    try {
        const response = await __getEvaluations(req.params.curriculumId)
        res.send(response)
    } catch (err) {
        next(err)
    }
})

routes.post('/:curriculumId', AuthorizationMiddleware, EvaluatorAuthorizationMiddleware, async (req, res, next) => {
    try {
        req.body.evaluatorId = req.headers.authorizationId
        req.body.curriculumId = req.params.curriculumId
        const values = validate(EvaluationCreateSchema, req.body)
        await __createEvaluation(values)
        res.status(204).send()
    } catch (err) {
        next(err)
    }
})

export default routes
