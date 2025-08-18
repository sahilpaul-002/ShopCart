import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router';
import Logo from '../assets/logo-w-background-c.png';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { adminUserLogoutApi } from '../apiCalls/AdminUserAuth';
import AdminUserContext from '../context/AdminUserContext'
import { useState } from 'react';
import AppNavContext from '../context/AppNavContext';

export default function () {
    const navigate = useNavigate();

    // Destructure admin user context
    const { userDetail, setUserDetail } = useContext(AdminUserContext);
    const {navbarCollapse, setNavbarcollapse} = useContext(AppNavContext);
    console.log(navbarCollapse)

    // ------------------------------ Logic to handle logout ------------------------------ \\
    const handleLogout = async () => {
        try {
            //  Update the state of the userDetail
            setUserDetail({ success: false, message: "", user: null })

            // Call logout api
            const logoutResponse = await adminUserLogoutApi()
            console.log(logoutResponse);
            navigate('/admin/login');
        }
        catch (e) {
            console.error({ success: false, message: e.message });
        }
    }
    // ------------------------------ ********************** ------------------------------ \\

    return (
        <>
            <Navbar expand="lg" className={`bg-body-tertiary w-[100vw] ${navbarCollapse ? "h-[80px] ease-in duration-[0.2s]" : "h-[300px]  ease-in duration-[0.2s]"} z-10 !px-[30px] shadow-xl shadow-black`} fixed='top'>
                <Container fluid>
                    {/* Brand Logo */}
                    <Link className='!no-underline md:me-5' to='/'>
                        <div className="brand-logo w-[100%] max-w-[380px] h-[100%] flex justify-start items-center gap-[20px] py-[auto]">
                            <img className="h-[8vh] rounded-[20px] object-cover" src={Logo} alt="Brnad logo" />
                            {/* <span className="brand-name text-[24px] font-[600] text-[white]">ShopCart</span> */}
                            <Navbar.Brand className='!text-[18px] md:!text-[24px]'>ShopCart Admin</Navbar.Brand>
                        </div>
                    </Link>
                    <Navbar.Toggle aria-controls="navbarScroll" onClick={() => { setNavbarcollapse(prev => !prev) }} />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link className={`AppNav-links ${navbarCollapse ? "!hidden" : "!block"}`} href="/addproduct">Add Products</Nav.Link>
                            <Nav.Link className={`AppNav-links ${navbarCollapse ? "!hidden" : "!block"}`} href="/itemlist">List Items</Nav.Link>
                            <Nav.Link className={`AppNav-links ${navbarCollapse ? "!hidden" : "!block"}`} href="/orders">Orders</Nav.Link>
                        </Nav>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                        <Button className={`${navbarCollapse ? "ms-5" : "d-flex mx-auto my-3"}`} variant="outline-dark" onClick={handleLogout}>Logout</Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
