import React from 'react'
import Hero from '../Components/Hero';
import Navbar from '../Components/Navbar';
import About from '../Components/About';

function Home() {
    return (
        <div>
            <Navbar />
            <Hero />
            <About />
        </div>
    )
}

export default Home