import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Components
import Login from './components/Login';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { Dashboard } from './components/Dashboard';
import Analytics from './components/Analytics';
import { Clock } from './components/Clock';
import Logs from './components/Logs';
import Profile from './components/Profile';
import { useAuth } from './context/useAppData';
import Unauthorized from './components/Unauthorized';
const auth0Domain = import.meta.env.VITE_AUTH_DOMAIN;
const auth0ClientId = import.meta.env.VITE_AUTH_CLIENT;
const auth0RedirectUri = window.location.origin;
const graphqlEndpoint = import.meta.env.VITE_SERVER ;

const httpLink = createHttpLink({ uri: graphqlEndpoint });
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('auth_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// 🔐 Wrapper to protect routes with optional role check
const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, isLoading } = useAuth0();
  const { myUserData } = useAuth();

  if (isLoading || !myUserData) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" />;

  if (requiredRole && myUserData.role !== requiredRole) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

const App = () => {
  return (
    <Auth0Provider
      domain={auth0Domain}
      clientId={auth0ClientId}
      redirectUri={auth0RedirectUri}
      authorizationParams={{ redirect_uri: auth0RedirectUri }}
    >
      <ApolloProvider client={client}>
        <AppContent />
      </ApolloProvider>
    </Auth0Provider>
  );
};

const AppContent = () => {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const { myUserData } = useAuth();

  useEffect(() => {
    const saveUserData = async () => {
      try {
        if (isAuthenticated && user) {
          localStorage.setItem('user', JSON.stringify(user));
          const token = await getAccessTokenSilently();
          localStorage.setItem('auth_token', token);
        }
      } catch (error) {
        console.error('Error saving user data:', error);
      }
    };

    saveUserData();
  }, [isAuthenticated, user, getAccessTokenSilently]);

  return (
    <Router>
      {(isAuthenticated || myUserData?.role) && <Navbar />}

      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home/>} />
          <Route path="/dashboard" element={<ProtectedRoute requiredRole="manager"><Dashboard /></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute requiredRole="manager"><Analytics /></ProtectedRoute>} />
          <Route path="/clock" element={<ProtectedRoute requiredRole="careworker"><Clock /></ProtectedRoute>} />
          <Route path="/logs" element={<ProtectedRoute requiredRole="manager"><Logs /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<Navigate to="/unauthorized" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
