// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import { useAuth } from '../hooks/useAuth'; // Custom hook

// const PrivateRoute = ({ requiredRole }) => {
//   const { isAuthenticated, userRole } = useAuth(); // Check auth status and user role

//   // Handle loading state
//   if (isAuthenticated === null) {
//     return <div>Loading...</div>; // Or a loading spinner
//   }

//   // If the user is not authenticated, redirect to the login page
//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   // If the user is authenticated but doesn't have the required role, redirect to the unauthorized page
//   if (requiredRole && userRole !== requiredRole) {
//     return <Navigate to="/unauthorized" replace />;
//   }

//   // If authenticated and authorized, render the child components (the private routes)
//   return <Outlet />;
// };

// export default PrivateRoute;
