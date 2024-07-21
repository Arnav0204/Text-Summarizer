import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
    const navigate = useNavigate();
    function directLogin() {
        navigate('/login');
    }
    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold mb-4 text-white">
                Hello Welcome to Summarizer
            </h1>
            <button className="px-6 py-2 bg-white text-gray-900 rounded shadow hover:bg-gray-300" onClick={directLogin}>
                Please Login to summarize
            </button>
        </div>
    );
}

export default LandingPage;