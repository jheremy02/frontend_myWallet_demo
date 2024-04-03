import { jwtDecode } from 'jwt-decode';
import React from 'react'
import { Navigate } from 'react-router-dom';
import { storage } from '../utils/storage';

function ProtectedRoute({children}) {
    const accessToken = storage.get("authToken");
    const decoded = jwtDecode(accessToken);
  const {roles}=decoded
  
    if (!roles.includes(1)) {
        return <Navigate to={'/dashboard'}></Navigate> ;
    } else {
        return children
    }
  
}

export default ProtectedRoute