import { baseApi } from "@shared/api/api";
import { ChatWithChatParticipantsDto, CreateChatDTO, MyChatsResponse } from "../types/chat.types"

const chatApi = baseApi
	.enhanceEndpoints({
		addTagTypes: ["Chat"],
	})

	.injectEndpoints({
		endpoints: (build) => ({
			createChat: build.mutation<any, {contactData: CreateChatDTO, token: string}>({
				query: ({contactData, token}) => ({
					url: "/chats",
					method: "POST",
					body: {contactData},
                    headers: { 
                        Authorization: `Bearer ${token}` 
                    }
				}),

				invalidatesTags: ["Chat"],
			}),
			getChatIdByUserIds: build.query<{chatId: number}, {userId: number, token: string}>({
				query: ({userId, token}) => ({
					url: `/chats/${userId}`,
					method: "GET",
                    headers: {Authorization: `Bearer ${token}`}
				}),
			}),
			getChatInfo: build.query<any, {chatId: number, token: string}>({
				query: ({chatId, token}) => ({
					url: `/chats/chat/${chatId}`,
					method: "GET",
                    headers: {Authorization: `Bearer ${token}`}
				}),
			}),
			getMyChats: build.query<MyChatsResponse, string>({
				query: (token) => ({
					url: "/chats/my",
					method: "GET",
					headers: { Authorization: `Bearer ${token}` },
				}),
				providesTags: ["Chat"],
			}),
			deleteChat: build.mutation<any, {id: number, token: string}>({
				query:({id, token}) => ({
					url: `/chats/${id}`,
					method: "DELETE",
                    headers: {Authorization: `Bearer ${token}`}
				})
			})
            
			// getAllChats: build.query<ChatWithContactInfo[], void>({
			// 	query: () => ({
			// 		url: "/chats/my",
			// 		method: "GET",
			// 	}),
			// 	providesTags: ["Chat"],
			// 	transformResponse(
			// 		baseQueryReturnValue: ChatWithParticipantInfoResponse[],
			// 	) {
			// 		return baseQueryReturnValue.map((chat) => {
			// 			const { participants, ...restChat } = chat;
			// 			const { contactsOf, ...restUser } =
			// 				participants[0].user;
			// 			if (contactsOf.length > 0) {
			// 				return {
			// 					...restChat,
			// 					isInContact: true,
			// 					participant: {
			// 						...restUser,
			// 						contactsOf: contactsOf[0],
			// 					},
			// 				};
			// 			} else {
			// 				return {
			// 					...restChat,
			// 					isInContact: false,
			// 					participant: restUser,
			// 				};
			// 			}
			// 		});
			// 	},
			// }),
		}),
	});

export const {
	useCreateChatMutation,
	useLazyGetChatIdByUserIdsQuery,
	useLazyGetChatInfoQuery,
	useGetMyChatsQuery,
	useDeleteChatMutation,
} = chatApi;
