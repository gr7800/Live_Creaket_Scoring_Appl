import React, { useEffect, useState } from 'react';
import side_login from "../utils/image/side_login.svg";
import logo from "../utils/image/logo.png";
import InputBoxDropDown from '../component/InputBoxDropDown';
import CustomButton from '../component/Button';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [formError, setFormError] = useState({
        email: "",
        otp: ""
    });
    const [buttontitle, setButtonTitle] = useState("Get OTP on email");
    const [isLoading, setIsLoading] = useState(false);
    const [otp, setOtp] = useState("");
    const [timer, setTimer] = useState(0); // Timer countdown
    const isAuth = useSelector((store) => store.auth.isAuth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (timer > 0) {
            const intervalId = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);

            return () => clearInterval(intervalId); // Cleanup on unmount
        }
    }, [timer]);

    const validateForm = (temp) => {
        let isValid = true;
        let errors = { ...formError };

        if (!email) {
            errors.email = "Email is required!";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Email address is invalid!";
            isValid = false;
        } else {
            errors.email = "";
        }

        if (!temp && buttontitle === "Submit" && !otp) {
            errors.otp = "OTP is required!";
            isValid = false;
        } else if (!temp && buttontitle === "Submit" && otp !== '12345') {
            errors.otp = "Invalid OTP!";
            isValid = false;
        } else {
            errors.otp = "";
        }

        setFormError(errors);
        return isValid;
    };

    const handleInputChange = (value, field) => {
        setFormError(prevState => ({ ...prevState, [field]: value ? "" : "This field is required" }));
        switch (field) {
            case 'email':
                setEmail(value);
                break;
            case 'otp':
                setOtp(value);
            default:
                break;
        }
    };

    const handleresendOtp = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        if (validateForm(true)) {
            // Simulate OTP resend
            toast.success("OTP sent to email successfully!");
            setButtonTitle("Submit");
            setTimer(60); // Start 1-minute timer
        }
        setIsLoading(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        if (validateForm(false)) {
            if (buttontitle === "Get OTP on email") {
                // Simulate OTP sending
                toast.success("OTP sent to email successfully!");
                setButtonTitle("Submit");
                setTimer(60); // Start 1-minute timer
            }
            if (buttontitle === "Submit") {
                // Authenticate user
                if (otp === '12345') {
                    // Simulate successful login
                    localStorage.setItem('user', JSON.stringify({ email }));
                    localStorage.setItem('auth', 'true');
                    if (email === "gt29015@gmail.com") {
                        localStorage.setItem("adminauth", "true")
                    }
                    // dispatch({ type: 'LOGIN_SUCCESS', payload: { email } });
                    // navigate("/");
                } else {
                    toast.error("Invalid OTP!");
                }
            }
        }
        setIsLoading(false);
    };

    useEffect(() => {
        const auth = localStorage.getItem('auth');
        const userAuth = localStorage.getItem('adminauth')
        if (auth === 'true'||userAuth==="true") {
            navigate("/");
        }
    }, [handleSubmit]);

    return (
        <div className="flex flex-row lg:flex-row min-h-screen">
            {/* Left Side */}
            <div className="w-full flex items-center justify-center max-lg:hidden lg:max-w-[952]">
                <img src={side_login} alt="sidepage" className="object-cover h-full w-full" />
            </div>

            {/* Right Side */}
            <div className="w-full flex justify-center place-self-auto p-5">
                <div className="w-full max-w-md">
                    <div className="mb-6 text-center">
                        <img src={logo} alt="logo" className="mx-auto" width={"100px"} height={"50px"} />
                        <p className="text-[18px] m-4 font-montserrat font-medium text-[#000000DE]">Login to Dashboard</p>
                    </div>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="flex flex-row space-x-4">
                            <InputBoxDropDown
                                name={"email"}
                                type={"inputbox"}
                                title={"Email*"}
                                value={email}
                                setValue={handleInputChange}
                                error={formError.email}
                            />
                        </div>

                        {buttontitle === "Submit" && (
                            <div className="flex flex-row space-x-4">
                                <InputBoxDropDown
                                    name={"otp"}
                                    type={"inputbox"}
                                    title={"Otp*"}
                                    value={otp}
                                    setValue={handleInputChange}
                                    error={formError.otp}
                                />
                            </div>
                        )}
                        {(buttontitle === "Submit" && timer >= 0) && (
                            <div className="text-center flex justify-end items-end">
                                {
                                    timer === 0 ?
                                        <p className="text-orange-500 text-sm font-medium px-2 cursor-pointer" onClick={handleresendOtp}>Resend OTP</p> :
                                        <p className="text-orange-500 text-sm font-medium px-2">Timer: {Math.floor(timer / 60)}:{timer % 60 < 10 ? `0${timer % 60}` : timer % 60}</p>
                                }
                            </div>
                        )}

                        <CustomButton title={buttontitle} type={"submit"} handleClick={handleSubmit} loading={isLoading} disable={isLoading} />
                    </form>

                    <div className="flex justify-center items-center mt-4">
                        <p className="flex text-[16px] gap-1 m-4 text-center font-normal text-[#000000DE]">
                            Don't have an account?
                            <Link to="/register" className="text-blue-500 cursor-pointer text-[16px] font-normal">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
