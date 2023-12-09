import { useEffect, useState } from 'react';
import ApplicationDetails from "../components/applicationDetails"
import "../CSS/Home.css";

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