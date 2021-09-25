import * as Yup from 'yup'

export default Yup.object().shape({
    email: Yup.string().required(),
    password: Yup.string().required(),
})