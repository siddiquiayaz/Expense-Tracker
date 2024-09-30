// PrivateRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const token = localStorage.getItem('token'); // Fetch the token from local storage
    console.log('token', token)

    return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
