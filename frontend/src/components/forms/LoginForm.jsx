import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate()

  const [displayAlert, setDisplayAlert] = useState(false);
  const [dispMsg, setDispMsg] = useState("")


  function showErrorMessage(msg, time) {
    setDisplayAlert(true)
    setDispMsg(msg)
    if (time !== 0) {
      setTimeout(() => {
        setDisplayAlert(false)
      }, time);
    }
  }

  const submit = (e) => {
    e.preventDefault();
    const email = document.getElementById("uid").value
    const password = document.getElementById("pwd").value

    if (email.trim() === "" || password.trim() === "") {
      // setDisplayAlert(true)
      showErrorMessage("Please enter username / password", 5000);
      return;
    }
    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: email, password: password }),
    })
      .then((response) => response.json())
      .then((data) => {

        if (data === false) {
          showErrorMessage("Please enter correct username / password", 5000);
          return;
        } else if (data != "false") {
          const role = data.user.role.roleName
          const active = data.user.active
          if (active) {
            localStorage.setItem("user", JSON.stringify(data));
            console.log("data stored in local storage")
            if (role === "Worker") {
              navigate("/worker")
            }
            if (role === "Provider") {
              console.log("Provider!");
              navigate("/provider")
            }
            if (role === "Admin") {
              navigate("/admin")
            }
            if (role === "VLC") {
              navigate("/vlc")
            }
          } else {
            showErrorMessage("Account inactive", 5000);
            return;
          }
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
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
            />
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
            />
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
              submit(e);
            }}
          >
            Login
          </button>
          <button type="reset" className="btn btn-outline-danger w-25 mx-2">
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}
