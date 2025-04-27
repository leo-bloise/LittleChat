import { usernameAlreadyTaken } from "@/server/checkIfUsernameAlreadyTaken";
import { createSocket } from "@/server/createSocket";
import { deleteFromLocalStorage, retrieveFromLocalStorage, saveToLocalStorage } from "@/utils/localStorage";
import useRunOnce from "@/utils/useRunOnce";
import { createContext, ReactNode, useCallback, useContext, useReducer, useState } from "react";
import { io, Socket } from "socket.io-client";

type SocketContextParams = {
    socketId?: string;
    username?: string;
    enter: (username: string) => Promise<{
        message: string;
        success: boolean;
    }>;
    disconnect: () => Promise<void>
    socket?: Socket;
    loading: boolean;
}

const SocketContext = createContext<SocketContextParams>({
    enter: async () => {
        return {
            message: '',
            success: false,
        }
    },
    disconnect: async () => { },
    loading: false
})

export function useSocket() {
    return useContext(SocketContext);
}

function socketContextReducer(state: SocketContextParams, action: {
    type: string;
    data: any;
}) {
    const { type, data } = action;
    switch (type) {
        case 'connection':
            saveToLocalStorage('username', data.username as string);
            return {
                ...state,
                ...data
            }
        case 'disconnection':
            deleteFromLocalStorage('username');
            if(state.socket && !state.socket.disconnected) {
                state.socket!.disconnect();
            }
            return {
                ...state,
                ...data
            };
        case 'toggle-loading':
            return {
                ...state,
                ...data
            }
    }
    return state;
}

export function SockerContextProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(socketContextReducer, {
        enter: async (username) => {
            const alreadyTaken = await usernameAlreadyTaken(username)
            if (alreadyTaken) {
                return {
                    message: `Username already taken`,
                    success: false
                };
            }
            createSocket(username, (s) => onSocketConnect(s, username), () => {
                dispatch({
                    type: 'disconnection',
                    data: {
                        username: undefined,
                        socket: undefined,
                        loading: false
                    }
                })
            })
            return {
                message: 'connected!',
                success: true
            };
        },
        disconnect: async () => {
            dispatch({
                type: 'disconnection',
                data: {
                    username: undefined,
                    socket: undefined,
                    loading: false
                }
            })
        },
        loading: true
    })
    const toggleLoading = () => {
        dispatch({
            type: 'toggle-loading',
            data: {
                loading: !state.loading
            }
        })
    }
    const onSocketConnect = useCallback((s: Socket, username: string) => {
        console.log('connected to the chat!', {
            s,
            username
        });
        dispatch({
            type: 'connection',
            data: {
                username: username,
                socket: s,
                loading: false
            }
        })
    }, []);

    useRunOnce(() => {
        const username = retrieveFromLocalStorage('username')
        if (username === null) {
            toggleLoading();
            return;
        }
        createSocket(username, (s) => onSocketConnect(s, username), () => {
            dispatch({
                type: 'disconnection',
                data: {
                    username: undefined,
                    socket: undefined,
                    loading: false
                }
            })
        }, true)
    });

    return <SocketContext.Provider value={{
        ...state
    }}>
        {children}
    </SocketContext.Provider>
}