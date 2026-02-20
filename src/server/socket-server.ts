import { Server } from 'socket.io';

let io: Server | null = null;

export function getSocketServer() {
  if (io) return io;
  io = new Server(3001, { cors: { origin: '*' } });
  io.on('connection', (socket) => {
    socket.on('draft:pick', (payload) => io?.emit('draft:update', payload));
    socket.on('score:update', (payload) => io?.emit('score:update', payload));
  });
  return io;
}
