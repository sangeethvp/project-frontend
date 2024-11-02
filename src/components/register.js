
import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [username, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [foodtype, setFoodtype] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await api.post('/register', { username, email, password, foodtype });
            console.log("User created successfully", user.data);
            setName('');
            setEmail('');
            setPassword('');
            setFoodtype('');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            console.log('Error creating the user');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-500">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-800">Register</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Name:</label>
                        <input 
                            type="text"
                            value={username}
                            placeholder="Enter your name"
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-500 rounded-md "
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Email:</label>
                        <input 
                            type="email"
                            value={email}
                            placeholder="Please enter a valid email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-500 rounded-md "
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Password:</label>
                        <input 
                            type="password"
                            value={password}
                            placeholder="Enter a valid password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-500 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Food Type:</label>
                        <input
                            type="text"
                            value={foodtype}
                            placeholder="Enter the foods you like"
                            onChange={(e) => setFoodtype(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-500 rounded-md "
                        />
                    </div>
                    <button 
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 ">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;

