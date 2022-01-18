import { sign, verify } from 'jsonwebtoken';

export class JWT {
	static CREATE_ACCESS_TOKEN(user) {
		return sign(
			{
				userName: user.userName,
				id: user.id,
				role: user.role,
				tokenVersion: user.tokenVersion,
			},
			process.env.JWT_ACCESS_SECRET,
			{
				expiresIn: '1m',
				subject: user.id,
			},
		);
	}

	static VERIFY_ACCESS_TOKEN(accessToken, refreshToken) {
		console.log(1);
		if (accessToken !== '') {
			try {
				console.log(2);
				const payload = verify(accessToken, process.env.JWT_ACCESS_SECRET);
				return { payload, accessToken, refreshToken, isitNew: false };
			} catch (e) {
				// checking if error is occured due to token expired.
				if (e.name === 'TokenExpiredError') {
					try {
						console.log(3);
						const payload = verify(accessToken, process.env.JWT_ACCESS_SECRET, {
							ignoreExpiration: true,
						});
						const refreshPayload = verify(refreshToken, process.env.JWT_REFRESH_SECRET);
						if (
							payload.id === refreshPayload.id &&
							payload.tokenVersion === refreshPayload.tokenVersion
						) {
							console.log(4);
							const accessToken = JWT.CREATE_ACCESS_TOKEN({
								...payload,
								tokenVersion: payload.tokenVersion + 1,
							});
							const refreshToken = JWT.CREATE_REFRESH_TOKEN({
								...refreshPayload,
								tokenVersion: refreshPayload.tokenVersion + 1,
							});
							return { isitNew: true, payload, accessToken, refreshToken };
						} else {
							console.log(5);
							throw new Error('you are not authorized');
						}
					} catch (e) {
						console.log(6);
						throw new Error('you are not authorized');
					}
				} else {
					console.log(7);
					throw new Error('you are not authorized');
				}
			}
		} else {
			console.log(8);
			throw new Error('you are not authorized');
		}
	}

	static CREATE_REFRESH_TOKEN(user) {
		const refreshToken = sign(
			{
				userName: user.userName,
				id: user.id,
				role: user.role,
				tokenVersion: user.tokenVersion,
			},
			process.env.JWT_REFRESH_SECRET,
			{
				expiresIn: '100 days',
				subject: user.id,
			},
		);
		return refreshToken;
	}
}
