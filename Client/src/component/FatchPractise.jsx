import { useState, useEffect } from "react";

const Test = () => {
    const [data, setData] = useState([]);
    const [singlePro, setSinglePro] = useState(null)
    const [showDetails, setShowDetails] = useState(false); // State to toggle views

    const getData = async () => {
        try {
            let res = await fetch("https://fakestoreapi.com/products");
            let rawData = await res.json();

            setData(rawData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const shareID = async (id) => {
        try {
            let res = await fetch(`https://fakestoreapi.com/products/${id}`)
            let resData = await res.json()
            console.log(resData);
            setSinglePro(resData);
            setShowDetails(true);
        }
        catch (error) {
            console.log("face error", error);

        }
    }



    return (
        <div >
            <div className=" text-center">
                <h1>Product List</h1>
                <button className="border px-2 py-1 my-2 bg-blue-800 text-white" onClick={getData}>press here </button>

            </div>
            {!showDetails ? (<ul>
                {data.map((item) => (
                    <li key={item.id}>
                        <div className="border border-gray-600 m-5 p-5" >
                            <p> {item.title}</p>
                            <p>$:{item.price}</p>
                            <button className="border px-2 py-1 my-2 bg-blue-800 text-white" onClick={() => shareID(item.id)}>press here </button>
                        </div>
                    </li>
                ))}
            </ul>) : (
                <div className="max-w-md mx-auto p-6 mt-6 bg-blue-100 rounded-lg shadow-md">
                    <h2 className="text-lg font-bold">More Info</h2>
                    {singlePro && (
                        <div className="flex">
                            <div>
                                <p>
                                    <strong>category:</strong> {singlePro.category}
                                </p>
                                <p>
                                    <strong>title:</strong> {singlePro.title}
                                </p>
                                <p>
                                    <strong>price: $</strong> {singlePro.price}
                                </p>
                                <p>
                                    <strong>rating:</strong> {singlePro.rating.rate}
                                </p>
                                <button className="border px-2 p-1 mt-3 bg-red-600 text-white " onClick={() => setShowDetails(false)}>Close</button>
                            </div>
                            <div>
                                <img className="w-40  h-32" src={singlePro.image} />
                            </div>
                        </div>
                    )}

                </div>
            )
            }
        </div>
    );
};

export default Test;
