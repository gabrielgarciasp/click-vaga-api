import {CandidateCreateRequest} from "../types/candidate/CandidateCreateRequest";
import {getRepository} from "typeorm";
import Candidate from "../models/Candidate";
import ConflictError from "../exceptions/ConflictError";
import {compare, encrypt} from "../utils/bcrypt";
import NotFoundError from "../exceptions/NotFoundError";
import {CandidateAuthenticateRequest} from "../types/candidate/CandidateAuthenticateRequest";
import {sign} from "../utils/jwt";
import {CandidateAuthenticateResponse} from "../types/candidate/CandidateAuthenticateResponse";
import {CandidateUpdateRequest} from "../types/candidate/CandidateUpdateRequest";

async function _checkExistsCandidateByEmail(email: string) {
    const repository = getRepository(Candidate)

    return await repository.count({
        where: {
            email
        }
    }) > 0
}

async function _getCandidateByEmail(email: string) {
    const candidate = await getRepository(Candidate)
        .findOne({
            where: {
                email
            }
        })

    if (candidate == undefined) {
        throw new NotFoundError('Candidate not found')
    }

    return candidate
}

async function authenticateCandidate(entity: CandidateAuthenticateRequest): Promise<CandidateAuthenticateResponse> {
    const defaultError = new NotFoundError('Email or Password Incorrect');

    let candidate;

    try {
        candidate = await _getCandidateByEmail(entity.email)
    } catch (e) {
        throw defaultError
    }

    if (!await compare(entity.password, candidate.password)) {
        throw defaultError
    }

    const token = sign({
        id: candidate.id
    }, 60 * 60) // 1 hour

    return {
        token,
    }
}

async function createCandidate(entity: CandidateCreateRequest) {
    if (await _checkExistsCandidateByEmail(entity.email)) {
        throw new ConflictError('This email is already in use')
    }

    const candidate = new Candidate()
    candidate.email = entity.email
    candidate.password = await encrypt(entity.password)
    candidate.name = entity.name
    candidate.gender = entity.gender
    candidate.phone = entity.phone

    await getRepository(Candidate).save(candidate)
}

async function updateCandidate(entity: CandidateUpdateRequest) {
    const candidate = new Candidate()
    candidate.id = entity.id
    candidate.email = entity.email
    candidate.password = await encrypt(entity.password)
    candidate.name = entity.name
    candidate.gender = entity.gender
    candidate.birthDate = entity.birthDate
    candidate.phone = entity.phone
    candidate.cep = entity.cep
    candidate.address = entity.address
    candidate.number = entity.number
    candidate.district = entity.district
    candidate.city = entity.city
    candidate.state = entity.state

    await getRepository(Candidate).save(candidate)
}

export {authenticateCandidate, createCandidate, updateCandidate}
