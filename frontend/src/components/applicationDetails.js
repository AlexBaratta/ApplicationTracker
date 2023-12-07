const applicationDetails = ({ application }) => {
    return (
        <div className="application-details">
            <h4>{application.CompanyName}</h4>
            <p>{application.AppliedDate}</p>
            <p>{application.ApplicationStatus}</p>
        </div>
    )
}

export default applicationDetails;