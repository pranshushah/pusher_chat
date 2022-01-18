import { Router } from 'express';
import { getCurrentUser } from '../../Middleware/AddUserInReuqest.js';
import { pusherInstance } from '../../pusher.js';
import { format } from 'date-fns';
import { isValidRoom } from '../../Middleware/isValidRoom.js';
const { randomBytes } = require('crypto');

function randomId() {
	return randomBytes(64).toString('hex');
}
const router = Router();

router.post('/api/message', getCurrentUser, isValidRoom, (req, res) => {
	const { message, selectedRoomId } = req.body;
	if (message.trim().length > 0 && selectedRoomId) {
		const messageObj = {
			userId: req.currentUser.id,
			userName: req.currentUser.userName,
			time: format(new Date(), 'HH:mm'),
			id: randomId(),
			type: 'message',
			message: message.trim(),
		};
		pusherInstance.trigger(`presence-room-${selectedRoomId}`, 'message', messageObj);
		res.status(200).send(messageObj);
	} else {
		res.status(403).send('send valid data');
	}
});

router.post('/api/typing', getCurrentUser, isValidRoom, (req, res) => {
	const { selectedRoomId } = req.body;
  if(selectedRoomId){
    
  }
});

export { router as messageRoute };
