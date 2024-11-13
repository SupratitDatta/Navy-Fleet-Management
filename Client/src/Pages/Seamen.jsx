import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Seamen() {
    const [personnelData, setPersonnelData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [editPersonnel, setEditPersonnel] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:9000/personnel/getall')
            .then(response => {
                setPersonnelData(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching personnel data!', error);
            });
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const highlightText = (text) => {
        if (!searchQuery) return text;
        const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'));
        return parts.map((part, index) =>
            part.toLowerCase() === searchQuery.toLowerCase() ? (
                <mark key={index} className="bg-yellow-300">{part}</mark>
            ) : (
                part
            )
        );
    };

    const filteredPersonnel = personnelData.filter(person =>
        person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        person.rank.toLowerCase().includes(searchQuery.toLowerCase()) ||
        person.qualification.toLowerCase().includes(searchQuery.toLowerCase()) ||
        person.missionId?.toString().includes(searchQuery) ||
        person.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        person.address.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleEdit = (personnelId) => {
        const personnel = personnelData.find(p => p.personnelId === personnelId);
        setEditPersonnel(personnel);
    };

    const handleSave = () => {
        if (editPersonnel) {
            axios.put(`http://localhost:9000/personnel/${editPersonnel.personnelId}`, editPersonnel)
                .then(response => {
                    setPersonnelData(prevData => prevData.map(p =>
                        p.personnelId === editPersonnel.personnelId ? editPersonnel : p
                    ));
                    setEditPersonnel(null);
                })
                .catch(error => {
                    console.error('Error saving edited data', error);
                });
        }
    };

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-1 text-center text-gray-800 uppercase">Personnel List</h1>
            <div className='w-full flex justify-end'>
                <input
                    type="text"
                    placeholder="Search all fields"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="mb-4 p-2 min-w-80 border border-gray-300 rounded bg-gray-800 text-white"
                />
            </div>

            <div className="relative overflow-hidden rounded-lg">
                <table className="w-full table-auto border-collapse bg-white shadow-lg rounded-lg">
                    <thead>
                        <tr className="bg-blue-600 text-white">
                            <th className="px-6 py-3 text-center">Name</th>
                            <th className="px-6 py-3 text-center">Rank</th>
                            <th className="px-6 py-3 text-center">Qualification</th>
                            <th className="px-6 py-3 text-center">Mission ID</th>
                            <th className="px-6 py-3 text-center">Email</th>
                            <th className="px-6 py-3 text-center">Address</th>
                            <th className="px-6 py-3 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPersonnel.map(person => (
                            <tr key={person.personnelId} className="hover:bg-blue-100 border-b ">
                                <td className="px-6 py-3 border-b border-gray-900 cursor-pointer text-center text-gray-900">{highlightText(person.name)}</td>
                                <td className="px-6 py-3 border-b border-gray-900 cursor-pointer text-center text-gray-900">{highlightText(person.rank)}</td>
                                <td className="px-6 py-3 border-b border-gray-900 cursor-pointer text-center text-gray-900">{highlightText(person.qualification)}</td>
                                <td className="px-6 py-3 border-b border-gray-900 cursor-pointer text-center text-gray-900">
                                    {person.missionId ? person.missionId : 'Not Assigned'}
                                </td>
                                <td className="px-6 py-3 border-b border-gray-900 cursor-pointer text-center text-gray-900">{highlightText(person.email)}</td>
                                <td className="px-6 py-3 border-b border-gray-900 cursor-pointer text-center text-gray-900">{highlightText(person.address)}</td>
                                <td className="px-6 py-3 border-b border-gray-900 cursor-pointer text-center text-gray-900">
                                    {editPersonnel && editPersonnel.personnelId === person.personnelId ? (
                                        <button
                                            className="bg-green-500 text-white py-1 px-3 rounded"
                                            onClick={handleSave}
                                        >
                                            Save
                                        </button>
                                    ) : (
                                        <button
                                            className="bg-blue-500 text-white py-1 px-3 rounded"
                                            onClick={() => handleEdit(person.personnelId)}
                                        >
                                            Assign Mission
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {editPersonnel && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-lg w-96">
                        <h2 className="text-2xl mb-4 text-gray-900 text-center">Assign/Edit Mission ID</h2>
                        <div className="mb-4">
                            <label>Mission ID</label>
                            <input
                                type="number"
                                placeholder={editPersonnel.missionId ? `${editPersonnel.missionId}` : 'Enter Mission ID'}
                                value={editPersonnel.missionId}
                                onChange={e => setEditPersonnel({ ...editPersonnel, missionId: e.target.value })}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="flex justify-center space-x-4">
                            <button onClick={() => setEditPersonnel(null)} className="px-4 py-2 bg-red-500 text-white rounded">
                                Cancel
                            </button>
                            <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Seamen;