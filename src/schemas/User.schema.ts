import * as yup from 'yup';

// Hidden for simplicity

const createSchema = yup.object({
    body: yup.object({
        username: yup.string().required('Username Required'),
        email: yup.string().required('Email Required'),
        password: yup.string().required('Password Required'),
    }),
});

export { createSchema };
