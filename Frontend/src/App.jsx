import { useState } from 'react'
import { Outlet, useLocation } from "react-router-dom";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import UserDetailState from './contextConponents/UserDetailState';
import Nav from './components/Nav';

function App() {
  const location = useLocation();

  // URLs where not to show the Nav
  const hideNavRoutes = ["/auth/login", "/auth/signup"];
  // Check if the restricted url mathches the current url
  const hideNav = hideNavRoutes.includes(location.pathname);

  return (
    <>
      <UserDetailState>
        {!hideNav && <Nav />}
        <Outlet />
      </UserDetailState>
    </>
  )
}

export default App
