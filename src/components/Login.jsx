import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated or has data in localStorage
    const userData = localStorage.getItem('user');
    
    if (isAuthenticated || userData) {
      navigate('/');
    } 
  }, [isAuthenticated, navigate, loginWithRedirect]);

  return (
    <div className="min-h-screen bg-gradient-to-br w-full from-indigo-200 to-blue-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8 bg-white rounded-lg shadow-xl p-8">
      <div>
        <img
          className="mx-auto h-12 w-auto"
          src="/logo.png"
          alt="Your Company"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>

      </div>
      <div className="space-y-6">
        <button
          onClick={() => loginWithRedirect()}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </span>
          Sign in with Auth0
        </button>

        
      </div>
      <p className="mt-8 text-center text-gray-500 text-xs">
        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
      </p>
    </div>
  </div>
);
};

export default Login;