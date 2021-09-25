import {CandidateCreateRequest} from "../types/candidate/CandidateCreateRequest";
import {getRepository} from "typeorm";
import Candidate from "../models/Candidate";
import ConflictError from "../exceptions/ConflictError";
import CandidatePhone from "../models/CandidatePhone";
import {compare, encrypt} from "../utils/bcrypt";
import NotFoundError from "../exceptions/NotFoundError";
import {CandidateAuthenticateRequest} from "../types/candidate/CandidateAuthenticateRequest";
import {sign} from "../utils/jwt";
import {CandidateAuthenticateResponse} from "../types/candidate/CandidateAuthenticateResponse";
import {CandidateUpdateRequest} from "../types/candidate/CandidateUpdateRequest";

async function checkExistsCandidateByEmail(email: string) {
    const repository = getRepository(Candidate)

    return await repository.count({
        where: {
            email
        }
    }) > 0
}

async function authenticateCandidate(entity: CandidateAuthenticateRequest): Promise<CandidateAuthenticateResponse> {
    const defaultError = new NotFoundError('Email or Password Incorrect');

    let candidate;

    try {
        candidate = await getCandidateByEmail(entity.email)
    } catch (e) {
        console.log(1)
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

async function getCandidateByEmail(email: string) {
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

async function createCandidate(entity: CandidateCreateRequest) {
    if (await checkExistsCandidateByEmail(entity.email)) {
        throw new ConflictError('This email is already in use')
    }

    // save candidate
    const candidate = new Candidate()
    candidate.email = entity.email
    candidate.password = await encrypt(entity.password)
    candidate.name = entity.name
    candidate.gender = entity.gender

    await getRepository(Candidate).save(candidate)

    // save phone
    const phone = new CandidatePhone()
    phone.candidate = candidate
    phone.number = entity.phone

    await getRepository(CandidatePhone).save(phone)
}

async function updateCandidate(entity: CandidateUpdateRequest) {
    const candidate = new Candidate()
    candidate.id = entity.id
    candidate.email = entity.email
    candidate.password = await encrypt(entity.password)
    candidate.name = entity.name
    candidate.gender = entity.gender

    await getRepository(Candidate).save(candidate)
}

export {authenticateCandidate, createCandidate, updateCandidate}