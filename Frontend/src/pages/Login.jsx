import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router'
import Navbar from '../components/Navbar'
import Form from 'react-bootstrap/Form';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import WhitePrimaryButton from '../components/WhitePrimaryButton';
import GoogleLogo from '../assets/google-logo.png';
import { googleSignInApi, userLogInApi } from '../apiCalls/UserAuth';
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from '../utils/Firebase';
import generateRandomPassword from '../utils/RandomPasswordGenerator';
import GetUserContext from '../contexts/GetUserContext';

export default function Login() {
  // Destructure context value
    const { setUserDetail } = useContext(GetUserContext);

  // ---------------------------- Logic redirect user to sign in page and home page ---------------------------- \\
  // Redirect to login page if sign up token is present
  let navigate = useNavigate();
  // UseEffect to redirect to login page if user Id exist in local storage
  useEffect(() => {
    // Get the current userId from the local storage
    const userId = localStorage.getItem('currentUserId');
    // Get the user same as user input from the local storage
    const users = JSON.parse(localStorage.getItem('users'));

    // check user logged in 
    if (users && userId) {
      const user = users.filter((user) => { return (userId === user.id) })
      if (user.length > 0 && user[0].login) {
        navigate('/');
      }
    }
  }, [])
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
  const [loginDisable, setLoginDisable] = useState(true);

  // ---------------------------- Logic to handle the form submission ---------------------------- \\
  // UseEffect to change the disable button state
  useEffect(() => {
    const { email, password } = userInput;
    if (email && password && email.includes("@") && password.length > 5) {
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
      const logInResponse = await userLogInApi(userInput);

      // Check API success
      if (!logInResponse.success) {
        throw logInResponse
      }
      // Get the userId from local strage similar to user input
      let users = JSON.parse(localStorage.getItem('users')) || [];
      // Check users detail is present in local storage
      if (!users.find(user => user.id === logInResponse.user._id)) {
        // Create a new user object
        const newUser = {
          id: logInResponse.user._id,
          login: true,
          name: logInResponse.user.name,
          email: logInResponse.user.email
        };
        // Push the new user into the array
        users.push(newUser);
      }
      else {
        //  Udpadet the user login status
        users = users.map((user) => {
          return (
            (user.id === logInResponse.user._id) ? { ...user, login: true, name: logInResponse.user.name, email: logInResponse.user.email } : user
          )
        });
      }
      //  Save the changed user details back to local storage
      localStorage.setItem('users', JSON.stringify(users))
      // Update the current user id with the user input
      localStorage.setItem('currentUserId', logInResponse.user._id)

      // Set the userDetail context state 
      setUserDetail(logInResponse);

      // Success message
      console.log({ success: true, message: logInResponse.message });

      // Redirect the user to home pag
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


  // ---------------------------- Logic to login using google auth ---------------------------- \\
  const googleSignIn = async () => {
    try {
      const response = await signInWithPopup(auth, provider)
      const user = response.user;

      // Get th generated password
      const generatedPassword = generateRandomPassword();

      const reqBody = {
        name: user.displayName,
        email: user.email,
        password: generatedPassword
      }

      // Call google sign in API
      const googleSignInResponse = await googleSignInApi(reqBody);
      console.log(googleSignInResponse)
      // Check api response
      if (!googleSignInResponse.success) {
        throw new Error("Internal server error");
      }

      // Get the userId from local strage similar to user input
      let users = JSON.parse(localStorage.getItem('users')) || [];
      // Check users detail is present in local storage
      if (!users.find(user => user.id === googleSignInResponse.user._id)) {
        // Create a new user object
        const newUser = {
          id: googleSignInResponse.user._id,
          login: true,
          name: googleSignInResponse.user.name,
          email: googleSignInResponse.user.email
        };
        // Push the new user into the array
        users.push(newUser);
      }
      else {
        //  Udpadet the user login status
        users = users.map((user) => {
          return (
            (user.id === googleSignInResponse.user._id) ? { ...user, login: true, name: googleSignInResponse.user.name, email: googleSignInResponse.user.email } : user
          )
        });
      }
      //  Save the changed user details back to local storage
      localStorage.setItem('users', JSON.stringify(users))
      // Update the current user id with the user input
      localStorage.setItem('currentUserId', googleSignInResponse.user._id)

      // Set the userDetail context state 
      setUserDetail(googleSignInResponse);

      // Redirect the user to home pag
      navigate('/');
    }
    catch (e) {
      console.error(e);
    }
  }
  // ---------------------------- ***************************** ---------------------------- \\

  return (
    <div className="w-[100vw] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center justify-start">

      {/* NavBar */}
      <Navbar />

      {/* login Box */}
      <div className='signUp-box m-5 w-[80%] max-w-[600px] px-[5px] py-[20px] bg-[#00000025] border-[1px] border-[#96969635] rounded-[10px] backdrop-blur-xs flex flex-col justify-center items-center gap-[20px]'>
        {/* login Text */}
        <div className='signup-text-box flex flex-col justify-center items-center gap-[5px]'>
          <span className='signup-text text-[48px] font-[600]'>Log In</span>
          <span className='text-[12px] font-[400]'>Log in to explore amazing deals and offers !</span>
        </div>
        {/* Login Form */}
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
              <WhitePrimaryButton disabled={loginDisable} buttonText={"Log In"} />
            </div>
            {/* Or Separator */}
            <div className="or-separator text-[14px] w-[20px] mx-[auto] my-[10px]">OR</div>
            {/* Google Sign In */}
            <div className='google-signin-box w-[80%] mx-[auto] px-[20px] py-[10px] bg-[#42656cae] border-[1px] border-[#96969635] rounded-[10px] flex justify-center items-center gap-[10px] cursor-[pointer] hover:bg-[transparent]'>
              <button type='button' className='flex justify-center items-center gap-[10px]' onClick={googleSignIn}>
                <div className="google-logo w-[30px] max-w-[60px] rounded-[20px]">
                  <img src={GoogleLogo} alt="Google Logo" />
                </div>
                <div className="google-text">
                  <span className='text-[12px] sm:text-[24px] font-[600]'>Sign In with Google</span>
                </div>
              </button>
            </div>
            {/* Signup Link */}
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
