import React from 'react'
import { Link } from 'react-router'
import Navbar from '../components/Navbar'
import Form from 'react-bootstrap/Form';
import PrimaryButton from '../components/PrimaryButton';
import Separator60 from '../components/Separator60';
import GoogleLogo from '../assets/google-logo.png';

export default function Signup() {
    return (
        <div className="w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center justify-start">

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
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        {/* Submit button */}
                        <div className="primary-button mx-[auto] w-[120px] bg-[red]">
                            <PrimaryButton />
                        </div>
                        {/* Separator */}
                        <Separator60 />
                        {/* Google Sign In */}
                        <div className='google-signin-box w-[80%] mx-[auto] px-[20px] py-[10px] bg-[#00000025] border-[1px] border-[#96969635] rounded-[10px] flex justify-center items-center gap-[10px] cursor-[pointer]'>
                            <div className="google-logo w-[10%] rounded-[20px]">
                                <img src={GoogleLogo} alt="Google Logo" />
                            </div>
                            <div className="google-text">
                                <span className='text-[24px] font-[600]'>Sign In with Google</span>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}
