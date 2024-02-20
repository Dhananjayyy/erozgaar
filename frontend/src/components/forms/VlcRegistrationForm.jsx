import { useReducer, useState } from "react";

export default function VlcRegistrationForm() {
  const init = {
    fname: { value: "", valid: false, touched: false, error: "" },
    mname: { value: "", valid: false, touched: false, error: "" },
    lname: { value: "", valid: false, touched: false, error: "" },
    gender: { value: "", valid: false, touched: false, error: "" },
    adhaar: { value: "", valid: false, touched: false, error: "" },
    accountNumber: { value: "", valid: false, touched: false, error: "" },
    phone: { value: 0, valid: false, touched: false, error: "" },
    education: { value: 0, valid: false, touched: false, error: "" },
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

  const [vlc, dispatch] = useReducer(reducer, init);
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
    for (let k in vlc) {
      if (vlc[k].valid === false) {
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
    const password = vlc.pwd.value;
    const confirmPassword = vlc.repwd.value;
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

      case "phone":
        pattern = /^\d{10}$/;
        if (!pattern.test(value)) {
          valid = false;
          error = "Invalid Phone Number";
        }
        break;

      case "uid":
        pattern = new RegExp(`^${vlc.fname.value}.${vlc.lname.value}$`);
        if (!pattern.test(value)) {
          valid = false;
          error = "Invalid username";
        }
        break;

      case "pwd":
      case "repwd":
        //pattern = /^[A-Z][a-zA-Z0-9]*[!@#$%^&*][a-zA-Z0-9]*$/;
        //regex pattern for lowercase alphabets and numbers like admin@123
        pattern = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/;

        if (!pattern.test(value)) {
          valid = false;
          error = "Invalid Password";
        }
        break;

      case "state":
      case "city":
      case "education":
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
    if (vlc.formValid === false) {
      setAlertType("alert-danger");
      showErrorMessage("Please enter valid data", 5000);
      return;
    }

    var reqbody = JSON.stringify({
      userName: vlc.uid.value,
      password: vlc.pwd.value,
      phoneNumber: vlc.phone.value,
      gender: vlc.gender.value,
      role: {
        roleId: 3,
      },
      active: true,
      adhaar: vlc.adhaar.value,
      accountNumber: vlc.accountNumber.value,
      securityQuestion: {
        securityQuestionId: vlc.question.value,
      },
      answer: vlc.answer.value,
      firstName: vlc.fname.value,
      middleName: vlc.mname.value,
      lastName: vlc.lname.value,
      education: vlc.education.value,
      address: {
        addressLine1: vlc.address1.value,
        addressLine2: vlc.address2.value,
        city: {
          id: vlc.city.value,
        },
      },
    });

    

    fetch("http://localhost:8080/regVlc", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: reqbody,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("return data: " + JSON.stringify(data));
        if (data.msg === "success") {
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
        <div className="mt-3 mb-5 display-5 text-center">Add VLC</div>
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
                  {vlc.fname.touched && !vlc.fname.valid && vlc.fname.error}
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
                  {vlc.mname.touched && !vlc.mname.valid && vlc.mname.error}
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
                  {vlc.lname.touched && !vlc.lname.valid && vlc.lname.error}
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
                  {vlc.gender.touched && !vlc.gender.valid && vlc.gender.error}
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
                  {vlc.phone.touched && !vlc.phone.valid && vlc.phone.error}
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
                  {vlc.education.touched &&
                    !vlc.education.valid &&
                    vlc.education.error}
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
              <label htmlFor="state" className="form-label">
                State
              </label>
              <select
                className="form-select"
                onChange={(e) => handleChange("state", e.target.value)}
                onBlur={(e) => handleChange("state", e.target.value)}
              >
                <option id="state" className="form-option" value="0">
                  Select State
                </option>
                <option id="state" className="form-option" value="14">
                  Maharashtra
                </option>
                <option id="state" className="form-option" value="20">
                  Punjab
                </option>
                <option id="state" className="form-option" value="7">
                  Gujarat
                </option>
              </select>
              <span className="error text-danger">
                {vlc.state.touched && !vlc.state.valid && vlc.state.error}
              </span>
            </div>
          </div>

          <div className="col">
            <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="city" className="form-label">
                City
              </label>
              <select
                className="form-select"
                onChange={(e) => handleChange("city", e.target.value)}
                onBlur={(e) => handleChange("city", e.target.value)}
              >
                <option id="0" className="form-option" value="0">
                  Select City
                </option>
                <option id="city" className="form-option" value="8">
                  Pune
                </option>
                <option id="city" className="form-option" value="5">
                  Amritsar
                </option>
                {/* <option id="city" className="form-option" value="7">
                  Surat
                </option> */}
              </select>
              <span className="error text-danger">
                {vlc.city.touched && !vlc.city.valid && vlc.city.error}
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
                  {vlc.address1.touched &&
                    !vlc.address1.valid &&
                    vlc.address1.error}
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
                  {vlc.address1.touched &&
                    !vlc.address2.valid &&
                    vlc.address2.error}
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
                type="tel"
                className="form-control"
                id="adhaar"
                placeholder="Enter your username"
                onChange={(e) => handleChange("adhaar", e.target.value)}
                onBlur={(e) => handleChange("adhaar", e.target.value)}
                maxLength={12}
              />
              <span className="error text-danger">
                <span className="error text-danger">
                  {vlc.adhaar.touched && !vlc.adhaar.valid && vlc.adhaar.error}
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
                type="tel"
                className="form-control"
                id="accountNumber"
                placeholder="Enter your Answer"
                onChange={(e) => handleChange("accountNumber", e.target.value)}
                onBlur={(e) => handleChange("accountNumber", e.target.value)}
                maxLength={10}
              />
              <span className="error text-danger">
                <span className="error text-danger">
                  {vlc.accountNumber.touched &&
                    !vlc.accountNumber.valid &&
                    vlc.accountNumber.error}
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
                  {vlc.uid.touched && !vlc.uid.valid && vlc.uid.error}
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
                  {vlc.pwd.touched && !vlc.pwd.valid && vlc.pwd.error}
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
                  {vlc.repwd.touched && !vlc.repwd.valid && vlc.repwd.error}
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
                  {vlc.question.touched &&
                    !vlc.question.valid &&
                    vlc.question.error}
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
                  {vlc.answer.touched && !vlc.answer.valid && vlc.answer.error}
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

        {/* {JSON.stringify(vlc) + ""} */}
      </div>
    </form>
  );
}
