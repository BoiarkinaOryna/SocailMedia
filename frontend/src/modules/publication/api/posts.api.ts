import { baseApi } from "@shared/api/api";
import { CreatePost, Post } from "../types/publication.types";

const POSTS_URL = "/posts";

export const postsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPosts: builder.query<Post[], { token: string; take: number; page: number }>({
      query: ({ token, take, page }) => ({
        url: `${POSTS_URL}?take=${take}&page=${page}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Posts"],
    }),
    createPost: builder.mutation<any, { data: CreatePost; token: string }>({
      query: ({ data, token }) => ({
        url: `${POSTS_URL}/`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          ...data,
          links: data.links?.trim() ? [data.links.trim()] : [],
        },
      }),
      invalidatesTags: ["Posts"],
    }),
    addPostImage: builder.mutation<any, { base64: string; postId: number | string; token: string }>({
      query: ({ base64, postId, token }) => ({
        url: `${POSTS_URL}/image`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          image: base64,
          postId,
        },
      }),
      invalidatesTags: ["Posts"],
    }),
    getMyPosts: builder.query<Post[], { token: string; take: number; page: number }>({
      query: ({ token, take, page }) => ({
        url: `${POSTS_URL}/my?take=${take}&page=${page}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Posts"],
    }),
    delete: builder.mutation<any, { id: number; token: string }>({
      query: ({ id, token }) => ({
        url: `${POSTS_URL}/my`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          postId: id,
        },
      }),
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useCreatePostMutation,
  useAddPostImageMutation,
  useDeleteMutation,
  useGetMyPostsQuery,
  useLazyGetMyPostsQuery,
} = postsApi;