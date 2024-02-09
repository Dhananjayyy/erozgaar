import { useReducer,useState } from "react";

export default function ProviderRegistrationForm() {
  const init = {
    fname: { value: "", valid: false, touched: false, error: "" },
    mname: { value: "", valid: false, touched: false, error: "" },
    lname: { value: "", valid: false, touched: false, error: "" },
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

  const [provider,dispatch]=useReducer(reducer,init);
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
  function checkPasswordsMatch() {
    const password = provider.pwd.value;
    const confirmPassword = provider.cpwd.value;
    var ispwvalid = false;
    console.log(" pass " + password);
    console.log(" paas confirm" + confirmPassword);
    if ((password === confirmPassword)) {
      ispwvalid = true;
    }
    console.log("pw matched: " + ispwvalid);
    return ispwvalid;
  };
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

        case "uid":
          pattern = new RegExp("^${provider.fname.value}.${provider.lname.value}$");
        if (!pattern.test(value)) {
          valid = false;
          error = "Invalid Password";
        }
        break;

      case "pwd":
      case "cpwd":
        pattern =  /^[A-Z][a-zA-Z0-9][!@#$%^&][a-zA-Z0-9]*$/;

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
      showErrorMessage('Passwords do not match',5000)
      return;
    }
    //
    if(worker.formValid === false){
      setAlertType("alert-danger");
      showErrorMessage('Please enter valid data',5000)
      return;
    }

    fetch("http://localhost:9000/checkusernameexist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid: provider.uid.value }),
    })
      .then((response) => response.json())
      .then((data) => {
        // emailexists = data;
        // //console.log("email exist:" + JSON.stringify(typeof(data)));

        if (!data) {
          fetch("http://localhost:9000/insert", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              fname: provider.fname.value,
              mname: provider.mname.value,
              lname: provider.lname.value,
              phone: provider.phone.value,
              education: provider.education.value,
              state: provider.state.value,
              city: provider.city.value,
              address1: provider.address1.value,
              address2: provider.address2.value,
              uid: provider.uid.value,
              pwd: provider.pwd.value,
              question: provider.squestion.value,
              answer: provider.answer.value,

            }),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("insert data: " + data.registered);

              if(data.registered === true){
                setAlertType("alert-success");
                showErrorMessage("Registration successful. Please log in.",5000)
                return;
              }
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        }
        if(data){
          setAlertType("alert-info");
          showErrorMessage("Username already exists. Please log in.",5000);
          
          // console.log(document.getElementById("successalert").textContent)
          // setDisplayAlert(true)
          
          return;
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

    
  return (
    <form>
      <div className="container mt-5 mb-5 border border-dark rounded ">
        <div className="mt-3 mb-5 display-5 text-center">JOB PROVIDER REGISTRATION</div>
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
               w-25
              />
              <span className="error text-danger">{provider.fname.touched && !provider.fname.valid && provider.fname.error}</span>
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
              w-25
              />
              <span className="error text-danger">
                {provider.mname.touched && !provider.mname.valid && provider.mname.error}
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
              w-25
              />
              <span className="error text-danger">
                {provider.lname.touched && !provider.lname.valid && provider.lname.error}
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
                  className="form-select">
                  <option id="education" className="form-option" value="education1">
                    Select Education
                  </option>
                  <option id="education" className="form-option" value="education2">
                    SSC
                  </option>
                  <option id="education" className="form-option" value="education3">
                    HSC
                  </option>
                  <option id="education" className="form-option" value="education4">
                    GRADUATION
                  </option>
                </select>
              </div>
            </div>
            <div className="col">
              <div className="mb-3 border bg-light rounded p-2">
                <label htmlFor="eduidnumbercation" className="form-label">
                  Mobile Number
                </label>
                <input
                  type="number" className="form-control" id="idnumber" placeholder="9852614280" />
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
                placeholder="mark.zukerberg"
              onChange={(e) => handleChange("uid", e.target.value)}
              onBlur={(e) => handleChange("uid", e.target.value)}
              w-25
              />
              <span className="error text-danger">
                {provider.uid.touched && !provider.uid.valid && provider.uid.error}
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
              // onChange={(e) => handleChange("pwd", e.target.value)}
              // onBlur={(e) => handleChange("pwd", e.target.value)}
              />
              {/* <span className="error text-danger">
                {users.pwd.touched && !users.pwd.valid && users.pwd.error}
              </span> */}
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
              // onChange={(e) => handleChange("pwd", e.target.value)}
              // onBlur={(e) => handleChange("pwd", e.target.value)}
              />
              {/* <span className="error text-danger">
                {users.pwd.touched && !users.pwd.valid && users.pwd.error}
              </span> */}
            </div>
          </div>
        </div>

        {/* Row 3 */}
        <div className="row">
          <div className="col">
            <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="squestion" className="form-label">
                Security Question
              </label>
              <select
                className="form-select">
                <option id="squestion" className="form-option" value="question1">
                  Select Security Question
                </option>
                <option id="squestion" className="form-option" value="question2">
                  What is the name of your favorite Indian movie?
                </option>
                <option id="squestion" className="form-option" value="question3">
                  What is the name of the street you grew up on?
                </option>
                <option id="squestion" className="form-option" value="question4">
                  What is your favorite Indian dish?
                </option>
                <option id="squestion" className="form-option" value="question5">
                  What is the name of your first pet?
                </option>
                <option id="squestion" className="form-option" value="question6">
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
                placeholder="Answer... "/>
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
              // onChange={(e) => handleChange("pwd", e.target.value)}
              // onBlur={(e) => handleChange("pwd", e.target.value)}
              />
              {/* <span className="error text-danger">
                {users.pwd.touched && !users.pwd.valid && users.pwd.error}
              </span> */}
            </div>
          </div>
        </div>
        {/* Row 5 */}
        <div className="row">
          <div className="mb-3 border bg-light rounded p-2">
            <label className="form-label">
              Organization Address
            </label>
            <div className="col">
              <div className="mb-3 border bg-light rounded p-2">
                <label htmlFor="address1" className="form-label">
                </label>
                <input
                  type="textarea"
                  className="form-control"
                  id="address1"
                  placeholder="Line 1"
                // onChange={(e) => handleChange("pwd", e.target.value)}
                // onBlur={(e) => handleChange("pwd", e.target.value)}
                />
              </div>

              <div className="mb-3 border bg-light rounded p-2">
                <label htmlFor="address2" className="form-label">

                </label>
                <input
                  type="textarea"
                  className="form-control"
                  id="address2"
                  placeholder="Line 2"
                // onChange={(e) => handleChange("pwd", e.target.value)}
                // onBlur={(e) => handleChange("pwd", e.target.value)}
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
                    className="form-select">
                    <option id="idstate" className="form-option" value="option1">
                      Select State
                    </option>
                    <option id="idstate" className="form-option" value="option2">
                      Maharastra
                    </option>
                    <option id="idstate" className="form-option" value="option3">
                      Bihar
                    </option>
                    <option id="idstate" className="form-option" value="option4">
                      Kerla
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
                    className="form-select">
                    <option id="idstate" className="form-option" value="option1">
                      Select City
                    </option>
                    <option id="idstate" className="form-option" value="option2">
                      Pune
                    </option>
                    <option id="idstate" className="form-option" value="option3">
                      Patna
                    </option>
                    <option id="idstate" className="form-option" value="option4">
                      Kochi
                    </option>
                  </select>
                </div>
              </div>
            </div>

          </div>

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
