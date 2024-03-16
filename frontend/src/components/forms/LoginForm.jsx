import { useReducer, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../slice";

export default function LoginForm() {
  const [displayAlert, setDisplayAlert] = useState(false);
  const [dispMsg, setDispMsg] = useState("");

  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const reduxAction = useDispatch();

  function showErrorMessage(msg, time) {
    setDisplayAlert(true);
    setDispMsg(msg);
    if (time !== 0) {
      setTimeout(() => {
        setDisplayAlert(false);
      }, time);
    }
  }

  const init = {
    uid: { value: "", error: "", valid: false, touched: false },
    pwd: { value: "", error: "", valid: false, touched: false },
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "update":
        return {
          ...state,
          [action.fld]: {
            ...state[action.fld],
            value: action.value,
            error: action.error,
            valid: action.valid,
            touched: action.touched,
          },
        };
      case "reset":
        return init;
    }
  };

  const [info, dispatch] = useReducer(reducer, init);

  const validate = (nm, val) => {
    let error = "";
    let valid = false;
    let touched = true;
    switch (nm) {
      case "uid":
        const exp1 = /[A-Za-z0-9._-]{5,12}/;
        if (!exp1.test(val)) {
          error = "Invalid Username";
        } else {
          error = "";
          valid = true;
        }
        break;

      case "pwd":
        break;
    }
    console.log(val + "," + error + "," + valid);
    dispatch({ type: "update", fld: nm, value: val, error, valid, touched });
  };

  const sendData = (e) => {
    e.preventDefault();
    console.log(info.uid.value + " : " + info.pwd.value);
    const reqOptions = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        username: info.uid.value,
        password: info.pwd.value,
      }),
    };
    //axios.post("http://localhost:8080/login",)

    fetch("http://localhost:8080/login", reqOptions)
      /*.then(resp => {
            
            return resp.json()}) 
        .then(data => console.log(data)) */
      /*.then(resp =>  {if(resp.ok)
                        {
                            console.log(resp.status)
                            console.log(JSON.stringify(resp))
                            return resp.text();
                        }    
                         else
                         {
                            console.log(resp.statusText)
                             throw new Error("Server error"); 
                         }
                        })
        .then(text => text.length ? JSON.parse(text) : {})
        .then(obj =>  {
                       if(Object.keys(obj).length === 0)
                       {
                            setMsg("Wrong UID/PWD");
                       } 
                       else
                       {
                           
                           reduxAction(login())
                           localStorage.setItem("loggedUser",JSON.stringify(obj));
                           if(obj.status === false) 
                           {
                               alert("Request has not been approved");
                           }
                           else
                           {

                               if(obj.role_id.role_id === 1)
                               {
                                    navigate("/admin_home");
                               }
                               else if(obj.role_id.role_id === 2)
                               {
                                    navigate("/doctor_home");
                               }
                               else if(obj.role_id.role_id === 3)
                               {

                               }
                               else if(obj.role_id.role_id === 4)
                               {

                               }
                           }
                       }    
                }) 
         .catch((error) => alert("Server error. Try after some time")); */
      .then((resp) => {
        if (resp.ok) {
          console.log(resp.status);
          //console.log(JSON.stringify(resp))
          return resp.json();
        } else {
          console.log(resp.status);
          //throw new Error("Server error");
          setMsg("Login failed");
          showErrorMessage("Please enter correct username / password", 5000);
          return null;
        }
      })
      .then((data) => {
        if (data !== null) {
          if(data.msg === "inactive"){
            showErrorMessage("Account inactive", 5000);
            return;
          }
          reduxAction(login());
          localStorage.setItem("loggedUser", JSON.stringify(data));
          const role = data.roles[0];
          if (role === "Worker") navigate("/workerlayout");
          else if (role === "Provider") navigate("/providerlayout");
          else if (role === "VLC") navigate("/vlclayout");
          else if (role === "Admin") navigate("/adminlayout");
        }
      })
      .catch((error) => alert(error));
  };

  return (
    // <div>
    //     <h1> Login Page </h1>
    //     <form>
    //         <div className="mb-3">
    //             <label htmlFor="uid" className="form-label">Enter uid : </label>
    //             <input type="text" className="form-control" id="uid" name="uid" value={info.uid.value}
    //             onChange={(e)=>{validate("uid", e.target.value)}}   />
    //             <div id="emailHelp" className="form-text" style={{display: (!info.uid.valid&&info.uid.touched)?"block":"none"}}>
    //                 {info.uid.error}
    //             </div>
    //         </div>
    //         <div className="mb-3">
    //             <label htmlFor="pwd" className="form-label">Enter uid : </label>
    //             <input type="password" className="form-control" id="pwd" name="pwd"  value={info.pwd.value}
    //             onChange={(e)=>{validate("pwd", e.target.value)}} />
    //             <div id="emailHelp" className="form-text" style={{display: !info.pwd.valid&&info.pwd.touched?"block":"none"}}>
    //                 {info.pwd.error}
    //             </div>
    //         </div>
    //         <button type="submit" className="btn btn-primary mb-3" onClick={(e)=> {sendData(e)}}>Submit</button>
    //         <button type="reset" className="btn btn-primary mb-3" onClick={()=> {dispatch({type:'reset'})}} > Clear </button>

    //     </form>

    //     <p> {JSON.stringify(info)}</p>
    //     <p> {msg}</p>
    // </div>
    <div className="container mt-5 border border-dark rounded p-3 w-50">
      <div className=" mb-3 display-5 text-center">LOGIN</div>

      {/* Username */}
      <form className="mt-4">
        <div className="form-group">
          <div className="mb-3 border  border-color bg-light rounded p-2">
            <label htmlFor="uid">Username</label>
            <input
              type="text"
              className="form-control"
              id="uid"
              name="uid"
              value={info.uid.value}
              onChange={(e) => {
                validate("uid", e.target.value);
              }}
            />
            <div
            id="emailHelp"
            className="form-text"
            style={{
              display: !info.uid.valid && info.uid.touched ? "block" : "none",
            }}
          >
            {info.uid.error}
          </div>
          </div>
          
        </div>

        <div className="form-group">
          {/* Password */}
          <div className="mb-3 border bg-light rounded p-2">
            <label htmlFor="pwd">Password</label>
            <input
              type="password"
              className="form-control"
              id="pwd"
              name="pwd"
              value={info.pwd.value}
              onChange={(e) => {
                validate("pwd", e.target.value);
              }}
            />
            {/* <div id="emailHelp" className="form-text" style={{display: !info.pwd.valid&&info.pwd.touched?"block":"none"}}>
                     {info.pwd.error}
                 </div> */}
          </div>
          {/* Alert */}
          <div>
            <div
              className={`alert text-center alert-danger p-2 ${
                displayAlert ? "d-block" : "d-none"
              }`}
              role="alert"
            >
              {dispMsg}
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="text-center mt-3">
          <button
            className="btn btn-primary w-25 mx-2"
            onClick={(e) => {
              sendData(e);
            }}
          >
            Login
          </button>
          <button
            type="reset"
            className="btn btn-outline-danger w-25 mx-2"
            onClick={() => {
              dispatch({ type: "reset" });
            }}
          >
            Clear
          </button>
        </div>
      </form>
      {/* <p> {JSON.stringify(info)}</p> */}
      {/* <p> {msg}</p> */}
    </div>
  );
}
