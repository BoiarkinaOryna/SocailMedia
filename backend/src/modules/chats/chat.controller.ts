import fs from "fs";
import path from "path";
import { uploadDir } from "../../config/path";
import { BadRequestError } from "../../errors"
import { ChatService } from "./chat.service"
import { ChatControllerContract } from "./types/chat.contracts"

export const ChatController: ChatControllerContract = {
    getMyChats: async function (req, res, next) {
        try {
            const userId = +res.locals.userId;
            const chats = await ChatService.getMyChats(userId);
            // console.log("chats", chats)
            res.json(chats);
        } catch (error) {
            next(error);
        }
    },
    getChatIdByUserIds: async function (req, res, next) {
        try{
            const user1Id = res.locals.userId
            const user2Id = req.params.id
            // console.log("users", user1Id, user2Id)
            if (!user2Id){
                throw new BadRequestError("user id is required")
            }
            if (isNaN(+user2Id)){
                throw new BadRequestError("user id must be a number")
            }
            const chatId = await ChatService.getChatIdByUserIds(user1Id, +user2Id)
            // console.log("chat id", chatId)
            res.json(chatId)
        } catch (error){
            next(error)
        }
    },
    async create(req, res, next) {
		try {
			const ownerId = +res.locals.userId;
			// const {base64avatar, contactUserId, title} = req.body;
            const base64avatar = req.body.contactData.base64avatar
            const contactUserId = req.body.contactData.contactUserId
            const title = req.body.contactData.title
            // console.log("body", req.body.contactData)

            let fileName = undefined
            if (base64avatar){
                fs.mkdirSync(uploadDir, { recursive: true })
                
                fileName = `groupAvatar_${Date.now()}.jpg`
                const filePath = path.join(uploadDir, fileName)
                const buffer = Buffer.from(base64avatar, "base64")
            
                fs.writeFileSync(filePath, buffer)
                // console.log("saved post image:", fileName, buffer.length)
            }

			const chat = await ChatService.create({ title, avatar: fileName, ownerId, contactUserId });
            // console.log("chat", chat, "is created")
			res.status(201).json(chat);
		} catch (error) {
			next(error);
		}
	},
    async getChatInfoById(req, res, next) {
        try {
            // console.log("chat id", req.params.id)
            const chat = await ChatService.getChatParticipants(+req.params.id)
            // console.log("chat", chat)
			res.json(chat);
		} catch (error) {
			next(error);
		}
    },
    async delete(req, res, next) {
        try{
            const id = req.params.id
            if (!id){
                throw new BadRequestError("id is required")
            }
            if (isNaN(+id)){
                throw new BadRequestError("id must be a number")
            }
            await ChatService.delete(+id)
            res.status(202).json()
        } catch (error){
            next(error)
        }
    }
}