import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
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
        }
        catch (err) {
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
            <div className="backdrop-blur-lg p-8 rounded-lg shadow-lg text-gray-900">
                <h2 className="text-4xl text-center font-bold text-gray-800 mb-8 border-b-2 border-gray-900 pb-4">Profile Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-lg">
                    {['name', 'rank', 'qualification', 'email', 'address'].map((field) => (
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
                                        className="ml-2 rounded-md px-4 bg-indigo-500 text-white font-medium"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => setEditingField(null)}
                                        className="ml-2 rounded-md px-4 bg-red-500 text-white font-medium"
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
                    <div className="flex justify-between border-b-2 border-gray-900 pb-3">
                        <span className="font-medium text-gray-900">Mission ID:</span>
                        <span className="text-gray-900 ml-5 text-right">{user.missionId || "Not Assigned Yet"}</span>
                    </div>
                </div>
                <button
                    onClick={() => navigate('/')}
                    className="mt-10 px-6 py-3 flex justify-center mx-auto rounded-md text-white font-semibold bg-indigo-500 hover:bg-indigo-600 transition duration-300"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default Profile;