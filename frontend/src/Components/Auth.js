import React, { useEffect } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'


function Auth() {
    const navigate = useNavigate()
    const { getAccessTokenSilently, user } = useAuth0();
    const getAuthState = async () => {
        try {
            const token = await getAccessTokenSilently()
            // localStorage.setItem(Auth0Id, user.sub)
            console.log(user)
        }
        catch { navigate('/login') }

    }

    useEffect(() => {
        getAuthState();
    }, []);

    return (
        <div><Outlet /></div>
    )
}

export default Auth