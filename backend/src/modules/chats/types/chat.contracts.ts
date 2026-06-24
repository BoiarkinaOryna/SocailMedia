import { AuthenticatedSocket, SocketController } from "../../../socket/socket.types";
import { AuthenticatedUser } from "../../../types/token";
import { Chat, ChatListItemDto, ChatWithChatParticipantsDto, CreateChat, CreateChatDto, JoinChatCallback, MessageWithRelations, NotificationCallback, SendMessageCallback, SendMessagePayload } from "./chat.types";
import { NextFunction, Request, Response } from "express";


export interface ChatClientEventsContract {
	joinChat: (data: {chatId: number}, ack?: JoinChatCallback) => void;
	leaveChat: (data: {chatId: number}) => void;
	sendMessage: (data: SendMessagePayload, ack?: SendMessageCallback) => void;
	notification: (data: {chatId: number}, ack: NotificationCallback) => void
}
export interface ChatServerEventsContract {
	newMessage: (message: MessageWithRelations) => void;
}
export interface ChatSocketControllerContract extends SocketController {
	joinChat: (
		socket: AuthenticatedSocket,
		data: {chatId: number},
		ack?: JoinChatCallback,
	) => void;
	leaveChat: (socket: AuthenticatedSocket, data: {chatId: number}) => void;
	sendMessage: (
		socket: AuthenticatedSocket,
		data: SendMessagePayload,
		ack?: SendMessageCallback,
	) => void;
	// notification: (
	// 	socket: AuthenticatedSocket,
	// 	data: {chatId: number},
	// 	ack?: NotificationCallback
	// ) => void;
}

export interface ChatControllerContract {
	getMyChats: (
		req: Request,
		res: Response<{ personal: ChatListItemDto[]; groups: ChatListItemDto[] }>,
		next: NextFunction,
	) => Promise<void>;
	getChatIdByUserIds: (
		req: Request <{id: string}, {chatId: number}>,
		res: Response<{chatId: number}>,
		next: NextFunction,
	) => Promise<void>;
	create: (
		req: Request<
			object,
			Chat,
			{contactData: CreateChatDto},
			// any,
			object,
			AuthenticatedUser
		>,
		res: Response<Chat, AuthenticatedUser>,
		next: NextFunction,
	) => Promise<void>;
	getChatInfoById: (
		req: Request<{id:string}, ChatWithChatParticipantsDto>,
		res: Response<ChatWithChatParticipantsDto>,
		next: NextFunction
	) => Promise<void>;
	delete: (
		req: Request<{id: string}>,
		res: Response,
		next: NextFunction
	) => Promise<void>
}



export interface ChatServiceContract {
	getMyChats: (userId: number) => Promise<{ personal: ChatListItemDto[]; groups: ChatListItemDto[] }>;
	isChatParticipant: (chatId: number, userId: number) => Promise<boolean>;
	getChatParticipants: (chatId: number) => Promise<ChatWithChatParticipantsDto>;
	sendMessage: (
		chatId: number,
		senderId: number,
		data: Omit<SendMessagePayload, "chatId">,
	) => Promise<MessageWithRelations>;
	getChatIdByUserIds:(user1Id: number, user2Id: number)=>Promise<{chatId: number}>;
	create: (dto: CreateChat) => Promise<Chat>;
	delete: (id: number) => Promise<void>
}



export interface ChatRepositoryContract {
	getMyChats: (
		userId: number,
	) => Promise<{ personal: ChatListItemDto[]; groups: ChatListItemDto[] }>;
	getChatIdByUsers: (
		user1Id: number,
		user2Id: number
	) => Promise<{chatId: number}>
	getChatParticipants: (
		chatId: number,
	) => Promise<ChatWithChatParticipantsDto>;
	createMessage: (
		chatId: number,
		senderId: number,
		text: string,
		images: string[],
	) => Promise<MessageWithRelations>;
	create: (dto: CreateChat) => Promise<Chat>;
	delete: (id: number) => Promise<void>
}