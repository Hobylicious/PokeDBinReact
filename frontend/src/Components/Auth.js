import React from 'react'
import { Outlet } from 'react-router-dom'

function Auth() {
    return (
        // check if they are logged in, if yes go to home page
        //if not force login
        <div><Outlet /></div>
    )
}

export default Auth