import React, { useEffect, useState } from 'react';
import UserDetailContext from '../contexts/GetUserContext';
import { getUserDetail } from '../apiCalls/UserDetail';

export default function UserDetailState(props) {
  // State to store the logged in user details
  const [userDetail, setUserDetail] = useState({success:false, message: "", user: null});

  // UseEffect to cal the the user detail api on render
  useEffect (() => {
    // Function to get user detail from API
    const fetchUser = async () => {
      const user = await getUserDetail();
      setUserDetail(user);
    };

    fetchUser();
  }, [])

  // Value to send as props
  const value = {userDetail, setUserDetail}

  return (
    <UserDetailContext value={value}>{props.children}</UserDetailContext>
  )
}
