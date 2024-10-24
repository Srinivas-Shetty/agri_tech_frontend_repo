import React from "react";
import fertilizer from "../../assets/fertilizer.jpeg";
import pesticide from "../../assets/pesticides.jpeg";
import cattlefeed from "../../assets/cattlefeed.jpeg";
import seeds from "../../assets/seeds.jpeg";

const Explore = () => {
    return (
        <div className="w-full px-4 my-2">
            <h1 className="text-2xl font-semibold  ">Explore Our Products</h1>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-4">
                <div className="border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <img className=" w-full h-36 px-4 mx-auto mt-4" src={fertilizer} alt="Fertilizer" />
                    <h1 className="text-center text-xl font-semibold py-4">Fertilizer</h1>
                </div>
                <div className="border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <img className=" w-full h-36 px-4 mx-auto mt-4" src={pesticide} alt="Pesticides" />
                    <h1 className="text-center text-xl font-semibold py-4">Pesticides</h1>
                </div>
                <div className="border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <img className=" w-full h-36 px-4 mx-auto mt-4" src={cattlefeed} alt="Cattle Feed" />
                    <h1 className="text-center text-xl font-semibold py-4">Cattle Feed</h1>
                </div>
                <div className="border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <img className=" w-full h-36 px-4 mx-auto mt-4" src={seeds} alt="Seeds" />
                    <h1 className="text-center text-xl font-semibold py-4">Seeds</h1>
                </div>
            </div>
        </div>
    );
};

export default Explore;
