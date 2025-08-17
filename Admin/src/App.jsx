import { useState } from 'react'
import { Outlet } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {

  return (
    <>
    <div>Hello App</div>
      <Outlet />
    </>
  )
}

export default App
