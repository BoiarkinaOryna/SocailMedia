import * as yup from "yup";

export const publicationValidator = yup.object({
  title: yup.string().required("Введіть назву публікації"),
  topic: yup.string().required("Введіть тему публікації"),
  content: yup.string().required("Напишіть текст публікації"),
  links: yup.array().of(yup.string().max(200).default("")).default([""]),
});