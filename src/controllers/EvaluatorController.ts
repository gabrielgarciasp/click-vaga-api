import {Router} from "express";
import validate from "../utils/validate";
import AuthorizationMiddleware from "../middlewares/AuthorizationMiddleware";
import {
    __authenticateEvaluator,
    __createEvaluator,
    __getEvaluator,
    __updateEvaluator
} from "../services/EvaluatorService";
import EvaluatorAuthenticateSchema from "../schemas/evaluator/EvaluatorAuthenticateSchema";
import EvaluatorCreateSchema from "../schemas/evaluator/EvaluatorCreateSchema";
import EvaluatorUpdateSchema from "../schemas/evaluator/EvaluatorUpdateSchema";
import EvaluatorAuthorizationMiddleware from "../middlewares/EvaluatorAuthorizationMiddleware";

const routes = Router()

routes.get('/', AuthorizationMiddleware, EvaluatorAuthorizationMiddleware, async (req, res, next) => {
    try {
        const response = await __getEvaluator(String(req.headers.authorizationId))
        res.send(response)
    } catch (err) {
        next(err)
    }
})

routes.post('/', async (req, res, next) => {
    try {
        const values = validate(EvaluatorCreateSchema, req.body)
        await __createEvaluator(values)
        res.status(204).send()
    } catch (err) {
        next(err)
    }
})

routes.put('/', AuthorizationMiddleware, EvaluatorAuthorizationMiddleware, async (req, res, next) => {
    try {
        req.body.id = req.headers.authorizationId
        const values = validate(EvaluatorUpdateSchema, req.body)
        await __updateEvaluator(values)
        res.status(204).send()
    } catch (err) {
        next(err)
    }
})

routes.post('/authenticate', async (req, res, next) => {
    try {
        const values = validate(EvaluatorAuthenticateSchema, req.body)
        const response = await __authenticateEvaluator(values)
        res.status(200).send(response)
    } catch (err) {
        next(err)
    }
})

export default routes
