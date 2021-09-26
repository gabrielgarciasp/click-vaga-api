import * as Yup from 'yup'

export default Yup.object().shape({
    id: Yup.string().required(),
    email: Yup.string().required(),
    password: Yup.string().required(),
    name: Yup.string().required(),
    phone: Yup.string().required(),
})
