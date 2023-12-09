const applicationDetails = ({ application }) => {
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
        <tr>
          <td>{application.CompanyName}</td>
          <td>{application.AppliedDate}</td>
          <td className={`status ${application.ApplicationStatus.replace(/\s+/g, '-').toLowerCase()}`}>
            {application.ApplicationStatus}
          </td>
        </tr>
      </tbody>
    </table>
    );
}

export default applicationDetails;