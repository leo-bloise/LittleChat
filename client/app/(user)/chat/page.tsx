'use client';

import Image from "next/image";
import profileImage from '@/assets/profile.png';
import { useSocket } from "@/contexts/SocketContext";
import { HiOutlinePaperAirplane } from "react-icons/hi";
import { FactoryMessageComponent } from "@/components/AbstractFactoryMessageComponent";
import { useRouter } from "next/navigation";

export default function ChatPage() {
    const { username, disconnect } = useSocket();
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
            username: username as string,
            message: 'Mensagem de alguem boladao'
        },
        {
            username: username as string,
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
            username: username as string,
            message: 'Mensagem de alguem boladao'
        },
        {
            username: username as string,
            message: 'Mensagem de alguem boladao'
        },
        {
            username: username as string,
            message: 'Mensagem de alguem boladao'
        },
    ]
    const router = useRouter();
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
        <form className="w-[95%] flex gap-x-4 p-4 justify-between">
            <input type="text" className="bg-gray-300 w-[90%] p-4 outline-none rounded-lg" />
            <button className="bg-gray-200 p-4 rounded-full">
                <HiOutlinePaperAirplane size={32} className="rotate-90" />
            </button>
        </form>
    </main>
}