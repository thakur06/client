import React, { useEffect, useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import { useAuth } from '../context/useAppData';
import { useNavigate } from 'react-router-dom';

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!, $password: String, $role: String) {
    createUser(name: $name, email: $email, password: $password, role: $role) {
      user_id
      role
      token
    }
  }
`;

const Home = () => {
  const navigate = useNavigate();
  const { userlogin } = useAuth();
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [userData, setUserData] = useState(() => {
    const stored = localStorage.getItem('app_data');
    return stored ? JSON.parse(stored) : null;
  });

  const [createUser, { loading, error }] = useMutation(CREATE_USER, {
    onCompleted: (data) => {
      const result = data.createUser;
      localStorage.setItem('app_data', JSON.stringify(result));
      setUserData(result);
      userlogin(result);
    },
  });

  useEffect(() => {
    // Wait for Auth0 to finish loading
    if (isLoading) return;

    // If not authenticated, redirect to login
    if (!isAuthenticated || !user) {
      navigate('/login', { replace: true });
      return;
    }

    // If userData exists, no need to register
    if (userData) return;

    // Register user if authenticated and no userData
    const registerUser = async () => {
      try {
        const name = user.name || user.nickname || user.given_name || 'Unknown User';
        await createUser({
          variables: {
            name,
            email: user.email,
            password: null,
            role: 'careworker',
          },
        });
      } catch (err) {
        console.error('Error during user registration:', err);
      }
    };

    registerUser();
  }, [isAuthenticated, isLoading, user, userData, createUser, navigate]);

  // Show loading state while Auth0 or mutation is in progress
  if (isLoading || (isAuthenticated && !userData && loading)) {
    return <div>Loading...</div>;
  }

  // If userData is available, render the dashboard
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome, {userData?.name || 'User'}!</h1>
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-2">Your Dashboard</h2>

        {userData && (
          <div className="bg-gray-100 p-4 rounded">
            <h3 className="font-medium">User Information:</h3>
            <ul className="mt-2">
              <li>Role: {userData.role}</li>
            </ul>
          </div>
        )}

        {loading && <p className="text-blue-600 mt-2">Registering user...</p>}
        {error && <p className="text-red-600 mt-2">Error: {error.message}</p>}
      </div>
    </div>
  );
};

export default Home;