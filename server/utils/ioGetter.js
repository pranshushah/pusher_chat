import { Server } from 'socket.io';
import { server } from '../app.js';

const io = new Server(server);

export { io };
