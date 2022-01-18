import { pusherInstance } from '../../pusher.js';
import { Router } from 'express';
import { getCurrentUser } from '../../Middleware/AddUserInReuqest.js';

const router = Router();

router.post('/api/pusher/auth', getCurrentUser, async (req, res) => {
	const socketId = req.body.socket_id;
	const channel = req.body.channel_name;
	const presenceData = {
		user_id: req.currentUser.id,
		user_info: { userName: req.currentUser.userName, role: req.currentUser.role },
	};

	const auth = pusherInstance.authenticate(socketId, channel, presenceData);
	console.log(auth.channel_data);
	res.send(auth);
});

export { router as pusherAuth };
