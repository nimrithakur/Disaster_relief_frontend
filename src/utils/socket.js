import { io as clientIO } from 'socket.io-client'

let socket;
export const initSocket = (url = 'http://localhost:5000') => {
  if (!socket) {
    socket = clientIO(url, { 
      transports: ['websocket','polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: Infinity
    });
    
    socket.on('connect', () => {
      console.log('✅ Socket connected', socket.id);
    });
    
    socket.on('disconnect', () => {
      console.log('❌ Socket disconnected');
    });
    
    socket.on('connect_error', (error) => {
      console.log('Socket connection error (will retry):', error.message);
    });
    
    socket.on('reconnect', (attemptNumber) => {
      console.log('🔄 Socket reconnected after', attemptNumber, 'attempts');
    });
  }
  return socket;
}

export const getSocket = () => socket;

export default { initSocket, getSocket }
