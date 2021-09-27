import {Router} from "express";
import AuthorizationMiddleware from "../middlewares/AuthorizationMiddleware";
import {__uploadFile} from "../services/File";

const routes = Router()

routes.post('/upload', AuthorizationMiddleware, (req, res, next) => {
    try {
        const response = __uploadFile(req.files)
        res.send(response)
    } catch (err) {
        next(err)
    }
})

export default routes
