import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { getUsersState } from '../../features/users/selectors'
import { storage } from '../../utils/storage'

function RequireAuth({children}) {
    const usersState=useSelector(getUsersState)
    const {isLogged}=usersState
    const accessToken = storage.get("authToken");
    const location=useLocation()
    if (!accessToken) {
        
        return <Navigate to="/login" state={{from:location}} replace></Navigate>
    } else {

        return children

    }
}

export default RequireAuth