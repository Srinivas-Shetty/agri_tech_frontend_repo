import React, { useState } from "react";

const Login = () => {
    // State to manage modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Function to toggle modal visibility
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <>
            {/* Button to Open Modal */}
            <div className="flex flex-col items-center text-center">
                <div
                    onClick={toggleModal}
                    className="cursor-pointer flex flex-col items-center"
                >
                    <i className="fa-solid fa-user border text-[#c1c1c1] rounded-full bg-white p-2"></i>
                    <p className="text-sm font-medium text-gray-700">Profile</p>
                </div>
            </div>

            {/* Modal Structure */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                    onClick={toggleModal}
                >
                    <div
                        className="bg-white rounded-lg shadow-md w-full max-w-2xl"
                        onClick={(e) => e.stopPropagation()} // Prevent click event from closing the modal
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-4 border-b">
                            <h3 className="text-xl font-semibold text-gray-900">
                                Terms of Service
                            </h3>
                            <button
                                type="button"
                                className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                                onClick={toggleModal}
                            >
                                &times; {/* Close button (X) */}
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-4 space-y-4">
                            <p className="text-base text-gray-500">
                                With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
                            </p>
                            <p className="text-base text-gray-500">
                                The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union.
                            </p>
                        </div>

                        {/* Modal Footer */}
                        <div className="flex items-center p-4 border-t">
                            <button
                                type="button"
                                className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-5 py-2.5"
                                onClick={toggleModal}
                            >
                                I accept
                            </button>
                            <button
                                type="button"
                                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 rounded-lg"
                                onClick={toggleModal}
                            >
                                Decline
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Login;
