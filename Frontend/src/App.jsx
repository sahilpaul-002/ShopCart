import { useState } from 'react'
import { Outlet } from "react-router-dom";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import UserAuthState from './contextConponents/UserAuthState';

function App() {

  return (
    <>
    <UserAuthState>
      <Outlet />
    </UserAuthState>
    </>
  )
}

export default App
