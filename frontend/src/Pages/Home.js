import { useEffect, useState } from 'react';
import applicationDetails from "../components/applicationDetails"
import "../CSS/Home.css";

const ApplicationDetails = ({ application }) => {
    return (
        <div>
            hello
            <h4>{application.CompanyName}</h4>
            <p>{application.AppliedDate}</p>
            <p>{application.ApplicationStatus}</p>
        </div>
    );
};


function Home() {
    const [applications, setApplications] = useState([]);

    useEffect (() => {
        const fetchApplications = async () => {
            const response = await fetch('/api/applications');
            const json = await response.json();

            if (response.ok){
                setApplications(json.applications); 
            }
        }

        fetchApplications();
    }, []); 
    return (
        <div className="application-table">
            <div>
                {applications.map((application) => (
                    <ApplicationDetails key={application._id} application={application}/> // Corrected component name and prop
                ))}
            </div>
        </div>
    );
}

export default Home;