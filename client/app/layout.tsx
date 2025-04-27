'use client';
import { SockerContextProvider } from "@/contexts/SocketContext";
import "./globals.css";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className='h-[100vh]'
      >
        <SockerContextProvider>
          {children}  
        </SockerContextProvider>
      </body>
    </html>
  );
}
