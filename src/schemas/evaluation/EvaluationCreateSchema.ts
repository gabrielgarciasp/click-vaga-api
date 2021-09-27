import * as Yup from 'yup'

export default Yup.object().shape({
    evaluatorId: Yup.string().required(),
    curriculumId: Yup.string().required(),
    approved: Yup.boolean().required(),
    message: Yup.string().required(),
})
