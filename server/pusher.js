const Pusher = require('pusher');

export const pusherInstance = new Pusher({
	appId: '1332748',
	key: 'dc534036d7f51eb23eb3',
	secret: '60da72eb1e4a653b26c8',
	cluster: 'ap2',
	encrypted: true,
});
