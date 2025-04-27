import { ConnectedSocket, MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { UserService } from "src/user/services/user.service";
import { Server, Socket } from "socket.io";
import { Logger } from "@nestjs/common";
import { GatewayService } from "./services/gateway.service";
import { ParsedUrlQuery } from "querystring";

@WebSocketGateway()
export class Gateway implements OnGatewayConnection {
    private logger: Logger = new Logger(Gateway.name);
    constructor(
        private readonly userService: UserService,
        private readonly gatewayService: GatewayService
    ) {}
    private isReconnection(query: ParsedUrlQuery) {
        const { reconnection } = query;
        return reconnection === 'true';
    }
    async handleConnection(client: Socket, ...args: any[]) {
        try {
            const { username } = client.handshake.query
            if(!this.isReconnection(client.handshake.query)) {
                await this.userService.createUser({
                    username: username as string,
                });
            }
            this.logger.log(`New user ${username} connected with id ${client.id}`);
        } catch(err: unknown) {
            this.logger.error(err);
            client.disconnect(true);
        }
    }
    @SubscribeMessage('message')
    async handleMessage(@ConnectedSocket() client: Socket, @MessageBody() data: {
        message: string,
        username: string
    }) {
        this.logger.log(`New message arrived ${data}`)
        await this.gatewayService.processMessage(data);
        client.broadcast.emit('new_message', data);
    }
}
