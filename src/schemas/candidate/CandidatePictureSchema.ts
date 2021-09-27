import * as Yup from 'yup'

export default Yup.object().shape({
    candidateId: Yup.string().required(),
    fileName: Yup.string().required(),
})
