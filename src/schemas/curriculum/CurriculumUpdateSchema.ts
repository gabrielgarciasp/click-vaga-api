import * as Yup from 'yup'

export default Yup.object().shape({
    id: Yup.string().required(),
    candidateId: Yup.string().required(),
    name: Yup.string().required(),
    goals: Yup.string(),
    picture: Yup.string(),
    skills: Yup.array().of(
        Yup.object().shape({
            name: Yup.string().required(),
        })
    ).required(),
    formations: Yup.array().of(
        Yup.object().shape({
            type: Yup.string().required(),
            course: Yup.string().required(),
            institution: Yup.string().required(),
            finishDate: Yup.string().required(),
        })
    ).required(),
    formationsAdditional: Yup.array().of(
        Yup.object().shape({
            course: Yup.string().required(),
            hours: Yup.number().required(),
            institution: Yup.string().required(),
            finishDate: Yup.string().required(),
        })
    ).required(),
    experiences: Yup.array().of(
        Yup.object().shape({
            company: Yup.string().required(),
            position: Yup.string().required(),
            description: Yup.string().required(),
            startDate: Yup.date().required(),
            endDate: Yup.date(),
        })
    ).required(),
    events: Yup.array().of(
        Yup.object().shape({
            name: Yup.string().required(),
            description: Yup.string().required(),
        })
    ).required(),
    information: Yup.array().of(
        Yup.object().shape({
            description: Yup.string().required(),
        })
    ).required(),
})
