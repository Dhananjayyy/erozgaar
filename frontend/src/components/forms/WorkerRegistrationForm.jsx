import { useReducer, useState } from "react";

export default function WorkerRegistrationForm() {
  const init = {
    fname: { value: "", valid: false, touched: false, error: "" },
    mname: { value: "", valid: false, touched: false, error: "" },
    lname: { value: "", valid: false, touched: false, error: "" },
    gender: { value: "", valid: false, touched: false, error: "" },
    adhaar: { value: "", valid: false, touched: false, error: "" },
    accountNumber: { value: "", valid: false, touched: false, error: "" },
    dob: { value: 0, valid: false, touched: false, error: "" },
    phone: { value: 0, valid: false, touched: false, error: "" },
    education: { value: 0, valid: false, touched: false, error: "" },
    relocation: { value: 0, valid: false, touched: false, error: "" },
    state: { value: 0, valid: false, touched: false, error: "" },
    city: { value: 0, valid: false, touched: false, error: "" },
    address1: { value: 0, valid: false, touched: false, error: "" },
    address2: { value: 0, valid: false, touched: false, error: "" },
    uid: { value: 0, valid: false, touched: false, error: "" },
    pwd: { value: 0, valid: false, touched: false, error: "" },
    repwd: { value: 0, valid: false, touched: false, error: "" },
    question: { value: 0, valid: false, touched: false, error: "" },
    answer: { value: 0, valid: false, touched: false, error: "" },
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

  function showErrorMessage(msg, time) {
    setDisplayAlert(true);
    setErrorMsg(msg);
    if (time !== 0) {
      setTimeout(() => {
        setDisplayAlert(false);
      }, time);
    }
  }

  const handleChange = (key, value) => {
    const { valid, error } = validateData(key, value);
    let formValid = true;
    for (let k in worker) {
      if (worker[k].valid === false) {
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

  const handleDate = (key, value) => {
    let valid = true;
    let error = "";
  
 
    if (key === "dob") {
      const currentDate = new Date();
      const selectedDate = new Date(value);
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

  const handleReset = () => {
    dispatch({
      type: "reset",
    });
  };

  function checkPasswordsMatch() {
    const password = worker.pwd.value;
    const confirmPassword = worker.repwd.value;
    var ispwvalid = false;
    console.log("my pw " + password);
    console.log("my pw conf" + confirmPassword);
    if (password === confirmPassword) {
      ispwvalid = true;
    }
    console.log("pw matched: " + ispwvalid);
    return ispwvalid;
  }

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
      // case "dob":
      // pattern = /^[a-zA-Z0-9._%+-]{3,}@[a-zA-Z0-9.-]{3,}\.[a-zA-Z]{2,}$/;
      // if (!pattern.test(value)) {
      //   valid = false;
      //   error = "Invalid Email";
      // }
      // break;
      case "phone":
        pattern = /^\d{10}$/;
        if (!pattern.test(value)) {
          valid = false;
          error = "Invalid Phone Number";
        }
        break;

      case "uid":
        pattern = new RegExp(`^${worker.fname.value}.${worker.lname.value}$`);
        if (!pattern.test(value)) {
          valid = false;
          error = "Invalid username";
        }
        break;

      case "pwd":
      case "repwd":
        //pattern = /^[A-Z][a-zA-Z0-9]*[!@#$%^&*][a-zA-Z0-9]*$/;
        //regex pattern for lowercase alphabets and numbers like admin@123
        pattern = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;

        if (!pattern.test(value)) {
          valid = false;
          error = "Invalid Password";
        }
        break;

      // case "state":
      // case "city":
      case "education":
      case "relocation":
      case "question":
      case "gender":
        if (value === "0") {
          valid = false;
          error = "Please select an option";
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

      // case "address1":
      // case "address2":
      //   pattern = new RegExp("^[a-zA-Z0-9,/.]{3,}$");
      //   if (!pattern.test(value)) {
      //     valid = false;
      //     error = "Invalid Address";
      //   }
      //   break;

      default:
        console.log("default switch");
    }
    return { valid: valid, error: error };
  };

  const submitData = (e) => {
    e.preventDefault();

    const passwordsMatch = checkPasswordsMatch();

    if (!passwordsMatch) {
      setAlertType("alert-warning");
      showErrorMessage("Passwords do not match", 5000);
      return;
    }
    //
    if (worker.formValid === false) {
      setAlertType("alert-danger");
      showErrorMessage("Please enter valid data", 5000);
      return;
    }

    var reqbody = JSON.stringify({
      userName: worker.uid.value,
      password: worker.pwd.value,
      phoneNumber: worker.phone.value,
      gender: worker.gender.value,
      role: {
        roleId: 1,
      },
      active: true,
      adhaar: worker.adhaar.value,
      accountNumber: worker.accountNumber.value,
      securityQuestion: {
        securityQuestionId: worker.question.value,
      },
      answer: worker.answer.value,
      firstName: worker.fname.value,
      middleName: worker.mname.value,
      lastName: worker.lname.value,
      education: worker.education.value,
      address: {
        addressLine1: worker.address1.value,
        addressLine2: worker.address2.value,
        city: {
          cityName: worker.city.value,
          state: {
            stateName: worker.state.value,
          },
        },
        dateOfBirth: worker.dob.value,
        relocation: true,
      },
    });

    fetch("http://localhost:8080/register/worker", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: reqbody,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("return data: " + data);
        if (data === true) {
          setAlertType("alert-success");
          showErrorMessage("Registration successful. Please log in.", 5000);
          return;
        } else {
          setAlertType("alert-info");
          showErrorMessage("User already exists. Please log in.", 5000);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <form>
      <div className="container mt-5 mb-5 border border-dark rounded ">
        <div className="mt-3 mb-5 display-5 text-center">
          WORKER REGISTRATION
        </div>
        {/*  1st row*/}
        <div className="row">
          <div className="col">
            <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="idfname" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="idfname"
                placeholder="first name"
                onChange={(e) => handleChange("fname", e.target.value)}
                onBlur={(e) => handleChange("fname", e.target.value)}
              />
              <span className="error text-danger">
                <span className="error text-danger">
                  {worker.fname.touched &&
                    !worker.fname.valid &&
                    worker.fname.error}
                </span>
              </span>
            </div>
          </div>

          <div className="col">
            <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="idmname" className="form-label">
                Middle Name
              </label>
              <input
                type="text"
                className="form-control"
                id="idmname"
                placeholder="middle name"
                onChange={(e) => handleChange("mname", e.target.value)}
                onBlur={(e) => handleChange("mname", e.target.value)}
              />
              <span className="error text-danger">
                <span className="error text-danger">
                  {worker.mname.touched &&
                    !worker.mname.valid &&
                    worker.mname.error}
                </span>
              </span>
            </div>
          </div>

          <div className="col">
            <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="idlname" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="idlname"
                placeholder="last name"
                onChange={(e) => handleChange("lname", e.target.value)}
                onBlur={(e) => handleChange("lname", e.target.value)}
              />
              <span className="error text-danger">
                <span className="error text-danger">
                  {worker.lname.touched &&
                    !worker.lname.valid &&
                    worker.lname.error}
                </span>
              </span>
            </div>
          </div>

          <div className="col-md-2">
            <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="idgender" className="form-label">
                Gender
              </label>
              <select
                className="form-select"
                onChange={(e) => handleChange("gender", e.target.value)}
                onBlur={(e) => handleChange("gender", e.target.value)}
              >
                <option value="0">Choose</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <span className="error text-danger">
                <span className="error text-danger">
                  {worker.gender.touched &&
                    !worker.gender.valid &&
                    worker.gender.error}
                </span>
              </span>
            </div>
          </div>
        </div>

        <hr />

        {/* 2nd row*/}
        <div className="row">
          <div className="col">
            <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="pwd" className="form-label">
                Date of Birth
              </label>
              <input
                type="date"
                className="form-control"
                id="dob"
                onChange={(e) => handleDate("dob", e.target.value)}
                onBlur={(e) => handleDate("dob", e.target.value)}
              />
              <span className="error text-danger">
                <span className="error text-danger">
                  {worker.dob.touched && !worker.dob.valid && worker.dob.error}
                </span>
              </span>
            </div>
          </div>

          <div className="col">
            <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="pwd" className="form-label">
                Mobile Number
              </label>
              <input
                type="tel"
                className="form-control"
                id="telno"
                placeholder="Enter your password"
                maxLength={10}
                onChange={(e) => handleChange("phone", e.target.value)}
                onBlur={(e) => handleChange("phone", e.target.value)}
              />
              <span className="error text-danger">
                <span className="error text-danger">
                  {worker.phone.touched &&
                    !worker.phone.valid &&
                    worker.phone.error}
                </span>
              </span>
            </div>
          </div>

          <div className="col">
            <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="pwd" className="form-label">
                Education
              </label>
              <select
                className="form-select"
                onChange={(e) => handleChange("education", e.target.value)}
                onBlur={(e) => handleChange("education", e.target.value)}
              >
                <option value="0">Choose</option>
                <option value="X">X</option>
                <option value="XII">XII</option>
                <option value="Graduation">Graduation</option>
                <option value="Other">Other</option>
              </select>
              <span className="error text-danger">
                <span className="error text-danger">
                  {worker.education.touched &&
                    !worker.education.valid &&
                    worker.education.error}
                </span>
              </span>
            </div>
          </div>

          <div className="col">
            <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="pwd" className="form-label">
                Open to Relocation
              </label>
              <select
                className="form-select"
                onChange={(e) => handleChange("relocation", e.target.value)}
                onBlur={(e) => handleChange("relocation", e.target.value)}
              >
                <option value="0">Choose</option>
                <option value="1">Yes</option>
                <option value="2">No</option>
              </select>
              <span className="error text-danger">
                <span className="error text-danger">
                  {worker.relocation.touched &&
                    !worker.relocation.valid &&
                    worker.relocation.error}
                </span>
              </span>
            </div>
          </div>
        </div>

        <hr />

        {/* 3rd row */}
        <div className="row">
          <div className="col">
            <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="pwd" className="form-label">
                State
              </label>
              <input
                type="text"
                className="form-control"
                id="sid"
                placeholder="Enter your state"
                onChange={(e) => handleChange("state", e.target.value)}
                onBlur={(e) => handleChange("state", e.target.value)}
              />
              <span className="error text-danger">
                <span className="error text-danger">
                  {worker.state.touched &&
                    !worker.state.valid &&
                    worker.state.error}
                </span>
              </span>
            </div>
          </div>

          <div className="col">
            <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="pwd" className="form-label">
                City
              </label>
              <input
                type="text"
                className="form-control"
                id="cid"
                placeholder="Enter your city"
                onChange={(e) => handleChange("city", e.target.value)}
                onBlur={(e) => handleChange("city", e.target.value)}
              />
              <span className="error text-danger">
                <span className="error text-danger">
                  {worker.city.touched &&
                    !worker.city.valid &&
                    worker.city.error}
                </span>
              </span>
            </div>
          </div>

          <div className="col">
            <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="pwd" className="form-label">
                Address Line1
              </label>
              <input
                type="text"
                className="form-control"
                id="add1"
                placeholder="Enter house number and name"
                onChange={(e) => handleChange("address1", e.target.value)}
                onBlur={(e) => handleChange("address1", e.target.value)}
              />
              <span className="error text-danger">
                <span className="error text-danger">
                  {worker.address1.touched &&
                    !worker.address1.valid &&
                    worker.address1.error}
                </span>
              </span>
            </div>
          </div>

          <div className="col">
            <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="pwd" className="form-label">
                Address Line2
              </label>
              <input
                type="text"
                className="form-control"
                id="add2"
                placeholder="Enter your area"
                onChange={(e) => handleChange("address2", e.target.value)}
                onBlur={(e) => handleChange("address2", e.target.value)}
              />
              <span className="error text-danger">
                <span className="error text-danger">
                  {worker.address1.touched &&
                    !worker.address2.valid &&
                    worker.address2.error}
                </span>
              </span>
            </div>
          </div>
        </div>

        <hr />

        {/* 4th row */}

        <div className="row">
          <div className="col">
            <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="uid" className="form-label">
                Adhaar Number
              </label>
              <input
                type="text"
                className="form-control"
                id="adhaar"
                placeholder="Enter your username"
                onChange={(e) => handleChange("adhaar", e.target.value)}
                onBlur={(e) => handleChange("adhaar", e.target.value)}
              />
              <span className="error text-danger">
                <span className="error text-danger">
                  {worker.adhaar.touched &&
                    !worker.adhaar.valid &&
                    worker.adhaar.error}
                </span>
              </span>
            </div>
          </div>

          <div className="col">
            <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="pwd" className="form-label">
                Account Number
              </label>
              <input
                type="password"
                className="form-control"
                id="accountNumber"
                placeholder="Enter your Answer"
                onChange={(e) => handleChange("accountNumber", e.target.value)}
                onBlur={(e) => handleChange("accountNumber", e.target.value)}
              />
              <span className="error text-danger">
                <span className="error text-danger">
                  {worker.accountNumber.touched &&
                    !worker.accountNumber.valid &&
                    worker.accountNumber.error}
                </span>
              </span>
            </div>
          </div>
        </div>

        <hr />

        {/* 5th row */}

        <div className="row">
          <div className="col">
            <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="uid" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="uid"
                placeholder="Enter your username"
                onChange={(e) => handleChange("uid", e.target.value)}
                onBlur={(e) => handleChange("uid", e.target.value)}
              />
              <span className="error text-danger">
                <span className="error text-danger">
                  {worker.uid.touched && !worker.uid.valid && worker.uid.error}
                </span>
              </span>
            </div>
          </div>

          <div className="col">
            <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="pwd" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="pwd"
                placeholder="Enter your password"
                onChange={(e) => handleChange("pwd", e.target.value)}
                onBlur={(e) => handleChange("pwd", e.target.value)}
              />
              <span className="error text-danger">
                <span className="error text-danger">
                  {worker.pwd.touched && !worker.pwd.valid && worker.pwd.error}
                </span>
              </span>
            </div>
          </div>

          <div className="col">
            <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="repwd" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="repwd"
                placeholder="Confirm your password"
                onChange={(e) => handleChange("repwd", e.target.value)}
                onBlur={(e) => handleChange("repwd", e.target.value)}
              />
              <span className="error text-danger">
                <span className="error text-danger">
                  {worker.repwd.touched &&
                    !worker.repwd.valid &&
                    worker.repwd.error}
                </span>
              </span>
            </div>
          </div>

          <div className="col">
            <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="pwd" className="form-label">
                Security Question
              </label>
              <select
                className="form-select"
                onChange={(e) => handleChange("question", e.target.value)}
                onBlur={(e) => handleChange("question", e.target.value)}
              >
                <option value="0">Choose</option>
                <option value="1">
                  What is the name of your favorite Indian movie?
                </option>
                <option value="2">
                  What is the name of the street you grew up on?
                </option>
                <option value="3">What is your favorite Indian dish?</option>
                <option value="4">What is the name of your first pet?</option>
                <option value="5">
                  What is the name of the school you attended in the 10th grade?
                </option>
              </select>
              <span className="error text-danger">
                <span className="error text-danger">
                  {worker.question.touched &&
                    !worker.question.valid &&
                    worker.question.error}
                </span>
              </span>
            </div>
          </div>

          <div className="col">
            <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="pwd" className="form-label">
                Answer
              </label>
              <input
                type="password"
                className="form-control"
                id="add2"
                placeholder="Enter your Answer"
                onChange={(e) => handleChange("answer", e.target.value)}
                onBlur={(e) => handleChange("answer", e.target.value)}
              />
              <span className="error text-danger">
                <span className="error text-danger">
                  {worker.answer.touched &&
                    !worker.answer.valid &&
                    worker.answer.error}
                </span>
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

        {/* 7th row */}
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
              Register
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

        {/* {JSON.stringify(worker) + ""} */}
      </div>
    </form>
  );
}