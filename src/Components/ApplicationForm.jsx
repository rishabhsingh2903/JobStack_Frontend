import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ApplicationForm = ({ onSubmit, onClose }) => {
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Applied');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ jobTitle, companyName, description, status });
    setJobTitle('');
    setCompanyName('');
    setDescription('');
    setStatus('Applied');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur">
      <div className="bg-light p-6 rounded-lg w-1/2  relative">
        <button className="absolute top-2 right-2 text-white bg-primary px-2 py-1 rounded" onClick={onClose}>
          Close
        </button>
        <h2 className="text-lg font-bold mb-4">Add Application</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">Job Title</label>
            <input type="text" id="jobTitle" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
          </div>
          <div className="mb-4">
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company Name</label>
            <input type="text" id="companyName" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea id="description" rows="3" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
            <select id="status" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Applied">Applied</option>
              <option value="Under Review">Under Review</option>
              <option value="Interview">Interview</option>
              <option value="Declined">Declined</option>
              <option value="Accepted">Accepted</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

ApplicationForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ApplicationForm;
