import { Router } from 'express';
import { getCurrentUser } from '../../Middleware/AddUserInReuqest.js';
import { isValidRoom } from '../../Middleware/isValidRoom.js';
import { pusherInstance } from '../../pusher.js';
import { format } from 'date-fns';
const { randomBytes } = require('crypto');

function randomId() {
	return randomBytes(64).toString('hex');
}
const router = Router();

router.post('/api/joinedRoom', getCurrentUser, isValidRoom, async (req, res) => {
	try {
		const { selectedRoomId } = req.body;
		if (selectedRoomId) {
			pusherInstance.trigger(`presence-room-${selectedRoomId}`, 'joined', {
				userId: req.currentUser.id,
				userName: req.currentUser.userName,
				time: format(new Date(), 'HH:mm'),
				id: randomId(),
				type: 'joined',
			});
			res.status(200).send({ data: 'welcome' });
		} else {
			throw new Error();
		}
	} catch (e) {
		res.status(403).send(e);
	}
});

export { router as joinedRoom };
