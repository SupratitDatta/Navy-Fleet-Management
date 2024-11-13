import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const loginData = { username, password };

        try {
            const response = await fetch('http://localhost:9000/personnel/getall', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Fetched users:', data);
                const user = data.find(user => user.name === username);

                if (user) {
                    if (user.password === password) {
                        localStorage.setItem('personnelId', user.personnelId);
                        
                        const adminRanks = ['admiral', 'vice admiral', 'rear admiral'];
                        if (adminRanks.includes(user.rank.toLowerCase())) {
                            navigate(`/admin/${user.personnelId}`);
                        }
                        else {
                            navigate(`/profile/${user.personnelId}`);
                        }
                    }
                    else {
                        setError('Incorrect password.');
                    }
                }
                else {
                    setError('User not found');
                }
            }
            else {
                setError('Failed to fetch users. Please try again later.');
            }
        }
        catch (error) {
            setError('An error occurred. Please try again later.');
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <button
                onClick={() => navigate('/')}
                className="fixed top-6 left-6 p-4 py-2 text-white bg-black hover:bg-indigo-600 rounded-md text-sm"
            >
                &larr; Back to Home
            </button>
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-semibold text-center text-gray-900 mb-6">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="mt-1 block w-full px-4 py-2 text-black border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 block w-full px-4 py-2 text-black border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 px-4 rounded-md text-white font-semibold ${loading ? 'bg-gray-400' : 'bg-indigo-500 hover:bg-indigo-600'}`}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <p className="text-sm text-center mt-4 text-gray-800">
                    Don't have an account?{' '}
                    <button
                        onClick={() => navigate('/signup')}
                        className="text-indigo-500 hover:underline"
                    >
                        Sign Up
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;