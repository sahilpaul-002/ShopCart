import React, {useState} from 'react'
import AppNavContext from '../context/AppNavContext'

export default function AppNavState(props) {
    // State to store the appnav collapse state
    const [navbarCollapse, setNavbarcollapse] = useState(true);


    const value ={navbarCollapse, setNavbarcollapse};

  return (
    <AppNavContext value={value}>{props.children}</AppNavContext>
  )
}
