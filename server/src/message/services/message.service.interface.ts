import { Message } from "../schemas/message.schema";

export interface IMessageService {
    createMessage(username: string, message: string): Promise<Message>
}