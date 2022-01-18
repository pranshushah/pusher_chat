import { connect } from 'mongoose';
import { server } from './app.js';
require('dotenv').config();

// import { Server } from 'socket.io';
// const io = new Server(server, { path: '/socket' });

// io.on('connection', (socket) => {
// 	console.log('new connection.....');
// 	require('./socket/message')(socket, io);
// 	socket.on('disconnect', () => {
// 		console.log('client disconnected..');
// 	});
// });

(async function startDBAndServer() {
	try {
		await connect('mongodb://localhost:27017/myApp');
		server.listen(8080, () => {
			console.warn('listing on port 8080');
		});
	} catch (e) {
		console.error(e);
	}
})();
