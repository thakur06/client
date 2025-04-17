// components/Unauthorized.js
import { useAuth0 } from '@auth0/auth0-react';
import React,{useEffect} from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
    const {logout}=useAuth0();
    useEffect(() => {
        localStorage.removeItem("app_data");
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user");
        setTimeout(()=>{
            logout({ returnTo: window.location.origin });
        },5000)
        

    }, [logout])
    
  return (
    
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold text-red-600 mb-4">403 - Unauthorized</h1>
      <p className="text-gray-700 mb-6">You do not have permission to view this page.</p>
      {/* <Link to="/" className="text-blue-500 underline">Go to Home</Link> */}
    </div>
  );
};

export default Unauthorized;
