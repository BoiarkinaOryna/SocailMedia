import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { PRISMA_CLIENT } from "../../config/client";
import { NotFoundError, InternalServerError } from "../../errors";
import { PrismaErrorCodes } from "../../types/error-codes";
import { ChatRepositoryContract } from "./types/chat.contracts";
import { CreateChat } from "./types/chat.types";
// import { PrismaClient } from "@prisma/client";

export const ChatRepository: ChatRepositoryContract = {
	async getMyChats(userId) {
		try {
			const chats = await PRISMA_CLIENT.chat_app_chat.findMany({
				where: {
					chat_app_chat_users: {
						some: { user_id: userId },
					},
				},
				include: {
					chat_app_chat_users: {
						include: {
							user_app_user: {
								select: {
									id: true,
									username: true,
									first_name: true,
									last_name: true,
									profile_app_profile: {
										select: {
											avatar: true,
											pseudonym: true,
										},
									},
								},
							},
						},
					},
					chat_app_message: {
						orderBy: {
							created_at: "desc",
						},
						take: 1,
						select: {
							id: true,
							text: true,
							created_at: true,
							sender_id: true,
							chat_app_messageimage: true,
						},
					},
				},
			});

			const mappedChats = chats.map((chat) => ({
				id: Number(chat.id),
				name: chat.name,
				is_group: chat.is_group,
				avatar: chat.avatar,
				participants: chat.chat_app_chat_users.map((participant) => ({
					id: Number(participant.user_app_user.id),
					username: participant.user_app_user.username,
					first_name: participant.user_app_user.first_name,
					last_name: participant.user_app_user.last_name,
					avatar: participant.user_app_user.profile_app_profile?.avatar ?? null,
					pseudonym: participant.user_app_user.profile_app_profile?.pseudonym ?? null,
				})),
				lastMessage: chat.chat_app_message[0]
					? {
							...chat.chat_app_message[0],
							id: Number(chat.chat_app_message[0].id),
							sender_id:
								chat.chat_app_message[0].sender_id === null
									? null
									: Number(chat.chat_app_message[0].sender_id),
							chat_app_messageimage: chat.chat_app_message[0].chat_app_messageimage.map((image) => ({
								...image,
								id: Number(image.id),
								message_id: Number(image.message_id),
							})),
						}
					: null,
			}));

			return {
				personal: mappedChats.filter((chat) => !chat.is_group),
				groups: mappedChats.filter((chat) => chat.is_group),
			};
		} catch (error) {
			if (error instanceof Error) {
				throw new InternalServerError(error.message);
			}
			throw new InternalServerError();
		}
	},
	async getChatIdByUsers (user1Id, user2Id) {
		try {
			const chatId = await PRISMA_CLIENT.chat_app_chat.findFirst({
				where: {
					chat_app_chat_users: {
						some: { user_id: user1Id }
					},
					AND: {
						chat_app_chat_users: {
							some: { user_id: user2Id }
						}
					}
				},
				select: {
					id: true
				}
			});
			// console.log("chat id in repo", chatId)
			return {chatId: Number(chatId?.id)}
		} catch (error){
            if (error instanceof Error) {
            throw new InternalServerError(error.message);
            }
            throw new InternalServerError();
		}

	},
	async getChatParticipants(chatId) {
        try{
			const chat = await PRISMA_CLIENT.chat_app_chat.findFirst({
			where: { id: chatId },
			include: {
				user_app_user: true,
				chat_app_chat_users: {
					include: {
						user_app_user: {
							include: {
								profile_app_profile: {
									select: {
										avatar: true,
										pseudonym: true
									}
								}
							},
							omit: {
								id: true
							}
						}
					}
				},
				chat_app_message: {
					include: {
						chat_app_messageimage: true,
						chat_app_message_readers: true
					}
				}
			},
		});
		
		if (!chat) throw new NotFoundError("Chat");

		return {
			id: Number(chat.id),
			name: chat.name,
			is_group: chat.is_group,
			avatar: chat.avatar,
			admin_id: chat.admin_id ? Number(chat.admin_id) : null,

			user_app_user: chat.user_app_user
				? {
						...chat.user_app_user,
						id: Number(chat.user_app_user.id),
				}
				: null,

			chat_app_chat_users: chat.chat_app_chat_users.map((u) => ({
				...u,
				id: Number(u.id),
				chat_id: Number(u.chat_id),
				user_id: Number(u.user_id),
			})),
			chat_app_message: chat.chat_app_message.map((m) => ({
				...m,
				id: Number(m.id),
				chat_id: Number(m.chat_id),
				sender_id: Number(m.sender_id),

				chat_app_messageimage: m.chat_app_messageimage.map((img) => ({
					...img,
					id: Number(img.id),
					message_id: Number(img.message_id),
				})),

				chat_app_message_readers: m.chat_app_message_readers.map((r) => ({
					...r,
					id: Number(r.id),
					message_id: Number(r.message_id),
					user_id: Number(r.user_id),
				})),
			})),
		};
        } catch(error){
            if (error instanceof PrismaClientKnownRequestError) {
                switch (error.code) {
                    case PrismaErrorCodes.NOT_EXIST:
                    throw new NotFoundError("Chat");
                    default:
                    throw new InternalServerError();
                }
            }
            if (error instanceof Error) {
            throw new InternalServerError(error.message);
            }
            throw new InternalServerError();
        }	
	},
	async createMessage(chatId, senderId, text, images) {
		try {
			const message = await PRISMA_CLIENT.chat_app_message.create({
				data: {
					chat_id: chatId,
					sender_id: senderId,
					text,
					created_at: new Date(),
					chat_app_message_readers: {
						create: {
							user_id: senderId,
						},
					},
					chat_app_messageimage: images.length
						? {
								create: images.map((image) => ({ image })),
							}
						: undefined,
				},
				include: {
					chat_app_messageimage: true,
				},
			});
			return {
				...message,
				id: Number(message.id),
				chat_id: Number(message.chat_id),
				sender_id: Number(message.sender_id),
				chat_app_messageimage: message.chat_app_messageimage.map((image) => ({
					...image,
					id: Number(image.id),
					message_id: Number(image.message_id),
				})),
			}
		} catch (error) {
			if (error instanceof Error) {
				throw new InternalServerError(error.message);
			}
			throw new InternalServerError();
		}
	},
	create: async function (data: CreateChat) {
		const chat = await PRISMA_CLIENT.chat_app_chat.create({
			data: {
				is_group: data.title ? true : false,
				name: data.title ? data.title : null,
				avatar: data.avatar ? data.avatar : null
			},
		});
		await PRISMA_CLIENT.chat_app_chat_users.create({
			data: {
				chat_id: Number(chat.id), user_id: data.ownerId
			}
		})
		await PRISMA_CLIENT.chat_app_chat_users.createMany({
			data: data.contactUserId.map((userId) => {
				return{
					user_id: userId,
					chat_id: Number(chat.id)
				}
			})
		})

		// console.log("chat", chat)
		// return chat
		return {
			...chat,
			id: Number(chat.id),
			admin_id: Number(chat.admin_id)
		}
	},
	delete: async function (id) {
		try{
			await PRISMA_CLIENT.$transaction(async (tx) => {
				// images
				await tx.chat_app_messageimage.deleteMany({
					where: {
						chat_app_message: {
							chat_id: id,
						},
					},
				});

				// readers
				await tx.chat_app_message_readers.deleteMany({
					where: {
						chat_app_message: {
							chat_id: id,
						},
					},
				});

				// messages
				await tx.chat_app_message.deleteMany({
					where: {
						chat_id: id,
					},
				});

				// users in chat
				await tx.chat_app_chat_users.deleteMany({
					where: {
						chat_id: id,
					},
				});

				// chat
				await tx.chat_app_chat.delete({
					where: { id },
				});
			});
		} catch (error){
			if (error instanceof Error) {
				throw new InternalServerError(error.message);
			}
			throw new InternalServerError();
		}
	}
};