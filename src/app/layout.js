'use client'
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "../Component/Sidebar/Sidebar";
import "../styles/globals.css";
import '../styles/table.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";

export default function RootLayout({ children }) {
  const [token, setToken] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false); 
  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    const Storage = localStorage.getItem('accessToken');
    setToken(Storage);

    if (Storage && path === '/login') {
      router.push('/dashboard');
    }

    if (!Storage && path !== '/login' && path !== '/register') {
      router.push('/login');
    }

    if (isRegistered && path === '/login') {
      router.push('/login');
      setIsRegistered(false);
    }
  }, [path, router, isRegistered]);

  return (
    <html lang="en">
      <body>
        {!token && ['/login', '/register'].includes(path) && <>{children}</>}
        {token && <Sidebar>{children}</Sidebar>}
      </body>
    </html>
  );
}

export function setRegistrationStatus(status) {
  setIsRegistered(status);
}
