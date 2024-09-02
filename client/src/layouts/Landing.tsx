import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <div className="h-screen flex justify-center items-center bg-gray-100">
            <button
                onClick={handleLogin}
                className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
            >
                Go to Login
            </button>
        </div>
    );
};

export default Landing;
