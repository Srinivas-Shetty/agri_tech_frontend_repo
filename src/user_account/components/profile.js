import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editProfile, getUserDetails } from "../slice/slice";
import GetLocalData from "../../GetLocalData";
import { json } from "react-router-dom";

const Profile = ({  }) => {

    const dispatch = useDispatch();
    const getLocalData = GetLocalData();
    const userDetails = getLocalData ? JSON.parse(getLocalData) : '';

    const { getUserDetailsData } = useSelector((state) => state.UserDetails);

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



    console.log(ProfileData, "ProfileDataProfileData");


    const [name, setName] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        setName(ProfileData.name || '')
        setMobileNumber(ProfileData.mobileNumber || '')
        setEmail(ProfileData.email || "")
    }, [ProfileData])


   
    const { editUserprofileData, status, error } = useSelector((state) => state.UserDetails);

    const handleEditProfile = () => {
        let data = {
            token: userDetails?.token,
            name,
            email
        }
        dispatch(editProfile(data))
    }

    useEffect(() => {
        console.log(editUserprofileData, status, error, "editUserprofileData");

        if (status === 'succeeded' && name!='') {
            userDetails.name = name;
            userDetails.email = email;
            let updatedUserDetails = JSON.stringify(userDetails);
            localStorage.setItem('userData', updatedUserDetails);
        }
    }, [status, editUserprofileData, name, email])

    return (
        <>
            <div className="mx-2 bg-white">
                <div className="p-2">
                    <h1 className="text-center text-xl font-semibold">My Profile</h1>
                    {
                        editUserprofileData?.msg ?
                            (
                                <div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                                    {editUserprofileData?.msg}
                                </div>
                            )
                            :
                            (
                                ""
                            )
                    }

                    {
                        status=="failed" && error ?
                            (
                                <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                     {error}
                                </div>
                            )
                            :
                            (
                                ""
                            )
                    }

                    <form>
                        <div className="grid gap-6 mb-6 md:grid-cols-1 w-full px-4">
                            <div className="">
                                <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name *</label>
                                <div className="w-full relative text-base text-black flex bg-white items-center border border-gray-400  rounded-md">
                                    <input
                                        className="focus:outline-none block py-3 mx-2 appearance-none font-subtitle flex-grow font-normal bg-transparent text-md"
                                        inputMode="text"
                                        placeholder="Enter Phone Number"
                                        type="text"
                                        value={name}
                                        onChange={(e) => {
                                            setName(e.target.value)
                                        }}
                                    />
                                </div>
                            </div>


                            <div className="">
                                <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <div className="w-full relative text-base text-black flex bg-white items-center border border-gray-400  rounded-md">
                                    <input
                                        className="focus:outline-none block py-3 mx-2 appearance-none font-subtitle flex-grow font-normal bg-transparent text-md"
                                        placeholder="Enter Email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value)
                                        }}
                                    />
                                </div>
                            </div>


                            <div className="">
                                <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mobile *</label>
                                <div className="w-full relative text-base text-black flex bg-white items-center border border-gray-400 mb-4 rounded-md">
                                    <span className="left-0 pl-3.5 ">+91</span>
                                    <input
                                        className="focus:outline-none block py-3 mx-2 appearance-none font-subtitle flex-grow font-normal bg-transparent text-md cursor-not-allowed"
                                        placeholder="Enter Mobile"
                                        type="tel"
                                        disabled
                                        value={mobileNumber}
                                        onChange={(e) => {
                                            setMobileNumber(e.target.value)
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <button type="button"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                    onClick={handleEditProfile}
                                    disabled={name==''}
                                >Update</button>
                            </div>


                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}

export default Profile;