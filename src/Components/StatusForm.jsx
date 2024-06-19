import React from 'react';
import PropTypes from 'prop-types';

const StatusForm = ({ currentStatus, onSave, onClose }) => {
  const [status, setStatus] = React.useState(currentStatus);

  const handleSave = (e) => {
    e.preventDefault();
    onSave(status);
    onClose();
  };

  const handleClickInside = (e) => {
    e.stopPropagation(); // Prevent click event from bubbling up
  };

  return (
    <div
      className='fixed inset-0 z-50 bg-opacity-50 backdrop-blur flex justify-center items-center'
      onClick={onClose}
    >
      <div className="bg-white p-4 rounded shadow-lg" onClick={handleClickInside}>
        <h2 className="text-xl font-bold mb-4">Update Status</h2>
        <form onSubmit={handleSave}>
          <select
            id="status"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Applied">Applied</option>
            <option value="Under Review">Under Review</option>
            <option value="Interview">Interview</option>
            <option value="Declined">Declined</option>
            <option value="Accepted">Accepted</option>
          </select>
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

StatusForm.propTypes = {
  currentStatus: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default StatusForm;
