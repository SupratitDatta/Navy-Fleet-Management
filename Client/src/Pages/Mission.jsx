import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Missions() {
    const [missions, setMissions] = useState([]);
    const [editingMissionId, setEditingMissionId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [editedMission, setEditedMission] = useState({
        missionId: '',
        name: '',
        description: '',
        createdById: '',
        creatorName: '',
        creatorRank: '',
        assignedVesselName: '',
        startDate: '',
        endDate: ''
    });
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newMission, setNewMission] = useState({
        missionId: '',
        name: '',
        description: '',
        createdById: '',
        creatorName: '',
        creatorRank: '',
        assignedVesselName: '',
        startDate: '',
        endDate: ''
    });

    useEffect(() => {
        axios.get('http://localhost:9000/mission/getallmission')
            .then(response => setMissions(response.data))
            .catch(error => console.error('Error fetching mission data!', error));
    }, []);

    const handleEditClick = (mission) => {
        setEditingMissionId(mission.missionId);
        setEditedMission({ ...mission });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedMission((prevMission) => ({
            ...prevMission,
            [name]: value
        }));
    };

    const handleSaveClick = () => {
        axios.put(`http://localhost:9000/mission/update/${editedMission.missionId}`, editedMission)
            .then(() => {
                const updatedMissions = missions.map(mission =>
                    mission.missionId === editedMission.missionId ? editedMission : mission
                );
                setMissions(updatedMissions);
                setEditingMissionId(null);
            })
            .catch(error => console.error('Error saving mission data!', error));
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const handleAddMissionChange = (e) => {
        const { name, value } = e.target;
        setNewMission((prevMission) => ({
            ...prevMission,
            [name]: value
        }));
    };

    const handleAddMissionSubmit = () => {
        axios.post('http://localhost:9000/mission/add', newMission)
            .then(response => {
                setMissions([...missions, response.data]);
                setIsAddModalOpen(false);
                setNewMission({
                    missionId: '',
                    name: '',
                    description: '',
                    createdById: '',
                    creatorName: '',
                    creatorRank: '',
                    assignedVesselName: '',
                    startDate: '',
                    endDate: ''
                });
            })
            .catch(error => console.error('Error adding mission!', error));
    };

    const handleDeleteClick = (missionId) => {
        axios.delete(`http://localhost:9000/mission/delete/${missionId}`)
            .then(() => {
                setMissions(missions.filter(mission => mission.missionId !== missionId));
            })
            .catch(error => console.error('Error deleting mission!', error));
    };

    const highlightMatch = (text) => {
        if (!searchTerm) return text;
        if (typeof text !== 'string') return text;
    
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        const parts = text.split(regex);
        return parts.map((part, index) =>
            part.toLowerCase() === searchTerm.toLowerCase() ? (
                <span key={index} className="bg-yellow-300">{part}</span>
            ) : (
                part
            )
        );
    };
    
    
    const filteredMissions = missions.filter(mission =>
        Object.values(mission).some(value => {
            if (value && typeof value === 'string') {
                return value.toLowerCase().includes(searchTerm);
            } else if (value && typeof value === 'number') {
                return value.toString().includes(searchTerm);
            }
            return false;
        })
    );
    
    return (
        <div className="p-8 min-h-screen scrollbar-hide">
            <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800 uppercase">Missions List</h1>
            <div className="max-w-5xl mx-auto mb-6 flex justify-between items-center">
                <input
                    type="text"
                    placeholder="Search missions..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full p-2 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="ml-4 w-60 bg-teal-600 text-white py-2 px-4 rounded-lg"
                >
                    Add Mission
                </button>
            </div>

            {isAddModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50  flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full h-[80vh] overflow-scroll mt-16 max-w-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4 text-gray-900 text-center">Add New Mission</h2>
                        <div className="space-y-4">
                            <input type="text" name="name" placeholder="Mission Name" value={newMission.name} onChange={handleAddMissionChange} className="w-full p-2 border rounded-lg text-gray-900" />
                            <input type="text" name="description" placeholder="Description" value={newMission.description} onChange={handleAddMissionChange} className="w-full p-2 border rounded-lg text-gray-900" />
                            <input type="number" name="createdById" placeholder="Creator ID" value={newMission.createdById} onChange={handleAddMissionChange} className="w-full p-2 border rounded-lg text-gray-900" />
                            <input type="text" name="creatorName" placeholder="Creator Name" value={newMission.creatorName} onChange={handleAddMissionChange} className="w-full p-2 border rounded-lg text-gray-900" />
                            <input type="text" name="creatorRank" placeholder="Creator Rank" value={newMission.creatorRank} onChange={handleAddMissionChange} className="w-full p-2 border rounded-lg text-gray-900" />
                            <input type="text" name="assignedVesselName" placeholder="Assigned Vessel" value={newMission.assignedVesselName} onChange={handleAddMissionChange} className="w-full p-2 border rounded-lg text-gray-900" />
                            <input type="date" name="startDate" value={newMission.startDate} onChange={handleAddMissionChange} className="w-full p-2 border rounded-lg text-gray-900" />
                            <input type="date" name="endDate" value={newMission.endDate} onChange={handleAddMissionChange} className="w-full p-2 border rounded-lg text-gray-900" />
                        </div>
                        <div className="flex justify-center space-x-4 mt-6">
                            <button onClick={() => setIsAddModalOpen(false)} className="py-2 px-4 w-26 border bg-red-500 border-gray-300 rounded-lg">Cancel</button>
                            <button onClick={handleAddMissionSubmit} className="bg-indigo-500 w-30 text-white py-2 px-6 rounded-lg">Save</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="overflow-x-auto">
                <div className="max-w-7xl mx-auto bg-white bg-opacity-60 backdrop-filter backdrop-blur-lg shadow-lg rounded-lg p-6">
                    <table className="min-w-full bg-transparent">
                        <thead className="bg-teal-700 bg-opacity-90 text-white uppercase text-sm font-medium">
                            <tr>
                                <th className="py-3 px-5 text-center">Mission ID</th>
                                <th className="py-3 px-5 text-center">Mission Name</th>
                                <th className="py-3 px-5 text-center">Description</th>
                                <th className="py-3 px-5 text-center">Creator ID</th>
                                <th className="py-3 px-5 text-center">Creator Name</th>
                                <th className="py-3 px-5 text-center">Creator Rank</th>
                                <th className="py-3 px-5 text-center">Assigned Vessel</th>
                                <th className="py-3 px-5 text-center">Start Date</th>
                                <th className="py-3 px-5 text-center">End Date</th>
                                <th className="py-3 px-5 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredMissions.map(mission => (
                                <tr key={mission.missionId} className="hover:bg-teal-50 transition-colors hover:bg-opacity-50">
                                    {editingMissionId === mission.missionId ? (
                                        <>
                                            <td className="py-3 px-1 border-b text-gray-900 text-center">{mission.missionId}</td>
                                            <td className="py-3 px-1 border-b"><input type="text" name="name" value={editedMission.name} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-gray-900" /></td>
                                            <td className="py-3 px-1 border-b"><input type="text" name="description" value={editedMission.description} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-gray-900" /></td>
                                            <td className="py-3 px-1 border-b"><input type="number" name="createdById" value={editedMission.createdById} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-gray-900" /></td>
                                            <td className="py-3 px-1 border-b"><input type="text" name="creatorName" value={editedMission.creatorName} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-gray-900" /></td>
                                            <td className="py-3 px-1 border-b"><input type="text" name="creatorRank" value={editedMission.creatorRank} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-gray-900" /></td>
                                            <td className="py-3 px-1 border-b"><input type="text" name="assignedVesselName" value={editedMission.assignedVesselName} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-gray-900" /></td>
                                            <td className="py-3 px-1 border-b"><input type="date" name="startDate" value={editedMission.startDate} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-gray-900" /></td>
                                            <td className="py-3 px-1 border-b"><input type="date" name="endDate" value={editedMission.endDate} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-gray-900" /></td>
                                            <td className="py-3 px-1 border-b text-center">
                                                <button onClick={handleSaveClick} className="bg-indigo-500 text-white py-1 px-6 mb-1 rounded-md">Save</button>
                                                <button onClick={handleSaveClick} className="bg-red-500 text-white py-1 px-4 rounded-md">Cancel</button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td className="py-3 px-1 border-b border-gray-900 text-gray-900 text-center cursor-pointer">{highlightMatch(mission.missionId)}</td>
                                            <td className="py-3 px-1 border-b border-gray-900 text-gray-900 text-center cursor-pointer">{highlightMatch(mission.name)}</td>
                                            <td className="py-3 px-1 border-b border-gray-900 text-gray-900 text-center cursor-pointer">{highlightMatch(mission.description)}</td>
                                            <td className="py-3 px-1 border-b border-gray-900 text-gray-900 text-center cursor-pointer">{highlightMatch(mission.createdById)}</td>
                                            <td className="py-3 px-1 border-b border-gray-900 text-gray-900 text-center cursor-pointer">{highlightMatch(mission.creatorName)}</td>
                                            <td className="py-3 px-1 border-b border-gray-900 text-gray-900 text-center cursor-pointer">{highlightMatch(mission.creatorRank)}</td>
                                            <td className="py-3 px-1 border-b border-gray-900 text-gray-900 text-center cursor-pointer">{highlightMatch(mission.assignedVesselName)}</td>
                                            <td className="py-3 px-1 border-b border-gray-900 text-gray-900 text-center cursor-pointer">{highlightMatch(mission.startDate)}</td>
                                            <td className="py-3 px-1 border-b border-gray-900 text-gray-900 text-center cursor-pointer">{highlightMatch(mission.endDate)}</td>
                                            <td className="py-3 px-1 text-center flex flex-col">
                                                <button onClick={() => handleEditClick(mission)} className="bg-indigo-500 text-white py-1 px-3 mb-2 rounded">Edit</button>
                                                <button onClick={() => handleDeleteClick(mission.missionId)} className="bg-red-500 text-white py-1 px-3 rounded">Delete</button>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Missions;