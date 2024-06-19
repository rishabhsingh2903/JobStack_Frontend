import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import "./styles.css";
import HomePage from './Components/HomePage';
import Application from './Components/Application';
import Profile from './Components/Profile';
import UserLayout from './Components/UserLayout';  // Import the UserLayout component

const App = () => {
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuth(true);
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setAuth(true);
    navigate('/user/application');
  };

  return (
    <Routes>
      <Route path="/" element={<HomePage handleLogin={handleLogin} />} />
      {auth ? (
        <Route path="/user" element={<UserLayout />}>
          <Route path="application" element={<Application />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      ) : (
        <Route path="/" element={<Navigate to="/" replace />} />
      )}
    </Routes>
  );
};

export default App;
