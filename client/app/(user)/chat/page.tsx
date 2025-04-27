'use client';

import Image from "next/image";
import profileImage from '@/assets/profile.png';
import { useSocket } from "@/contexts/SocketContext";

export default function ChatPage() {
    const { username } = useSocket();
    const messages = [
        {
            username: 'Teste 1',
            message: 'Mensagem de alguem boladao'
        },
        {
            username: 'Teste 2',
            message: 'Mensagem de alguem boladao'
        },
        {
            username: 'Teste 3',
            message: 'Mensagem de alguem boladao'
        },
        {
            username: 'Teste 1',
            message: 'Mensagem de alguem boladao'
        },
        {
            username: 'Teste 2',
            message: 'Mensagem de alguem boladao'
        },
        {
            username: 'Teste 3',
            message: 'Mensagem de alguem boladao'
        },
        {
            username: 'Teste 1',
            message: 'Mensagem de alguem boladao'
        },
        {
            username: 'Teste 2',
            message: 'Mensagem de alguem boladao'
        },
        {
            username: 'Teste 3',
            message: 'Mensagem de alguem boladao'
        }
    ]
    return <main className="p-4 h-[100%] gap-y-4 flex flex-col">
        <div className="flex items-center gap-x-4">
            <Image
                src={profileImage} alt="Profile photo"
                width={50}
                height={50}
                className="border-[1px] border-black rounded-full"
            />
            <span>{username}</span>
        </div>
        <div className="border-[1px] rounded-lg border-black w-[100%] h-[70%] pl-4 pb-[100px]" style={{
            overflowY: 'scroll'
        }}>
            {messages.map(({message, username}) => 
                <div className="flex flex-col p-4 bg-gray-100 w-100 rounded-lg mt-4 mb-4">
                    <span className="text-green-600">
                        {username}
                    </span>
                    <span>
                        {message}
                    </span>
                </div>
            )}
            <form className="w-[100%]">
                <input type="text" className="bg-gray-300 w-[90%] p-4 outline-none rounded-lg"/>
            </form>
        </div>
    </main>
}