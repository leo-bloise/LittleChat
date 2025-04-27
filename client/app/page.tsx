'use client';
import { useSocket } from "@/contexts/SocketContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { socket, loading } = useSocket()
  const router = useRouter();
  useEffect(() => {
    console.log('checking...', { loading, socket })
    if(loading) return;
    if(!socket) {
      router.push('/register')
      return;
    }
    router.push('/chat');
  }, [loading])
  return <main className="flex flex-col items-center justify-center h-[100%]">
    <div className="h-40 w-40 bg-amber-300 rounded-full animate-ping" />
    <span className="mt-40">Setting somethings up...</span>
  </main>;
}
