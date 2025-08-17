import { useState } from 'react'
import { Outlet, useLocation } from "react-router-dom";
import './App.css'
import AdminUserDetailState from "./contextComponents/AdminUserDetailState";
import AppNav from './components/AppNav';

function App() {
  const location = useLocation();
  
  // URLs where not to show the Nav
  const hideNavRoutes = ["/admin/login"];
  // Check if the restricted url mathches the current url
  const hideNav = hideNavRoutes.includes(location.pathname);
App
  return (
    <>
      <AdminUserDetailState>
        {!hideNav && <AppNav />}
        <Outlet />
      </AdminUserDetailState>
    </>
  )
}

export default App
