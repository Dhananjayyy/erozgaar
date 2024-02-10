import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../LoggedSlice";


export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [displayAlert, setDisplayAlert] = useState(false);
  const [dispMsg, setDispMsg] = useState("");

  
  const dispatch = useDispatch();
  let navigate= useNavigate();


  useEffect(() => {
    const UserNameRegex = /^[a-zA-Z]{3,}\.[a-zA-Z]{3,}$/;
    if (!UserNameRegex.test(username) && username.trim() !== "") {
      setErrorMsg("Invalid username format");
    } else {
      setErrorMsg("");
    }
  }, [username]);

  useEffect(() => {
    const passwordRegex = /^[A-Z][a-zA-Z0-9]*[!@#$%^&][a-zA-Z0-9]*$/;
    if (!passwordRegex.test(password) && password.trim() !== "") {
      setErrorMsg("Invalid password format");
    } else {
      setErrorMsg("");
    }
  }, [password]);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  function showErrorMessage(msg, time) {
    setDisplayAlert(true);
    setDispMsg(msg);
    if (time !== 0) {
      setTimeout(() => {
        setDisplayAlert(false);
      }, time);
    }
  }

  const submitme = (e) => {
    e.preventDefault();
    const UserName = document.getElementById("uid").value;
    const password = document.getElementById("pwd").value;

    if (UserName.trim() === '' || password.trim() === '') {
      setErrorMsg("Please enter username / password");
      return;
    }

    // Additional submission logic can go here
    const srole = document.querySelector(
      "input[type='radio'][name=selectedrole]:checked"
    ).value;
    
    fetch("http://localhost:9000/RoleService", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid :username, pwd: password }),
    })
      .then((response) => response.json())
      .then((data) => {

        var login_status = data.login_status
        if (login_status) {
          if (parseInt(srole) === 1) {
            console.log(JSON.stringify(data.result))
            dispatch(login({ id:data.result[0].UserID, userType:'user' }));
            navigate("/WorkerHome", {state: {"id": data.result[0].UserID}});
          }
          if (parseInt(srole) === 2) {
            dispatch(login({ id:data.result[0].AdminID, userType:'admin' }));
            navigate("/ProviderHome", {state: {"id": data.result[0].AdminID}});
          }
          if (parseInt(srole) === 3) {
            dispatch(login({ id:data.result[0].ProviderID, userType:'provider' }));
            navigate("/VLCHome", {state: {"id": data.result[0].ProviderID}});
          }
        }else{
          showErrorMessage("Please enter correct username / password",5000);
          return;
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    
  };
  

  const clearForm = () => {
    setUsername("");
    setPassword("");
    setErrorMsg("");
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <form className="border border-dark rounded p-4 w-50" onSubmit={submitme}>
        <h2 className="text-center mb-4">LOGIN</h2>
        <div className="form-group">
          <div className="mb-3 border bg-light rounded p-2">
            <label htmlFor="uid">Username</label>
            <input
              type="text"
              className="form-control"
              id="uid"
              name="uid"
              onChange={handleUsernameChange}
              value={username}
            />
          </div>
          {errorMsg && <div className="text-danger">{errorMsg}</div>}
        </div>
        <div className="form-group">
          <div className="mb-3 border bg-light rounded p-2">
            <label htmlFor="pwd">Password:</label>
            <input
              type="password"
              className="form-control"
              id="pwd"
              name="pwd"
              onChange={handlePasswordChange}
              value={password}
            />
          </div>
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
        <div className="text-center mt-3">
          <button type="submit" className="btn btn-primary w-25 mx-2">Login</button>
          <button type="button" className="btn btn-outline-danger w-25 mx-2" onClick={clearForm}>Clear</button>
        </div>
      </form>
    </div>
  );
}
