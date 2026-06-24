import { baseApi } from "@shared/api/api";
import { AlbumData, EditableUserData } from "./api.types";

export const settingsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        updateProfile: builder.mutation<any, {body: EditableUserData, token: String}>({
            query: ({body, token}) => ({
                url: "users/me",
                method: "PATCH",
                headers: {Authorization: `Bearer ${token}`},
                body,
            })
        }),

        createAlbum: builder.mutation<any, { body: AlbumData; token: string }>({
            query: ({ body, token }) => ({
                url: "albums",
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body
            })
        }),

        
        getAlbums: builder.query<any, string>({
            query: (token) => ({
                url: "/albums",
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),

        addImage: builder.mutation<any, { base64: string; albumId: number; token: string }>({
            query: ({ base64, albumId, token }) => ({
                url: "albums/image",
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: {
                    image: base64,
                    albumId,
                },
            }),
        }),
    })
});

export const {
    useUpdateProfileMutation,
    useCreateAlbumMutation,
    useAddImageMutation,
    useGetAlbumsQuery   
} = settingsApi;