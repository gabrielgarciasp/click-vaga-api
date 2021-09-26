import * as Yup from 'yup'

export default Yup.object().shape({
    id: Yup.string().required(),
    email: Yup.string().required(),
    password: Yup.string().required(),
    name: Yup.string().required(),
    gender: Yup.string().required(),
    phone: Yup.string().required(),
    birthDate: Yup.date().required(),
    cep: Yup.string().required(),
    address: Yup.string().required(),
    number: Yup.string().required(),
    district: Yup.string().required(),
    city: Yup.string().required(),
    state: Yup.string().required(),
})
