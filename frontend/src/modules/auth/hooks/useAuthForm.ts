import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  loginSchema,
  registerSchema,
  LoginDto,
  RegisterDto,
} from "../types/auth.schema";
import {
  useLazyMeQuery,
  useLoginMutation,
  useRegisterMutation,
} from "../api/auth.api";
import { router } from "expo-router";
import { useUserContext } from "../context/user.context";
// import { useGetUserData } from "./useGetUserData";

type Mode = "login" | "register";

type AuthFormState = {
  email: string;
  password: string;
  confirmPassword?: string;
};

export const useAuthForm = (mode: Mode) => {
  const { setToken, setUser } = useUserContext()
  const isRegister = mode === "register";
  const [isComplete, setIsComplete] = useState<boolean>(false);

  const [form, setForm] = useState<AuthFormState>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [ getUserData ] = useLazyMeQuery()

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [login, { isLoading: loginLoading }] = useLoginMutation();
  const [register, { isLoading: registerLoading }] =
    useRegisterMutation();

  const handleChange = (
    key: keyof AuthFormState,
    value: string
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    try {
      setErrors({});

      const schema = isRegister ? registerSchema : loginSchema;
      await schema.validate(form, { abortEarly: false });

      if (isRegister) {
        const data: RegisterDto = {
          email: form.email,
          password: form.password,
          confirmPassword: form.confirmPassword!,
        };

        await register(data).unwrap()
        // useGetUserData()
        setIsComplete(true)
      } else {
        const data: LoginDto = {
          email: form.email,
          password: form.password,
        };

        const response = await login(data).unwrap();
        console.log("new token:", response.token)
        await AsyncStorage.setItem("token", response.token);
        setToken(response.token)
        const newUser = await getUserData(response.token).unwrap()
        // await AsyncStorage.setItem("email", newUser.email);
        // newUser.pseudonym && await AsyncStorage.setItem("pseudonym", newUser.pseudonym)
        // newUser.username && await AsyncStorage.setItem("username", newUser.username)
        // newUser.avatar && await AsyncStorage.setItem("avatar", newUser.avatar)
        // newUser.first_name && await AsyncStorage.setItem("first_name", newUser.first_name)
        // newUser.last_name && await AsyncStorage.setItem("last_name", newUser.last_name)
        setUser(newUser)
        router.push("/(main)/main")
      }

      console.log("Success");
    } catch (err: any) {
      if (err?.name === "ValidationError") {
        const formatted: Record<string, string> = {};

        err.inner.forEach((e: any) => {
          if (e.path) formatted[e.path] = e.message;
        });

        setErrors(formatted);
      } else {
        setErrors({
          general: `Server error ${
            "status" in err ? err.status : err.message
          }`,
        });
      }
    }
  };

  return {
    form,
    errors,
    handleChange,
    handleSubmit,
    isLoading: loginLoading || registerLoading,
    isRegister,
    isComplete,
  };
};