import { io } from 'socket.io-client';

const isDev = process.env.NODE_ENV === 'development';

const socket = io(isDev ? 'http://localhost:3001' : window.location.origin, {
  transports: ['websocket', 'polling']
});

export default socket;
