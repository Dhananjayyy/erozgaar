import { useReducer, useState } from "react";

export default function ProviderRegistrationForm() {
  const init = {
    fname: { value: "", valid: false, touched: false, error: "" },
    mname: { value: "", valid: false, touched: false, error: "" },
    lname: { value: "", valid: false, touched: false, error: "" },
    phone: { value: 0, valid: false, touched: false, error: "" },
    aadhar: { value: 0, valid: false, touched: false, error: "" },
    gender: { value: 0, valid: false, touched: false, error: "" },
    education: { value: "", valid: false, touched: false, error: "" },
    state: { value: "", valid: false, touched: false, error: "" },
    city: { value: "", valid: false, touched: false, error: "" },
    address1: { value: "", valid: false, touched: false, error: "" },
    address2: { value: "", valid: false, touched: false, error: "" },
    username: { value: "", valid: false, touched: false, error: "" },
    pwd: { value: "", valid: false, touched: false, error: "" },
    cpwd: { value: "", valid: false, touched: false, error: "" },
    question: { value: 0, valid: false, touched: false, error: "" },
    answer: { value: "", valid: false, touched: false, error: "" },
    organization: { value: "", valid: false, touched: false, error: "" },
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

  const [provider, dispatch] = useReducer(reducer, init);
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
    for (let k in provider) {
      if (provider[k].valid === false) {
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
    const password = provider.pwd.value;
    const confirmPassword = provider.cpwd.value;
    var ispwvalid = false;
    console.log(" pass " + password);
    console.log(" paas confirm" + confirmPassword);
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
        var pattern = new RegExp("^[A-Z][a-z]+$");
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

      case "aadhar":
        pattern = /^\d{12}$/;
        if (!pattern.test(value)) {
          valid = false;
          error = "Invalid Aadhar Number";
        }
        break;

      case "username":
        pattern = new RegExp(
          `^${provider.fname.value}\\.${provider.lname.value}$`
        );
        if (!pattern.test(value)) {
          valid = false;
          error = "Invalid username";
        }
        break;

      case "gender":
      case "education":
      case "state":
      case "city":
      case "address1":
      case "address2":
      case "question":
        valid = true;
        break;

      case "pwd":
      case "cpwd":
        pattern = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;

        if (!pattern.test(value)) {
          valid = false;
          error = "Invalid Password";
        }
        break;

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
    if (provider.formValid === false) {
      setAlertType("alert-danger");
      showErrorMessage("Please enter valid data", 5000);
      return;
    }

    console.log(provider.username.value)

    var reqbody = JSON.stringify({
      userName: provider.username.value,
      password: provider.pwd.value,
      phoneNumber: provider.phone.value,
      gender: provider.gender.value,
      role: {
        roleId: 2,
      },
      active: true,
      adhaar: provider.aadhar.value,
      securityQuestion: {
        securityQuestionId: provider.question.value,
      },
      answer: provider.answer.value,
      firstName: provider.fname.value,
      middleName: provider.mname.value,
      accountNumber : "None",
      lastName: provider.lname.value,
      education: provider.education.value,
      address: {
        addressLine1: provider.address1.value,
        addressLine2: provider.address2.value,
        city: {
          cityName: provider.city.value,
          state: {
            stateName: provider.state.value,
          },
        },
        organization: provider.organization.value,
      },
    });

  

    console.log(reqbody);

    fetch("http://localhost:8080/register/provider", {
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
          JOB PROVIDER REGISTRATION
        </div>
        {/* Row 1 */}
        <div className="row">
          <div className="col">
            <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="fname" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="fname"
                placeholder="Mark"
                onChange={(e) => handleChange("fname", e.target.value)}
                onBlur={(e) => handleChange("fname", e.target.value)}
                
              />
              <span className="error text-danger">
                {provider.fname.touched &&
                  !provider.fname.valid &&
                  provider.fname.error}
              </span>
            </div>

            <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="mname" className="form-label">
                Middle Name
              </label>
              <input
                type="text"
                className="form-control"
                id="mname"
                placeholder="Elliot"
                onChange={(e) => handleChange("mname", e.target.value)}
                onBlur={(e) => handleChange("mname", e.target.value)}
                
              />
              <span className="error text-danger">
                {provider.mname.touched &&
                  !provider.mname.valid &&
                  provider.mname.error}
              </span>
            </div>
            <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="lname" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="lname"
                placeholder="Zuckerberg"
                onChange={(e) => handleChange("lname", e.target.value)}
                onBlur={(e) => handleChange("lname", e.target.value)}
                
              />
              <span className="error text-danger">
                {provider.lname.touched &&
                  !provider.lname.valid &&
                  provider.lname.error}
              </span>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="mb-3 border bg-light rounded p-2">
                <label htmlFor="education" className="form-label">
                  Education
                </label>
                <select
                  className="form-select"
                  onChange={(e) => handleChange("education", e.target.value)}
                  onBlur={(e) => handleChange("education", e.target.value)}
                >
                  <option
                    id="education"
                    className="form-option"
                    value="education1"
                  >
                    Select Education
                  </option>
                  <option
                    id="education"
                    className="form-option"
                    value="Basic schooling"
                  >
                    Basic schooling
                  </option>
                  <option
                    id="education"
                    className="form-option"
                    value="Diploma"
                  >
                    Diploma
                  </option>
                  <option
                    id="education"
                    className="form-option"
                    value="Graduation"
                  >
                    Graduation
                  </option>
                </select>
              </div>
            </div>
            <div className="col">
              <div className="mb-3 border bg-light rounded p-2">
                <label
                  htmlFor="eduidnumbercation"
                  id="idnumber"
                  className="form-label"
                >
                  Mobile Number
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="idnumber"
                  placeholder="9852614280"
                  onChange={(e) => handleChange("phone", e.target.value)}
                  onBlur={(e) => handleChange("phone", e.target.value)}
                />
                <span className="error text-danger">
                  {provider.phone.touched &&
                    !provider.phone.valid &&
                    provider.phone.error}
                </span>
              </div>
            </div>
            <div className="col">
              <div className="mb-3 border bg-light rounded p-2">
                <label
                  htmlFor="eduidnumbercation"
                  id="idaadhar"
                  className="form-label"
                >
                  Aadhar Number
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="idaadhar"
                  maxLength={12}
                  placeholder="825462315284"
                  onChange={(e) => handleChange("aadhar", e.target.value)}
                  onBlur={(e) => handleChange("aadhar", e.target.value)}
                />
                <span className="error text-danger">
                  {provider.aadhar.touched &&
                    !provider.aadhar.valid &&
                    provider.aadhar.error}
                </span>
              </div>
            </div>
            <div className="col">
              <div className="mb-3 border bg-light rounded p-2">
                <label
                  htmlFor="eduidnumbercation"
                  id="idgender"
                  className="form-label"
                >
                  Gender
                </label>
                <select
                  className="form-select"
                  onChange={(e) => handleChange("gender", e.target.value)}
                  onBlur={(e) => handleChange("gender", e.target.value)}
                >
                  <option id="idgender" className="form-option" value="">
                    Select Gender
                  </option>
                  <option id="idgender" className="form-option" value="Male">
                    Male
                  </option>
                  <option id="idgender" className="form-option" value="Female">
                    Female
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
        {/* Row 2 */}
        <div className="row">
          <div className="col">
            <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="iduname" className="form-label">
                User Name
              </label>
              <input
                type="text"
                className="form-control"
                id="iduname"
                placeholder="Mark.Zukerberg"
                onChange={(e) => handleChange("username", e.target.value)}
                onBlur={(e) => handleChange("username", e.target.value)}
                
              />
              <span className="error text-danger">
                {provider.username.touched &&
                  !provider.username.valid &&
                  provider.username.error}
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
                {provider.pwd.touched &&
                  !provider.pwd.valid &&
                  provider.pwd.error}
              </span>
            </div>
          </div>
          <div className="col">
            <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="cpwd" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="cpwd"
                placeholder="Confirm password"
                onChange={(e) => handleChange("cpwd", e.target.value)}
                onBlur={(e) => handleChange("cpwd", e.target.value)}
              />
              <span className="error text-danger">
                {provider.cpwd.touched &&
                  !provider.cpwd.valid &&
                  provider.cpwd.error}
              </span>
            </div>
          </div>
        </div>

        {/* Row 3 */}
        <div className="row">
          <div className="col">
            <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="question" className="form-label">
                Security Question
              </label>
              <select
                className="form-select"
                onChange={(e) => handleChange("question", e.target.value)}
                onBlur={(e) => handleChange("question", e.target.value)}
              >
                <option value="" >
                  Select Security Question
                </option>
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
            </div>
          </div>
          <div className="col">
            <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="sanswer" className="form-label">
                Answer
              </label>
              <input
                type="text"
                className="form-control"
                id="sanswer"
                placeholder="Answer... "
                onChange={(e) => handleChange("answer", e.target.value)}
                onBlur={(e) => handleChange("answer", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Row 4 */}
        <div className="row">
          <div className="col">
            <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="cpwd" className="form-label">
                Organization Name
              </label>
              <input
                type="name"
                className="form-control"
                id="oname"
                placeholder="Organization Name"
                onChange={(e) => handleChange("organization", e.target.value)}
                onBlur={(e) => handleChange("organization", e.target.value)}
              />
              <span className="error text-danger">
                {provider.organization.touched &&
                  !provider.organization.valid &&
                  provider.organization.error}
              </span>
            </div>
          </div>
        </div>
        {/* Row 5 */}
        <div className="row">
          <div className="mb-3 border bg-light rounded p-2">
            <label className="form-label">Address</label>
            <div className="col">
              <div className="mb-3 border bg-light rounded p-2">
                <label htmlFor="address1" className="form-label"></label>
                <input
                  type="textarea"
                  className="form-control"
                  id="address1"
                  placeholder="Line 1"
                  onChange={(e) => handleChange("address1", e.target.value)}
                  onBlur={(e) => handleChange("address2", e.target.value)}
                />
              </div>

              <div className="mb-3 border bg-light rounded p-2">
                <label htmlFor="address2" className="form-label"></label>
                <input
                  type="textarea"
                  className="form-control"
                  id="address2"
                  placeholder="Line 2"
                  onChange={(e) => handleChange("address2", e.target.value)}
                  onBlur={(e) => handleChange("address2", e.target.value)}
                />
                {/* <span className="error text-danger">
                {users.pwd.touched && !users.pwd.valid && users.pwd.error}
                </span> */}
              </div>
              {/* <span className="error text-danger">
                {users.pwd.touched && !users.pwd.valid && users.pwd.error}
              </span> */}
            </div>
            <div className="row">
              <div className="col">
                <div className="mb-3 border bg-light rounded p-2">
                  <label htmlFor="address2" className="form-label">
                    State
                  </label>
                  <select
                    className="form-select"
                    onChange={(e) => handleChange("state", e.target.value)}
                    onBlur={(e) => handleChange("state", e.target.value)}
                  >
                    <option id="idstate" className="form-option" value="">
                      Select State
                    </option>
                    <option
                      id="idstate"
                      className="form-option"
                      value="Maharastra"
                    >
                      Maharastra
                    </option>
                    <option id="idstate" className="form-option" value="Bihar">
                      Bihar
                    </option>
                    <option id="idstate" className="form-option" value="Kerala">
                      Kerala
                    </option>
                  </select>
                </div>
              </div>
              <div className="col">
                <div className="mb-3 border bg-light rounded p-2">
                  <label htmlFor="address2" className="form-label">
                    City
                  </label>
                  <select
                    className="form-select"
                    onChange={(e) => handleChange("city", e.target.value)}
                    onBlur={(e) => handleChange("city", e.target.value)}
                  >
                    <option id="idcity" className="form-option" value="">
                      Select City
                    </option>
                    <option id="idcity" className="form-option" value="Pune">
                      Pune
                    </option>
                    <option id="idcity" className="form-option" value="Patna">
                      Patna
                    </option>
                    <option id="idcity" className="form-option" value="Kochi">
                      Kochi
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col"></div>
          <div
            className={`col alert text-center d-flex justify-content-center ${alertType} p-2 w-75 ${
              displayAlert ? "d-block" : "d-none"
            }`}
            role="alert"
          >
            {errorMsg}
          </div>

          <div className="col"></div>
        </div>
        <div className="row">
          <div className="row text-center m-3">
            <div className="col "></div>
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
        </div>
      </div>

      {/* {JSON.stringify(provider) + ""} */}
    </form>
  );
}