


import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/login', { email, password });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.user.userId);
            localStorage.setItem('name', response.data.user.name);
            localStorage.setItem('role', response.data.user.role);

            setMessage("Logged in successfully");

            setTimeout(() => {
                if (response.data.user.role === "admin") {
                    navigate('/admin-Dashboard');
                } else {
                    navigate('/restaurent');
                }
            }, 2000);

        } catch (error) {
            console.error('Error logging in:', error);
            setMessage("Login failed. Please check your credentials.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-500">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
                {message && <div className="p-4 text-center text-white bg-blue-500 rounded-md">{message}</div>}
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-800">Email</label>
                        <input 
                            type="email"
                            value={email}
                            placeholder="Enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-500 rounded-md "
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            placeholder="Enter your password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-500 rounded-md "
                        />
                    </div>
                    <button 
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-500  ">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
