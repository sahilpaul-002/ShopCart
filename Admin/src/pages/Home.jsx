import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router';
import AdminUserContext from '../context/AdminUserContext';
import { getAdminUserDetail } from '../apiCalls/AdminUserDetails';
import AppNavContext from '../context/AppNavContext';
import Sidebar from '../components/Sidebar';

export default function Home() {
  const navigate = useNavigate();

  // Destructure admin user context
  const { userDetail, setUserDetail } = useContext(AdminUserContext);
  const {navbarCollapse, setNavbarCollapse} = useContext(AppNavContext);

  // ---------------------- Logic to check if user is authorized else redirect to login ---------------------- \\
  // UseEffect to cal the the user detail api on render
  useEffect(() => {
    // Function to get user detail from API
    const fetchUser = async () => {
      const user = await getAdminUserDetail();
      console.log(user);
      setUserDetail(user);
      // Check user autorized
      if (!user.success) {
        navigate('/admin/login');
      }
    };

    fetchUser();
  }, []);
  //  ----------------------------------- ****************** ----------------------------------- \\

  return (
    <div className="home-container w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] pt-[70px] md:px-[80px] px-[20px]">
      {/* Transparent div to manage the navbar collapsing action */}
      {!navbarCollapse && <div className="transparent-navbar w-[100%] h-[250px]"></div>}

      {/* Sidebar */}
      <Sidebar />
    </div>
  )
}
