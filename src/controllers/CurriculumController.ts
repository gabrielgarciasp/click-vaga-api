import {Router} from "express";
import AuthorizationMiddleware from "../middlewares/AuthorizationMiddleware";
import {createCurriculum} from "../services/CurriculumService";
import validate from "../utils/validate";
import CurriculumCreateSchema from "../schemas/curriculum/CurriculumCreateSchema";

const routes = Router()

routes.post('/', AuthorizationMiddleware, async (req, res, next) => {
    try {
        req.body.candidateId = req.headers.authorizationId
        const values = validate(CurriculumCreateSchema, req.body)
        await createCurriculum(values)
        res.status(204).send()
    } catch (err) {
        next(err)
    }
})

export default routes
