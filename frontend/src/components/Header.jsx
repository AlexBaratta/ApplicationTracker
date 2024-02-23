// Header.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate(); 

  const goToApplicationDetails = () => navigate('/');

  const goToNewJobPostings = () => navigate('/new-job-postings');

  return (
    <header className="app-header">
      <nav>
        <button onClick={goToApplicationDetails}>Application Details</button>
        <button onClick={goToNewJobPostings}>New Job Postings</button>
      </nav>
    </header>
  );
};

export default Header;
