import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function RegisterForm() {
    const navigate = useNavigate();
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');

    async function handleRegister(event) {
        event.preventDefault();
        if (password !== confirmpassword) {
            alert('Passwords do not match');
            return;
        }
        try {
            const response = await fetch('http://127.0.0.1:5000/user/signup',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ fullname, email, password })
                }
            );
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            navigate('/login');

            setFullname('');
            setEmail('');
            setPassword('');
            setConfirmpassword('');
        } catch (error) {
            console.error('Error:', error);
        }
    }
    return (

        <div className="bg-white px-5 py-10 rounded-3xl shadow-lg">
            <h1 className="text-2xl font-semibold text-center text-gray-800">Sign Up</h1>
            <div className="mt-5">
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <input
                    className="w-full p-1.5 mt-1 rounded-xl bg-gray-100 border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    placeholder="Enter your full name"
                    onChange={(e) => setFullname(e.target.value)}
                />
            </div>
            <div className="mt-5">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <input
                    className="w-full p-1.5 mt-1 rounded-xl bg-gray-100 border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="email"
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="mt-5">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <input
                    className="w-full p-1.5 mt-1 rounded-xl bg-gray-100 border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="password"
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="mt-5">
                <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                    className="w-full p-1.5 mt-1 rounded-xl bg-gray-100 border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="password"
                    placeholder="Confirm your password"
                    onChange={(e) => setConfirmpassword(e.target.value)}
                />
            </div>
            <div className="mt-5 bg-gradient-to-r from-[#12100E] to-[#2B4162] flex items-center justify-center rounded-3xl">
                <button onClick={(event) => handleRegister(event)}
                    className="text-white py-1.5 px-5 rounded-3xl hover:bg-opacity-90 transition-colors duration-300"
                >
                    Sign Up
                </button>
            </div>
        </div>
    );
}

export default RegisterForm;