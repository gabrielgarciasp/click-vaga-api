import {NextFunction, Request, Response, Router} from 'express'

import ApiError from './exceptions/ApiError'
import CandidateController from "./controllers/CandidateController";

const routes = Router()

routes.use('/candidate', CandidateController)

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
