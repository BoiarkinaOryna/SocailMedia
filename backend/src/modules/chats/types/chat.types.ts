import { Prisma } from "@prisma/client";

type ChatWithBigints = Prisma.chat_app_chatGetPayload<{}>;

export type Chat = Omit<
	ChatWithBigints,
	"id" | "admin_id"
> & {
	id: number,
	admin_id: number
}

export interface SendMessagePayload {
	chatId: number;
	text?: string;
	images?: string[];
}

export type JoinChatCallback = (
	response: { status: "ok" } | { status: "error"; message?: string },
) => void;
export type SendMessageCallback = (
	response:
		| { status: "ok"; message: MessageWithRelations }
		| { status: "error"; message?: string },
) => void;
export type NotificationCallback = (
	response:
		| { status: "error"; message?: string },
) => void;


type ChatWithChatParticipants = Prisma.chat_app_chatGetPayload<{
	include: {
		user_app_user: true,
		chat_app_chat_users: true,
		chat_app_message: {
			include: {
				chat_app_messageimage: true,
				chat_app_message_readers: true
			}
		}
	};
}>;
export type CreateChat = {
	title?: string
    avatar?: string
	ownerId: number;
	contactUserId: number[];
};

type BigIntToNumber<T> =
	T extends bigint ? number :
	T extends Date ? Date :
	T extends Array<infer U> ? Array<BigIntToNumber<U>> :
	T extends object ? { [K in keyof T]: BigIntToNumber<T[K]> } :
	T;

export type ChatWithChatParticipantsDto =
	BigIntToNumber<ChatWithChatParticipants>;

// export type ChatWithChatParticipantsDto = Omit<
// 	ChatWithChatParticipants,
// 	"id" | "chat_id" | "user_id" | "user_app_user" | "chat_app_chat_users"
// > & {
// 	id: number;
// 	user_app_user:
// 		| (Omit<
// 				ChatWithChatParticipants["user_app_user"],
// 				"id"
// 			> & {
// 				id: number;
// 			})
// 		| null;

// 	chat_app_chat_users: {
// 		id: number;
// 		chat_id: number;
// 		user_id: number;
// 	}[];
// };

type MessageWithRelationsWithBigints = Prisma.chat_app_messageGetPayload<{}>;
export type MessageWithRelations = Omit<
	MessageWithRelationsWithBigints,
	"id" | "chat_id" | "sender_id"
> & {
	id: number,
	chat_id: number,
	sender_id: number
}

export type CreateChatDto = {
	title?: string
    base64avatar?: string
	ownerId: number
	contactUserId: number[]
};

export type ChatListUserDto = {
	id: number;
	username: string | null;
	first_name: string;
	last_name: string;
	avatar: string | null;
	pseudonym: string | null;
};

export type ChatListMessageDto = {
	id: number;
	text: string | null;
	created_at: Date;
	sender_id: number | null;
};

export type ChatListItemDto = {
	id: number;
	name: string | null;
	is_group: boolean;
	avatar: string | null;
	participants: ChatListUserDto[];
	lastMessage: ChatListMessageDto | null;
};
