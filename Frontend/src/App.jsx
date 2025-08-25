import { useState, useEffect } from 'react'
import { Outlet, useLocation } from "react-router-dom";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import UserDetailState from './contextConponents/UserDetailState';
import Nav from './components/Nav';
import Footer from './components/Footer'
import SearchCollapseState from './contextConponents/SearchCollapseState';
import AllProductsState from './contextConponents/AllProductsState';
import UserCartState from './contextConponents/UserCartState';

function App() {
  const location = useLocation();

  // URLs where not to show the Nav
  const hideNavRoutes = ["/auth/login", "/auth/signup"];
  // Check if the restricted url mathches the current url
  const hideNav = hideNavRoutes.includes(location.pathname);

  // Scroll to top whenever URL changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // 👈 remove if you want instant scroll
    });
  }, [location.pathname]);

  return (
    <>
      <UserDetailState>
        <AllProductsState>
          <UserCartState>
            <SearchCollapseState>
              {!hideNav && <Nav />}
              <Outlet />
              <Footer />
            </SearchCollapseState>
          </UserCartState>
        </AllProductsState>
      </UserDetailState>
    </>
  )
}

export default App
