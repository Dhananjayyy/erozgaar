import { useEffect, useState } from "react";

export default function Worker() {
  const [errorMsg, setErrorMsg] = useState("");
  const [alertType, setAlertType] = useState("danger");
  const [displayAlert, setDisplayAlert] = useState(false);
  const[workerData, setWorkerData]= useState([]);

  const [selectedWorkerId, setSelectedWorkerId] = useState(0);

  function showErrorMessage(msg, time) {
    setDisplayAlert(true);
    setErrorMsg(msg);
    if (time !== 0) {
      setTimeout(() => {
        setDisplayAlert(false);
      }, time);
    }
  }

  useEffect(() => {
    fetchWorkers();
  },[]);


  function fetchWorkers() {
    fetch("http://localhost:5108/api/Worker/showAllWorkerToAdmin")
      .then((response) => response.json())
      .then((data) => {
        setWorkerData(data);
        console.log(JSON.stringify(data));
      })
      .catch((error) => {
        //showErrorMessage("Error fetching workers", 3000);
      });
  } 

  function workerArray() {
    var arr_workers = [];
    for (var j = 0; j < workerData.length; j++) {
      arr_workers.push(workerData[j]);
    }
    return arr_workers;
  }

  function calculateAge(dob) {
    var date = new Date(dob);
    var ageDifMs = Date.now() - date.getTime();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  

  function modify(){
    console.log("selectedWorkerId: " + selectedWorkerId);
    if (selectedWorkerId === 0) {
      showErrorMessage("Select at least one worker", 3000);
      return;
    }
    console.log("selectedWorkerIds: " + selectedWorkerId);
    //setToggle(2);
  }

  return (
    
    <table className="table table-bordered ">
      <thead className="thead-dark">
        <tr>
          <th scope="col" colSpan="8">
            <div className="d-flex justify-content-between align-items-center">

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
                className="btn btn-outline-danger"
                onClick={() => {
                  modify();
                }}
              >
                <i className="fa fa-user"></i> Modify
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
          <th scope="col" className="text-center">
            Education
          </th>
          <th scope="col" className="text-center">
            Relocation
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
            key={v.id}
            //className={selectedWorkerIds.includes(v.id) ? "table-active" : ""}
          >
            <td>
              {v.firstName +
                " " +
                v.middleName +
                " " +
                v.lastName}
            </td>
            <td>{v.education}</td>
            <td>{v.relocation ? "Yes" : "No"}</td>
            <td>{calculateAge(v.dateOfBirth)}</td>
            <td className="text-center">
              <label className="form-check-label">
                <input
                  type="radio"
                  name="selectedJob"
                  value={v.id}
                  // checked={selectedWorkerIds.includes(v.id)}
                  onChange={() => setSelectedWorkerId(v.workerId)}
                  style={{ width: "30px", height: "30px" }}
                />
              </label>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
