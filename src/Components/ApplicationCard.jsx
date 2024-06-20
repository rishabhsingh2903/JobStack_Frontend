import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StatusForm from './StatusForm';

const ApplicationCard = ({ app, isChecked, handleCheckboxChange, updateApplication }) => {
  const [expand, setExpand] = useState(false);
  const [showStatusForm, setShowStatusForm] = useState(false);
  const [status, setStatus] = useState(app.status);

  const toggleExpand = (e) => {
    // Prevent expanding if the checkbox is clicked
    if (e.target.type !== 'checkbox') {
      setExpand(!expand);
    }
  };

  const handleCheckboxClick = (e) => {
    e.stopPropagation(); // Prevent the event from bubbling up to the parent div
    handleCheckboxChange(app._id);
  };

  const handleUpdateButton = (e) => {
    e.stopPropagation();
    setShowStatusForm(true);
  };

  const handleStatusSave = async (newStatus) => {
    setStatus(newStatus);
    setShowStatusForm(false);
    await updateApplication(app._id, newStatus); // Call the updateApplication function to save the new status
  };

  const descriptionParagraphs = app.description.split('\n').map((paragraph, index) => (
    <p key={index} className="text-tertiary mb-2">
      {paragraph}
    </p>
  ));

  return (
    <div
      key={app._id}
      className="p-4 border border-quaternary rounded cursor-pointer hover:bg-light"
      onClick={toggleExpand}
    >
      {expand ? (
        <div className="mt-4 pt-4">
          <div className="flex justify-between items-center mb-4 relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 font-bold text-primary text-2xl uppercase text-center">
              {app.jobTitle}
            </div>
            <div className="flex-grow"></div>
            <button
              className="bg-secondary text-white px-4 py-2 rounded cursor-pointer ml-auto"
              onClick={handleUpdateButton}
            >
              Update
            </button>
          </div>
          {showStatusForm && (
            <StatusForm
              currentStatus={status}
              onSave={handleStatusSave}
              onClose={() => setShowStatusForm(false)}
            />
          )}
          <div className="text-center text-secondary text-xl mb-4 font-bold uppercase">
            {app.companyName}
          </div>
          <div className="mb-4">
            <strong>Description:</strong>
            {descriptionParagraphs}
          </div>
          <div className="text-tertiary">
            <strong>Status:</strong> {app.status}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 w-full">
            <input
              type="checkbox"
              checked={isChecked}
              id={app._id}
              className="w-1/6 form-checkbox text-primary"
              onClick={handleCheckboxClick}
              onChange={() => {}}
            />
            <div className="w-2/6 font-bold text-primary">{app.jobTitle}</div>
            <div className="w-2/6 text-secondary">{app.companyName}</div>
            <div className="w-1/6 text-tertiary">{app.status}</div>
          </div>
        </div>
      )}
    </div>
  );
};

ApplicationCard.propTypes = {
  app: PropTypes.object.isRequired, // Ensure app prop is provided and is an object
  isChecked: PropTypes.bool.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired, // Ensure handleCheckboxChange is a function and required
  updateApplication: PropTypes.func.isRequired, // Ensure updateApplication is a function and required
};

export default ApplicationCard;
