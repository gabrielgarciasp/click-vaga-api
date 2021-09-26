import {NextFunction, Request, Response} from 'express'
import BadRequestError from "../exceptions/BadRequestError";
import {getEvaluatorById} from "../services/EvaluatorService";

export default async (req: Request, res: Response, next: NextFunction) => {
    const authorizationId = req.headers.authorizationId;

    if (authorizationId == undefined) {
        throw new BadRequestError('Id not found in middleware')
    }

    try {
        await getEvaluatorById(String(authorizationId))
    } catch (e) {
        next(e)
    }

    next()
}
