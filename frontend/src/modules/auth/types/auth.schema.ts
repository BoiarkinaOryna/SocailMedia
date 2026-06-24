import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().email("Невірний email").required("Обовʼязково"),
  password: yup.string().min(6, "Мінімум 6 символів").required("Обовʼязково"),
});

export type LoginDto = yup.InferType<typeof loginSchema>;

export const registerSchema = yup.object({
  email: yup.string().email("Невірний email").required("Обовʼязково"),
  password: yup.string().min(6, "Мінімум 6 символів").required("Обовʼязково"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Паролі не співпадають")
    .required("Обовʼязково"),
});

export type RegisterDto = yup.InferType<typeof registerSchema>;