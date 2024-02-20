import { useEffect, useReducer, useState } from "react";

export default function ProviderUpdate() {
  const data = JSON.parse(localStorage.getItem("loggedUser"));

  const init = {
    fname: { value: "", valid: false, touched: false, error: "" },
    mname: { value: "", valid: false, touched: false, error: "" },
    lname: { value: "", valid: false, touched: false, error: "" },
    accountNumber: { value: "", valid: false, touched: false, error: "" },
    phone: { value: 0, valid: false, touched: false, error: "" },
    // relocation: { value: 0, valid: false, touched: false, error: "" },
    // education: { value: 0, valid: false, touched: false, error: "" },
    // state: { value: 0, valid: false, touched: false, error: "" },
    // city: { value: 0, valid: false, touched: false, error: "" },
    // address1: { value: 0, valid: false, touched: false, error: "" },
    // address2: { value: 0, valid: false, touched: false, error: "" },
    // uid: { value: 0, valid: false, touched: false, error: "" },
    // pwd: { value: 0, valid: false, touched: false, error: "" },
    // repwd: { value: 0, valid: false, touched: false, error: "" },
    // question: { value: 0, valid: false, touched: false, error: "" },
    // answer: { value: 0, valid: false, touched: false, error: "" },
    // preference: { value: 0, valid: false, touched: false, error: "" },
    // workerid: { value: 0, valid: false, touched: false, error: "" },
    // active: { value: 0, valid: false, touched: false, error: "" },
    // adhaar: { value: "", valid: false, touched: false, error: "" },
    // dob: { value: 0, valid: false, touched: false, error: "" },
    // gender: { value: "", valid: false, touched: false, error: "" },


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

  const [jobprovider, dispatch] = useReducer(reducer, init);
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
    fetch("http://localhost:8080/getuserproviderbyid?uid=" + data.id
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
        initializeProviderState(data);

      });
  },[] );

  const initializeProviderState = (data) => {
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
          key: "phone",
          val: data.phoneNumber,
          touched: true,
          valid: true,
          error: "",
        },
      });

      const handleReset = () => {
        setCancelDisabled(!cancelDisabled);
        setSubmitDisabled(!submitDisabled);
        dispatch({
          type: "reset",
        });
      };
      const handleChange = (key, value) => {
        const { valid, error } = validateData(key, value);
      
        const jobprovider = {
          ...jobprovider,
          [key]: {
            ...jobprovider[key],
            value: value,
            touched: true,
            valid: valid,
            error: error,
          },
        };

        let formValid = true;
        for (let k in jobprovider) {
          if (jobprovider[k].valid === false) {
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
              case "oorganizationnamer":
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

    if (jobprovider.formValid === false) {
        setAlertType("alert-danger");
        return;
      }

      var reqbody = JSON.stringify({
        userId:data.id,
        userName: obj1.userName.value,
        password: obj1.password.value,
        phoneNumber: jobprovider.phone.value,
        gender: jobprovider.gender.value,
        role: {
          roleId: 1,
        },
        active: jobprovider.active.value,
        adhaar: jobprovider.adhaar.value,
        accountNumber: jobprovider.accountNumber.value,
        securityQuestion: {
          securityQuestionId: obj1.question,
        },
        answer: obj1.answer.value,
        jobproviderId:obj1.jobproviderid,
        firstName: jobprovider.fname.value,
        middleName: jobprovider.mname.value,
        lastName: jobprovider.lname.value,
        education: obj1.education.value,
        organization: jobprovider.organizationname.value,
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
       
      });

      fetch("http://localhost:8080/updateProvider", {
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

  return (
    <div id="formContainer">
      <form id="workerForm">
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="fname">First Name:</label>
              </td>
              <td>
                <input type="text" id="fname" name="fname"  defaultValue={obj1.firstName} disabled={submitDisabled}
                onChange={(e)=>{handleChange("fname",e.target.value)}} onBlur={(e)=>{handleChange("fname",e.target.value)}}/>
              </td>
              <span className="error text-danger">
                  {jobprovider.fname.touched &&
                    !jobprovider.fname.valid &&
                    jobprovider.fname.error}
              </span>
            </tr>
            <tr>
              <td>
                <label htmlFor="mname">Middle Name:</label>
              </td>
              <td>
                <input type="text" id="mname" name="mname" defaultValue={obj1.middleName} disabled={submitDisabled}
               onChange={(e)=>{handleChange("mname",e.target.value)}} onBlur={(e)=>{handleChange("mname",e.target.value)}}/>          
              </td>
              <span className="error text-danger">
                  {jobprovider.mname.touched &&
                    !jobprovider.mname.valid &&
                    jobprovider.mname.error}
              </span>
            </tr>
            <tr>
              <td>
                <label htmlFor="lname">Last Name:</label>
              </td>
              <td>
                <input type="text" id="lname" name="lname" defaultValue={obj1.lastName} disabled={submitDisabled} 
                onChange={(e)=>{handleChange("lname",e.target.value)}} onBlur={(e)=>{handleChange("lname",e.target.value)}}/>
              </td>
              <span className="error text-danger">
                  {jobprovider.lname.touched &&
                    !jobprovider.lname.valid &&
                    jobprovider.lname.error}
              </span>
            </tr>
            {/* <tr>
              <td>
                <label htmlFor="gender">Gender:</label>
              </td>
              <td>
                <input type="text" id="gender" name="gender" defaultValue={obj1.gender} disabled
                onChange={(e)=>{handleChange("gender",e.target.value)}} onBlur={(e)=>{handleChange("gender",e.target.value)}}/>
              </td>
              <span className="error text-danger">
                  {worker.gender.touched &&
                    !worker.gender.valid &&
                    worker.gender.error}
              </span>
            </tr> */}
            {/* <tr>
              <td>
                <label htmlFor="adhar">Adhar:</label>
              </td>
              <td>
                <input type="text" id="adhaar" name="adhaar" defaultValue={obj1.adhaar} disabled 
                onChange={(e)=>{handleChange("adhaar",e.target.value)}} onBlur={(e)=>{handleChange("adhaar",e.target.value)}}/>
              </td>
              <span className="error text-danger">
                  {worker.adhaar.touched &&
                    !worker.adhaar.valid &&
                    worker.adhaar.error}
              </span>
            </tr> */}
            <tr>
              <td>
                <label htmlFor="accno">Account Number:</label>
              </td>
              <td>
                <input type="text" id="accountNumber" name="accountNumber" defaultValue={obj1.accountNumber} disabled={submitDisabled}
                onChange={(e)=>{handleChange("accountNumber",e.target.value)}} onBlur={(e)=>{handleChange("accountNumber",e.target.value)}} />
              </td>
              <span className="error text-danger">
                  {jobprovider.accountNumber.touched &&
                    !jobprovider.accountNumber.valid &&
                    jobprovider.accountNumber.error}
              </span>
            </tr>
            {/* <tr>
              <td>
                <label htmlFor="dob">Date of Birth:</label>
              </td>
              <td>
                <input type="date" id="dob" name="dob" defaultValue={obj1.dateOfBirth} disabled={submitDisabled}
                onChange={(e)=>{handleDate("dob",e.target.value)}} onBlur={(e)=>{handleDate("dob",e.target.value)}}  />
              </td>
              <span className="error text-danger">
                  {worker.dob.touched &&
                    !worker.dob.valid &&
                    worker.dob.error}
              </span>
            </tr> */}
            <tr>
              <td>
                <label htmlFor="phone">Phone:</label>
              </td>
              <td>
                <input type="text" id="phone" name="phone" defaultValue={obj1.phoneNumber} disabled={submitDisabled} 
                onChange={(e)=>{handleChange("phone",e.target.value)}} onBlur={(e)=>{handleChange("phone",e.target.value)}} />
              </td>
              <span className="error text-danger">
                  {jobprovider.phone.touched &&
                    !jobprovider.phone.valid &&
                    jobprovider.phone.error}
              </span>
            </tr>

            <tr>
              <td>
                <label htmlFor="organizationname">Organization Name:</label>
              </td>
              <td>
                <input type="text" id="organizationname" name="organizationname" defaultValue={obj1.organization} disabled={submitDisabled}
               onChange={(e)=>{handleChange("organizationname",e.target.value)}} onBlur={(e)=>{handleChange("organizationname",e.target.value)}}/>          
              </td>
              <span className="error text-danger">
                  {jobprovider.organizationname.touched &&
                    !jobprovider.organizationname.valid &&
                    jobprovider.organizationname.error}
              </span>
            </tr>
            {/* <tr>
              <td>
                <label htmlFor="education">Education:</label>
              </td>
              <td>
                <input type="text" id="education" name="education" defaultValue={obj1.education} disabled={submitDisabled} 
                onChange={(e)=>{handleChange("education",e.target.value)}} onBlur={(e)=>{handleChange("education",e.target.value)}} />
              </td>
              <span className="error text-danger">
                  {worker.education.touched &&
                    !worker.education.valid &&
                    worker.education.error}
              </span>
            </tr> */}
            {/* <tr>
              <td>
                <label htmlFor="relocation">Relocation :</label>
              </td>
              <td>
                <input type="text" id="relocation" name="relocation" defaultValue={obj1.relocation} disabled={submitDisabled} 
                onChange={(e)=>{handleRelocation("relocation",e.target.value)}} onBlur={(e)=>{handleRelocation("relocation",e.target.value)}} />
              </td>
              <span className="error text-danger">
                  {worker.relocation.touched &&
                    !worker.relocation.valid &&
                    worker.relocation.error}
              </span>
            </tr> */}
            
            <tr>
              <td>
                <label htmlFor="active">Active :</label>
              </td>
              <td>
                <input type="text" id="active" name="active" defaultValue={obj1.active} disabled={submitDisabled} 
                onChange={(e)=>{handleChange("active",e.target.value)}} onBlur={(e)=>{handleChange("active",e.target.value)}}/>
              </td>
              <span className="error text-danger">
                  {jobprovider.active.touched &&
                    !jobprovider.active.valid &&
                    jobprovider.active.error}
              </span>
            </tr>
            {/* <tr>
              <td>
                <label htmlFor="state">State:</label>
              </td>
              <td>
                <input type="text" id="state" name="state" defaultValue={obj1.address.city.state.stateName} disabled={submitDisabled}
                onChange={(e)=>{handleChange("state",e.target.value)}} onBlur={(e)=>{handleChange("state",e.target.value)}} />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="city">City:</label>
              </td>
              <td>
                <input type="text" id="city" name="city" defaultValue={obj1.address.city.cityName} disabled={submitDisabled} 
                onChange={(e)=>{handleChange("city",e.target.value)}} onBlur={(e)=>{handleChange("city",e.target.value)}} />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="add1">Address Line1:</label>
              </td>
              <td>
                <input type="text" id="address1" name="address1" defaultValue={obj1.address.addressLine1} disabled={submitDisabled} 
                onChange={(e)=>{handleChange("address1",e.target.value)}} onBlur={(e)=>{handleChange("address1",e.target.value)}} />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="add2">Address Line2:</label>
              </td>
              <td>
                <input type="text" id="address2" name="address2" defaultValue={obj1.address.addressLine2} disabled={submitDisabled} 
                onChange={(e)=>{handleChange("address2",e.target.value)}} onBlur={(e)=>{handleChange("address2",e.target.value)}} />
              </td>
            </tr> */}
           
          </tbody>
        </table>

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

        <button type="button" id="editBtn" onClick={toggleDisable}>
          Edit
        </button>
        <button type="button" id="submitBtn" onClick={submitData} disabled={submitDisabled}>
          Submit
        </button>
        <button type="button" id="cancelBtn" onClick={handleReset} disabled={cancelDisabled}>
          Cancel
        </button>

      </form>
      {JSON.stringify(worker)}
    </div>
  );
}

}
