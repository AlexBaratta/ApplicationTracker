import React, { useState } from 'react';
import "../CSS/ApplicationDetails.css"
const ApplicationDetails = ({ applications, onUpdate }) => {
  const [editState, setEditState] = useState({}); 

  const toggleEdit = (id) => {
    setEditState((prevState) => ({ ...prevState, [id]: !prevState[id] }));
  };

  const handleUpdate = (id, field, value) => {
    onUpdate(id, { ...field, [field]: value });
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };


  return (
    <table className="application-details">
    <thead>
        <tr>
          <th>Company Name</th>
          <th>Applied Date</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {applications.map((application) => (
          <tr key={application._id}>
            <td>
              {editState[application._id] ? (
                <input
                  type="text"
                  value={application.CompanyName}
                  onChange={(e) => handleUpdate(application._id, 'CompanyName', e.target.value)}
                />
              ) : (
                application.CompanyName
              )}
            </td>
            <td>
              {editState[application._id] ? (
                <input
                  type="date"
                  value={application.AppliedDate}
                  onChange={(e) => handleUpdate(application._id, 'AppliedDate', e.target.value)}
                />
              ) : (
                formatDate(application.AppliedDate)
              )}
            </td>
            <td>
              {editState[application._id] ? (
                <select
                  value={application.ApplicationStatus}
                  onChange={(e) => handleUpdate(application._id, 'ApplicationStatus', e.target.value)}
                >
                  <option value="Applied">Applied</option>
                  <option value="Interviewing">Interviewing</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
                </select>
              ) : (
                application.ApplicationStatus
              )}
            </td>
            <td>
              <button onClick={() => toggleEdit(application._id)}>
                {editState[application._id] ? 'Save' : 'Edit'}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ApplicationDetails;
