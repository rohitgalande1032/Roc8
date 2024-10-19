import React, { useState } from 'react';
import { setCookie } from '../utils/cookieUtils';

const Auth = ({ setIsAuthenticated }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Assume login is successful for demo purposes
        setCookie('auth', true);
        setIsAuthenticated(true);
    };

    return (
        <form onSubmit={handleLogin}>
            <label>
                Username:
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </label>
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Login</button>
        </form>
    );
};

export default Auth;
