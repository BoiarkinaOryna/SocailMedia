import path from "path";
import fs from "fs";
import { uploadDir } from "../../config/path";
import { BadRequestError } from "../../errors";
import { ConflictError, ForbiddenError, NotFoundError } from "../../errors/app.errors";
import { ChatRepository } from "./chat.repository";
import { ChatServiceContract } from "./types/chat.contracts";
import { CreateChatDto } from "./types/chat.types";

function saveChatImage(image: string, chatId: number, senderId: number) {
	const matches = image.match(/^data:image\/(jpeg|jpg|png|webp);base64,(.+)$/);
	const base64 = matches ? matches[2] : image;
	const extension = matches?.[1] === "jpeg" ? "jpg" : matches?.[1] ?? "jpg";
	const buffer = Buffer.from(base64, "base64");

	if (!buffer.length) {
		throw new BadRequestError("Image is invalid");
	}

	fs.mkdirSync(uploadDir, { recursive: true });

	const fileName = `chat_${chatId}_${senderId}_${Date.now()}_${Math.random()
		.toString(36)
		.slice(2, 8)}.${extension}`;
	const filePath = path.join(uploadDir, fileName);

	fs.writeFileSync(filePath, buffer);

	return fileName;
}

export const ChatService: ChatServiceContract = {
	getMyChats: async function (userId) {
		return await ChatRepository.getMyChats(userId);
	},
	getChatIdByUserIds: async function (user1Id, user2Id) {
		const chatId = await ChatRepository.getChatIdByUsers(user1Id, user2Id)
		if (Number(chatId.chatId) === 0 || isNaN(chatId.chatId)){
			console.log("not found chat id in serv")
			throw new NotFoundError("Chat")
		}
		return chatId
	},
	isChatParticipant: async function (chatId, userId) {
		const chat = await this.getChatParticipants(chatId);
		return chat.chat_app_chat_users.some(
			(participant: any) => participant.user_id === userId,
		);
	},
	getChatParticipants: async function (chatId) {
		return await ChatRepository.getChatParticipants(chatId);
	},
	sendMessage: async function (chatId, senderId, data) {
		const text = data.text?.trim() ?? "";
		const images = data.images ?? [];

		// console.log(chatId)

		if (!Number.isInteger(chatId)) {
			throw new BadRequestError("Chat id is invalid");
		}

		if (!Array.isArray(images)) {
			throw new BadRequestError("Images must be an array");
		}

		if (!text && images.length === 0) {
			throw new BadRequestError("Message text or image is required");
		}

		const isChatParticipant = await this.isChatParticipant(chatId, senderId);
		if (!isChatParticipant) {
			throw new ForbiddenError("You are not a participant of this chat");
		}

		const savedImages = images.map((image) => saveChatImage(image, chatId, senderId));

		return await ChatRepository.createMessage(chatId, senderId, text, savedImages);
	},
	create: async function (dto: CreateChatDto) {
		// if (dto.contactUserId.length === 1){	
		// 	const chatByParticipants = await ChatRepository.getChatIdByUsers(
		// 		dto.ownerId,
		// 		dto.contactUserId[1],
		// 	);
		// 	console.log(Number(chatByParticipants.chatId), "Number(chatByParticipants.chatId) !== 0 =>", Number(chatByParticipants.chatId) !== 0)
		// 	if (Number(chatByParticipants.chatId) !== 0) {
		// 		throw new ConflictError("Chat between these users already exists");
		// 	}
		// }
		return await ChatRepository.create({
			...dto,
		});
	},
	delete: async function(id) {
		// console
		await ChatRepository.delete(id)
	}
}