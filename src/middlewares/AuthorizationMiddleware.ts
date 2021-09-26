import {NextFunction, Request, Response} from 'express'

import BadRequestError from '../exceptions/BadRequestError'
import {verify} from '../utils/jwt'

export default (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    if (authHeader == undefined) {
        return next(new BadRequestError('No token provided'))
    }

    const parts = authHeader.split(' ')

    if (parts.length !== 2) {
        return next(new BadRequestError('Token invalid'))
    }

    const [scheme, token] = parts

    if (!/^Bearer$/i.test(scheme)) {
        return next(new BadRequestError('Token malformed'))
    }

    let tokenDecoded: any

    try {
        tokenDecoded = verify(token) as any
        req.headers.authorizationId = tokenDecoded.id
    } catch (err) {
        return next(new BadRequestError('Token invalid'))
    }

    next()
}
