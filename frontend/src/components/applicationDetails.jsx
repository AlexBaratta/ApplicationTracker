const ApplicationDetails = ({ applications }) => {
  return (
    <table className="application-details">
      <thead>
        <tr>
          <th>Company Name</th>
          <th>Applied Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {applications.map((application) => (
          <tr key={application._id}>
            <td>{application.CompanyName}</td>
            <td>{application.AppliedDate}</td>
            <td className={`status ${application.ApplicationStatus.replace(/\s+/g, '-').toLowerCase()}`}>
              {application.ApplicationStatus}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ApplicationDetails;
