import {Router} from "express";
import {
    __authenticateCandidate,
    __createCandidate,
    __getCandidate,
    __updateCandidate,
    __updatePicture
} from "../services/CandidateService";
import validate from "../utils/validate";
import CandidateCreateSchema from "../schemas/candidate/CandidateCreateSchema";
import CandidateAuthenticateSchema from "../schemas/candidate/CandidateAuthenticateSchema";
import CandidateUpdateSchema from "../schemas/candidate/CandidateUpdateSchema";
import AuthorizationMiddleware from "../middlewares/AuthorizationMiddleware";
import CandidateAuthorizationMiddleware from "../middlewares/CandidateAuthorizationMiddleware";
import CandidatePictureSchema from "../schemas/candidate/CandidatePictureSchema";

const routes = Router()

routes.get('/', AuthorizationMiddleware, CandidateAuthorizationMiddleware, async (req, res, next) => {
    try {
        const response = await __getCandidate(String(req.headers.authorizationId))
        res.send(response)
    } catch (err) {
        next(err)
    }
})

routes.post('/', async (req, res, next) => {
    try {
        const values = validate(CandidateCreateSchema, req.body)
        await __createCandidate(values)
        res.status(204).send()
    } catch (err) {
        next(err)
    }
})

routes.put('/', AuthorizationMiddleware, CandidateAuthorizationMiddleware, async (req, res, next) => {
    try {
        req.body.id = req.headers.authorizationId
        const values = validate(CandidateUpdateSchema, req.body)
        await __updateCandidate(values)
        res.status(204).send()
    } catch (err) {
        next(err)
    }
})

routes.post('/authenticate', async (req, res, next) => {
    try {
        const values = validate(CandidateAuthenticateSchema, req.body)
        const response = await __authenticateCandidate(values)
        res.status(200).send(response)
    } catch (err) {
        next(err)
    }
})

routes.patch('/picture', AuthorizationMiddleware, CandidateAuthorizationMiddleware, async (req, res, next) => {
    try {
        req.body.candidateId = req.headers.authorizationId
        const values = validate(CandidatePictureSchema, req.body)
        await __updatePicture(values)
        res.status(204).send()
    } catch (err) {
        next(err)
    }
})

export default routes
