import { MessageService } from "src/message/services/message.service";
import { IGatewayService } from "./gateway.service.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GatewayService implements IGatewayService {
    constructor(
        private readonly messageService: MessageService
    ) {}
    async processMessage({ message, username }: { message: string; username: string; }): Promise<void> {
        await this.messageService.createMessage(username, message);
    }
}