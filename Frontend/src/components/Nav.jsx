import React, { useContext, useEffect, useState, useRef } from 'react'
import { Link, NavLink } from 'react-router';
import { useLocation } from "react-router-dom";
import Logo from '../assets/logo-wo-background-c.png';
import ItemsButtonLarge from './ItemsButtonLarge';
import ItemsButtonSmall from './ItemsButtonSmall';
import { FaSearch } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import GetUserContext from '../contexts/GetUserContext';
import { getUserDetail } from '../apiCalls/UserDetail';
import { userLogOutApi } from '../apiCalls/UserAuth';
import SearchCollapseContext from '../contexts/SearchCollapseContext';

export default function Nav() {
    const location = useLocation();

    // Destructure context value
    const { userDetail, setUserDetail } = useContext(GetUserContext);
    const { searchbarCollapse, setSearchbarCollapse } = useContext(SearchCollapseContext);

    // State to store the search display state
    const [searchDisplay, setSearchDisplay] = useState(false);

    // State to store the profile display state
    const [profileDisplay, setProfileDisplay] = useState(false)

    // ------------------------------------- Logic to reset the UI while navigating ------------------------------------- \\
    useEffect(() => {
        setSearchDisplay(false)
        setProfileDisplay(false);
    }, [location]);
    // ------------------------------------- **************************** ------------------------------------- \\


    // ------------------------------------- Logic to handle log out click ------------------------------------- \\
    const handleLogOut = async () => {
        try {
            //  Update the state of the userDetail
            setUserDetail({ success: false, message: "", user: null })

            // Logged the user from local storage
            // Get the userId from local strage similar to user input
            let users = JSON.parse(localStorage.getItem('users'));
            // Check if the user is present
            if (users) {
                //  Udpadet the user login status
                users = users.map((user) => {
                    return (
                        (user.id === userDetail.user._id) ? { ...user, login: false } : user
                    )
                });
            }

            // Save back to localStorage
            localStorage.setItem("users", JSON.stringify(users));

            // Call log out api
            const logOutResponse = await userLogOutApi();

            // Succes message
            console.log(logOutResponse);
        }
        catch (e) {
            console.error({ success: false, message: e.message });
        }
    }
    // ------------------------------------- **************************** ------------------------------------- \\


    // ---------------------- Logic to collapse the profile drop down on screen click ---------------------- \\
    // Create a ref for the dropdown
    const profileDropDownRef = useRef(null);

    useEffect(() => {
        const handleCLickOutsideProfileDropDown = (event) => {
            // Check: is the click outside of the dropdown box?
            if (profileDropDownRef.current && !profileDropDownRef.current.contains(event.target)) {
                setProfileDisplay(false); // Close dropdown
            }
        }

        // Attach the event listener
        document.addEventListener("mousedown", handleCLickOutsideProfileDropDown);

        // Cleanup (remove listener when component unmounts)
        return () => {
            document.removeEventListener("mousedown", handleCLickOutsideProfileDropDown);
        };
    }, [])


    // ------------------------------------- **************************** ------------------------------------- \\


    const handleSearchbarDisplay = () => {
        // Show transparent div
        setSearchbarCollapse(prev => !prev);

        // Show searchbar
        setSearchDisplay(prev => !prev)
    }


    return (
        <div className='w-[100vw] h-[80px] bg-[#628f8f] z-[100] fixed top-0 flex items-center justify-between px-[30px] shadow-xl shadow-black '>
            {/* Brand Logo */}
            <Link className='!no-underline' to='/'>
                <div className="brand-logo w-[100%] max-w-[380px] h-[100%] flex justify-start items-center gap-[20px] py-[auto]">
                    <img className="h-[8vh] object-cover" src={Logo} alt="Brnad logo" />
                    <span className="brand-name text-[24px] font-[600] text-[white]">ShopCart</span>
                </div>
            </Link>
            {/* Navbar items */}
            <div className="navbar-items w-[60%] h-[100%] hidden md:flex">
                <ul className="w-[100%] h-[100%] flex items-center justify-center gap-[2%] lg:gap-[4%] text-white ps-0">
                    <NavLink className={"!no-underline text-white"} to='/'>
                        <li> <ItemsButtonLarge text={'Home'} /> </li>
                    </NavLink>
                    <NavLink className={"!no-underline text-white"} to='/collections'>
                        <li> <ItemsButtonLarge text={'Collections'} /> </li>
                    </NavLink>
                    <NavLink className={"!no-underline text-white"} to='/About'>
                        <li> <ItemsButtonLarge text={'About'} /> </li>
                    </NavLink>
                    <NavLink className={"!no-underline text-white"} to='/contact'>
                        <li> <ItemsButtonLarge text={'Contact'} /> </li>
                    </NavLink>
                </ul>
            </div>

            <div className="navbar-items w-[40%] md:w-[15%] flex items-center justify-end gap-[2%] relative">
                <FaSearch className='search-icon w-[50px] h-[25px] cursor-pointer' onClick={handleSearchbarDisplay} />
                {userDetail.success ? (
                    <div className="profile-loggedin-icon w-[38px] h-[35px]  aspect-square bg-[#414141] text-white font-bold rounded-[50%] flex items-center justify-center cursor-pointer" onClick={() => { setProfileDisplay(prev => !prev) }}>{userDetail.user.name[0]}</div>
                ) : (
                    <FaUserCircle className='profile-icon w-[70px] h-[35px] cursor-pointer' onClick={() => { setProfileDisplay(prev => !prev) }} />
                )}
                <FaCartShopping className='car-icon w-[60px] h-[30px] cursor-pointer' />
                <div className='w-[16px] h-[16px] bg-red-500 text-[8px] text-white rounded-full flex justify-center items-center absolute top-[-10%] right-[-2%]' >
                    <span>10</span>
                </div>
            </div>
            {/* Search Bar */}
            <div className="search-bar w-[100%] h-[70px] bg-[transparent] absolute top-[100%] left-0 flex items-center justify-center">
                {searchDisplay ? (
                    <input type="text" className='w-[50%] h-[60%] bg-[#4d6a67] rounded-[30px] px-[50px] placeholder:text-white text-white text-[18px]' placeholder='Search' />
                ) : (
                    null
                )}
            </div>
            {profileDisplay && (
                <div className="profile-display-list absolute top-[69px] right-[2%] w-[200px] bg-[#000000d7] border-[1px] border-[#aaa9a9] rounded-[10px] z-10" ref={profileDropDownRef}>
                    {userDetail.success ? (
                        <ul className='profile-list w-[100%] h-[100%] flex flex-col justify-around items-start text-[17px] py-[10px] ps-0 m-0 text-white'>
                            <Link className='profile-list-item-link w-[100%] !no-underline !text-inherit' to="/orders">
                                <li className='profile-list-item w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer'>
                                    Orders
                                </li>
                            </Link>
                            <Link className='profile-list-item-link w-[100%] !no-underline !text-inherit' to="/about">
                                <li className='profile-list-item w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer'>
                                    About
                                </li>
                            </Link>
                            <Link className='profile-list-item-link w-[100%] !no-underline !text-inherit' to="/" >
                                <li className='profile-list-item w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer' onClick={() => { handleLogOut() }}>
                                    Logout
                                </li>
                            </Link>
                        </ul>
                    ) : (
                        <ul className='profile-list w-[100%] h-[100%] flex flex-col justify-around items-start text-[17px] py-[10px] ps-0 m-0 text-white'>
                            <Link className='profile-list-item-link w-[100%] !no-underline !text-inherit' to="/auth/login">
                                <li className='profile-list-item w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer'>
                                    Login
                                </li>
                            </Link>
                        </ul>
                    )}
                </div>
            )}

            {/* Navbar Items Button for small scrren */}
            <div className='w-[100vw] h-[70px] bg-[#597a7ac0] rounded-t-[20%] z-10 fixed bottom-0 left-0 flex items-center justify-between p-x[10px] md:hidden'>
                {/* Navbar items */}
                <div className="navbar-items w-full h-[100%] pt-[15px] overflow-x-auto overflow-y-hidden">
                    <ul className="w-[100%] h-[100%] m-[auto] flex items-center justify-evenly gap-[6px] text-white ps-0 no-scrollbar">
                        <NavLink to='/'>
                            <li className="flex-shrink-0"> <ItemsButtonSmall text={'Home'} to='/' /> </li>
                        </NavLink>
                        <NavLink to='/collections'>
                            <li className="flex-shrink-0"> <ItemsButtonSmall text={'Collections'} to='/collections' /> </li>
                        </NavLink>
                        <NavLink to='/about'>
                            <li className="flex-shrink-0"> <ItemsButtonSmall text={'About'} to='/about' /> </li>
                        </NavLink>
                        <NavLink to='/contact'>
                            <li className="flex-shrink-0"> <ItemsButtonSmall text={'Contact'} to='/contact' /> </li>
                        </NavLink>
                    </ul>
                </div>
            </div>
        </div>
    )
}
