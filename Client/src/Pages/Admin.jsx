import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Admin = () => {
    const { personnelId } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editingField, setEditingField] = useState(null);
    const [editValue, setEditValue] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (!personnelId) {
                    setError('Personnel ID is missing');
                    setLoading(false);
                    return;
                }

                const response = await axios.get(`http://localhost:9000/personnel/get/${personnelId}`);
                if (response.status === 200) {
                    setUser(response.data);
                }
                else {
                    setError('User not found.');
                }
            }
            catch (err) {
                setError('Error fetching user data.');
            }
            finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [personnelId]);

    const handleEdit = (field) => {
        setEditingField(field);
        setEditValue(user[field]);
    };

    const handleSave = async (field) => {
        try {
            const updatedUser = { ...user, [field]: editValue };
            await axios.put(`http://localhost:9000/personnel/update/${personnelId}`, updatedUser);
            setUser(updatedUser);
            setEditingField(null);
        } catch (err) {
            console.error('Error updating user:', err);
            setError('Failed to save changes.');
        }
    };

    if (loading) {
        return <div className="text-center text-xl text-gray-700 mt-20">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 mt-20">{error}</div>;
    }

    if (!user) {
        return <div className="text-center text-gray-700 mt-20">User not found.</div>;
    }

    return (
        <div className="px-10 pt-4 bg-gradient--r from-blue-50 to-blue-100 h-max  flex flex-col">
            <div className="backdrop-blur-xl p-8 rounded-lg shadow-lg text-gray-900">
                <h2 className="text-4xl font-bold text-gray-800 mb-8 border-b-2 border-gray-900 pb-4 text-center">Profile Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-lg">
                    {['name', 'qualification', 'email', 'address'].map((field) => (
                        <div key={field} className="flex justify-between border-b-2 border-gray-900 pb-3">
                            <span className="font-medium text-gray-900 capitalize">{field}:</span>
                            {editingField === field ? (
                                <input
                                    type="text"
                                    className="ml-5 px-2 py-1 border rounded-md focus:outline-none focus:ring focus:border-indigo-300 text-right"
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                />
                            ) : (
                                <span className="text-gray-900 ml-5 text-right">{user[field]}</span>
                            )}
                            {editingField === field ? (
                                <>
                                    <button
                                        onClick={() => handleSave(field)}
                                        className="ml-3 text-green-500 font-medium hover:text-green-700"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => setEditingField(null)}
                                        className="ml-2 text-red-500 font-medium hover:text-red-700"
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => handleEdit(field)}
                                    className="ml-3 text-indigo-500 font-medium hover:text-indigo-700"
                                >
                                    Edit
                                </button>
                            )}
                        </div>
                    ))}
                </div>
                <div className="w-screen text-center mx-auto mt-5">
                    <div className="flex justify-center pb-3 ml-[-8vw]">
                        <span className="font-medium text-xl text-gray-900">Rank:</span>
                        <span className="text-gray-900 text-xl ml-16 text-right">{user.rank || "Not Assigned Yet"}</span>
                    </div>
                </div>
                <div className="flex flex-row">
                    <button
                        onClick={() => navigate('/vessels')}
                        className="mt-10 px-6 py-3 flex justify-center mx-auto rounded-md text-white font-semibold bg-indigo-500 hover:bg-indigo-600 transition duration-300"
                    >
                        Vessels
                    </button>
                    <button
                        onClick={() => navigate('/missions')}
                        className="mt-10 px-6 py-3 flex justify-center mx-auto rounded-md text-white font-semibold bg-indigo-500 hover:bg-indigo-600 transition duration-300"
                    >
                        Missions
                    </button>
                    <button
                        onClick={() => navigate('/seamens')}
                        className="mt-10 px-6 py-3 flex justify-center mx-auto rounded-md text-white font-semibold bg-indigo-500 hover:bg-indigo-600 transition duration-300"
                    >
                        Seamens
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="mt-10 px-6 py-3 flex justify-center mx-auto rounded-md text-white font-semibold bg-indigo-500 hover:bg-indigo-600 transition duration-300"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Admin;