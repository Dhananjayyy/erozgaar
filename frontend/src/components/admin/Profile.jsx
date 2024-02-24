import { useEffect, useReducer, useState } from "react";

export default function Profile() {
  const data = JSON.parse(localStorage.getItem("loggedUser"));

  const init = {
    // adhaar: { value: "", valid: false, touched: false, error: "" },
    // accountNumber: { value: "", valid: false, touched: false, error: "" },
    phone: { value: 0, valid: false, touched: false, error: "" },
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
  

  const [admin, dispatch] = useReducer(reducer, init);
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
    fetch("http://localhost:8080/getadminbyid?uid=" + data.id, {
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
  }, []);

  const initializeProviderState = (data) => {
    

    // dispatch({
    //   type: "update",
    //   data: {
    //     key: "accountNumber",
    //     val: data.accountNumber,
    //     touched: true,
    //     valid: true,
    //     error: "",
    //   },
    // });

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
    // dispatch({
    //   type: "update",
    //   data: {
    //     key: "adhaar",
    //     val: data.adhaar,
    //     touched: true,
    //     valid: true,
    //     error: "",
    //   },
    // });
  }

    const handleReset = () => {
      setCancelDisabled(!cancelDisabled);
      setSubmitDisabled(!submitDisabled);
      dispatch({
        type: "reset",
      });
    };
    
    const handleChange = (key, value) => {
      const { valid, error } = validateData(key, value);
      let formValid = true;
      for (let k in admin) {
        if (admin[k] && admin[k].valid === false) {
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
      

    const toggleDisable = () => {
      setSubmitDisabled(!submitDisabled);
      setCancelDisabled(!cancelDisabled);
    };

    const validateData = (key, value) => {
      console.log(key, value);
      let valid = true;
      let error = "";
      switch (key) {

        case "phone":
            var pattern = /^\d{10}$/;
          if (!pattern.test(value)) {
            valid = false;
            error = "Phone number should be 10 digit";
          }
          break;

        case "accountNumber":
          pattern = /^\d{12}$/;
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

      if (admin.formValid === false) {
        setAlertType("alert-danger");
        return;
      }

      var reqbody = JSON.stringify({
        userId: data.id,
        userName: obj1.userName.value,
        password: obj1.password,
        phoneNumber: admin.phone.value,
        gender: admin.gender,
        role: {
          roleId: 2,
        },
        active: obj1.active.value,
        adhaar: admin.adhaar,
        accountNumber: admin.accountNumber,
        securityQuestion: {
          securityQuestionId: obj1.question,
        },
        answer: obj1.answer.value,
       
      });

      fetch("http://localhost:8080/updateAdmin", {
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
      <form id="vlcForm">
        <div className="container mt-5 mb-5 border border-dark rounded ">
          <div className="mt-3 mb-5 display-5 text-center">Welcome {obj1.userName}</div>

          <div className="row">
            <div className="col">
              <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="phone">Phone:</label>
               </div>
            </div>
            <div className="col">
              <div className="mb-3 border bg-light rounded p-2">
              <input
                    type="text"
                    id="phone"
                    name="phone"
                    defaultValue={obj1.phoneNumber}
                    disabled={submitDisabled}
                    onChange={(e) => {
                      handleChange("phone", e.target.value);
                    }}
                    onBlur={(e) => {
                      handleChange("phone", e.target.value);
                    }}
                  />
                    <span className="error text-danger">
                  {admin.phone.touched &&
                    !admin.phone.valid &&
                    admin.phone.error}
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
      {JSON.stringify(admin)}
    </div>
    );
  }

