import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'; 
import Home from './Pages/Home'; 
import NewJobPostings from './components/NewJobPostings.jsx'; 

function App() {
  return (
    <Router>
      <div>
        <Header /> 
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/new-job-postings" element={<NewJobPostings />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
