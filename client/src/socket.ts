import io from 'socket.io-client';

// Connect to the backend server
export const socket = io('http://localhost:3000');