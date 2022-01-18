import { validationResult } from 'express-validator';

export function validateRequest(req, _, next) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(req.body);
	}
	next();
}
