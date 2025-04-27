import { OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { UserService } from "src/user/services/user.service";
import { Server, Socket } from "socket.io";
import { Logger } from "@nestjs/common";

@WebSocketGateway()
export class Gateway implements OnGatewayConnection {
    private logger: Logger = new Logger(Gateway.name);
    constructor(
        private userService: UserService
    ) {}
    async handleConnection(client: Socket, ...args: any[]) {
        try {
            const { username, reconnection } = client.handshake.query
            if(!reconnection) {
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
}
