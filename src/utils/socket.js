import { io as clientIO } from 'socket.io-client'

let socket;
export const initSocket = (url = 'http://localhost:5000') => {
  if (!socket) {
    socket = clientIO(url, { transports: ['websocket','polling'] });
    socket.on('connect', () => console.log('socket connected', socket.id));
    socket.on('disconnect', () => console.log('socket disconnected'));
  }
  return socket;
}

export const getSocket = () => socket;

export default { initSocket, getSocket }
