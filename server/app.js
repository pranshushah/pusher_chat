import cookieParser from 'cookie-parser';
import express from 'express';
import { getcurrentUserRouter } from './routes/Auth/current_user.js';
import http from 'http';
import { signinRouter } from './routes/Auth/signin.js';
import { singinoutRoute } from './routes/Auth/signout.js';
import { rooms } from './routes/Room/getRooms.js';
import { joinedRoom } from './routes/Room/joinedRoom.js';
import { pusherAuth } from './routes/Auth/Pusher.js';
import { messageRoute } from './routes/Message/message.js';

let logger = require('morgan');
let cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger('dev'));

app.use(signinRouter);
app.use(singinoutRoute);
app.use(pusherAuth);
app.use(getcurrentUserRouter);
app.use(rooms);
app.use(joinedRoom);
app.use(messageRoute);

app.get('/', (req, res) => {
	res.send('hello');
});

const server = http.createServer(app);
export { app, server };
