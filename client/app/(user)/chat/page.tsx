'use client';

import Image from "next/image";
import profileImage from '@/assets/profile.png';
import { useSocket } from "@/contexts/SocketContext";
import { HiOutlinePaperAirplane } from "react-icons/hi";
import { FactoryMessageComponent } from "@/components/AbstractFactoryMessageComponent";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

type Message = {
    message: string;
    username: string;
}

export default function ChatPage() {
    const { username, disconnect, socket } = useSocket();
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);
    const router = useRouter();
    const listener = (message: Message) => {
        setMessages(old => [...old, message]);
    }
    const sendMessage = useCallback((message: string) => {
        const messageModel: Message = {
            message,
            username: username!
        }
        socket?.emit('message', messageModel);
        listener(messageModel);
    }, [socket]);
    useEffect(() => {        
        if(!socket?.hasListeners('new_message')) {
            socket?.on('new_message', listener);
        }
        return () => {
            socket?.off('new_message', listener)
        }
    }, []); 
    return <main className="h-[100%] p-4 flex flex-col">
        <div className="flex items-center gap-x-4">
            <Image
                src={profileImage} alt="Profile photo"
                width={50}
                height={50}
                className="border-[1px] border-black rounded-full"
            />
            <span>{username}</span>
            <button onClick={() => {
                disconnect();
                router.push('/')
            }} className="bg-red-500 p-3 rounded-md cursor-pointer">
                <span className="font-bold">Logout</span>
            </button>
        </div>
        <div className="pl-4 pb-8 relative" style={{
            overflowY: 'scroll'
        }}>
            {messages.map((message) => {
                const factory = FactoryMessageComponent.getFactory(message, username!);
                return factory.createComponent(message);
            })}
        </div>
        <form onSubmit={event => {
                event.preventDefault();
                if(!message) return;
                sendMessage(message);
            }}  className="w-[95%] flex gap-x-4 p-4 justify-between">
            <input value={message} onChange={event => {
                setMessage(event.target.value)
            }} type="text" placeholder="Type your message..." className="bg-gray-300 w-[90%] p-4 outline-none rounded-lg" />
            <button type="submit" className="bg-gray-200 p-4 rounded-full active:opacity-50 transition-opacity">
                <HiOutlinePaperAirplane size={32} className="rotate-90" />
            </button>
        </form>
    </main>
}