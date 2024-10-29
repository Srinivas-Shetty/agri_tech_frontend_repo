import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllFertilizers } from "../slice/slice";


const FertilizersList = () => {


    const dispatch = useDispatch();
    const [fertilizersData, setFertilizersData] = useState([]);



    const { getAllFertilizersData, status, error } = useSelector((state) => state.fertilizer);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(getAllFertilizers());
        }
    }, [])


    useEffect(() => {
        if (status === 'succeeded') {
            setFertilizersData(getAllFertilizersData?.data)
        }
    }, [getAllFertilizersData, dispatch])

    // useEffect(()=>{
    //  console.log(fertilizersData,"fertilizersData ccccccccc");

    // },[fertilizersData])

    return (
        <>
            <div className="flex justify-center p-4">
                <div className="w-full max-w-7xl">
                    <div>
                        <div>
                            <h1 className="text-2xl font-semibold">Fertilizers</h1>
                        </div>
                        <div className="bg-[#f6f6f6] p-4 flex my-3 gap-4">
                            <div className=" h-60 w-2/12 bg-white">
                                <hr></hr>
                                <ul>
                                    <Link to={'/fertilizers/all'}>
                                        <div className="flex px-2 py-4  justify-between items-center">
                                            <li className="text-md    hover:bg-gray-100 transition">ALL</li>
                                           <input checked  type="checkbox"  className="w-5" />
                                        </div>
                                    </Link>
                                    <hr></hr>
                                    <Link to={'/fertilizers/all'}>
                                        <div className="flex px-2 py-4  justify-between items-center">
                                            <li className="text-md      hover:bg-gray-100 transition">Organic</li>
                                            <input  type="checkbox"  className="w-5" />
                                        </div>
                                    </Link>
                                    <hr></hr>
                                    <Link to={'/fertilizers/all'}>
                                        <div className="flex px-2 py-4 justify-between items-center">
                                            <li className="text-md   hover:bg-gray-100 transition">Chemical</li>
                                            <input  type="checkbox"  className="w-5" />
                                        </div>
                                    </Link>
                                    <hr></hr>
                                    <Link to={'/fertilizers/all'}>
                                        <div className="flex px-2  py-4  justify-between items-center">
                                            <li className="text-md     hover:bg-gray-100 transition">Bio Fertilizers</li>
                                            <input  type="checkbox"  className="w-5" />
                                        </div>
                                    </Link>
                                </ul>
                            </div>
                            <div className=" w-10/12 bg-white">
                                <div className="p-4 flex flex-wrap justify-normal gap-2">
                                    {fertilizersData ? (
                                        fertilizersData.map((product) => (
                                            <div className="w-1/4" key={product._id}>
                                                <Link to={`/fertilizers/details/${product._id}`}>
                                                    <div className="border rounded-lg p-4 shadow-lg text-center flex flex-col justify-between h-full">
                                                        <div>
                                                            <img src={product.mainImage} alt={product.name} className="w-full h-32 object-cover rounded-md mb-2" />
                                                            <h2 className="text-md font-semibold truncate">{product.name}</h2>
                                                            <p className="text-gray-700">Price: 1000 Rs</p>
                                                        </div>
                                                        <button className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 self-center">
                                                            Add to Cart
                                                        </button>
                                                    </div>
                                                </Link>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No products available.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FertilizersList;