import { useEffect, useState } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Optionally, decode the token to get the user role
      const user = JSON.parse(atob(token.split('.')[1])); // Example of decoding JWT
      setIsAuthenticated(true);
      setUserRole(user.role); // Assume the token contains the user role
    }
  }, []);

  return { isAuthenticated, userRole };
};
