import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { route } from '../../backendroute';

type roles = "Admin" | "Patient" | "Doctor" | "Inventoryman" | "Receptionist" | "";

const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [role, setRole] = useState<roles>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const responce = await axios.post<{ token: string, user: any }>(route + '/auth/login', {
                email, password, role
            });
            localStorage.setItem('token', responce.data.token);
            localStorage.setItem('user', JSON.stringify(responce.data.user));
            navigate(`/${role === "Inventoryman" ? "inventory-manager" : role.toLowerCase()}`);
        } catch (error) {
            setError("Wrong email or password");
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

                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Email"
                    className="mb-4 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as roles)}
                    className="mb-4 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select Role</option>
                    <option value="Admin">Administrator</option>
                    <option value="Patient">Patient</option>
                    <option value="Doctor">Doctor</option>
                    <option value="Inventoryman">Inventory Manager</option>
                    <option value="Receptionist">Receptionist</option>
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
