import { verify } from 'jsonwebtoken';
export function verifyUser(token) {
	if (token !== '') {
		try {
			const payload = verify(token, process.env.JWT_ACCESS_SECRET);
			return payload;
		} catch (e) {
			throw new Error('you are not authorized');
		}
	} else {
		throw new Error('you are not authorized');
	}
}
