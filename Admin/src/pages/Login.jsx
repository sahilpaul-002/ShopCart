import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router'
import Navbar from '../components/Navbar'
import Form from 'react-bootstrap/Form';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import WhitePrimaryButton from '../components/WhitePrimaryButton';
import AdminUserContext from '../context/AdminUserContext';
import {adminUserLogInApi} from '../apiCalls/AdminUserAuth'

export default function Login() {
  const navigate = useNavigate();

  // Destructure context value
  const { setUserDetail } = useContext(AdminUserContext);

  // ---------------------------- Logic for password visibility ---------------------------- \\
  // Set state to store the password visibility state
  const [passwordHidden, setPasswordHidden] = useState(true);
  // ---------------------------- ***************************** ---------------------------- \\

  // ---------------------------- Logic to capture the input text ---------------------------- \\
  const [userInput, setUserInput] = useState({
    name: '',
    email: '',
    password: ''
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

  // State to store the disable login button
  const [loginDisable, setLoginDisable] = useState(true);

  // ---------------------------- Logic to handle the form submission ---------------------------- \\
  // UseEffect to change the disable button state
  useEffect(() => {
    const { name, email, password } = userInput;
    if (name && email && password && name.length > 2 && email.includes("@") && password.length > 5) {
      setLoginDisable(false); // enable button
    } else {
      setLoginDisable(true); // disable button
    }
  }, [userInput]);
  // Function handle on submission of form
  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault()

      // Call signup-api-calling-function
      const logInResponse = await adminUserLogInApi(userInput);

      // Check API success
      if (!logInResponse.success) {
        throw logInResponse
      }

      // Set the userDetail context state 
      setUserDetail(logInResponse);

      // Success message
      console.log({ success: true, message: logInResponse.message });

      // Redirect the user to home page
      navigate('/');
    }
    catch (e) {
      if (Array.isArray(e.message)) {
        console.error({ success: false, error: e.message, message: e.message[0]?.msg })
      }
      else {
        console.error({ success: false, message: e.message });
      }
    }
    finally {
      // Reset the user input state
      setUserInput({
        name: '',
        email: '',
        password: ''
      })
    }
  }
  // ---------------------------- ***************************** ---------------------------- \\

  return (
    <div className="w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center justify-start">

      {/* NavBar */}
      <Navbar />

      {/* Sign Up Box */}
      <div className='signUp-box m-5 w-[80%] max-w-[600px] px-[5px] py-[20px] bg-[#00000025] border-[1px] border-[#96969635] rounded-[10px] backdrop-blur-xs flex flex-col justify-center items-center gap-[20px]'>
        {/* Sign up Text */}
        <div className='signup-text-box flex flex-col justify-center items-center gap-[5px]'>
          <span className='signup-text text-[48px] font-[600]'>Log In</span>
          <span className='text-[12px] font-[400]'>Log in to ShopCart Admin</span>
        </div>
        {/* Sign up Form */}
        <div className='form-box m-3 w-[80%] px-[20px] py-[20px] bg-[#00000025]  rounded-[10px]'>
          <Form onSubmit={handleOnSubmit}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" name='name' required value={userInput.name} onChange={handleOnChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name='email' required value={userInput.email} onChange={handleOnChange} />
            </Form.Group>

            <Form.Group className="mb-3 relative" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type={passwordHidden ? "password" : "text"} placeholder="Enter password" name='password' value={userInput.password} onChange={handleOnChange} required />
              {/* Mask password eye */}
              {!passwordHidden && <FaEye color="black" className='absolute right-[4%] bottom-[16%]' onClick={() => { setPasswordHidden(prev => !prev) }} />}
              {passwordHidden && <FaEyeSlash color="black" className='absolute right-[4%] bottom-[16%]' onClick={() => { setPasswordHidden(prev => !prev) }} />}
            </Form.Group>

            {/* Submit button */}
            <div className="primary-button mx-[auto] w-[120px]">
              <WhitePrimaryButton disabled={loginDisable} buttonText={"Log In"} />
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

