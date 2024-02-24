import { useEffect, useReducer, useState } from "react";

export default function PostJob() {
  var userinfo;
  if (localStorage.getItem("loggedUser") != null) {
    userinfo = JSON.parse(localStorage.getItem("loggedUser"));
    console.log(userinfo);
  }

  const init = {
    jobtitle: { value: "", valid: false, touched: false, error: "" },
    jobdescription: { value: "", valid: false, touched: false, error: "" },
    category: { value: "", valid: false, touched: false, error: "" },
    numberofworkers: { value: "", valid: false, touched: false, error: "" },
    // postdate: { value: "", valid: false, touched: false, error: "" },
    startdate: { value: "", valid: false, touched: false, error: "" },
    enddate: { value: "", valid: false, touched: false, error: "" },
    state: { value: "", valid: false, touched: false, error: "" },
    city: { value: "0", valid: false, touched: false, error: "" },
    address1: { value: "", valid: false, touched: false, error: "" },
    address2: { value: "", valid: false, touched: false, error: "" },
    formValid: false,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "update":
        return {
          ...state,
          [action.data.key]: {
            ...state[action.data.key],
            value: action.data.val,
            touched: action.data.touched,
            valid: action.data.valid,
            error: action.data.error,
          },
          formValid: action.data.formValid,
        };
      case "reset":
        return init;
      default:
        console.log("default switch");
        return state;
    }
  };

  const [postjob, dispatch] = useReducer(reducer, init);
  const [displayAlert, setDisplayAlert] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [alertType, setAlertType] = useState("danger");

  function showErrorMessage(msg, time) {
    setDisplayAlert(true);
    setErrorMsg(msg);
    if (time !== 0) {
      setTimeout(() => {
        setDisplayAlert(false);
      }, time);
    }
  }

  const handleDate = (key, value) => {
    let valid = true;
    let error = "";
    if (key === "startdate" || key === "enddate") {
      const currentDate = new Date();
      const selectedDate = new Date(value);

      if (selectedDate < currentDate) {
        valid = false;
        error = "Selected date cannot be in the past.";
      }

      if (
        key === "enddate" &&
        selectedDate <= new Date(postjob.startdate.value)
      ) {
        valid = false;
        error = "End date must be greater than the start date.";
      }
    } else {
      const { valid: fieldValid, error: fieldError } = validateData(key, value);
      valid = fieldValid;
      error = fieldError;
    }

    let formValid = true;
    for (let k in postjob) {
      if (postjob[k].valid === false) {
        formValid = false;
        break;
      }
    }

    dispatch({
      type: "update",
      data: {
        key,
        val: value,
        touched: true,
        valid,
        error,
        formValid: formValid,
      },
    });
  };

  //   useEffect(() => {
  //     fetch(`http://localhost:8080/getProviderByUserId?id=${userinfo.id}`, {
  //         method: "GET",
  //         headers: {
  //             "Content-Type": "application/json",
  //         },
  //     })
  //     .then((response) => {
  //         if (!response.ok) {
  //             throw new Error(`HTTP error! Status: ${response.status}`);
  //         }
  //         return response.json();
  //     })
  //     .then((data) => {
  //         console.log(JSON.stringify(data));
  //         setJobs(data);
  //     })
  //     .catch((error) => {
  //         console.error("Error fetching data:", error);
  //     });
  // }, []);

  const handleChange = (key, value) => {
    const { valid, error } = validateData(key, value);
    let formValid = true;
    for (let k in postjob) {
      if (postjob[k].valid === false) {
        formValid = false;
        break;
      }
    }
    dispatch({
      type: "update",
      data: {
        key,
        val: value,
        touched: true,
        valid,
        error,
        formValid: formValid,
      },
    });
  };

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState(0);

  useEffect(() => {
    fetchStates();
  }, []);

  const handleStateChange = (stateId) => {
    setSelectedState(stateId);
    fetchCities(stateId);
  };

  const fetchStates = () => {
    fetch("http://localhost:8080/getstates")
      .then((response) => response.json())
      .then((data) => {
        setStates(data);
      })
      .catch((error) => console.error("Error fetching states:", error));
  };

  const fetchCities = (stateId) => {
    fetch(`http://localhost:8080/getcities?id=${stateId}`)
      .then((response) => response.json())
      .then((data) => {
        setCities(data);
      })
      .catch((error) => console.error("Error fetching cities:", error));
  };

  const handleReset = () => {
    dispatch({
      type: "reset",
    });
  };
  //console.log(JSON.stringify(providerdata[0].id));

  const validateData = (key, value) => {
    let valid = true;
    let error = "";
    switch (key) {
      case "jobtitle":
      case "jobdescription":
        // case "category":
        var pattern = new RegExp("^[a-zA-Z1-90 ]{3,}$");
        if (!pattern.test(value)) {
          valid = false;
          error = "Invalid Data";
        }
        break;

      case "category":
      case "city":
      case "state":
        if (value === "0") {
          valid = false;
          error = "Please select an option";
        }
        break;

      case "numberofworkers":
        pattern = /^\d{1,}$/;
        if (!pattern.test(value)) {
          valid = false;
          error = "Invalid Worker Requirement";
        }
        break;
      case "address1":
      case "address2":
        pattern = new RegExp("^[a-zA-Z1-90 ]{3,}$");
        if (!pattern.test(value)) {
          valid = false;
          error = "Invalid Data";
        }
        break;
      default:
        console.log("default switch");
    }
    return { valid: valid, error: error };
  };

  const submitData = (e) => {
    e.preventDefault();
    if (postjob.formValid === false) {
      setAlertType("alert-danger");
      showErrorMessage("Please enter valid data", 5000);
      return;
    }
    // if (postjob.formValid === true) {
    //   setAlertType("alert-success");
    //   showErrorMessage("Job Sucessfully Posted", 5000);
    //   return;
    // }
    const reqbody = JSON.stringify({
      id: userinfo.id,
      title: postjob.jobtitle.value,
      description: postjob.jobdescription.value,
      jobCategory: {
        id: postjob.category.value,
      },
      noOfWorkers: postjob.numberofworkers.value,
      postDate: new Date(),
      jobStatus: 1,
      startDate: postjob.startdate.value,
      endDate: postjob.enddate.value,
      address: {
        addressLine1: postjob.address1.value,
        addressLine2: postjob.address2.value,
        city: {
          id: postjob.city.value,
        },
      },
    });

    console.log(reqbody)

    // Perform the POST request
    fetch(`http://localhost:8080/addJob?userId=${userinfo.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: reqbody,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("return data: " + JSON.stringify(data));
        if (data === true) {
          setAlertType("alert-success");
          showErrorMessage("Job Posted Sucessfully", 5000);
        } else {
          setAlertType("alert-info");
          showErrorMessage("Job Already Posted", 5000);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <form>
      <div className="container mt-5 mb-5 border border-dark rounded">
        <div className="mt-3 mb-5 display-5 text-center">Post Job</div>
        {/*  1st row*/}
        <div className="row">
          <div className="col">
            <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="idjobtitle" className="form-label">
                Job Title
              </label>
              <input
                type="text"
                className="form-control"
                id="idjobtitle"
                placeholder="Job title"
                onChange={(e) => handleChange("jobtitle", e.target.value)}
                onBlur={(e) => handleChange("jobtitle", e.target.value)}
              />
              <span className="error text-danger">
                {postjob.jobtitle.touched &&
                  !postjob.jobtitle.valid &&
                  postjob.jobtitle.error}
              </span>
            </div>
          </div>

          <div className="col">
            <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="providerid" className="form-label">
                Job Description
              </label>
              <input
                type="tel"
                className="form-control"
                id="providerid"
                placeholder="Job Description"
                onChange={(e) => handleChange("jobdescription", e.target.value)}
                onBlur={(e) => handleChange("jobdescription", e.target.value)}
              />
              <span className="error text-danger">
                {postjob.jobdescription.touched &&
                  !postjob.jobdescription.valid &&
                  postjob.jobdescription.error}
              </span>
            </div>
          </div>
        </div>

        {/* 2nd row */}
        <div className="row">
          <div className="col">
            <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="pwd" className="form-label">
                Job Category
              </label>
              <select
                className="form-select"
                onChange={(e) => handleChange("category", e.target.value)}
                onBlur={(e) => handleChange("category", e.target.value)}
              >
                <option value="0">Choose</option>
                <option value="1">Housekeeping</option>
                <option value="2">Cooking</option>
                <option value="3">Cleaning</option>
                <option value="4">Driving</option>
                <option value="5">Security</option>
              </select>
              <span className="error text-danger">
                <span className="error text-danger">
                  {postjob.category.touched &&
                    !postjob.category.valid &&
                    postjob.category.error}
                </span>
              </span>
            </div>
          </div>

          <div className="col">
            <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="numberofworker" className="form-label">
                Number of Workers
              </label>
              <input
                type="int"
                className="form-control"
                id="numberofworker"
                placeholder="Enter Number of Workers Required"
                min={0}
                onChange={(e) =>
                  handleChange("numberofworkers", e.target.value)
                }
                onBlur={(e) => handleChange("numberofworkers", e.target.value)}
              />
              <span className="error text-danger">
                {postjob.numberofworkers.touched &&
                  !postjob.numberofworkers.valid &&
                  postjob.numberofworkers.error}
              </span>
            </div>
          </div>
        </div>

        {/* 3th row */}
        <div className="row">
          <div className="col">
            <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="state" className="form-label">
                State
              </label>
              <select
                id="state"
                className="form-select"
                value={selectedState}
                onChange={(e) => handleChange("state", e.target.value)}
                onBlur={(e) => handleChange("state", e.target.value)}
              >
                <option value={0}>Select State</option>
                {states.map((state) => (
                  <option key={state.id} value={state.id}>
                    {state.stateName}
                  </option>
                ))}
              </select>
              <span className="error text-danger">
                {postjob.state.touched &&
                  !postjob.state.valid &&
                  postjob.state.error}
              </span>
            </div>
          </div>

          <div className="col">
            <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="city" className="form-label">
                City
              </label>
              <select
                id="city"
                className="form-select"
                onChange={(e) => handleChange("city", e.target.value)}
                onBlur={(e) => handleChange("city", e.target.value)}
              >
                <option value={0}>Select City</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.cityName}
                  </option>
                ))}
              </select>
              <span className="error text-danger">
                {postjob.city.touched &&
                  !postjob.city.valid &&
                  postjob.city.error}
              </span>
            </div>
          </div>
        </div>

        {/* 4th row */}
        <div className="row">
          <div className="col">
            <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="address1" className="form-label">
                Address Line 1
              </label>
              <input
                type="text"
                className="form-control"
                id="city"
                placeholder="Enter specific job location"
                onChange={(e) => handleChange("address1", e.target.value)}
                onBlur={(e) => handleChange("address1", e.target.value)}
              />
              <span className="error text-danger">
                {postjob.address1.touched &&
                  !postjob.address1.valid &&
                  postjob.address1.error}
              </span>
            </div>
          </div>

          <div className="col">
            <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="address1" className="form-label">
                Address Line 2
              </label>
              <input
                type="text"
                className="form-control"
                id="city"
                placeholder="Enter area"
                onChange={(e) => handleChange("address2", e.target.value)}
                onBlur={(e) => handleChange("address2", e.target.value)}
              />
              <span className="error text-danger">
                {postjob.address2.touched &&
                  !postjob.address2.valid &&
                  postjob.address2.error}
              </span>
            </div>
          </div>
        </div>

        {/* 5th row */}
        <div className="row">
          <div className="col">
            <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="startdate" className="form-label">
                Start Date
              </label>
              <input
                type="date"
                className="form-control"
                id="startdate"
                onChange={(e) => handleDate("startdate", e.target.value)}
                onBlur={(e) => handleDate("startdate", e.target.value)}
              />
              <span className="error text-danger">
                {postjob.startdate.touched &&
                  !postjob.startdate.valid &&
                  postjob.startdate.error}
              </span>
            </div>
          </div>

          <div className="col">
            <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="enddate" className="form-label">
                End Date
              </label>
              <input
                type="date"
                className="form-control"
                id="enddate"
                onChange={(e) => handleDate("enddate", e.target.value)}
                onBlur={(e) => handleDate("enddate", e.target.value)}
              />
              <span className="error text-danger">
                {postjob.enddate.touched &&
                  !postjob.enddate.valid &&
                  postjob.enddate.error}
              </span>
            </div>
          </div>
        </div>

        {/* 6th row */}
        <div className="row text-center m-3">
          <div
            className={`col alert text-center d-flex justify-content-center ${alertType} p-2 w-75 ${
              displayAlert ? "d-block" : "d-none"
            }`}
            role="alert"
          >
            {errorMsg}
          </div>
        </div>

        <div className="row text-center m-3">
          <div className="col"></div>
          <div className="col">
            <button
              className="btn btn-primary col-6"
              type="submit"
              onClick={(e) => {
                submitData(e);
              }}
            >
              Post Job
            </button>
          </div>
          <div className="col">
            <button
              className="btn btn-outline-danger col-6"
              type="reset"
              onClick={() => {
                handleReset();
              }}
            >
              Clear
            </button>
          </div>
          <div className="col"></div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          {/* <pre>{JSON.stringify(postjob, null, 2)}</pre> */}
        </div>
      </div>
    </form>
  );
}
