import React, { useEffect } from "react";
import MapComponent from "./selectMap";
import './style.css'

const Address = () => {

   

      

    return (
        <>
            <div className="mx-2 bg-white">
                <div className="p-2 ">
                    <h1 className="text-center text-xl font-semibold">My Addresses</h1>
                    <div className="px-4">
                        <div className="flex justify-between items-center pb-2">
                            <div>
                                <h2 className="text-lg font-semibold">All saved addresses</h2>
                            </div>
                            <div>
                                <button type="button"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                >Add New Address</button>
                            </div>
                        </div>
                        <hr className="pb-4" />

                        <div className="flex justify-between items-center">
                        <div className="w-1/2">
                        <MapComponent />
                        </div>
                        <div className="w-1/2">
                        Hi
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Address;