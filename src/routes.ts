import {NextFunction, Request, Response, Router} from 'express'

import ApiError from './exceptions/ApiError'
import CandidateController from "./controllers/CandidateController";
import CurriculumController from "./controllers/CurriculumController";
import EvaluatorController from "./controllers/EvaluatorController";
import EvaluationController from "./controllers/EvaluationController";
import FileController from "./controllers/FileController";

const routes = Router()

routes.use('/candidate', CandidateController)
routes.use('/curriculum', CurriculumController)
routes.use('/evaluator', EvaluatorController)
routes.use('/evaluation', EvaluationController)
routes.use('/file', FileController)

routes.get('/hello', (req: Request, res: Response) => {
    res.send('world')
})

routes.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
    if (err.statusCode != undefined) {
        return res
            .status(err.statusCode)
            .send({...err, statusCode: undefined})
    }

    if (process.env.DEBUG_MODE === 'true') {
        console.log(err)
        res.status(500).send(err)
    } else {
        res.status(500).send({message: 'Internal error'})
    }
})

export default routes
