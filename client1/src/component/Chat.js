import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { SendChat } from './SendChat';

export function Chat() {
	const { authenticated, userName } = useContext(AuthContext);
	const [rooms, setRooms] = useState([]);
	const [selectedRoom, setSelectedRoom] = useState('');

	useEffect(() => {
		async function getRooms() {
			if (authenticated) {
				const res = await fetch('/api/rooms');
				const data = await res.json();
				if (res.status === 200) {
					setRooms(data.rooms);
					if (data?.rooms?.length > 0) {
						setSelectedRoom(data.rooms[0].id);
					}
				}
			}
		}
		getRooms();
	}, [authenticated]);

	function roomClickHandler(id) {
		setSelectedRoom(id);
	}

	if (authenticated) {
		return (
			<div>
				<h1>hello {userName}</h1>
				<div className='chatroom_content_container'>
					<div className='chatroom_left_sidebar'>
						<h3>Rooms</h3>
						<ul className='rooms_list_container'>
							{rooms.map((room) => {
								return (
									<RoomItem
										key={room.id}
										room={room}
										onRoomClicked={roomClickHandler}
										selectedRoom={selectedRoom}
									/>
								);
							})}
						</ul>
					</div>
					<div className='chatroom_content'>
						<SendChat selectedRoom={selectedRoom} />
					</div>
				</div>
			</div>
		);
	} else {
		return <h1>please loggin</h1>;
	}
}

export function RoomItem({ room, onRoomClicked, selectedRoom }) {
	return (
		<li
			onClick={() => {
				onRoomClicked(room.id);
			}}
			className={selectedRoom === room.id ? 'roomitem selected_room' : 'roomitem'}
			key={room.id}
		>{`${room.roomName} (${room.members.length})`}</li>
	);
}
