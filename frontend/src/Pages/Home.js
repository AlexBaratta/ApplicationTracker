import React, { useEffect, useState } from 'react';
import ApplicationDetails from "../components/applicationDetails.jsx";
import FileUploader from "../components/FileUploader.jsx";
import "../CSS/Home.css";

function Home() {
    const [applications, setApplications] = useState([]);
    const [newApplication, setNewApplication] = useState({ CompanyName: '', AppliedDate: '', ApplicationStatus: 'Applied' });

    useEffect(() => {
        const fetchApplications = async () => {
            const response = await fetch('/api/applications');
            const json = await response.json();

            if (response.ok){
                setApplications(json.applications); 
            }
        }

        fetchApplications();
    }, []);

    const handleUpdate = async (id, updatedFields) => {
        try {
            const response = await fetch(`/api/applications/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedFields),
            });
    
            if (!response.ok) {
                throw new Error('Failed to update application');
            }
    
            const updatedApplication = await response.json();
            setApplications(applications.map(app => app._id === id ? updatedApplication : app));
        } catch (error) {
            console.error('Error updating application:', error);
        }
    };
    
    const handleAddApplication = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('/api/applications', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newApplication),
            });
    
            if (!response.ok) {
                throw new Error('Failed to add application');
            }
    
            const addedApplication = await response.json();
            setApplications([...applications, addedApplication]);
            // Reset new application form
            setNewApplication({ CompanyName: '', AppliedDate: '', ApplicationStatus: 'Applied' });
        } catch (error) {
            console.error('Error adding application:', error);
        }
    };
    
    return (
        <>
            <div className='file-uploader'>
                <FileUploader/>
            </div>
            <form onSubmit={handleAddApplication}>
                <input
                    type="text"
                    placeholder="Company Name"
                    value={newApplication.CompanyName}
                    onChange={(e) => setNewApplication({ ...newApplication, CompanyName: e.target.value })}
                />
                <input
                    type="date"
                    value={newApplication.AppliedDate}
                    onChange={(e) => setNewApplication({ ...newApplication, AppliedDate: e.target.value })}
                />
                <select
                    value={newApplication.ApplicationStatus}
                    onChange={(e) => setNewApplication({ ...newApplication, ApplicationStatus: e.target.value })}
                >
                    <option value="Applied">Applied</option>
                    <option value="Interviewing">Interviewing</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                </select>
                <button type="submit">Add Application</button>
            </form>
            <div className="application-table">
                <ApplicationDetails applications={applications} onUpdate={handleUpdate}/>
            </div>
        </>
    );
}

export default Home;
