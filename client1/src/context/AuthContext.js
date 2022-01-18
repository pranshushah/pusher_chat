import { createContext } from 'react';

const AuthContext = createContext({
	authenticated: false,
	userName: '',
	setLogin: () => {},
	setUserName: () => {},
	userId: '',
});
const AuthProvider = AuthContext.Provider;
const AuthConsumer = AuthContext.Consumer;

export { AuthConsumer, AuthProvider };
export default AuthContext;
