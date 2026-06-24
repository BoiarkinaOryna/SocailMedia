import * as yup from "yup"

export const firstVisitValidator = yup.object({
    pseudonym: yup
        .string()
        .required("Pseudonym is required")
        .max(20, "Pseudonym must contain less than 20 symbols"),
    username: yup
        .string()
        .required("Username  is required")
        .max(20, "Username must contain less than 20 symbols")
})