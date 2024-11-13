import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Vessels() {
    const [vessels, setVessels] = useState([]);
    const [filters, setFilters] = useState({
        name: '',
        type: '',
        status: '',
        missionName: '',
    });
    const [editingVessel, setEditingVessel] = useState(null);
    const [newVessel, setNewVessel] = useState({
        name: '',
        type: '',
        status: '',
        missionName: '',
        missionId: '',
        crew: '',
        rangeOfShip: '',
        weight: '',
        length: ''
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchVessels();
    }, []);

    const fetchVessels = () => {
        axios.get('http://localhost:9000/vessel/getallvessel')
            .then(response => setVessels(response.data))
            .catch(error => console.error('Error fetching vessel data:', error));
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleNewVesselChange = (e) => {
        const { name, value } = e.target;
        setNewVessel({ ...newVessel, [name]: value });
    };

    const addNewVessel = () => {
        const formattedVessel = {
            ...newVessel,
            crew: parseInt(newVessel.crew) || 0,
            rangeOfShip: parseFloat(newVessel.rangeOfShip) || 0,
            weight: parseFloat(newVessel.weight) || 0,
            length: parseFloat(newVessel.length) || 0
        };

        axios.post('http://localhost:9000/vessel/add', formattedVessel)
            .then(() => {
                setNewVessel({
                    name: '',
                    type: '',
                    status: '',
                    missionName: '',
                    crew: '',
                    rangeOfShip: '',
                    weight: '',
                    length: ''
                });
                fetchVessels();
                setIsModalOpen(false);
            })
            .catch(error => console.error('Error adding vessel:', error));
    };

    const saveEdit = (vesselId) => {
        axios.put(`http://localhost:9000/vessel/update/${vesselId}`, editingVessel)
            .then(() => {
                setEditingVessel(null);
                fetchVessels();
            })
            .catch(error => console.error('Error saving edits:', error));
    };

    const deleteVessel = (vesselId) => {
        axios.delete(`http://localhost:9000/vessel/delete/${vesselId}`)
            .then(() => {
                fetchVessels();
            })
            .catch(error => console.error('Error deleting vessel:', error));
    };

    const filteredVessels = vessels.filter(vessel => {
        return (
            vessel.name.toLowerCase().includes(filters.name.toLowerCase()) &&
            vessel.type.toLowerCase().includes(filters.type.toLowerCase()) &&
            vessel.status.toLowerCase().includes(filters.status.toLowerCase()) &&
            vessel.missionName.toLowerCase().includes(filters.missionName.toLowerCase())
        );
    });

    return (
        <div className="p-8 min-h-screen scrollbar-hide">
            <Link to="/" className="px-5 py-1 rounded-md text-white bg-black fixed top-25 left-10 z-10 text-lg font-semibold mb-4">Home</Link>
            <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800 uppercase">Vessels List</h1>

            <div className="mb-6 mx-auto w-max min-w-[80vw] bg-white bg-opacity-60 backdrop-filter backdrop-blur-lg shadow-lg rounded-lg p-1 flex flex-col">
                <div className="flex flex-row justify-evenly items-center">
                    {['name', 'type', 'status', 'missionName'].map((key) => (
                        <input
                            key={key}
                            type="text"
                            placeholder={`Search by ${key.charAt(0).toUpperCase() + key.slice(1)}`}
                            name={key}
                            value={filters[key]}
                            onChange={handleFilterChange}
                            className="p-1 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    ))}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-3 py-2 bg-blue-500 text-white rounded-lg"
                    >
                        Add New Vessel
                    </button>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 overflow-scroll">
                    <div className="bg-white mt-60 m-8 p-6 rounded-lg shadow-lg w-full max-w-lg">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700 text-center">Add New Vessel</h2>
                        <div className="grid grid-cols-1 gap-4">
                            {Object.keys(newVessel).map(key => (
                                <input
                                    key={key}
                                    type="text"
                                    placeholder={`Enter ${key.charAt(0).toUpperCase() + key.slice(1)}`}
                                    name={key}
                                    value={newVessel[key]}
                                    onChange={handleNewVesselChange}
                                    className="p-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                            ))}
                            <div className="flex justify-center items-center gap-4">
                                <button onClick={addNewVessel} className="p-2 bg-blue-500 text-white rounded-lg w-20">
                                    Save
                                </button>
                                <button onClick={() => setIsModalOpen(false)} className="p-2 bg-red-500 text-white rounded-lg w-20">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="overflow-x-auto">
                <div className="max-w-6xl mx-auto bg-white bg-opacity-60 backdrop-filter backdrop-blur-lg shadow-lg rounded-lg p-6">
                    <table className="min-w-full bg-transparent">
                        <thead className="bg-teal-700 bg-opacity-90 text-white uppercase text-sm font-medium">
                            <tr>
                                {["Name", "Type", "Status", "Mission", "Crew", "Range", "Weight", "Length", "Action"].map(header => (
                                    <th key={header} className="py-3 px-5 text-left text-lg">{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredVessels.map(vessel => (
                                <tr key={vessel.vesselId} className="hover:bg-teal-50 transition-colors hover:bg-opacity-50">
                                    {["name", "type", "status", "missionName", "crew", "rangeOfShip", "weight", "length"].map(field => (
                                        <td key={field} className="py-3 px-1 border-b border-gray-800 text-gray-900 cursor-pointer text-center">
                                            {editingVessel?.vesselId === vessel.vesselId ? (
                                                <input
                                                    type="text"
                                                    name={field}
                                                    value={editingVessel[field]}
                                                    onChange={(e) => setEditingVessel({ ...editingVessel, [field]: e.target.value })}
                                                    className="p-1 border rounded w-full"
                                                />
                                            ) : (
                                                vessel[field]
                                            )}
                                        </td>
                                    ))}
                                    <td className="py-3 px-5 border-b border-gray-800 text-gray-900 flex flex-col items-center justify-center">
                                        {editingVessel?.vesselId === vessel.vesselId ? (
                                            <button onClick={() => saveEdit(vessel.vesselId)} className="px-3 py-1 w-20 bg-blue-500 text-white rounded-md mb-1">
                                                Save
                                            </button>
                                        ) : (
                                            <button onClick={() => setEditingVessel(vessel)} className="px-6 w-20 py-1 bg-blue-500 text-white rounded-md mb-1">
                                                Edit
                                            </button>
                                        )}
                                        <button onClick={() => deleteVessel(vessel.vesselId)} className="px-4 py-1 bg-red-500 text-white rounded-md">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Vessels;