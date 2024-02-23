import React, { useEffect, useState } from 'react';

const NewJobPostings = () => {
    const [postings, setPostings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPostings = async () => {
            try {
                const response = await fetch('/api/job-postings');
                if (response.ok) {
                    const data = await response.json();
                    setPostings(data);
                } else {
                    throw new Error('Network response was not ok.');
                }
            } catch (error) {
                console.error('Fetch error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPostings();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>New Job Postings</h1>
            {postings.length > 0 ? (
                <ul>
                    {postings.map((posting, index) => (
                        <li key={index}>
                            <h2>{posting.title} at {posting.company}</h2>
                            <p>Location: {posting.location}</p>
                            <p>Date Posted: {posting.datePosted}</p>
                            <a href={posting.applyLink} target="_blank" rel="noopener noreferrer">Apply</a>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No job postings available at the moment.</p>
            )}
        </div>
    );
};

export default NewJobPostings;
