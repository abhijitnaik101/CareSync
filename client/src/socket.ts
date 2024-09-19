import { io, Socket } from 'socket.io-client';
const PORT = 3000;
// Connect to the server
export const socket: Socket = io(`http://localhost:${PORT}/`, {
    transports: ['websocket'],
    reconnection: true,
});

socket.on('connect', () => {
    console.log('Connected to server');
})