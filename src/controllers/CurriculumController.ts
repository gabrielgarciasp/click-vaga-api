import {Router} from "express";
import AuthorizationMiddleware from "../middlewares/AuthorizationMiddleware";
import {createCurriculum, deleteCurriculum, updateCurriculum} from "../services/CurriculumService";
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

routes.put('/:id', AuthorizationMiddleware, async (req, res, next) => {
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

routes.delete('/:id', AuthorizationMiddleware, async (req, res, next) => {
    try {
        await deleteCurriculum(req.params.id, String(req.headers.authorizationId))
        res.status(204).send()
    } catch (err) {
        next(err)
    }
})

export default routes
