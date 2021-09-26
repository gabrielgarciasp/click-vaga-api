type Skill = {
    name: string
}

type Formation = {
    type: string
    course: string
    institution: string
    finishDate: Date
}

type FormationAdditional = {
    course: string
    hours: number
    institution: string
    finishDate: Date
}

type Experience = {
    company: string
    position: string
    description: string
    startDate: Date
    endDate?: Date
}

type Event = {
    name: string
    description: string
}

type Information = {
    description: string
}

export type CurriculumCreateRequest = {
    candidateId: string
    name: string
    goals?: string
    picture?: string
    skills: Skill[]
    formations: Formation[]
    formationsAdditional: FormationAdditional[]
    experiences: Experience[]
    events: Event[]
    information: Information[]
}
