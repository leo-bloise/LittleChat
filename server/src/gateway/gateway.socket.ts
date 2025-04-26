import { SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";

@WebSocketGateway()
export class Gateway {
    @SubscribeMessage('ping')
    handlePing(): string {
        return "pong";
    }
}