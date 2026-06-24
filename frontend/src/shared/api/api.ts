import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const API_BASE_URL = "http://192.168.0.138:3000";

export const baseApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  tagTypes: ["Posts"],
  endpoints: () => ({})
});
