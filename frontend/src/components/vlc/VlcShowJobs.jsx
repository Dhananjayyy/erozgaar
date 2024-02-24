import { useEffect, useState } from "react";

export default function VlcShowJobs() {
  var userinfo;
  if (localStorage.getItem("loggedUser") != null) {
    userinfo = JSON.parse(localStorage.getItem("loggedUser"));
    console.log(userinfo);
  }

  const [jobs, setJobs] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [toggle, setToggle] = useState(0);
  const [selectedRole, setSelectedRole] = useState(0);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [vacancyCount, setVacancyCount] = useState(null);
  const [selectedWorkerIds, setSelectedWorkerIds] = useState([]);
  const [displayAlert, setDisplayAlert] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [alertType, setAlertType] = useState("danger");
  const[disableWorkerButton, setDisableWorkerButton] = useState(false);
  const[disableCheckbox, setDisableCheckbox] = useState(false);
  const[workerLimit, setWorkerLimit] = useState(0);
  const[jobStatus, setJobStatus] = useState(0);
  

  

  function showErrorMessage(msg, time) {
    setDisplayAlert(true);
    setErrorMsg(msg);
    if (time !== 0) {
      setTimeout(() => {
        setDisplayAlert(false);
      }, time);
    }
  }

  const handleChange = (value) => {
    setToggle(0);
    setSelectedJobId(null);
    setSelectedRole(value);
    fetchJobsData()
  };

  const fetchJobsData = () => {
    fetch(`http://localhost:8080/getAllJobsByVlc?id=${userinfo.id}`, {
      method: "GET",
      headers: {"Authorization": `Bearer ${userinfo.accessToken}`},
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
    fetchJobsData();
  }, []);

  var arr = [];
  for (var i = 0; i < jobs.length; i++) {
    arr.push(jobs[i]);
  }

  //console.log("jobs:    " + JSON.stringify(jobs[0].jobStatus))

  const filteredJobs = arr.filter((job) => {
    switch (selectedRole) {
      case 1:
        return job.jobStatus === 1;
      case 2:
        return job.jobStatus === 2;
      case 3:
        return job.jobStatus === 3;
      case 4:
        return job.jobStatus === 4;
      case 5:
        return job.jobStatus === 5;
      default:
        return true;
    }
  });

  // function showJobDetails() {
  //   console.log("clicked on job details");
  //   if (selectedJobId == null) {
  //     console.log("if condition");
  //     showErrorMessage("Please select a Job", 5000);
  //     return;
  //   }
  //   setToggle(1);
  //   console.log("jobId: " + selectedJobId);
  // }

  function showJobDetails(jobId) {
    console.log("selected job id is: " + selectedJobId)
    console.log("clicked on job details");
    //setSelectedWorkerIds([]);
    setSelectedJobId(jobId);
    if (selectedJobId == null) {
      console.log("if condition");
      showErrorMessage("Please select a Job", 5000);
      return;
    }
    setToggle(1);
    console.log("jobId: " + selectedJobId);
  }

  function provideWorkers() {
    if (selectedJobId == null) {
      console.log("jobId: " + selectedJobId);
      showErrorMessage("Please select a Job", 5000);
      return;
    } else {
      setToggle(1);
    }

    fetch(
      `http://localhost:8080/getAvailableWorkers?userId=${userinfo.id}&jobId=${selectedJobId}`,
      {
        method: "GET",
        headers: {"Authorization": `Bearer ${userinfo.accessToken}`},
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("list of available workers" + JSON.stringify(data));
        setWorkers(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  var arr_workers = [];
  for (var j = 0; j < workers.length; j++) {
    arr_workers.push(workers[j]);
  }

  function calculateAge(dob) {
    var date = new Date(dob);
    var ageDifMs = Date.now() - date.getTime();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  function sendWorkers() {
    const increasedLimit = Math.ceil(workerLimit * 1.5);
    if(selectedWorkerIds.length !== increasedLimit){
      showErrorMessage("Please select " + increasedLimit + " workers", 5000);
      return;
    }
    if (selectedWorkerIds.length === 0) {
      showErrorMessage("Please select workers", 5000);
      console.log(arr);
      console.log(selectedJobId);
      return;
    }

    for (var i = 0; i < arr.length; i++) {
      if (arr[i].id === selectedJobId) {
        setVacancyCount(arr[i].noOfWorkers);
      }
    }
    console.log("vacancy count : " + vacancyCount);

    console.log(JSON.stringify({
      jobId: selectedJobId,
      workers: selectedWorkerIds,
    }));

    fetch(`http://localhost:8080/sendWorkers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${userinfo.accessToken}`,
      },
      body: JSON.stringify({
        jobId: selectedJobId,
        workers: selectedWorkerIds,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("workers provided: " + JSON.stringify(data));
        showErrorMessage("Workers provided successfully", 5000);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
      //setSelectedJobId(null);
      setSelectedWorkerIds([]);
      fetchJobsData();
      setToggle(0);
  }


  // function checkboxLimit(){
  //   const increasedLimit = Math.ceil(workerLimit * 1.5);
  //   //setWorkerLimit(increasedLimit);
  //   console.log("no of increased workers limit: " + increasedLimit);
  //   console.log("selected workers: " + selectedWorkerIds.length);
  //   if(selectedWorkerIds.length !== increasedLimit){
  //     showErrorMessage("You can select only " + increasedLimit + " workers", 5000);
  //     return;
  //   }
  // }

  const handleWorkerCheck = (workerId) => {
    const isIncluded = selectedWorkerIds.includes(workerId);
    console.log("isIncluded: " + workerId + " :" + isIncluded);
    console.log("no of jobs required"+ arr.noOfWorkers);
    console.log("no of workers selected"+ selectedWorkerIds.length);
    if (!isIncluded) {
      setSelectedWorkerIds((prevIds) => [...prevIds, workerId]);
    } else {
      setSelectedWorkerIds((prevIds) =>
        prevIds.filter((id) => id !== workerId)
      );
    }
    console.log("selectedWorkerIds: " + selectedWorkerIds);
  };

  

  var workerTable = (
    <table className="table table-bordered ">
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
                  sendWorkers();
                }}
              >
                Send <i className="fa fa-share"></i>
              </button>
            </div>
          </th>
        </tr>

        <tr>
          <th scope="col" colSpan="8" className="text-center  bg-light">
            <div className="display-6">Workers</div>
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
        {arr_workers.map((v) => (
          <tr
            key={v.id}
            // className={selectedWorkerIds.includes(v.id) ? "table-active" : ""}
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
            <td className="text-center">
              <label className="form-check-label">
                <input
                  type="checkbox"
                  name="selectedJob"
                  value={v.id}
                  //checked={selectedWorkerIds.includes(v.id)}
                  onChange={() => {handleWorkerCheck(v.id)}}
                  style={{ width: "30px", height: "30px" }}
                  //checked={disableCheckbox ? true : false}
                  //disabled={disableCheckbox ? true : false}
                />
              </label>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  var jobTable = (
    <table className="table table-bordered ">
      <thead className="thead-dark">
        <tr>
          <th scope="col" colSpan="8">
            <div className="d-flex justify-content-between align-items-center">
              <button
                type="button"
                className="btn btn-outline-dark"
                disabled
                onClick={() => {
                  showJobDetails();
                }}
              >
                <i className="fa fa-suitcase"></i> View Job Details
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

              {!disableWorkerButton && (
                <button
                  type="button"
                  className="btn btn-success"
                  hidden={jobStatus === 2 || jobStatus === 4 || jobStatus === 5}
                  onClick={() => {
                    provideWorkers();
                  }}
                >
                  <i className="fa fa-plus"></i> Provide Workers
                </button>
              )}
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
            No of Workers
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
        {filteredJobs.map((v) => (
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
            <td>{v.noOfWorkers}</td>
            <td>{v.postDate}</td>
            <td>{v.startDate}</td>
            <td>{v.endDate}</td>
            <td className="text-center">
              <label className="form-check-label">
                <input
                  type="radio"
                  name="selectedJob"
                  value={v.id}
                  // checked={selectedJobId === v.id}
                  onChange={() => {setJobStatus(v.jobStatus), setSelectedJobId(v.id); setWorkerLimit(v.noOfWorkers);}}
                  style={{ width: "30px", height: "30px" }}
                  //disabled={selectedRole >= 3 && selectedRole <= 6}
                />
              </label>
            </td>
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
        <div className="table-responsive">
          <div
            className="btn-group btn-group-toggle d-flex justify-content-center border rounded"
            data-toggle="buttons"
          >
            <label
              className={`btn ${selectedRole === 0 ? "btn-primary" : "btn-light"}`}
            >
              <input
                className="form-check-input"
                type="radio"
                name="selectedrole"
                autoComplete="off"
                value={0}
                style={{ display: "none" }}
                checked={selectedRole === 0}
                onChange={() => handleChange(0)}
              />{" "}
              All
            </label>

            <label
              className={`btn ${selectedRole === 1 ? "btn-primary" : "btn-light"}`}
            >
              <input
                className="form-check-input"
                type="radio"
                name="selectedrole"
                autoComplete="off"
                value={0}
                style={{ display: "none" }}
                checked={selectedRole === 1}
                onChange={() => handleChange(1)}
              />{" "}
              Open
            </label>

            <label
              className={`btn ${selectedRole === 2 ? "btn-primary" : "btn-light"}`}
            >
              <input
                className="form-check-input"
                type="radio"
                name="selectedrole"
                autoComplete="off"
                value={1}
                style={{ display: "none" }}
                checked={selectedRole === 2}
                onChange={() => handleChange(2)}
              />{" "}
              In-selection
            </label>
            <label
              className={`btn ${selectedRole === 3 ? "btn-primary" : "btn-light"}`}
            >
              <input
                className="form-check-input"
                type="radio"
                name="selectedrole"
                id="idRole3"
                autoComplete="off"
                style={{ display: "none" }}
                value={2}
                checked={selectedRole === 3}
                onChange={() => handleChange(3)}
              />{" "}
              Ongoing
            </label>
            <label
              className={`btn ${selectedRole === 4 ? "btn-primary" : "btn-light"}`}
            >
              <input
                className="form-check-input"
                type="radio"
                name="selectedrole"
                id="idRole3"
                style={{ display: "none" }}
                autoComplete="off"
                value={2}
                checked={selectedRole === 4}
                onChange={() => handleChange(4)}
              />{" "}
              Completed
            </label>
            <label
              className={`btn ${selectedRole === 5 ? "btn-primary" : "btn-light"}`}
            >
              <input
                className="form-check-input"
                type="radio"
                name="selectedrole"
                id="idRole3"
                style={{ display: "none" }}
                autoComplete="off"
                value={2}
                checked={selectedRole === 5}
                onChange={() => handleChange(5)}
              />{" "}
              Closed
            </label>
          </div>
          <br />
          {toggle === 0 ? jobTable : workerTable}
            {/* {selectedWorkerIds}
            {selectedJobId} */}
        </div>
      </div>

    </div>
  );
}
