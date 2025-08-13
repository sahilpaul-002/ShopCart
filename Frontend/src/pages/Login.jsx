import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router'
import Navbar from '../components/Navbar'
import Form from 'react-bootstrap/Form';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import WhitePrimaryButton from '../components/WhitePrimaryButton';
import {userLogInApi} from '../apiCalls/userAuth';

export default function Login() {
  // ---------------------------- Logic redirect user to sign in page and home page ---------------------------- \\
    // Redirect to login page if sign up token is present
    let navigate = useNavigate();
    // UseEffect to redirect to login page if user Id exist in local storage
    useEffect(() => {
        // Get the current userId from the local storage
        const userId = localStorage.getItem('currentUserId');

        // Check if current user id is present
        if (!userId) {
          navigate('/auth/signup')
        }
        
        // Get the user same as user input from the local storage
        const users = JSON.parse(localStorage.getItem('users'));
        const user = users.filter((user) => {return (String(user.userId) === String(userId))});
        // Check if the current user is logged in
        if (user.length > 0 && user[0].login) {
          navigate('/'); // Redirect to home
        }

    })
    // ---------------------------- ***************************** ---------------------------- \\
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

  // State to store the disable signup button
  const [signUpDisable, setSignUpDisable] = useState(true);

  // ---------------------------- Logic to handle the form submission ---------------------------- \\
  // UseEffect to change the disable button state
  useEffect(() => {
    const { email, password } = userInput;
    if (email && password && email.includes("@") && password.length > 5) {
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

      // Call signup-api-calling-function
      const logInResponse = await userLogInApi(userInput);
      console.log(logInResponse);

      // Check API success
      if (!logInResponse.success) {
        throw new Error("Log in failed !")
      }

      // Get the userId from local strage similar to user input
      let users = JSON.parse(localStorage.getItem('users'));
      //  Udpadet the user login status
      users = users.map((user) => {
        return (
          (user.userId===logInResponse.userId) ? {...user, login: true} : user
        )
      });
      //  Save the changed user details back to local storage
      localStorage.setItem('users', JSON.stringify(users))
    } 
    catch (e) {
      console.log({ success: false, message: e.message });
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
    <div className="w-[100vw] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center justify-start">

      {/* NavBar */}
      <Navbar />

      {/* Sign Up Box */}
      <div className='signUp-box m-5 w-[80%] max-w-[600px] px-[5px] py-[20px] bg-[#00000025] border-[1px] border-[#96969635] rounded-[10px] backdrop-blur-xs flex flex-col justify-center items-center gap-[20px]'>
        {/* Sign up Text */}
        <div className='signup-text-box flex flex-col justify-center items-center gap-[5px]'>
          <span className='signup-text text-[48px] font-[600]'>Log In</span>
          <span className='text-[12px] font-[400]'>Log in to explore amazing deals and offers !</span>
        </div>
        {/* Sign up Form */}
        <div className='form-box m-3 w-[80%] px-[20px] py-[20px] bg-[#00000025]  rounded-[10px]'>
          <Form onSubmit={handleOnSubmit}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" name='name' value={userInput.name} onChange={handleOnChange} />
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
              <WhitePrimaryButton disabled={signUpDisable} buttonText={"Log In"} />
            </div>

            {/* Login Link */}
            <div className='login-link w-[80%] mx-[auto] px-[30px] py-[10px] bg-[transparent] text-[12px] flex justify-center items-center gap-[10px]'>
              <span>
                Create a new account -
              </span>
              <Link className='!no-underline !text-[white] hover:!underline hover:!text-blue-500 cursor-[pointer]' to='/auth/signup'>
                <span>
                  Sign Up
                </span>
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}
