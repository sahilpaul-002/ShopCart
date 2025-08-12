import React from 'react'
import UserAuthContext from '../contexts/userAuthContext'

export default function UserAuthState(props) {

    // Context values that works similar to props
    const value = null;
    
    // Return component which give the syntax of a context
    return (
        <UserAuthContext value={value}>{props.children}</UserAuthContext>
    )
}
