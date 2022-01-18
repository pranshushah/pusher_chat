import { Router, Request, Response } from 'express';

const router = Router();

router.post(
	'/api/users/signout',
	/**
	 * @param {Request} _
	 * @param {Response} res
	 */
	(_, res) => {
		res.clearCookie(process.env.JWT_ACCESS_COOKIE_NAME);
		res.clearCookie(process.env.JWT_REFRESH_COOKIE_NAME);
		res.send({ done: true });
	},
);

export { router as singinoutRoute };
