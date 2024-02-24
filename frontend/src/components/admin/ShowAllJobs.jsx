import { useEffect, useState } from "react"

export default function ShowAllJobs()
{
  const [job, setjobs] = useState("");

  useEffect(() => {
    console.log("int use effect");
    fetch(`http://localhost:5108/api/Job/showAllJobToAdmin`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(JSON.stringify(data));
        setjobs(data);
      });
  }, []);

  var arr = [];
  for (var i = 0; i < job.length; i++) {
    console.log(i);
    console.log(job[i]);
    arr.push(job[i]);
  }
    return (
        <>
        <div className="container mt-5 mb-5 border border-dark rounded ">
      <div className="mt-3 mb-5 display-5 text-center">Jobs</div>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Tittle</th>
            <th>Job Tittle</th>
            <th scope="col">Description</th>
            <th scope="col">Start Date</th>
            <th scope="col">End Date</th>
            <th scope="col">Job Status</th>
          </tr>
        </thead>
        <tbody>
          {arr.map((v) => (
            <tr key={v.jobid}>
              <td>{v.jobId}</td>
              <td>{v.jobTitle}</td>
              <td>{v.jobDescription}</td>
              <td>{v.startDate}</td>
              <td>{v.endDate}</td>
              <td> {v.jobStatus === 1 ? "Open" :
       v.jobStatus === 2 ? "In Selection" :
       v.jobStatus === 3 ? "In Working" :
       v.jobStatus === 4 ? "Complete" :
       v.jobStatus === 5 ? "Close" : "Unknown Status"}</td>
           </tr>
          ))}
        </tbody>
      </table>
    </div>
        </>
    )
}