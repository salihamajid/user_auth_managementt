import React from 'react';
import { useNavigate } from 'react-router-dom';
import useLoginStore from './LoginStore';

const WelcomePage = () => {
  const { setIsLogin } = useLoginStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token and update login state
    localStorage.removeItem('authToken');
    setIsLogin(false);
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="welcome-container">
      <h1>Welcome to the Application!</h1>
      <p>You are now logged in. Enjoy your stay!</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default WelcomePage;
