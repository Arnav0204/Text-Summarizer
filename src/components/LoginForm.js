import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:5000/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);
            navigate('/home');
            setEmail('');
            setPassword('');
        } catch (error) {
            console.error('Error:', error);
        }

    }


    return (

        <div className="bg-white px-8 py-16 rounded-3xl shadow-lg">
            <h1 className="text-3xl font-semibold text-center text-gray-800">Welcome</h1>
            <div className="mt-8">
                <label className="text-md font-medium text-gray-700">Email</label>
                <input
                    className="w-full p-2 mt-1 rounded-xl bg-gray-100 border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="mt-5">
                <label className="text-md font-medium text-gray-700">Password</label>
                <input
                    className="w-full p-2 mt-1 rounded-xl bg-gray-100 border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="mt-8 bg-gradient-to-r from-[#12100E] to-[#2B4162] flex items-center justify-center rounded-3xl">
                <button onClick={handleSubmit}
                    className="text-white py-2 px-6 rounded-3xl hover:bg-opacity-90 transition-colors duration-300"
                >
                    Submit
                </button >
                <span className="mx-2 bg-white h-10 w-1"></span>
                <button
                    onClick={() => navigate('/register')} className="text-white py-2 px-6 rounded-3xl hover:bg-opacity-90 transition-colors duration-300"
                >
                    Register
                </button>
            </div>
        </div>
    );
}

export default LoginForm;