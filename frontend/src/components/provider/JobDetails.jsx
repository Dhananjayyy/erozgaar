import { useEffect, useState } from "react";

export default function JobDetails() {
  const [jobs, setJobs] = useState([]);
  const [allocatedWorkers, setAllocatedWorkers] = useState([]);
  const [ongoingWorkers, setOngoingWorkers] = useState([]);
  const [toggle, setToggle] = useState(0);
  const [displayAlert, setDisplayAlert] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [alertType, setAlertType] = useState("danger");
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [selectedWorkerIds, setSelectedWorkerIds] = useState([]);
  const [vacancyCount, setVacancyCount] = useState(null);
  const [workerLimit, setWorkerLimit] = useState(0);
  const [jobStatus, setJobStatus] = useState(0);

  var userinfo;
  if (localStorage.getItem("loggedUser") != null) {
    userinfo = JSON.parse(localStorage.getItem("loggedUser"));
    console.log(userinfo);
  }

  function showErrorMessage(msg, time) {
    setDisplayAlert(true);
    setErrorMsg(msg);
    if (time !== 0) {
      setTimeout(() => {
        setDisplayAlert(false);
      }, time);
    }
  }

  const fetchJobsData = () => {
    fetch(`http://localhost:8080/getJobsByProvider?id=${userinfo.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${userinfo.accessToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(JSON.stringify(data));
        setJobs(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    //fetchOngoingWorkers();
    fetchJobsData();
    fetchAllocatedWorkers();
  }, [toggle]);

  var jobs_arr = [];
  for (var i = 0; i < jobs.length; i++) {
    jobs_arr.push(jobs[i]);
  }

  const fetchAllocatedWorkers = () => {
    fetch(`http://localhost:8080/getAllocatedWorkers?userId=${userinfo.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${userinfo.accessToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(JSON.stringify(data));
        setAllocatedWorkers(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  function workerArray() {
    var arr_workers = [];
    for (var j = 0; j < allocatedWorkers.length; j++) {
      arr_workers.push(allocatedWorkers[j]);
    }
    return arr_workers;
  }

  console.log("arr job:  " + jobs_arr);
  //console.log("arr workers:  " + JSON.stringify(arr_workers));

  const getAllocatedWorkersCount = (jobId) => {
    console.log("allocated workers: " + allocatedWorkers.length);
    const workersForJob = allocatedWorkers.filter(
      (worker) => worker.job.id === jobId
    );
    return workersForJob.length;
  };

  const provideWorkers = () => {
    if (selectedJobId == null) {
      console.log("jobId: " + selectedJobId);
      showErrorMessage("Please select a Job", 5000);
      return;
    } else {
      setToggle(1);
    }
  };

  function calculateAge(dob) {
    var date = new Date(dob);
    var ageDifMs = Date.now() - date.getTime();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  const handleWorkerCheck = (workerId) => {
    const isIncluded = selectedWorkerIds.includes(workerId);
    if (!isIncluded) {
      setSelectedWorkerIds((prevIds) => [...prevIds, workerId]);
    } else {
      setSelectedWorkerIds((prevIds) =>
        prevIds.filter((id) => id !== workerId)
      );
    }
    console.log("selectedWorkerIds: " + selectedWorkerIds);
  };

  function pickWorkers() {
    if (selectedWorkerIds.length != workerLimit) {
      showErrorMessage("Please select " + workerLimit + " workers", 5000);
      return;
    }
    if (selectedWorkerIds.length === 0) {
      showErrorMessage("Please select workers", 5000);
      //console.log(arr_workers);
      console.log(selectedJobId);
      return;
    }

    var arr_workers = workerArray();

    for (var i = 0; i < arr_workers.length; i++) {
      if (arr_workers[i].id === selectedJobId) {
        setVacancyCount(arr_workers[i].noOfWorkers);
      }
    }
    console.log("vacancy count : " + vacancyCount);

    console.log(
      JSON.stringify({
        jobId: selectedJobId,
        workers: selectedWorkerIds,
      })
    );

    console.log("selected job id" + selectedJobId);

    fetch(`http://localhost:8080/pickWorkers?jobId=${selectedJobId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${userinfo.accessToken}`,
      },
      body: JSON.stringify({
        allocationIds: selectedWorkerIds,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("workers onboarded: " + JSON.stringify(data));
        showErrorMessage("Workers onboarded successfully", 5000);
        setToggle(0);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    setSelectedJobId(null);
    setSelectedWorkerIds([]);
    fetchJobsData();
    fetchAllocatedWorkers();
    workerArray();
  }

  function fetchOngoingWorkers() {
    fetch(`http://localhost:8080/getAssignedWorkers?jobId=${selectedJobId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${userinfo.accessToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(JSON.stringify(data));
        setOngoingWorkers(data);

        setToggle(3);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
  var arr_ongoing_workers = [];
  for (var j = 0; j < ongoingWorkers.length; j++) {
    arr_ongoing_workers.push(ongoingWorkers[j]);
  }
  console.log("arr_ongoing_workers: " + JSON.stringify(arr_ongoing_workers));

  function jobCompleted() {
    fetch(
      `http://localhost:8080/updateCompletionJobStatus?id=${selectedJobId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${userinfo.accessToken}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("job completed: " + JSON.stringify(data));
        showErrorMessage("Job Completed", 5000);

        setToggle(0);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    setJobStatus(0);
    setSelectedJobId(null);
    setSelectedWorkerIds([]);
    fetchJobsData();
    fetchAllocatedWorkers();
    workerArray();
  }

  var jobTable = (
    <table className="table table-bordered ">
      {/* console.log({jobStatus}) */}
      <thead className="thead-dark">
        <tr>
          <th scope="col" colSpan="8">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <button
                  type="button"
                  className="btn btn-outline-dark"
                  disabled={jobStatus === 1 || jobStatus === 2}
                  onClick={() => {
                    fetchOngoingWorkers();
                  }}
                >
                  <i className="fa fa-suitcase"></i> View Workers
                </button>
              </div>

              <div
                className={`alert alert-${alertType} p-1 ${
                  displayAlert ? "d-block" : "d-none"
                }`}
                role="alert"
                style={{ margin: "auto" }}
              >
                {errorMsg}
              </div>

              {jobStatus === 3 ? (
                <div>
                  <button
                    type="button"
                    className={`btn btn-danger`}
                    onClick={() => {
                      jobCompleted();
                    }}
                  >
                    <i className="fa fa-check"></i> Job Completed
                  </button>
                </div>
              ) : null}

              {jobStatus < 3 ? (
                <div>
                  {" "}
                  <button
                    type="button"
                    className={`btn btn-success`}
                    hidden={jobStatus === 1 || jobStatus === 3 || jobStatus === 4 }
                    onClick={() => {
                      provideWorkers();
                    }}
                  >
                    <i className="fa fa-plus"></i> Choose Workers
                  </button>{" "}
                </div>
              ) : null}

{jobStatus === 4 ? (
                <div>
                  {" "}
                  <button
                    type="button"
                    className={`btn btn-warning`}
                    onClick={() => {
                      //provideWorkers();
                    }}
                  >
                    <i className="fa fa-print"></i> Download Report
                  </button>{" "}
                </div>
              ) : null}
            </div>
          </th>
        </tr>
        <tr>
          <th scope="col" colSpan="8" className="text-center  bg-light">
            <div className="display-6">Jobs</div>
          </th>
        </tr>

        <tr>
          <th scope="col" className="text-center">
            Job
          </th>
          {/* <th scope="col">City</th> */}
          <th scope="col" className="text-center">
            Location
          </th>
          <th scope="col" className="text-center">
            Workers
          </th>
          <th scope="col" className="text-center">
            Post Date
          </th>
          <th scope="col" className="text-center">
            Start Date
          </th>
          <th scope="col" className="text-center">
            End Date
          </th>
          <th scope="col" className="text-center">
            Select
          </th>
        </tr>
      </thead>
      <tbody>
        {jobs_arr.map((v) => (
          <tr
            key={v.id}
            //className={selectedJobId === v.id ? "table-active" : ""}
          >
            <td>
              <strong>{v.title + ": "}</strong> {v.description}
            </td>
            <td>
              {v.address.addressLine1 +
                ", " +
                v.address.addressLine2 +
                ", " +
                v.address.city.cityName}
            </td>
            <td className="text-center">
              <span className="badge rounded-pill bg-secondary">
                {"Requirement: " + v.noOfWorkers}
              </span>
              {"  "}
              {v.jobStatus === 1 ? (
                <span className="badge rounded-pill bg-primary">{"Open"}</span>
              ) : null}
              {"  "}
              {v.jobStatus === 2 ? (
                <span className="badge rounded-pill bg-success">
                  {"Provided: " + getAllocatedWorkersCount(v.id)}
                </span>
              ) : null}
              {"  "}
              {v.jobStatus === 3 ? (
                <span className="badge rounded-pill bg-primary">
                  {"Ongoing"}
                </span>
              ) : null}

              {v.jobStatus === 4 ? (
                <span className="badge rounded-pill bg-danger">
                  {"Completed"}
                </span>
              ) : null}
            </td>
            <td>{v.postDate}</td>
            <td>{v.startDate}</td>
            <td>{v.endDate}</td>
            <td className="text-center">
              <label className="form-check-label">
                <input
                  type="radio"
                  name="selectedJob"
                  value={v.id}
                  checked={selectedJobId === v.id}
                  onChange={() => {
                    setJobStatus(v.jobStatus);
                    setSelectedJobId(v.id);
                    setWorkerLimit(v.noOfWorkers);
                  }}
                  style={{ width: "30px", height: "30px" }}
                />
              </label>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  var workerTable = (
    <table className="table table-bordered ">
      {/* {selectedWorkerIds} */}
      <thead className="thead-dark">
        <tr>
          <th scope="col" colSpan="8">
            <div className="d-flex justify-content-between align-items-center">
              <button
                type="button"
                className="btn btn-outline-dark"
                onClick={() => {
                  setToggle(0);
                }}
              >
                <i className="fa fa-arrow-left"></i> Back to Jobs
              </button>

              <div
                className={`alert alert-${alertType} p-1 ${
                  displayAlert ? "d-block" : "d-none"
                }`}
                role="alert"
                style={{ margin: "auto" }}
              >
                {errorMsg}
              </div>

              <button
                type="button"
                className="btn btn-success"
                
                onClick={() => {
                  pickWorkers();
                }}
              >
                <i className="fa fa-user"></i> Onboard
              </button>
            </div>
          </th>
        </tr>
        <tr>
          <th scope="col" colSpan="8" className="text-center  bg-light">
            <div className="display-6">Select Workers</div>
          </th>
        </tr>

        <tr>
          <th scope="col" className="text-center">
            Worker Name
          </th>
          {/* <th scope="col">City</th> */}
          <th scope="col" className="text-center">
            Location
          </th>
          <th scope="col" className="text-center">
            Relocation
          </th>
          <th scope="col" className="text-center">
            Education
          </th>
          <th scope="col" className="text-center">
            Phone
          </th>
          <th scope="col" className="text-center">
            Age
          </th>
          <th scope="col" className="text-center">
            Select
          </th>
        </tr>
      </thead>
      <tbody>
        {workerArray().map((v) => (
          <tr
            key={v.worker.id}
            //className={selectedWorkerIds.includes(v.id) ? "table-active" : ""}
          >
            <td>
              {v.worker.firstName +
                " " +
                v.worker.middleName +
                " " +
                v.worker.lastName}
            </td>
            <td>
              {v.worker.address.addressLine1 +
                ", " +
                v.worker.address.addressLine2 +
                ", " +
                v.worker.address.city.cityName}
            </td>
            <td>{v.worker.relocation ? "Yes" : "No"}</td>
            <td>{v.worker.education}</td>
            <td>{v.worker.user.phoneNumber}</td>
            <td>{calculateAge(v.worker.dateOfBirth)}</td>
            <td className="text-center">
              <label className="form-check-label">
                <input
                  type="checkbox"
                  name="selectedJob"
                  value={v.id}
                  // checked={selectedWorkerIds.includes(v.id)}
                  onChange={() => handleWorkerCheck(v.id)}
                  style={{ width: "30px", height: "30px" }}
                />
              </label>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  var assignedWorkerTable = (
    <table className="table table-bordered ">
      {/* {selectedWorkerIds} */}
      <thead className="thead-dark">
        <tr>
          <th scope="col" colSpan="8">
            <div className="d-flex justify-content-between align-items-center">
              <button
                type="button"
                className="btn btn-outline-dark"
                onClick={() => {
                  setToggle(0);
                }}
              >
                <i className="fa fa-arrow-left"></i> Back to Jobs
              </button>

              <div
                className={`alert alert-${alertType} p-1 ${
                  displayAlert ? "d-block" : "d-none"
                }`}
                role="alert"
                style={{ margin: "auto" }}
              >
                {errorMsg}
              </div>

            
            </div>
          </th>
        </tr>
        <tr>
          <th scope="col" colSpan="8" className="text-center  bg-light">
            <div className="display-6">Onboarded Workers</div>
          </th>
        </tr>

        <tr>
          <th scope="col" className="text-center">
            Worker Name
          </th>
          {/* <th scope="col">City</th> */}
          <th scope="col" className="text-center">
            Location
          </th>
          <th scope="col" className="text-center">
            Relocation
          </th>
          <th scope="col" className="text-center">
            Education
          </th>
          <th scope="col" className="text-center">
            Phone
          </th>
          <th scope="col" className="text-center">
            Age
          </th>
        </tr>
      </thead>
      <tbody>
        {arr_ongoing_workers.map((v) => (
          <tr
            key={v.id}
            //className={selectedWorkerIds.includes(v.id) ? "table-active" : ""}
          >
            <td>{v.firstName + " " + v.middleName + " " + v.lastName}</td>
            <td>
              {v.address.addressLine1 +
                ", " +
                v.address.addressLine2 +
                ", " +
                v.address.city.cityName}
            </td>
            <td>{v.relocation ? "Yes" : "No"}</td>
            <td>{v.education}</td>
            <td>{v.user.phoneNumber}</td>
            <td>{calculateAge(v.dateOfBirth)}</td>
            
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="container rounded mt-5 mb-5 ">
      <div className="mt-3 mb-5 display-5 text-center">Jobs List</div>
      <div>
        {/* {selectedJobId} */}
        <div className="table-responsive"></div>
        {toggle === 0 ? (
          jobTable
        ) : toggle === 3 ? (
          <>
            {/* {jobTable} */}
            {assignedWorkerTable}
          </>
        ) : (
          workerTable
        )}
      </div>
    </div>
  );
}
