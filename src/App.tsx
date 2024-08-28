import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import WelcomePage from './welcome';

const App: React.FC = () => {
    return (
        <div>
            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<WelcomePage />} />
            </Routes>
        </div>
    );
};

export default App;
