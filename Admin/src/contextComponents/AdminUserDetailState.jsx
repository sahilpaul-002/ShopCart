import React, { useEffect, useState } from 'react';
import AdminUserDetailContext from '../context/AdminUserContext';
import { getAdminUserDetail } from '../apiCalls/AdminUserDetails';

export default function UserDetailState(props) {
  // State to store the logged in user details
  const [userDetail, setUserDetail] = useState({success:false, message: "", user: null});

  // UseEffect to cal the the user detail api on render
  useEffect (() => {
    // Function to get user detail from API
    const fetchUser = async () => {
      const user = await getAdminUserDetail();
      setUserDetail(user);
    };

    fetchUser();
  }, [])

  // Value to send as props
  const value = {userDetail, setUserDetail}

  return (
    <AdminUserDetailContext value={value}>{props.children}</AdminUserDetailContext>
  )
}
