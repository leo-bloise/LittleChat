import { Model } from "mongoose";
import { Message } from "../schemas/message.schema";
import { IMessageService } from "./message.service.interface";
import { InjectModel } from "@nestjs/mongoose";
import { UserService } from "src/user/services/user.service";

export class MessageService implements IMessageService {
    constructor(
        @InjectModel(Message.name)
        private readonly messageModel: Model<Message>,
        private readonly userService: UserService,
    ) {}
    async createMessage(username: string, message: string): Promise<Message> {
        const user = await this.userService.getUser(username);
        const messageModel = new this.messageModel({
            user,
            message
        })
        return messageModel.save();
    }
}