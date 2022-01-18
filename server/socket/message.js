import { format } from 'date-fns';
const { randomBytes } = require('crypto');
import { Room } from '../Model/Rooms';
function randomId() {
	return randomBytes(64).toString('hex');
}

function messageEmit(socket, io) {
	socket.on('chatMessage', (msg) => {
		io.emit('message', {
			...msg,
			time: format(new Date(), 'HH:mm'),
			id: randomId(),
			type: 'message',
		});
	});
}

function joinRoom(socket, io) {
	socket.on('joinRoom', async (roomData) => {
		console.log(roomData);
		try {
			const room = await Room.findOne({
				$and: [{ _id: roomData.selectedRoomId }, { members: roomData.userId }],
			});
			if (room) {
				console.log(room);
				const roomId = room.id.toString();
				socket.join(roomId);
				socket.broadcast.to(roomId).emit('userJoined', {
					id: randomId(),
					type: 'joined',
					userId: roomData.userId,
					userName: roomData.userName,
				});
			} else {
				socket.emit('wrongRoom', {
					type: 'error',
					message: `${roomData.userName} sorry you are not allowed in this room`,
				});
			}
		} catch (e) {}
	});
}

module.exports = function (socket, io) {
	messageEmit(socket, io);
	joinRoom(socket, io);
};
