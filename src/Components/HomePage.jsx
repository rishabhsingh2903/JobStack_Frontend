import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from './Form';
import logo from '../assets/logo-trans.png';
import { baseUrl } from '../url';

const HomePage = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('SIGN UP');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (type === 'SIGN UP') {
      try {
        const response = await fetch(`${baseUrl}/api/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            email,
            password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setType('SIGN IN');
          setSuccess(true);
        } else {
          setSuccess(false);
          setError(data.message || 'Registration failed');
        }
      } catch (err) {
        console.error('Registration error:', err);
        setSuccess(false);
        setError('Server error. Please try again later.');
      }
    } else if (type === 'SIGN IN') {
      try {
        const response = await fetch(`${baseUrl}/api/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          handleLogin(data.token);
        } else {
          setSuccess(false);
          setError(data.message || 'Login failed');
        }
      } catch (err) {
        console.error('Login error:', err);
        setSuccess(false);
        setError('Server error. Please try again later.');
      }
    }
  };

  return (
    <div className='flex flex-col sm:flex-row h-screen'>
      <div className='sm:w-2/5 bg-white flex items-center justify-center'>
        <div className='w-full p-4'>
          {!success && (
            <div className='text-center text-bold text-primary'>
              {error}
            </div>
          )}
          <div className='px-32 py-10'>
            <Form
              setEmail={setEmail}
              setUsername={setUsername}
              setPassword={setPassword}
              setType={setType}
              type={type}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
      <div className='sm:w-3/5 flex'>
        <div className='bg-light flex items-center justify-center'>
          <img src={logo} className='w-3/4 h-auto' alt='Logo' />
        </div>
      </div>
    </div>
  );
};

HomePage.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default HomePage;
