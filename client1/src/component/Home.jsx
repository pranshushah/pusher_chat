import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { Chat } from './Chat';
import { Login } from './Login';
export function Home() {
	const { authenticated } = useContext(AuthContext);
	if (authenticated) {
		return <Chat />;
	} else {
		return <Login />;
	}
}
