import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../url';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [refresh, setRefresh] = useState(false);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const checkTokenExpiry = async (response) => {
    if (!response.ok) {
      const data = await response.json();
      if (data === 'Invalid token') {
        localStorage.removeItem('token');
        navigate('/');
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    }
    return response.json();
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/users/profile`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }

        const userData = await checkTokenExpiry(response);
        setUser(userData);
        setUsername(userData.username);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUser();
  }, [token, refresh]);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/users/update`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password: password ? password : undefined,
        }),
      });

      await checkTokenExpiry(response);
      setEditMode(false);
      setRefresh(!refresh);
      alert('User details updated successfully');
    } catch (error) {
      setError('Failed to update user profile');
      console.error('Error updating user profile:', error);
    }
  };

  const handleDeleteClick = async () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      try {
        const response = await fetch(`${baseUrl}/api/users/delete`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        await checkTokenExpiry(response);
        localStorage.removeItem('token');
        navigate('/');
      } catch (error) {
        setError('Failed to delete user profile');
        console.error('Error deleting user profile:', error);
      }
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      {editMode ? (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 p-2 w-full"
          />
        </div>
      ) : (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <div>{user.username}</div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <div>{user.email}</div>

        </div>
      )}

      {editMode && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-2 w-full"
          />
        </div>
      )}

      {editMode ? (
        <div className="flex space-x-4">
          <button
            onClick={handleSaveClick}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save
          </button>
          <button
            onClick={() => setEditMode(false)}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="flex space-x-4">
          <button
            onClick={handleEditClick}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Edit Details
          </button>
          <button
            onClick={handleDeleteClick}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete Account
          </button>
        </div>
      )}

      {error && <div className="text-red-500 mt-4">{error}</div>}
    </div>
  );
};

export default Profile;
