import React, {createContext, useContext, useEffect} from 'react'
import io, {  Socket} from 'socket.io-client';

const SocketContext = createContext<null | Socket>(null);

export function useSocket(): Socket {
  const socket = useContext(SocketContext);
  if (!socket) {
    throw new Error('error with socket')
  } 
  return socket;
}

interface SocketProviderProps {
  serverUrl: string, 
  children: React.ReactNode
}

export function SocketProvider(props: SocketProviderProps) {
  const {serverUrl, children} = props;
  const socket = io(serverUrl);

  useEffect(() => {
    return () => {
      socket.disconnect();
    }
  }, [socket]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  )
}