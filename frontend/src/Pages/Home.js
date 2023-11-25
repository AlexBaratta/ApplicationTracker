import "../CSS/Home.css";

function Home() {
    return (
        <div className="application-table">
            <table className="table">
                <th>Applications</th>
                    <td>
                        Company Name
                    </td>
                    <td>
                        Date Applied
                    </td>
                    <td>
                        Status
                    </td>

            </table>
        </div>
    )
}

export default Home;