import React, { useEffect, useState } from 'react';
import './App.css';
import { Home } from './component/Home';
import { AuthProvider } from './context/AuthContext';
import Pusher from 'pusher-js';

/**
 * @type Pusher
 */

export let pusher;

function App() {
	const [authenticated, setAuthenticated] = useState(false);
	const [userName, setUserName] = useState('');
	const [userId, setUserId] = useState('');
	useEffect(() => {
		async function fetchCurrentUser() {
			try {
				const res = await fetch('/api/users/currentuser');
				const data = await res.json();
				if (res.status === 200) {
					setUserName(data.currentUser.userName);
					setAuthenticated(true);
					setUserId(data.currentUser.id);
				}
			} catch (e) {
				console.log(e);
			}
		}
		fetchCurrentUser();
		pusher = new Pusher('dc534036d7f51eb23eb3', {
			cluster: 'ap2',
			encrypted: true,
			authEndpoint: '/api/pusher/auth',
		});
	}, []);
	return (
		<AuthProvider
			value={{ authenticated, userName, setLogin: setAuthenticated, setUserName, userId }}
		>
			<Home />
		</AuthProvider>
	);
}

export default App;
