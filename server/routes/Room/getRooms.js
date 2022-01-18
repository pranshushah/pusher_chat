import { Router } from 'express';
import { getCurrentUser } from '../../Middleware/AddUserInReuqest.js';
import { Room } from '../../Model/Rooms.js';

const router = Router();

router.get('/api/rooms', getCurrentUser, async (req, res) => {
	const rooms = await Room.find();
	res.status(200).send({ rooms });
});

export { router as rooms };
