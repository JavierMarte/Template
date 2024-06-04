import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Logger } from "utils/logger";

const logger = new Logger("AuthContextProvider");

const AuthContext = createContext({
  user: null, // user info
  authToken: null, // authentication token
  login: () => { }, // function to handle login
  logout: () => { }, // function to handle logout
  loadUserData: () => { }, // function to load user-specific data
  userData: null, // user-specific data
});
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const [authToken, setAuthToken] = useState(localStorage.getItem('token'));
  const [userData, setUserData] = useState(null);

  const loadUserData = async () => {
    if (!user) return;
    logger.log('User data is: ', user);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/verifyToken/restofinfo/${localStorage.getItem('userId')}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      setUserData(response.data);
      localStorage.setItem('userinfo', response.data);
      logger.log('User data is: ', userData);
    } catch (error) {
      logger.error('Error loading user data:', error);
    }
  };



  const login = async (email, password) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/signin`, {
        email_address: email,
        password
      });
      logger.log('data received from login api is: ' + response.data.token);
      const token = response.data.token;
      localStorage.setItem('token', token); // Use localStorage for persistence
      // logger.log('local storage token is: ' + localStorage.getItem('token'));
      setAuthToken(token);

      // setUser({ email });
      localStorage.setItem('userId', response.data.email_address);
      logger.log('local storage userId is: ' + localStorage.getItem('userId'));
    } catch (error) {
      logger.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  useEffect(() => {
    const verifyToken = async () => {
      logger.log('Verifying token: ', authToken);

      if (!authToken) {
        logger.error('No token found');
        return;
      }

      if (authToken) {
        try {
          logger.log('useEffect for authcontext ran: ', authToken);

          const url = `${process.env.REACT_APP_API_URL}/verifyToken/`;
          logger.log(`url is: ${url} `);

          const response = await axios.get(url, {
            headers: {
              'Authorization': `Bearer ${authToken}`
            }
          });
          logger.log('Response from verifyToken: ', response);
          // Set user based on response
          setUser(response.data.user);
          loadUserData();
          logger.log(user);
        } catch (error) {
          logger.error('Token verification failed:', error);
          // Optionally handle token verification failure, e.g., logging out the user
        }
      }
    };

    verifyToken();
  }, [location.pathname, authToken]);

  // useEffect(() => {
  //   loadUserData();
  // }, [user, authToken]); // Re-run when user or authToken changes

  return (
    <AuthContext.Provider value={{ user, authToken, login, logout, loadUserData, userData }}>
      {children}
    </AuthContext.Provider>
  );
};
