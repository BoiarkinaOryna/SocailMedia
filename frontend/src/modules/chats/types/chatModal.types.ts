import { InferType } from "yup";
import { CreateChatValidator } from "../models/chat.validation";

export type CreateChatSchema = InferType<typeof CreateChatValidator>