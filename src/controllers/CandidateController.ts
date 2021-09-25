import {Router} from "express";
import {authenticateCandidate, createCandidate, updateCandidate} from "../services/CandidateService";
import validate from "../utils/validate";
import CandidateCreateSchema from "../schemas/candidate/CandidateCreateSchema";
import CandidateAuthenticateSchema from "../schemas/candidate/CandidateAuthenticateSchema";
import CandidateUpdateSchema from "../schemas/candidate/CandidateUpdateSchema";
import AuthorizationMiddleware from "../middlewares/AuthorizationMiddleware";

const routes = Router()

routes.post('/authenticate', async (req, res, next) => {
    try {
        const values = validate(CandidateAuthenticateSchema, req.body)
        const response = await authenticateCandidate(values)
        res.status(200).send(response)
    } catch (err) {
        next(err)
    }
})

routes.post('/', async (req, res, next) => {
    try {
        const values = validate(CandidateCreateSchema, req.body)
        await createCandidate(values)
        res.status(204).send()
    } catch (err) {
        next(err)
    }
})

routes.put('/', AuthorizationMiddleware, async (req, res, next) => {
    try {
        req.body.id = req.headers.authorizationId
        const values = validate(CandidateUpdateSchema, req.body)
        await updateCandidate(values)
        res.status(204).send()
    } catch (err) {
        next(err)
    }
})

export default routes
