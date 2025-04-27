import { io, Socket } from "socket.io-client";

export const createSocket = (username: string, onConnection: (socket: Socket) => void, onDisconnect: () => void, reconnection?: boolean) => {
    const query = reconnection ? {
        username,
        reconnection
    } : {
        username
    };
    const socket = io('http://localhost:8080', {
        transports: ['websocket'],
        query
    });
    socket.on('connect', () => {
        onConnection(socket);
    })
    socket.on('disconnect', () => {
        onDisconnect();
    })
}