import { useEffect, useReducer, useState } from "react";

export default function UpdateWorkerProfile() {
  const data = JSON.parse(localStorage.getItem("loggedUser"));

  const init = {
    fname: { value: "", valid: false, touched: false, error: "" },
    mname: { value: "", valid: false, touched: false, error: "" },
    lname: { value: "", valid: false, touched: false, error: "" },
    gender: { value: "", valid: false, touched: false, error: "" },
    adhaar: { value: "", valid: false, touched: false, error: "" },
    accountNumber: { value: "", valid: false, touched: false, error: "" },
    dob: { value: 0, valid: false, touched: false, error: "" },
    phone: { value: 0, valid: false, touched: false, error: "" },
    relocation: { value: 0, valid: false, touched: false, error: "" },
    active: { value: 0, valid: false, touched: false, error: "" },

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

  const [worker, dispatch] = useReducer(reducer, init);
  const [displayAlert, setDisplayAlert] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [alertType, setAlertType] = useState("danger");
  const [obj1, setObj] = useState("");
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [cancelDisabled, setCancelDisabled] = useState(true);

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
    console.log("in show request");
    fetch("http://localhost:8080/getuserworkerbyid?uid=" + data.id
    , {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(JSON.stringify(data));
        setObj(data);
        initializeWorkerState(data);

      });
  },[] );

  const initializeWorkerState = (data) => {
    dispatch({
      type: "update",
      data: {
        key: "fname",
        val: data.firstName,
        touched: true,
        valid: true,
        error: "",
      },
    });
    dispatch({
      type: "update",
      data: {
        key: "mname",
        val: data.middleName,
        touched: true,
        valid: true,
        error: "",
      },
    });

    dispatch({
      type: "update",
      data: {
        key: "lname",
        val: data.lastName,
        touched: true,
        valid: true,
        error: "",
      },
    });
    dispatch({
      type: "update",
      data: {
        key: "gender",
        val: data.gender,
        touched: true,
        valid: true,
        error: "",
      },
    });
    dispatch({
      type: "update",
      data: {
        key: "adhaar",
        val: data.adhaar,
        touched: true,
        valid: true,
        error: "",
      },
    });
    dispatch({
      type: "update",
      data: {
        key: "accountNumber",
        val: data.accountNumber,
        touched: true,
        valid: true,
        error: "",
      },
    });
    dispatch({
      type: "update",
      data: {
        key: "dob",
        val: data.dateOfBirth,
        touched: true,
        valid: true,
        error: "",
      },
    });
    dispatch({
      type: "update",
      data: {
        key: "phone",
        val: data.phoneNumber,
        touched: true,
        valid: true,
        error: "",
      },
    });
    dispatch({
      type: "update",
      data: {
        key: "education",
        val: data.education,
        touched: true,
        valid: true,
        error: "",
      },
    });
    dispatch({
      type: "update",
      data: {
        key: "relocation",
        val: data.relocation,
        touched: true,
        valid: true,
        error: "",
      },
    });

    dispatch({
      type: "update",
      data: {
        key: "active",
        val: data.relocation,
        touched: true,
        valid: true,
        error: "",
      },
    });

  };
  
  const handleReset = () => {
    setCancelDisabled(!cancelDisabled);
    setSubmitDisabled(!submitDisabled);
    dispatch({
      type: "reset",
    });
  };

  const handleDate = (key, value) => {
    let valid = true;
    let error = "";
    const currentDate = new Date();
    const selectedDate = new Date(value);
    if (key === "dob") {
 
      const yearsDiff = currentDate.getFullYear() - selectedDate.getFullYear();
      if (yearsDiff < 18 || (yearsDiff === 18 && currentDate.getMonth() < selectedDate.getMonth()) || (yearsDiff === 18 && currentDate.getMonth() === selectedDate.getMonth() && currentDate.getDate() < selectedDate.getDate())) {
        valid = false;
        error = "You must be at least 18 years old to register.";
      }
    } else {
      const { valid: fieldValid, error: fieldError } = validateData(key, value);
      valid = fieldValid;
      error = fieldError;
    }
  
    let formValid = true;
    for (let k in worker) {
      if (worker[k].valid === false) {
        formValid = false;
        break;
      }
    }

    if (
      selectedDate > currentDate || // Check if the selected date is in the future
      isNaN(selectedDate.getTime()) // Check if the parsed date is valid
    ) {
      valid = false;
      error = "Invalid Date of Birth";
      
    }
  
    dispatch({
      type: "update",
      data: {
        key,
        val: selectedDate.getTime(),
        touched: true,
        valid,
        error,
        formValid: formValid,
      },
    });
  };

  const handleChange = (key, value) => {
    const { valid, error } = validateData(key, value);
    let formValid = true;
    for (let k in worker) {
      if (worker[k] && worker[k].valid === false) { 
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
  

const handleRelocation = (key, value) => {
  let convertedValue = value.trim().toLowerCase() === "true" ? 1 : 0;
  const { valid, error } = validateData(key, convertedValue);

  const updatedWorker = {
    ...worker,
    [key]: {
      ...worker[key],
      value: convertedValue,
      touched: true,
      valid: valid,
      error: error,
    },
  };

  let formValid = true;
  for (let k in updatedWorker) {
    if (updatedWorker[k].valid === false) {
      formValid = false;
      break;
    }
  }

  dispatch({
    type: "update",
    data: {
      key,
      val: convertedValue,
      touched: true,
      valid,
      error,
      formValid,
    },
  });
};


  const toggleDisable = () => {
    setSubmitDisabled(!submitDisabled);
    setCancelDisabled(!cancelDisabled);
  };

  const validateData = (key, value) => {
    console.log(key, value);
    let valid = true;
    let error = "";
    switch (key) {
      case "fname":
      case "mname":
      case "lname":
        var pattern = new RegExp("^[a-zA-Z]{3,}$");
        if (!pattern.test(value)) {
          valid = false;
          error = "Invalid Name (Only Alphabets allowed)";
        }
        break;
 
      case "phone":
        pattern = /^\d{10}$/;
        if (!pattern.test(value)) {
          valid = false;
          error = "Invalid Phone Number";
        }
        break;

    
      case "active":
        pattern = value.toLowerCase().trim() === "true" || value.toLowerCase().trim() === "false";
        if (!pattern) {
          valid = false;
          error = "Invalid input for relocation. Please enter 'true' or 'false'.";
        }
        break;

      case "relocation":
        pattern = value.toLowerCase().trim() === "true" || value.toLowerCase().trim() === "false";
        if (!pattern) {
          valid = false;
          error = "Invalid input for relocation. Please enter 'true' or 'false'.";
        }
        break;


      case "adhaar":
        pattern = /^\d{12}$/;
        if (!pattern.test(value)) {
          valid = false;
          error = "Invalid Adhaar Number";
        }
        break;
      case "accountNumber":
        pattern = /^\d{10}$/;
        if (!pattern.test(value)) {
          valid = false;
          error = "Invalid Account Number";
        }
        break;

      default:
        console.log("default switch");
    }
    return { valid: valid, error: error };
  };

  const submitData = (e) => {
    e.preventDefault();
  
    if (worker.formValid === false) {
      setAlertType("alert-danger");
      return;
    }
  
    var reqbody = JSON.stringify({
      userId:data.id,
      userName: obj1.userName.value,
      password: obj1.password.value,
      phoneNumber: worker.phone.value,
      gender: worker.gender.value,
      role: {
        roleId: 1,
      },
      active: worker.active.value,
      adhaar: worker.adhaar.value,
      accountNumber: worker.accountNumber.value,
      securityQuestion: {
        securityQuestionId: obj1.question,
      },
      answer: obj1.answer.value,
      workerId:obj1.workerid,
      firstName: worker.fname.value,
      middleName: worker.mname.value,
      lastName: worker.lname.value,
      education: obj1.education.value,
      jobCategory: {
        id: obj1.preference,
      },
      address: {
        addressLine1: obj1.address1,
        addressLine2: obj1.address2,
        city: {
          cityName: obj1.city,
          state: {
            stateName: obj1.state,
          },
        },
      },
      dateOfBirth: worker.dob.value,
      relocation: worker.relocation.value,
    });
  
    fetch("http://localhost:8080/updateWorker", {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
      },
      body: reqbody,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.msg === 1) {
          setAlertType("alert-success");
          showErrorMessage("Updated successfully. Please log in.", 5000);
          return;
        }
        if (data.msg === 0) {
          setAlertType("alert-danger");
          return;
        }
        setAlertType("alert-danger");
      })
      .catch((error) => {
        console.error("Error:", error);
        showErrorMessage("Error", 5000);
      });
      setCancelDisabled(!cancelDisabled);
      setSubmitDisabled(!submitDisabled);
  };
  
  // console.log(JSON.stringify(worker))

  return (
    <div id="formContainer">
      <form id="vlcForm">
        <div className="container mt-5 mb-5 border border-dark rounded ">
          <div className="mt-3 mb-5 display-5 text-center">Worker PROFILE</div>

          <div className="row">
            <div className="col">
              <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="fname">First Name:</label>
               </div>
            </div>
            <div className="col">
              <div className="mb-3 border bg-light rounded p-2">
              <input type="text" id="fname" name="fname"  defaultValue={obj1.firstName} disabled={submitDisabled}
                onChange={(e)=>{handleChange("fname",e.target.value)}} onBlur={(e)=>{handleChange("fname",e.target.value)}}/>
                  <span className="error text-danger">
                  {worker.fname.touched &&
                    !worker.fname.valid &&
                    worker.fname.error}
              </span>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="mname">Middle Name:</label>
               </div>
            </div>
            <div className="col">
              <div className="mb-3 border bg-light rounded p-2">
              <input type="text" id="mname" name="mname" defaultValue={obj1.middleName} disabled={submitDisabled}
               onChange={(e)=>{handleChange("mname",e.target.value)}} onBlur={(e)=>{handleChange("mname",e.target.value)}}/> 
                          <span className="error text-danger">
                  {worker.mname.touched &&
                    !worker.mname.valid &&
                    worker.mname.error}
              </span>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="lname">Last Name:</label>
               </div>
            </div>
            <div className="col">
              <div className="mb-3 border bg-light rounded p-2">
              <input type="text" id="lname" name="lname" defaultValue={obj1.lastName} disabled={submitDisabled} 
                onChange={(e)=>{handleChange("lname",e.target.value)}} onBlur={(e)=>{handleChange("lname",e.target.value)}}/>
                  <span className="error text-danger">
                  {worker.lname.touched &&
                    !worker.lname.valid &&
                    worker.lname.error}
              </span>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="gender">Gender:</label>
               </div>
            </div>
            <div className="col">
              <div className="mb-3 border bg-light rounded p-2">
              <input type="text" id="gender" name="gender" defaultValue={obj1.gender} disabled
                onChange={(e)=>{handleChange("gender",e.target.value)}} onBlur={(e)=>{handleChange("gender",e.target.value)}}/>
                     <span className="error text-danger">
                  {worker.gender.touched &&
                    !worker.gender.valid &&
                    worker.gender.error}
              </span>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="adhar">Adhar:</label>
               </div>
            </div>
            <div className="col">
              <div className="mb-3 border bg-light rounded p-2">
              <input type="text" id="adhaar" name="adhaar" defaultValue={obj1.adhaar} disabled 
                onChange={(e)=>{handleChange("adhaar",e.target.value)}} onBlur={(e)=>{handleChange("adhaar",e.target.value)}}/>
                             <span className="error text-danger">
                  {worker.adhaar.touched &&
                    !worker.adhaar.valid &&
                    worker.adhaar.error}
              </span>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="accno">Account Number:</label>
               </div>
            </div>
            <div className="col">
              <div className="mb-3 border bg-light rounded p-2">
              <span className="error text-danger">
                  {worker.accountNumber.touched &&
                    !worker.accountNumber.valid &&
                    worker.accountNumber.error}
              </span>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="dob">Date of Birth:</label>
               </div>
            </div>
            <div className="col">
              <div className="mb-3 border bg-light rounded p-2">
              <input type="date" id="dob" name="dob" defaultValue={obj1.dateOfBirth} disabled={submitDisabled}
                onChange={(e)=>{handleDate("dob",e.target.value)}} onBlur={(e)=>{handleDate("dob",e.target.value)}}  />
              <span className="error text-danger">
                  {worker.dob.touched &&
                    !worker.dob.valid &&
                    worker.dob.error}
              </span>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="phone">Phone:</label>
               </div>
            </div>
            <div className="col">
              <div className="mb-3 border bg-light rounded p-2">
              <input type="text" id="phone" name="phone" defaultValue={obj1.phoneNumber} disabled={submitDisabled} 
                onChange={(e)=>{handleChange("phone",e.target.value)}} onBlur={(e)=>{handleChange("phone",e.target.value)}} />
              <span className="error text-danger">
                  {worker.phone.touched &&
                    !worker.phone.valid &&
                    worker.phone.error}
              </span>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="relocation">Relocation :</label>
               </div>
            </div>
            <div className="col">
              <div className="mb-3 border bg-light rounded p-2">
              <input type="text" id="relocation" name="relocation" defaultValue={obj1.relocation} disabled={submitDisabled} 
                onChange={(e)=>{handleRelocation("relocation",e.target.value)}} onBlur={(e)=>{handleRelocation("relocation",e.target.value)}} />
                     <span className="error text-danger">
                  {worker.relocation.touched &&
                    !worker.relocation.valid &&
                    worker.relocation.error}
              </span>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="active">Active :</label>
               </div>
            </div>
            <div className="col">
              <div className="mb-3 border bg-light rounded p-2">
              <input type="text" id="active" name="active" defaultValue={obj1.active} disabled={submitDisabled} 
                onChange={(e)=>{handleChange("active",e.target.value)}} onBlur={(e)=>{handleChange("active",e.target.value)}}/>
                <span className="error text-danger">
                  {worker.active.touched &&
                    !worker.active.valid &&
                    worker.active.error}
              </span>
              </div>
            </div>
          </div>

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
              <button type="button" id="editBtn" onClick={toggleDisable}>
                Edit
              </button>
              <button
                type="button"
                id="submitBtn"
                onClick={submitData}
                disabled={submitDisabled}
              >
                Submit
              </button>
              <button
                type="button"
                id="cancelBtn"
                onClick={handleReset}
                disabled={cancelDisabled}
              >
                Cancel
              </button>
            </div>
            <div className="col"></div>
          </div>


          </div>
      </form>
      {JSON.stringify(worker)}
    </div>
  );
    
}
