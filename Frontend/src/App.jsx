import { useState } from 'react'
import { Outlet } from "react-router-dom";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import UserDetailState from './contextConponents/UserDetailState';
import Nav from './components/Nav';

function App() {

  return (
    <>
      <UserDetailState>
        <Nav />
        <Outlet />
      </UserDetailState>
    </>
  )
}

export default App
