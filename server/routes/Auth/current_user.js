import { Router } from 'express';
import { getCurrentUser } from '../../Middleware/AddUserInReuqest.js';

const router = Router();

router.get('/api/users/currentuser', getCurrentUser, (req, res) => {
	res.send({ currentUser: { ...req.currentUser } || null }); //req.currentUser will be added by currentUser middleware
});

export { router as getcurrentUserRouter };
