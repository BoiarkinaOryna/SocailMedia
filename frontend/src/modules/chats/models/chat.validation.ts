import * as yup from "yup"

export const CreateChatValidator = yup.object({
    title: yup.string().required(),
    // avatar: yup.string().required(),
    // contactUserId: yup.array().of(yup.number())
})