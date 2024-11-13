import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [name, setName] = useState('');
    const [rank, setRank] = useState('');
    const [qualification, setQualification] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const newPersonnelData = {
            name: name,
            rank: rank,
            qualification: qualification,
            password: password,
            email: email,
            address: address,
        };

        try {
            const response = await axios.post('http://localhost:9000/personnel/register', newPersonnelData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 200) {
                console.log('Sign-up success:', response.data);
                navigate('/profile');
            }
            else {
                setError('Signup failed. Please try again.');
            }
        }
        catch (error) {
            if (error.response) {
                setError(error.response.data.message || 'An error occurred. Please try again later.');
            }
            else {
                setError('An error occurred. Please try again later.');
            }
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen py-6 relative">
            <button
                onClick={() => navigate('/')}
                className="fixed top-6 left-6 p-4 py-2 text-white bg-black hover:bg-indigo-600 rounded-md text-sm"
            >
                &larr; Back to Home
            </button>
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-semibold text-gray-900 text-center mb-6">Sign Up</h2>
                <form onSubmit={handleSignUp}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="mt-1 block w-full px-4 py-2 text-black border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="rank" className="block text-sm font-medium text-gray-700">Rank</label>
                        <input
                            type="text"
                            id="rank"
                            value={rank}
                            onChange={(e) => setRank(e.target.value)}
                            required
                            className="mt-1 block w-full px-4 py-2 text-black border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="qualification" className="block text-sm font-medium text-gray-700">Qualification</label>
                        <input
                            type="text"
                            id="qualification"
                            value={qualification}
                            onChange={(e) => setQualification(e.target.value)}
                            required
                            className="mt-1 block w-full px-4 py-2 text-black border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full px-4 py-2 text-black border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div className="mb-4">
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
                    <div className="mb-4">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                        <input
                            type="text"
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
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
                        {loading ? 'Signing up...' : 'Sign Up'}
                    </button>
                </form>
                <p className="text-sm text-center mt-4 text-gray-800">
                    Already have an account?{' '}
                    <button
                        onClick={() => navigate('/login')}
                        className="text-indigo-500 hover:underline"
                    >
                        Log in
                    </button>
                </p>
            </div>
        </div>
    );
};

export default SignUp;