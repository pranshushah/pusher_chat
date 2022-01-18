import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../../Middleware/validateRequest.js';
import { User } from '../../Model/User.js';
import { JWT } from '../../utils/JWT.js';
import { Password } from '../../utils/Password.js';

const router = Router();

router.post(
	'/api/users/signin',
	[
		body('userName')
			.trim()
			.notEmpty()
			.isLength({ min: 2 })
			.withMessage('user name is Too short'),
		body('password').trim().notEmpty().withMessage('you must supply password'),
	],
	validateRequest,
	/**
	 * @param {Request} req
	 * @param {Response} res
	 */
	async (req, res) => {
		try {
			const { userName, password } = req.body;
			const user = await User.findOne({ userName });
			if (!user) {
				throw new Error('your user name is invalid or does not exist');
			}

			const isPasswordMatched = await Password.compare(
				user.password,
				user.salt,
				password,
			);
			if (!isPasswordMatched) {
				throw new Error('your password is incorrect');
			}

			//create token
			const updatedUser = await User.findOneAndUpdate(
				{ _id: user.id },
				{ $inc: { tokenVersion: 1, socketTokenVersion: 1 } },
				{ new: true },
			);

			const userAccessJwt = JWT.CREATE_ACCESS_TOKEN(updatedUser);

			// stroring token in COOKIE
			res.cookie(process.env.JWT_ACCESS_COOKIE_NAME, userAccessJwt, {
				httpOnly: true,
				sameSite: 'strict',
			});

			const userRefreshToken = JWT.CREATE_REFRESH_TOKEN(updatedUser);

			res.cookie(process.env.JWT_REFRESH_COOKIE_NAME, userRefreshToken, {
				httpOnly: true,
				sameSite: 'strict',
			});

			res.status(201).send(user);
		} catch (e) {
			res.status(403).send({ error: e });
		}
	},
);

export { router as signinRouter };
