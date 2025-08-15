import React, {useState} from 'react';
import UserDetailContext from '../contexts/GetUserContext';
import { getUserDetail } from '../apiCalls/UserDetail';

export default function UserDetailState(props) {
    // State to store the logged in user details
    const [userDetail, setUserDetail] = useState(null);
    // Get user detail from api call 
    const user = getUserDetail();

    // Value to send as props
    const value = user
    
  return (
    <UserDetailContext value={value}>{props.children}</UserDetailContext>
  )
}
