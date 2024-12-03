import React, { useState } from 'react';

function GetDB() {
    const [serverData, setServerData] = useState([]);
    const [selectedData, setSelectedData] = useState(null); // State for selected data
    const [showDetails, setShowDetails] = useState(false); // State to toggle views

    let getData = async () => {
        try {
            let res = await fetch("http://localhost:3000");
            let data = await res.json();
            setServerData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    let deleteData = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                alert("User deleted successfully!");
                setServerData(serverData.filter((user) => user._id !== id));
            } else {
                alert("Failed to delete user.");
            }
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    let MoreInfo = async (id) => {
        try {
            let res = await fetch(`http://localhost:3000/${id}`);
            let data = await res.json();
            setSelectedData(data);
            setShowDetails(true); // Switch to the details view
        } catch (error) {
            console.error("Error fetching more info:", error);
        }
    };

    const goBack = () => {
        setShowDetails(false); // Go back to the main view
        setSelectedData(null); // Clear selected data
    };

    return (
        <div>
            {!showDetails ? (
                <div className="max-w-3xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
                    <div className="text-center">
                        <h1>We have data from the server</h1>
                        <button className="border px-2 p-1 m-3 bg-blue-600 text-white" onClick={getData}>
                            Get Data
                        </button>
                    </div>
                    <ul className="list-decimal list-inside space-y-4">
                        {serverData.length > 0 &&
                            serverData.map((e, i) => (
                                <div
                                    key={i}
                                    className="bg-white p-4 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
                                >
                                    <div className="flex flex-col space-y-2">
                                        <p className="text-xl font-semibold text-gray-800">ID: {i}</p>
                                        <p className="text-xl font-semibold text-gray-800">{e.name}</p>
                                        <p className="text-sm text-gray-600">Email: {e.email}</p>
                                        <p className="text-sm text-gray-500">Password: {e.password}</p>
                                        <p className="text-sm text-gray-500">DB ID: {e._id}</p>
                                        <button
                                            className="border px-2 p-1 m-3 bg-blue-600 text-white"
                                            onClick={() => deleteData(e._id)}
                                        >
                                            Delete Data
                                        </button>
                                        <button
                                            className="border px-2 p-1 m-3 bg-blue-600 text-white"
                                            onClick={() => MoreInfo(e._id)}
                                        >
                                            More Info
                                        </button>
                                    </div>
                                </div>
                            ))}
                    </ul>
                </div>
            ) : (
                <div className="max-w-md mx-auto p-6 mt-6 bg-blue-100 rounded-lg shadow-md">
                    <h2 className="text-lg font-bold">More Info</h2>
                    {selectedData && (
                        <>
                            <p>
                                <strong>ID:</strong> {selectedData._id}
                            </p>
                            <p>
                                <strong>Name:</strong> {selectedData.name}
                            </p>
                            <p>
                                <strong>Email:</strong> {selectedData.email}
                            </p>
                            <p>
                                <strong>Password:</strong> {selectedData.password}
                            </p>
                        </>
                    )}
                    <button
                        className="border px-2 p-1 mt-3 bg-red-600 text-white"
                        onClick={goBack}
                    >
                        Go Back
                    </button>
                </div>
            )}
        </div>
    );
}

export default GetDB;
