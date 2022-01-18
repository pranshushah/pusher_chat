import React, { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';

const names = [
	{ name: 'tanay', id: 1, password: '1234124', role: 'admin' },
	{ name: 'pranshu', id: 2, password: '1234' },
	{ name: 'rizwan', id: 3, password: '12347' },
	{ name: 'prakhar', id: 4, password: '00234' },
	{ name: 'shivam', id: 5, password: '123456' },
];

export function Login() {
	const [loading, setLoading] = useState(false);
	const { setLogin, setUserName } = useContext(AuthContext);
	async function loginHandler(name, password) {
		try {
			setLoading(true);
			const res = await fetch('api/users/signin', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ userName: name, password }),
			});
			if (res.status === 201) {
				const data = await res.json();
				setLoading(false);
				setLogin(true);
				setUserName(data.userName);
			}
		} catch (e) {}
	}

	return (
		<div className='App'>
			{loading ? (
				<h1>'Loading...'</h1>
			) : (
				names.map(({ name, id, password }) => (
					<div key={id}>
						<button
							className='login'
							onClick={() => {
								loginHandler(name, password);
							}}
						>{`login as ${name}`}</button>
					</div>
				))
			)}
		</div>
	);
}
