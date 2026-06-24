import { Router } from "express";

import { authenticateMiddleware } from "../../middlewares";
import { ChatController } from "./chat.controller";

export const ChatRouter = Router();

ChatRouter.get("/my", authenticateMiddleware, ChatController.getMyChats);
ChatRouter.get("/:id", authenticateMiddleware, ChatController.getChatIdByUserIds); 
ChatRouter.post("/", authenticateMiddleware, ChatController.create); 
ChatRouter.get("/chat/:id", authenticateMiddleware, ChatController.getChatInfoById)
ChatRouter.delete("/:id", authenticateMiddleware, ChatController.delete)
