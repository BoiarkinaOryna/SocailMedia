export type ChatWithChatParticipantsDto = {
    user_app_user: {
        id: number;
        password: string;
        last_login: Date | null;
        is_superuser: boolean;
        first_name: string;
        last_name: string;
        is_staff: boolean;
        is_active: boolean;
        date_joined: Date;
        username: string | null;
        email: string;
    } | null;
    chat_app_chat_users: {
        id: number;
        chat_id: number;
        user_id: number;
    }[];
    chat_app_message: {
        chat_app_messageimage: {
            id: number;
            image: string;
            message_id: number;
        }[];
        chat_app_message_readers: {
            id: number;
            user_id: number;
            message_id: number;
        }[];
        id: number;
        text: string | null;
        created_at: Date;
        chat_id: number;
        sender_id: number | null;
    }[]
    name: string | null;
    id: number;
    is_group: boolean;
    avatar: string | null;
    admin_id: number | null;
}

export type ChatListUser = {
	id: number;
	username: string | null;
	first_name: string;
	last_name: string;
	avatar: string | null;
	pseudonym: string | null;
};

export type ChatListMessage = {
	id: number;
	text: string | null;
	created_at: string;
	sender_id: number | null;
};

export type ChatListItem = {
	id: number;
	name: string | null;
	is_group: boolean;
	avatar: string | null;
	participants: ChatListUser[];
	lastMessage: ChatListMessage | null;
};


export type MyChatsResponse = {
	personal: ChatListItem[];
	groups: ChatListItem[];
};

export type CreateChatDTO={
    title?: string
    base64avatar?: string
    contactUserId: number[]
}