import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router'
import Navbar from '../components/Navbar'
import Form from 'react-bootstrap/Form';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import WhitePrimaryButton from '../components/WhitePrimaryButton';
import GoogleLogo from '../assets/google-logo.png';
import { userSignUpApi } from '../apiCalls/userAuth';

export default function Signup() {
    // ---------------------------- Logic redirect user to login page ---------------------------- \\
    // Redirect to login page if sign up token is present
    let navigate = useNavigate();
    // UseEffect to redirect to login page if user Id exist in local storage
    useEffect(() => {
        // Get the current userId from the local storage
        const userId = localStorage.getItem('currentUserId');
        
        // Check if current userId is set in local storage
        if(userId) {
            navigate('/auth/login');
        }
    })
    // ---------------------------- ***************************** ---------------------------- \\


    // ---------------------------- Logic for password visibility ---------------------------- \\
    // Set state to store the password visibility state
    const [hiddenFields, setHiddenFields] = useState({
        password: true,
        confirmPassword: true,
    });

    // Function to handle the click for password visibility
    const handleClickEye = (field) => {
        setHiddenFields((prev) => ({
            ...prev,
            [field]: !prev[field]
        }))
    }
    // ---------------------------- ***************************** ---------------------------- \\

    // ---------------------------- Logic to capture the input text ---------------------------- \\
    const [userInput, setUserInput] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    // Function to handle the onChange on input text feilds
    const handleOnChange = (e) => {
        const { name, value } = e.target //Get field name and value
        setUserInput((prev) => ({
            ...prev,
            [name]: value // update the specific field
        }));
    }
    // ---------------------------- ***************************** ---------------------------- \\

    // State to store the disable signup button
    const [signUpDisable, setSignUpDisable] = useState(true);

    // ---------------------------- Logic to handle the form submission ---------------------------- \\
    // UseEffect to change the disable button state
    useEffect(() => {
        const { name, email, password, confirmPassword } = userInput;
        if (name && email && password && confirmPassword && name.length > 2 && email.includes("@") && password.length > 5 && confirmPassword.length > 5) {
            setSignUpDisable(false); // enable button
        } else {
            setSignUpDisable(true); // disable button
        }
    }, [userInput]);
    // Function handle on submission of form
    const handleOnSubmit = async (e) => {
        try {
            e.preventDefault()
            console.log(userInput);

            // Check password and confirm password
            if (userInput.password !== userInput.confirmPassword) {
                throw new Error("Passwords should match. Please try again")
            }

            // Call signup-api-calling-function
            const signUpResponse = await userSignUpApi(userInput);
            console.log(signUpResponse);

            // Check API success
            if (!signUpResponse.success) {
                throw new Error("Sign up failed !")
            }

            // Get existing data from localStorage or create an empty array
            let users = JSON.parse(localStorage.getItem('users')) || [];
            // Create a new user object
            const newUser = {
                userId: signUpResponse.userId,
                login: false
            };
            // Push the new user into the array
            users.push(newUser);
            // Save back to localStorage
            localStorage.setItem('users', JSON.stringify(users));
            // Store the current user id in local storage separately as current user
            localStorage.setItem('currentUserId', signUpResponse.userId);
        }
        catch (e) {
            console.log({ success: false, message: e.message });
        }
        finally {
            // Reset the user input state
            setUserInput({
                name: '',
                email: '',
                password: '',
                confirmPassword: ''
            })
        }
    }
    // ---------------------------- ***************************** ---------------------------- \\

    return (
        <div className="w-[100vw] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center justify-start">

            {/* NavBar */}
            <Navbar />

            {/* Sign Up Box */}
            <div className='signUp-box m-5 w-[80%] max-w-[600px] px-[5px] py-[20px] bg-[#00000025] border-[1px] border-[#96969635] rounded-[10px] backdrop-blur-xs flex flex-col justify-center items-center gap-[20px]'>
                {/* Sign up Text */}
                <div className='signup-text-box flex flex-col justify-center items-center gap-[5px]'>
                    <span className='signup-text text-[48px] font-[600]'>Sign Up</span>
                    <span className='text-[12px] font-[400]'>Sign up to explore amazing deals and offers !</span>
                </div>
                {/* Sign up Form */}
                <div className='form-box m-3 w-[80%] px-[20px] py-[20px] bg-[#00000025]  rounded-[10px]'>
                    <Form onSubmit={handleOnSubmit}>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter name" name='name' value={userInput.name} required min={3} onChange={handleOnChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name='email' value={userInput.email} required onChange={handleOnChange} />
                        </Form.Group>

                        <Form.Group className="mb-3 relative" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type={hiddenFields.password ? "password" : "text"} placeholder="Enter password" name='password' value={userInput.password} required min={6} onChange={handleOnChange} />
                            {/* Mask password eye */}
                            {!hiddenFields.password && <FaEye color="black" className='absolute right-[4%] bottom-[16%] cursor-pointer' onClick={() => { handleClickEye("password") }} />}
                            {hiddenFields.password && <FaEyeSlash color="black" className='absolute right-[4%] bottom-[16%] cursor-pointer' onClick={() => { handleClickEye("password") }} />}
                        </Form.Group>

                        <Form.Group className="mb-3 relative" controlId="confimPassword">
                            <Form.Label>Confirm password</Form.Label>
                            <Form.Control type={hiddenFields.confirmPassword ? "password" : "text"} placeholder="Confirm Password" name='confirmPassword' value={userInput.confirmPassword} required min={6} onChange={handleOnChange} />
                            {/* Mask password eye */}
                            {!hiddenFields.confirmPassword && <FaEye color="black" className='absolute right-[4%] bottom-[16%] cursor-pointer' onClick={() => { handleClickEye("confirmPassword") }} />}
                            {hiddenFields.confirmPassword && <FaEyeSlash color="black" className='absolute right-[4%] bottom-[16%] cursor-pointer' onClick={() => { handleClickEye("confirmPassword") }} />}
                        </Form.Group>

                        {/* Submit button */}
                        <div className="primary-button mx-[auto] w-[120px]">
                            <WhitePrimaryButton disabled={signUpDisable} buttonText={"Sign Up"} />
                        </div>
                        {/* Or Separator */}
                        <div className="or-separator text-[14px] w-[20px] mx-[auto] my-[10px]">OR</div>
                        {/* Google Sign In */}
                        <div className='google-signin-box w-[80%] mx-[auto] px-[20px] py-[10px] bg-[#42656cae] border-[1px] border-[#96969635] rounded-[10px] flex justify-center items-center gap-[10px] cursor-[pointer]'>
                            <div className="google-logo w-[30px] max-w-[60px] rounded-[20px]">
                                <img src={GoogleLogo} alt="Google Logo" />
                            </div>
                            <div className="google-text">
                                <span className='text-[12px] sm:text-[24px] font-[600]'>Sign In with Google</span>
                            </div>
                        </div>
                        {/* Login Link */}
                        <div className='login-link w-[80%] mx-[auto] px-[30px] py-[10px] bg-[transparent] text-[12px] flex justify-center items-center gap-[10px]'>
                            <span>
                                Already have an account ?
                            </span>
                            <Link className='!no-underline !text-[white] hover:!underline hover:!text-blue-500 cursor-[pointer]' to='/auth/login'>
                                <span>
                                    Log In
                                </span>
                            </Link>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}
