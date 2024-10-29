import React, { useEffect, useState } from "react";
import GetLocalData from "../../GetLocalData";
import Login from "../../auth/components/Login";
import { Link, useLocation } from "react-router-dom";
import Profile from "./profile.js";
import { getUserDetails } from "../slice/slice.js";
import { useDispatch, useSelector } from "react-redux";
import Address from "./address.js";

const MyAccount = () => {


    const [isLogin, setIsLogin] = useState(false);
    const getLocalData=GetLocalData();
    const userDetails=getLocalData ? JSON.parse(getLocalData) : '';
    
    const checkLoginStatus = () => {
        const isLocalHas = GetLocalData();
        console.log(isLocalHas, "isLocalHasisLocalHasisLocalHas");
        setIsLogin(!!isLocalHas); 
    };

    useEffect(() => {
        checkLoginStatus();
    }, [isLogin]);

    const dispatch=useDispatch();
    const { getUserDetailsData, status, error } = useSelector((state) => state.UserDetails);

    useEffect(()=>{
        if(userDetails && status=='idle'){
            dispatch(getUserDetails(userDetails.token))
        }
        
    },[userDetails]);

    const [ProfileData,setProfileData]=useState([])


    useEffect(()=>{
        if(getUserDetailsData?.data && status=="succeeded"){
            setProfileData(getUserDetailsData?.data)
        }
    },[getUserDetailsData,dispatch])




    // handle switch component

    const [currentComponent,setCurrentComponent]=useState(<Profile />);

    const location = useLocation();


useEffect(()=>{
    if(location.pathname=='/account/profile'){
        setCurrentComponent(<Profile />)
    }
    if(location.pathname=='/account/address'){
        setCurrentComponent(<Address />)
    }
},[location,currentComponent])


    return (
        <>

            <div className="flex justify-center p-4">
                <div className="w-full max-w-7xl">


                    {isLogin ?
                        (
                            <div  >
                                <div>
                                    <h1 className="text-2xl font-semibold">My Account</h1>
                                </div>

                                <div className="bg-[#f6f6f6] p-4 flex my-3">
                                    <div className="w-3/12 bg-white">
                                        <div className="p-4">
                                            <div className="flex justify-normal gap-4 items-center">
                                                <div>
                                                    <img src={"https://cdn.zeptonow.com/production//app/svg/ProfileIconNonMember.svg"}  />
                                                </div>
                                                <div >
                                                    <p className="text-md font-medium">{userDetails?.name}</p>
                                                    <p className="text-md ">{userDetails?.mobileNumber}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <hr></hr>
                                        <ul>
                                            <Link to={'/account/profile'}>
                                                <li className= "text-md  py-4  px-2 hover:bg-gray-100 transition"><i class="fa-solid fa-user"></i>Profile</li>
                                            </Link>
                                            <hr></hr>
                                            <Link to={'/account/'}>
                                                <li className="text-md  py-4 px-2 hover:bg-gray-100 transition "><i class="fa-solid fa-cart-arrow-down"></i> Orders</li>
                                            </Link>
                                            <hr></hr>
                                            <Link to={'/account/address'}>
                                                <li className="text-md py-4 px-2 hover:bg-gray-100 transition "><i class="fa-solid fa-location-dot"></i> Address</li>
                                            </Link>
                                            <hr></hr>
                                            <Link to={'/account/'}>
                                                <li className="text-md  py-4 px-2 hover:bg-gray-100 transition  "><i class="fa-solid fa-wallet"></i> Wallet</li>
                                            </Link>
                                        </ul>

                                    {/* <div className="flex justify-">
                                        <div className="py-4">
                                            logout
                                        </div>
                                    </div> */}
                                        
                                    </div>
                                    <div className="w-9/12 ">
                                        {currentComponent}
                                    </div>
                                </div>
                            </div>
                        )
                        :
                        (
                            <Login comingFromAccount={true} />

                        )
                    }


                </div>
            </div>


        </>
    )
}

export default MyAccount;