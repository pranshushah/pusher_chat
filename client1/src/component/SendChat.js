import React, { useContext, useEffect, useState } from 'react';
import { pusher } from '../App';
import AuthContext from '../context/AuthContext';

export function SendChat({ selectedRoom }) {
	const { userId } = useContext(AuthContext);
	const [message, setMessage] = useState('');
	const [chats, setChats] = useState([]);

	function messageChangeHandler(e) {
		setMessage(e.target.value);
	}

	async function messageSendHandler() {
		const res = await fetch('/api/message', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ selectedRoomId: selectedRoom, message: message.trim() }),
		});
		console.log(res.status);
	}

	useEffect(() => {
		if (selectedRoom && userId) {
			fetch('/api/joinedRoom', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ selectedRoomId: selectedRoom }),
			}).then((res) => {
				if (res.status === 200) {
					const channel = pusher.subscribe(`presence-room-${selectedRoom}`);
					channel.bind('pusher:subscription_succeeded', function () {
						console.log('done');
					});
					channel.bind('joined', (data) => {
						if (data.userId !== userId) {
							const message = { ...data };
							setChats((chats) => {
								const newChats = [...chats];
								newChats.push(message);
								return newChats;
							});
						}
					});
					channel.bind('message', (message) => {
						console.log('ge');
						setChats((chats) => {
							const newChats = [...chats];
							newChats.push(message);
							return newChats;
						});
					});
				} else {
					console.log(res);
				}
			});
		}
	}, [selectedRoom, userId]);

	return (
		<div className='main_chat_container'>
			<h1 style={{ textAlign: 'center', marginBottom: '8px' }}>chat</h1>
			<ul className='chats'>
				{chats.map((chat) => (
					<li key={chat.id}>{formatmessage(chat)}</li>
				))}
			</ul>
			<div className='sender'>
				<input
					type='text'
					className='input'
					value={message}
					onChange={messageChangeHandler}
				/>
				<button
					style={{ marginLeft: '8px', padding: '4px 8px' }}
					onClick={messageSendHandler}
				>
					send
				</button>
			</div>
		</div>
	);
}

function formatmessage(chat) {
	if (chat.type === 'message') {
		return `${chat.message} (from:${chat.userName} at ${chat.time} )`;
	} else if (chat.type === 'joined') {
		return `${chat.userName} has joined the room`;
	} else {
		return `${chat.message}`;
	}
}
