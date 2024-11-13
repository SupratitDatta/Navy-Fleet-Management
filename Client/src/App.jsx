import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import SignUp from "./Pages/SignUp"
import Profile from "./Pages/Profile"
import Admin from "./Pages/Admin"
import Vessel from "./Pages/Vessel"
import Mission from "./Pages/Mission"
import Seamen from "./Pages/Seamen"
import './css/App.css';

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/profile/:personnelId" element={<Profile />} />
                    <Route path="/admin/:personnelId" element={<Admin />} />
                    <Route path="/vessels" element={<Vessel />} />
                    <Route path="/missions" element={<Mission />} />
                    <Route path="/seamens" element={<Seamen />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;