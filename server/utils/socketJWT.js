import { sign } from 'jsonwebtoken';

export class SOCKET_JWT {
	static CREATE_ACCESS_TOKEN(user) {
		return sign(
			{
				userName: user.userName,
				id: user.id,
				role: user.role,
				socketTokenVersion: user.socketTokenVersion,
			},
			process.env.JWT_SOCKET_ACCESS_SECRET,
			{
				expiresIn: '30 days',
				subject: user.id,
			},
		);
	}
	static CREATE_REFRESH_TOKEN(user) {
		const refreshToken = sign(
			{
				userName: user.userName,
				id: user.id,
				role: user.role,
				socketTokenVersion: user.socketTokenVersion,
			},
			process.env.JWT_SOCKET_REFRESH_SECRET,
			{
				expiresIn: '100 days',
				subject: user.id,
			},
		);
		return refreshToken;
	}
}
