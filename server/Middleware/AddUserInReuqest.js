import { User } from '../Model/User.js';
import { JWT } from '../utils/JWT.js';

export async function getCurrentUser(req, res, next) {
	try {
		console.log(1);
		if (
			req.cookies[process.env.JWT_ACCESS_COOKIE_NAME] &&
			req.cookies[process.env.JWT_REFRESH_COOKIE_NAME]
		) {
			console.log(2);
			const accessToken = req.cookies[process.env.JWT_ACCESS_COOKIE_NAME];
			const refreshToken = req.cookies[process.env.JWT_REFRESH_COOKIE_NAME];
			const {
				payload,
				accessToken: newAccessToken,
				refreshToken: newRefreshToken,
				isitNew,
			} = JWT.VERIFY_ACCESS_TOKEN(accessToken, refreshToken);
			if (isitNew) {
				console.log(3);
				const user = await User.findOne({
					_id: payload.id,
					tokenVersion: payload.tokenVersion,
				});
				if (user) {
					console.log(4);
					const newUser = await User.findOneAndUpdate(
						{ _id: payload.id },
						{ $inc: { tokenVersion: 1 } },
						{ new: true },
					);
					req.currentUser = {
						id: newUser.id,
						userName: newUser.userName,
						role: newUser.role,
					};

					res.cookie(process.env.JWT_ACCESS_COOKIE_NAME, newAccessToken, {
						httpOnly: true,
						sameSite: 'strict',
					});
					res.cookie(process.env.JWT_REFRESH_COOKIE_NAME, newRefreshToken, {
						httpOnly: true,
						sameSite: 'strict',
					});
					next();
				} else {
					console.log(5);

					// await User.findOneAndUpdate(
					// 	{ _id: user.id },
					// 	{ $inc: { tokenVersion: 1 } },
					// 	{ new: true },
					// );
					throw new Error('not loggedin');
				}
			} else {
				console.log(6);
				const user = await User.findOne({
					_id: payload.id,
					tokenVersion: payload.tokenVersion,
				});
				if (user) {
					req.currentUser = { id: user.id, userName: user.userName, role: user.role };
					next();
				} else {
					console.log(8);
					await User.findOneAndUpdate(
						{ _id: user.id },
						{ $inc: { tokenVersion: 1 } },
						{ new: true },
					);
					throw new Error('not loggedin');
				}
			}
		} else {
			console.log(9);
			throw new Error('not loggedin');
		}
	} catch (e) {
		console.log(10);
		// res.clearCookie(process.env.JWT_ACCESS_COOKIE_NAME);
		// res.clearCookie(process.env.JWT_REFRESH_COOKIE_NAME);
		res.status(401).send({ message: e });
	}
}
