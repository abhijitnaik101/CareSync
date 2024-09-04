import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const rolePasswords: { [key: string]: string } = {
    admin: 'admin',
    patient: 'patient',
    doctor: 'doctor',
    'inventory-manager': 'inventory manager',
    receptionist: 'receptionist',
};

const Login = () => {
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        if (rolePasswords[role] === password) {
            setError('');
            navigate(`/${role}`);
        } else {
            setError("Wrong password, can't enter");
        }
    };

    return (
        <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-700">
            <motion.div
                className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    Login
                </h1>

                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="mb-4 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select Role</option>
                    <option value="admin">Administrator</option>
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                    <option value="inventory-manager">Inventory Manager</option>
                    <option value="receptionist">Receptionist</option>
                </select>

                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"
                    className="mb-6 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    onClick={handleLogin}
                    className="w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300"
                >
                    Login
                </button>

                {error && <div className="mt-4 text-red-500 text-center">{error}</div>}
            </motion.div>
        </div>
    );
};

export default Login;
