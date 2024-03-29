import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import WorkerProfile from "./WorkerProfile";
import WorkerHome from "./WorkerHome";
import ShowJobStatus from "./ShowJobStatus";

export default function WorkerHomeLayout() {
  const navigate = useNavigate();
  const [selectedLink, setSelectedLink] = useState("workerhome");

  var userinfo = null;
  if (localStorage.getItem("loggedUser") != null) {
    userinfo = JSON.parse(localStorage.getItem("loggedUser"));
    console.log(userinfo);
  } else {
    navigate("/");
  }

  const handleLogout = () => {
    if (localStorage.getItem("loggedUser")) {
      localStorage.removeItem("loggedUser");
      navigate("/");
    } else {
      console.log("User data does not exist.");
      navigate("/");
    }
  };

  const handleLinkClick = (link) => {
    setSelectedLink(link);
    navigate(`/${link}`);
  };

  const renderComponent = () => {
    switch (selectedLink) {
      case "profile":
        return <WorkerProfile />;
      case "workerhome":
        return <WorkerHome />;
        case "jobstatus":
        return <ShowJobStatus/>;
      default:
        return null;
    }
  };

  return (
    <div className="container mt-3">
      <div>
        <ul className="nav navbar nav-pills container border rounded navbar-nav justify-content-center">
          <div className="row w-100">
            <div className="col text-center">
              <li className="nav-item">
                <Link
                  className={`nav-link ${selectedLink === "workerhome" ? 'active text-white bg-dark' : ''}`}
                  onClick={() => handleLinkClick('workerhome')}
                >
                  Home
                </Link>
              </li>
            </div>

            <div className="col text-center">
              <li className="nav-item">
                <Link
                  className={`nav-link ${selectedLink === "jobstatus" ? 'active text-white bg-dark' : ''}`}
                  onClick={() => handleLinkClick('jobstatus')}
                >
                  Job Status
                </Link>
              </li>
            </div>

            <div className="col text-center">
              <li className="nav-item ">
                <Link
                  className={`nav-link ${selectedLink === "profile" ? 'active text-white bg-dark' : ''}`}
                  onClick={() => handleLinkClick('profile')}
                >
                  Profile
                </Link>
              </li>
            </div>     
            <div className="col text-center">
              <li className="nav-item">
                <button className="btn btn-outline-danger" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </div>
          </div>
        </ul>
      </div>
      <div>{renderComponent()}</div>
    </div>
  );
}
