import { Room } from '../Model/Rooms.js';
export async function isValidRoom(req, res, next) {
	try {
		const { selectedRoomId } = req.body;
		if (req.currentUser.role === 'user') {
			const room = await Room.findOne({
				$and: [{ _id: selectedRoomId }, { members: req.currentUser.id }],
			});
			if (room) {
				next();
			} else {
				throw new Error();
			}
		} else if (req.currentUser.role === 'admin') {
			const room = await Room.findOne({
				_id: selectedRoomId,
			});
			if (room) {
				next();
			} else {
				throw new Error();
			}
		} else {
			throw new Error();
		}
	} catch (e) {
		res.status(401).send({ data: 'you are now allowed in this room' });
	}
}
