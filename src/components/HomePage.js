
import React, { useRef } from 'react';
function HomePage() {
    const textareaRef = useRef(null);

    async function handleSummarize(event) {
        event.preventDefault();
        const text = textareaRef.current.value;

        const response = await fetch('http://127.0.0.1:5000/task/summarize',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify({ text })
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        // console.log(data);
        textareaRef.current.value = data.summary;
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen w-screen">
            <textarea ref={textareaRef} className="block w-1/2 h-1/2 p-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter your paragraph here..."></textarea>
            <button className="w-1/2 px-6 py-2 bg-white text-gray-900 rounded shadow hover:bg-gray-300 mt-4" onClick={handleSummarize}>summarize</button>
        </div>
    );
}

export default HomePage;















