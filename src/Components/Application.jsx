import React, { useEffect, useState } from 'react';
import ApplicationForm from './ApplicationForm';
import { useNavigate } from 'react-router-dom';

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
      if (data === "Invalid token") {
        localStorage.removeItem('token');
        navigate('/');
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    }
    return response.json();
  };

  // Get applications
  const getApplications = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/applications/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
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
          'Authorization': `Bearer ${token}`,
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
      const response = await fetch("http://localhost:8000/api/applications/delete", {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': "application/json",
        },
        body: JSON.stringify({ ids: toDelete }),
      });

      const data = await checkTokenExpiry(response);
      console.log(data);
      setRefresh(!refresh);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCheckboxChange = (id) => {
    const updatedDel = del.map(app => app.id === id ? { ...app, isChecked: !app.isChecked } : app);
    setDel(updatedDel);
    console.log(updatedDel);
  };

  useEffect(() => {
    getApplications();
  }, [refresh]);

  return (
    <div className="container mx-auto">
      <h1 className="text-center text-2xl font-bold mt-8 mb-4">Applications</h1>
      <div className="flex justify-between mb-4">
        <button className="bg-secondary text-white px-4 py-2 rounded cursor-pointer" onClick={() => setShowForm(true)}>Add</button>
        <button className='bg-primary text-white px-4 py-2 rounded cursor-pointer' onClick={() => DeleteApplication()}>Delete</button>
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
          applications.map((app) => (
            <div key={app._id} className="flex items-center justify-between p-4 border border-quaternary rounded cursor-pointer hover:bg-light">
              <div className="flex items-center space-x-4 w-full">
                <input
                  type="checkbox"
                  id={app._id}
                  className="w-1/6 form-checkbox text-primary"
                  checked={del.find(item => item.id === app._id)?.isChecked || false}
                  onChange={() => handleCheckboxChange(app._id)}
                />
                <div className="w-2/6 font-bold text-primary">{app.jobTitle}</div>
                <div className="w-2/6 text-secondary">{app.companyName}</div>
                <div className="w-1/6 text-tertiary">{app.status}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Application;
