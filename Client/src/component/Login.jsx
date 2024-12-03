import React, { useState } from 'react'

function Login() {
    const [input, setinput] = useState({ name: "", email: "", password: "" })

    let handleChange = (e) => {
        setinput({ ...input, [e.target.name]: e.target.value })
    }

    let getData = async (e) => {
        e.preventDefault();
        console.log(input);

        try {
            const response = await fetch("http://localhost:3000", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(input),
            });

            const data = await response.json();
            if (response.ok) {
                alert("Data submitted successfully!");
                console.log("Saved Data:", data);
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while submitting the data.");
        }
    };


    return (
        <div className="flex flex-col text-center items-center max-w-3xl mx-auto p-6 bg-red-400  rounded-lg shadow-md">
            <div><h1>Login form</h1></div>
            <form onSubmit={getData}>

                <p>Name : <input required type='text' className=' border border-gray-700 p-1 m-2' placeholder='give your data' onChange={handleChange} name='name' /></p>
                <p>Gmail : <input required type='email' className=' border border-gray-700 p-1 m-2' placeholder='give your data' onChange={handleChange} name='email' /></p>
                <p>Password :<input required type='password' className=' border border-gray-700 p-1 m-2' placeholder='give your data' onChange={handleChange} name='password' /></p>
                <button className=' border border-gray-700 p-1 m-2 bg-green-900 text-white px-2 rounded-sm'> login </button>
            </form>
        </div>
    )
}

export default Login