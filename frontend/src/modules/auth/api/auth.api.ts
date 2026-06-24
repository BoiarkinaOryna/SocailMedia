import { LoginDto, RegisterDto } from "../types/auth.schema";
import { baseApi } from "@shared/api/api";
import { firstVisitDto } from "../types/first-visit.types";
import { FullUserWithoutRelations } from "@shared/types/user.types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<any, LoginDto>({
      query: (body) => ({
        url: "/users/login",
        method: "POST",
        body,
      }),
    }),

    register: builder.mutation<any, RegisterDto>({
      query: (body) => ({
        url: "/users/register",
        method: "POST",
        body,
      }),
    }),
    firstVisit: builder.mutation<any, {body: firstVisitDto, token: string}>({
      query: ({body, token}) => ({
        url: "users/profile",
        method: "POST",
        headers: {Authorization: `Bearer ${token}`},
        body
      })
    }),
    me: builder.query<FullUserWithoutRelations, string>({
      query: (token) => ({
        url: "users/me",
        headers: {Authorization: `Bearer ${token}`}
      })
    })
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useFirstVisitMutation,
  useLazyMeQuery,
} = authApi;