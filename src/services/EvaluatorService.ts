import {getRepository} from "typeorm";
import ConflictError from "../exceptions/ConflictError";
import {compare, encrypt} from "../utils/bcrypt";
import NotFoundError from "../exceptions/NotFoundError";
import {sign} from "../utils/jwt";
import {EvaluatorCreateRequest} from "../types/evaluator/EvaluatorCreateRequest";
import Evaluator from "../models/Evaluator";
import {EvaluatorUpdateRequest} from "../types/evaluator/EvaluatorUpdateRequest";
import {EvaluatorAuthenticateRequest} from "../types/evaluator/EvaluatorAuthenticateRequest";
import {EvaluatorAuthenticateResponse} from "../types/evaluator/EvaluatorAuthenticateResponse";

async function _checkExistsEvaluatorByEmail(email: string): Promise<boolean> {
    const repository = getRepository(Evaluator)

    return await repository.count({
        where: {
            email
        }
    }) > 0
}

async function _getEvaluatorByEmail(email: string): Promise<Evaluator> {
    const evaluator = await getRepository(Evaluator)
        .findOne({
            where: {
                email
            }
        })

    if (evaluator == undefined) {
        throw new NotFoundError('Evaluator not found')
    }

    return evaluator
}

async function getEvaluatorById(id: string): Promise<Evaluator> {
    const evaluator = await getRepository(Evaluator)
        .findOne({
            where: {
                id
            }
        })

    if (evaluator == undefined) {
        throw new NotFoundError('Evaluator not found')
    }

    return evaluator
}

async function authenticateEvaluator(entity: EvaluatorAuthenticateRequest): Promise<EvaluatorAuthenticateResponse> {
    const defaultError = new NotFoundError('Email or Password Incorrect');

    let evaluator;

    try {
        evaluator = await _getEvaluatorByEmail(entity.email)
    } catch (e) {
        throw defaultError
    }

    if (!await compare(entity.password, evaluator.password)) {
        throw defaultError
    }

    const token = sign({
        id: evaluator.id
    }, 60 * 60) // 1 hour

    return {
        token,
    }
}

async function createEvaluator(entity: EvaluatorCreateRequest) {
    if (await _checkExistsEvaluatorByEmail(entity.email)) {
        throw new ConflictError('This email is already in use')
    }

    const evaluator = new Evaluator()
    evaluator.email = entity.email
    evaluator.password = await encrypt(entity.password)
    evaluator.name = entity.name
    evaluator.phone = entity.phone

    await getRepository(Evaluator).save(evaluator)
}

async function updateEvaluator(entity: EvaluatorUpdateRequest) {
    const evaluator = new Evaluator()
    evaluator.id = entity.id
    evaluator.email = entity.email
    evaluator.password = await encrypt(entity.password)
    evaluator.name = entity.name
    evaluator.phone = entity.phone

    await getRepository(Evaluator).save(evaluator)
}

export {getEvaluatorById, authenticateEvaluator, createEvaluator, updateEvaluator}
