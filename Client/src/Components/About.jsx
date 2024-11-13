import React from 'react';

const ranks = [
    { title: 'Admiral', description: 'The highest-ranking officer in the navy.' },
    { title: 'Vice Admiral', description: 'Second in command, with extensive responsibilities.' },
    { title: 'Rear Admiral', description: 'Leads fleets and assists in major decisions.' },
    { title: 'Commodore', description: 'Commands a squadron within a fleet.' },
    { title: 'Captain', description: 'Leads a ship or a naval unit.' },
    { title: 'Commander', description: 'Oversees ships and manages junior officers.' },
    { title: 'Lieutenant', description: 'Experienced officer with specialized responsibilities.' },
    { title: 'Ensign', description: 'Entry-level officer in the navy.' },
];

const AboutPage = () => {
    return (
        <div id="about" className="flex  pt-20 flex-col items-center bg-black bg-opacity-10 min-h-screen text-white py-12 px-4">
            <h1 className="text-4xl font-bold mb-8 p-4 py-2 rounded-md bg-indigo-200 bg-opacity-50 text-gray-900">Navy Ranks</h1>
            <div className="w-full max-w-md">
                {ranks.map((rank, index) => (
                    <div
                        key={index}
                        className="relative text-center border-l-4 border-blue-400 py-4 mb-4 bg-blue-800 rounded-lg shadow-lg cursor-pointer transition-all duration-300 group"
                    >
                        <div className="flex items-center justify-center ">
                            <span className="text-lg font-semibold text-center">{rank.title}</span>
                            <span className="ml-2 transform rotate-90 text-blue-400 group-hover:rotate-0 transition-transform duration-300">
                                →
                            </span>
                        </div>
                        <p className="text-gray-300 mt-0 max-h-0 overflow-hidden group-hover:max-h-20 transition-all duration-300">
                            {rank.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AboutPage;