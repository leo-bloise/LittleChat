'use client';

import { useSocket } from "@/contexts/SocketContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const { enter } = useSocket()
  const [username, setUsername] = useState('');
  const router = useRouter();
  return (
    <main className="flex items-center h-[100%] justify-center">
      <form onSubmit={async event => {
        event.preventDefault();
        const { message, success } = await enter(username);
        if(!success) {
          alert(message);
          return;
        }
        router.replace('/');
      }} className="flex items-center gap-4">
        <input 
          onChange={event => {
            setUsername(event.target.value);
          }}
          className="border outline-0 indent-1 p-2 rounded-sm" 
          placeholder="Type your username" 
          type="text" 
          value={username} 
          name="username"/>
        <input
          className="bg-blue-300 font-bold p-2 rounded-sm"
          type="submit"
          value="Entrar"/>
      </form>
    </main>
  );
}
