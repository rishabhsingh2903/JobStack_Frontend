import React, { useEffect, useState } from 'react';
import ApplicationForm from './ApplicationForm';
import { useNavigate } from 'react-router-dom';
import ApplicationCard from './ApplicationCard';
import SearchBar from './SearchBar';

const Application = () => {
  const [applications, setApplications] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const token = localStorage.getItem('token');
  const [del, setDel] = useState([]);
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

  // Get applications
  const getApplications = async (searchKeyword = '') => {
    try {
      const url = searchKeyword ? `http://localhost:8000/api/applications/search?query=${searchKeyword}` : 'http://localhost:8000/api/applications/';
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await checkTokenExpiry(response);
      setApplications(data);
      const initialDel = data.map(app => ({ id: app._id, isChecked: false }));
      setDel(initialDel);
    } catch (err) {
      console.log(err);
    }
  };

  // Add application
  const handleFormSubmit = async (newApplication) => {
    try {
      const response = await fetch('http://localhost:8000/api/applications/add', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newApplication),
      });

      await checkTokenExpiry(response);
      setRefresh(!refresh);
      setShowForm(false);
    } catch (err) {
      console.log(err);
    }
  };

  // Delete application
  const DeleteApplication = async () => {
    const toDelete = del.filter(app => app.isChecked).map(app => app.id);
    try {
      console.log(toDelete);
      const response = await fetch('http://localhost:8000/api/applications/delete', {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids: toDelete }),
      });

      await checkTokenExpiry(response);
      setRefresh(!refresh);
    } catch (err) {
      console.log(err);
    }
  };

  // Update application
  const updateApplication = async (id, status) => {
    try {
      const response = await fetch('http://localhost:8000/api/applications/edit', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          status,
        }),
      });

      await checkTokenExpiry(response);
      setRefresh(!refresh); // Refresh the application list to show the updated status
    } catch (err) {
      console.log(err);
    }
  };

  const handleCheckboxChange = (id) => {
    const updatedDel = del.map(app => app.id === id ? { ...app, isChecked: !app.isChecked } : app);
    setDel(updatedDel);
    console.log(updatedDel);
  };

  const handleSearch = (searchKeyword) => {
    getApplications(searchKeyword);
  };

  useEffect(() => {
    getApplications();
  }, [refresh]);

  return (
    <div className="container mx-auto">
      <h1 className="text-center text-2xl font-bold mt-8 mb-4">Applications</h1>
      <div className="flex justify-between mb-4">
        <button className="bg-secondary text-white px-4 py-2 rounded cursor-pointer" onClick={() => setShowForm(true)}>Add</button>
        <SearchBar onSearch={handleSearch} />
        <button className='bg-primary text-white px-4 py-2 rounded cursor-pointer' onClick={DeleteApplication}>Delete</button>
      </div>
      <div className="grid grid-cols-1">
        <div className="flex items-center justify-between p-4 border border-quaternary rounded bg-tertiary text-light">
          <div className="flex items-center space-x-4 w-full">
            <div className="w-1/6"></div>
            <div className="w-2/6">Job Title</div>
            <div className="w-2/6">Company Name</div>
            <div className="w-1/6">Status</div>
          </div>
        </div>
        {showForm && <ApplicationForm onSubmit={handleFormSubmit} onClose={() => setShowForm(false)} />}
        {applications.length === 0 ? (
          <div className="text-center text-secondary">No applications started</div>
        ) : (
          applications.map(app => (
            <ApplicationCard
              key={app._id}
              app={app}
              isChecked={del.find(item => item.id === app._id)?.isChecked || false}
              handleCheckboxChange={handleCheckboxChange}
              updateApplication={updateApplication} // Pass update function to ApplicationCard
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Application;
