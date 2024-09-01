import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
            <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mb-4 px-4 py-2 border border-gray-300 rounded-md"
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
                className="mb-4 px-4 py-2 border border-gray-300 rounded-md"
            />
            <button
                onClick={handleLogin}
                className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
            >
                Login
            </button>
            {error && <div className="mt-4 text-red-500">{error}</div>}
        </div>
    );
};

export default Login;
