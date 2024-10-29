import React from "react";
import kriya_logo from "../../assets/kriya-logo-Photoroom.png";
import Login from "../../auth/components/Login";
import Cart from "./Cart";
import { Link } from "react-router-dom";

const Header = () => {

    

    return (
        <>
            <div className="p-2 bg-white shadow-md fixed top-0 left-0 w-full z-10">
                <div className="flex justify-between items-center mx-3">
                    <div> 
                        <Link to={'/'}>
                        <img width={"150px"} src={kriya_logo} alt="kriya_logo" />
                        </Link>
                    </div>
                    <div>
                        <div className="flex px-4 py-3 rounded-xl border-2 bg-white overflow-hidden w-[400px] mx-auto font-[sans-serif]">
                            <input 
                                type="email" 
                                placeholder="Search Something..." 
                                className="w-full outline-none bg-transparent text-gray-600 text-sm" 
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16px" className="fill-gray-600">
                                <path
                                    d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
                                </path>
                            </svg>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between items-center gap-4">
                            <div className=" mr-2">
                                <h1 className="text-lg font-bold">Delivery Address</h1>
                                <p className="text-sm font-medium text-gray-700">Enter your address ...<i className="fa-solid fa-circle-chevron-down text-gray-500"></i></p>
                            </div>
                            <Login />
                            {/* <div data-modal-target="login-modal" data-modal-toggle="login-modal" className="flex flex-col items-center text-center">
                                <i className="fa-solid fa-user border text-[#c1c1c1] rounded-full bg-white p-2"></i>
                                <p className="text-sm font-medium text-gray-700">Profile</p>
                            </div> */}
                            <Cart />
                            {/* <div className="flex flex-col items-center text-center ">
                                <i className="fa-solid fa-cart-shopping border rounded-full bg-white p-2 text-yellow-600"></i>
                                <p className="text-sm font-medium text-gray-700">Cart</p>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
