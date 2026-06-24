export type Message = {
  id: number;
  text: string | null;
  created_at: Date;
  sender_id: number;
  chat_id: any;
  readers?: any[];
  chat_app_messageimage?: {
    id: number;
    image: string;
    message_id: number;
  }[];
};