import * as yup from "yup";

export const myDataValidator = yup.object({
    name: yup
        .string()
        .required(),
        // .nullable(),
    surname: yup
        .string()
        .required(),
        // .nullable(),
    birthDate: yup
        // .date()
        .string()
        .required(),
        // .nullable(),
    email: yup
        .string()
        .email("Email must contain '@' and '.'")
        .required()
        // .nonNullable()
})

export const albumValidator = yup.object({
    name: yup
        .string()
        .required(),
    theme: yup
        .string()
        .required(),
    year: yup
        // .string()
        .number()
        .required()
        .max(2030, "Year must be before 2030")
        .positive("Year must be a positive number")
        .integer("Year must be an integer")
})