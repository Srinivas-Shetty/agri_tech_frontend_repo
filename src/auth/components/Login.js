import React, { useEffect, useRef, useState } from "react";
import loginpopup from "../../assets/login-popup.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, verifyOtp } from "../slice/slice";
import GetLocalData from "../../GetLocalData";
import { useNavigate } from "react-router-dom";


const Login = ({ comingFromAccount }) => {

    const isLogin = GetLocalData();
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSuccessFromAccountLogin,setisSuccessFromAccountLogin]=useState(comingFromAccount)

    const toggleModal = () => {
        if (isLogin) {
            navigate('/account')
        }
        else {
            setIsModalOpen(!isModalOpen);
        }
    };




    const [phoneNumber, setPhoneNumber] = useState("");
    const [isTenDigit, setIsTenDigit] = useState(false);
    const [otpCode, setOtpCode] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);

    useEffect(() => {

        if (phoneNumber.length === 10) {
            setIsTenDigit(true)
        }
        else {
            setIsTenDigit(false)
        }
    }, [phoneNumber])

    const dispatch = useDispatch();
    const { sendOtpData, status, error, verifyOtpData } = useSelector((state) => state.auth);

    const handleSendOtp = () => {
        if (status === 'idle') {
            dispatch(fetchData(phoneNumber));
        }
    };

    useEffect(() => {

        if (status === "succeeded") {
            setIsOtpSent(true)
        }

    }, [sendOtpData, dispatch])

    // handle otp

    const [otp, setOtp] = useState(Array(6).fill(""));
    const inputRefs = useRef([]);



    const handleKeyDown = (e) => {
        const index = inputRefs.current.indexOf(e.target);

        if (
            !/^[0-9]{1}$/.test(e.key) &&
            e.key !== "Backspace" &&
            e.key !== "Delete" &&
            e.key !== "Tab" &&
            !e.metaKey
        ) {
            e.preventDefault();
        }

        if (e.key === "Backspace" || e.key === "Delete") {
            // Clear current input
            setOtp((prevOtp) => {
                const newOtp = [...prevOtp];
                newOtp[index] = ""; // Clear the current input
                return newOtp;
            });
            // Focus the previous input if the current one is empty
            if (index > 0 && !otp[index]) {
                inputRefs.current[index - 1].focus();
            }
        }
    };

    const handleInput = (e) => {
        const { target } = e;
        const index = inputRefs.current.indexOf(target);
        if (target.value) {
            setOtp((prevOtp) => {
                const newOtp = [...prevOtp];
                newOtp[index] = target.value;
                return newOtp;
            });
            if (index < otp.length - 1) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleFocus = (e) => {
        e.target.select();
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const text = e.clipboardData.getData("text");
        if (!new RegExp(`^[0-9]{${otp.length}}$`).test(text)) {
            return;
        }
        const digits = text.split("");
        setOtp(digits);
        inputRefs.current[digits.length - 1].focus();
    };

    const handleValidateOtp = () => {

        let isSixOtp = true;
        let userOtp = ''
        for (let i = 0; i < otp.length; i++) {
            userOtp += otp[i];
            if (!otp[i]) {
                isSixOtp = false;

            }
        }

        const token = sendOtpData?.data?.token;

        let data = {
            token,
            userOtp
        }

        if (isSixOtp) {
            dispatch(verifyOtp(data))
        }
        else {
            alert("please fill 6 digit otp")
        }
    };

    useEffect(() => {

        if (verifyOtpData?.success) {

            localStorage.setItem("userData", JSON.stringify(verifyOtpData?.data));
            setisSuccessFromAccountLogin(false)
            setIsModalOpen(false);
            navigate('/account')

        }
    }, [verifyOtpData]);

    useEffect(() => {

        setisSuccessFromAccountLogin(false)
    }, [isSuccessFromAccountLogin]);




    return (
        <>
            {isSuccessFromAccountLogin ?

                (
                    <div className="flex flex-col items-center text-center">
                        <div
                            onClick={toggleModal}
                            className="cursor-pointer flex flex-col items-center"
                        >
                            <i className="fa-solid fa-user border text-[#c1c1c1] rounded-full bg-white p-2"></i>
                            <p className="text-sm font-medium text-gray-700">Please Login</p>
                        </div>
                    </div>
                )
                :
                (
                    <div className="flex flex-col items-center text-center">
                        <div
                            onClick={toggleModal}
                            className="cursor-pointer flex flex-col items-center"
                        >
                            <i className="fa-solid fa-user border text-[#c1c1c1] rounded-full bg-white p-2"></i>
                            <p className="text-sm font-medium text-gray-700">{isLogin ? "Profile" : "Login"}</p>
                        </div>
                    </div>
                )

            }


            {isModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                    onClick={toggleModal}
                >
                    <div
                        className="bg-white rounded-lg shadow-md w-full max-w-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >


                        {/* Modal Body */}
                        <div className=" space-y-4  bg-[#f7c950]">

                            <div className=" flex justify-between items-center">
                                {
                                    isOtpSent === true ?
                                        (
                                            <div className="w-3/5 text-center p-4 ">
                                                <div className="flex justify-center ">
                                                    <h1 className="text-xl text-white  font-bold">We Have Sent OTP For Your Number</h1>
                                                </div>
                                                <div className="flex justify-center text-center py-4">
                                                    <form id="otp-form" className="flex gap-2">
                                                        {otp.map((digit, index) => (
                                                            <input
                                                                key={index}
                                                                type="text"
                                                                maxLength={1}
                                                                value={digit}
                                                                onChange={handleInput}
                                                                onKeyDown={handleKeyDown}
                                                                onFocus={handleFocus}
                                                                onPaste={handlePaste}
                                                                ref={(el) => (inputRefs.current[index] = el)}
                                                                className="shadow-xs flex w-[48px] items-center justify-center rounded-lg border border-stroke bg-white p-2 text-center text-2xl font-medium text-gray-5 outline-none sm:text-4xl dark:border-dark-3 dark:bg-white/5"
                                                            />
                                                        ))}
                                                        {/* You can conditionally render a submit button here based on otp length */}
                                                    </form>
                                                </div>
                                                <button
                                                    className="border-skin-primary border tracking-widest w-full mt-1 rounded-3xl p-3 text-lg font-semibold disabled:text-skin-base disabled:opacity-50 bg-gradient-to-r from-[#ff3269] to-[#ff794d] text-white"
                                                    // disabled={!isTenDigit}  // Disable if phone number is empty
                                                    type="button"
                                                    onClick={handleValidateOtp}
                                                >
                                                    <div className="flex items-center justify-center">Login</div>
                                                </button>
                                                <div className="text-sm text-white">
                                                    <p>By continuing you agree to our</p>
                                                    <p><span className="text-blue-700">Terms of Service </span>& <span className="text-blue-700">Privacy Policy</span></p>
                                                </div>

                                            </div>
                                        )
                                        :
                                        (
                                            <div className="w-3/5 text-center p-4 ">
                                                <div className="flex justify-center py-4">
                                                    {/* <img width={"100px"} src={logo} alt="logo" /> */}
                                                    <h1 className="text-2xl font-bold text-green-700"><i class="fa-solid fa-tractor"></i> SKRIYA</h1>
                                                </div>
                                                <div className="flex justify-center ">
                                                    <h1 className="text-xl text-white  font-bold">Products Delivery To Your Door Step</h1>
                                                </div>
                                                <div className="py-4">
                                                    <div className="w-full relative text-base text-black flex bg-white items-center border mb-4 rounded-full">
                                                        <span className="left-0 pl-3.5">+91</span>
                                                        <input
                                                            className="focus:outline-none block py-3 mx-2 appearance-none font-subtitle flex-grow font-normal bg-transparent text-md"
                                                            inputMode="text"
                                                            placeholder="Enter Phone Number"
                                                            type="tel"
                                                            maxLength="10"
                                                            value={phoneNumber}
                                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                                        />
                                                    </div>

                                                    <button
                                                        className="border-skin-primary border tracking-widest w-full mt-1 rounded-3xl p-3 text-lg font-semibold disabled:text-skin-base disabled:opacity-50 bg-gradient-to-r from-[#ff3269] to-[#ff794d] text-white"
                                                        disabled={!isTenDigit}  // Disable if phone number is empty
                                                        type="button"
                                                        onClick={handleSendOtp}
                                                    >
                                                        <div className="flex items-center justify-center">Continue</div>
                                                    </button>
                                                </div>
                                                <div className="text-sm text-white">
                                                    <p>By continuing you agree to our</p>
                                                    <p><span className="text-blue-700">Terms of Service </span>& <span className="text-blue-700">Privacy Policy</span></p>
                                                </div>

                                            </div>
                                        )
                                }


                                <div className="w-2/5  ">
                                    <img src={loginpopup} alt="" />
                                </div>

                            </div>
                        </div>


                    </div>
                </div>
            )}
        </>
    );
};

export default Login;







