import { io, Socket } from 'socket.io-client';

// Connect to the server
export const socket: Socket = io('http://localhost:3000', {
    transports: ['websocket'],
    reconnection: true,
});

socket.on('connect', () => {
    console.log('Connected to server');
})