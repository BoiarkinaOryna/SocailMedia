import { AppError } from "../../errors";
import { USER_ROOM_PREFIX } from "../user/user.socket.controller";
import { ChatService } from "./chat.service";
import { ChatSocketControllerContract } from "./types/chat.contracts";
import { JoinChatCallback, SendMessagePayload, SendMessageCallback, NotificationCallback } from "./types/chat.types";

const CHAT_ROOM_PREFIX = "chat:";

export const ChatSocketController: ChatSocketControllerContract = {
	joinChat: async (socket, data, ack) => {
		try {
			const isChatParticipant = await ChatService.isChatParticipant(
				data.chatId,
				socket.data.userId,
			);
			if (isChatParticipant) {
				socket.join(CHAT_ROOM_PREFIX + data.chatId);
				if (ack) {
					ack({ status: "ok" });
				}
			} else {
				if (ack) {
					ack({
						status: "error",
						message: `User:${socket.data.userId} is not a chat participant of chat:${data.chatId}`,
					});
				}
			}
		} catch (error) {
			console.error(error);
			if (!ack) return;
			if (error instanceof AppError) {
				ack({
					status: "error",
					message: error.message,
				});
			}
		}
	},
	leaveChat: (socket, data) => {
		console.log("Socket left chat");
		socket.leave(CHAT_ROOM_PREFIX + data.chatId);
	},
	sendMessage: async (socket, data, ack) => {
		try {
			console.log(
				"data.chatId", data.chatId,
				"socket.data.userId", socket.data.userId,
				// "data", data
			)
			const message = await ChatService.sendMessage(
				data.chatId,
				socket.data.userId,
				data,
			);

			const chat = await ChatService.getChatParticipants(data.chatId);

			socket.to(CHAT_ROOM_PREFIX + data.chatId).emit("newMessage", message);

			chat.chat_app_chat_users.forEach((user) => {
			if (user.user_id === socket.data.userId) return;

			socket
				.to(USER_ROOM_PREFIX + String(user.user_id))
				.emit("getNotification", {
				...chat,
				senderId: socket.data.userId,
				});
			});

			socket.emit("newMessage", message);

			if (ack) {
				ack({ status: "ok", message });
			}
		} catch (error) {
			console.error(error);
			if (!ack) return;
			if (error instanceof AppError) {
				ack({
					status: "error",
					message: error.message,
				});
				return;
			}
			ack({
				status: "error",
				message: "Message was not sent",
			});
		}
	},

	// notification: async (socket, data, ack) => {
	// 	try {
	// 		const chat = await ChatService.getChatParticipants(
	// 			data.chatId,
	// 		);
	// 		if (!chat) return;
	// 		chat.chat_app_chat_users.forEach((user) => {
	// 			if (user.user_id !== socket.data.userId) {
	// 				console.log("notif is sent to user", user.user_id);

	// 				socket
	// 					.to(USER_ROOM_PREFIX + `${user.user_id}`)
	// 					.emit("getNotification", {
	// 					...chat,
	// 					senderId: socket.data.userId,
	// 					});
	// 				}
	// 		});

	// 	} catch (e) {
	// 		console.log(e);
	// 		if (!ack) return;
	// 		if (e instanceof AppError) {
	// 			ack({
	// 				status: "error",
	// 				message: e.message,
	// 			});
	// 			return;
	// 		}
	// 	}
	// },

	registerHandlers: (socket) => {
		socket.on("joinChat", (data: {chatId: number}, ack?: JoinChatCallback) => {
			console.log("joined chat", data)
			ChatSocketController.joinChat(socket, data, ack);
		});
		socket.on("leaveChat", (data: {chatId: number}) => {
			console.log("left chat", data)
			ChatSocketController.leaveChat(socket, data);
		});
		socket.on("sendMessage", (data: SendMessagePayload, ack?: SendMessageCallback) => {
			// console.log("sended message:", data)
			ChatSocketController.sendMessage(socket, data, ack);
		});
		// socket.on("notification", (data: {chatId: number}, ack?: NotificationCallback) => {
		// 	ChatSocketController.notification(socket, data, ack)
		// })
	},
};