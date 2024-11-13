import React from 'react';
import { Link } from 'react-router-dom';
import "../css/hero.css";

function Hero() {
    const smoothScroll = (event) => {
        event.preventDefault();
        const targetId = event.currentTarget.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="hero-section relative pt-10 text-white h-screen flex items-center justify-start pl-20 overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-10"></div>

            <div className="relative z-10 ">
                <h1 className="text-4xl max-w-96 text-gray-900 md:text-5xl font-bold mb-4">Welcome to the Navy Fleet Management</h1>
                <p className="text-lg text-gray-800 md:text-xl mb-8">Streamline mission planning, vessel assignment</p>

                <div className="flex space-x-4">
                    <a href="#about" onClick={smoothScroll} className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded-sm transition-all">
                        See Hierarchy
                    </a>
                    <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-sm transition-all">
                        Your Status
                    </Link>
                </div>
            </div>

            <div className="floating-animation h-full flex items-center justify-center">
                <div className="floating-book book1"></div>
                <div className="floating-book book2"></div>
                <div className="floating-book book3"></div>
            </div>
        </div>
    );
}

export default Hero;