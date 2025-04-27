import { io, Socket } from "socket.io-client";

export const createSocket = (username: string, onConnection: (socket: Socket) => void, onDisconnect: () => void, reconnection?: boolean) => {
    const socket = io('http://localhost:8080', {
        transports: ['websocket'],
        query: {
            username,
            reconnection
        }
    });
    socket.on('connect', () => {
        onConnection(socket);
    })
    socket.on('disconnect', () => {
        onDisconnect();
    })
}