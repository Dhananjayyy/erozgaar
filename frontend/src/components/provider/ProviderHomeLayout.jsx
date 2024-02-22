import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProviderProfile from "./ProviderProfile";
import ProviderHome from "./ProviderHome";
import PostJob from "./PostJob";
import JobDetails from "./JobDetails";

export default function ProviderHomeLayout() {
  const navigate = useNavigate();
  const [selectedLink, setSelectedLink] = useState("providerhome");


  var userinfo = null;
  if (localStorage.getItem("loggedUser") != null) {
    userinfo = JSON.parse(localStorage.getItem("loggedUser"));
    console.log(userinfo);
  }

  const handleLogout = () => {
    if (localStorage.getItem("user")) {
      localStorage.removeItem("user");
      navigate("/");
    } else {
      console.log("User data does not exist.");
      navigate("/");
    }
  };


  const renderComponent = () => {
    switch (selectedLink) {
      case "profile":
        return <ProviderProfile/>;
      case "providerhome":
        return <ProviderHome/>;
      case "postjob":
        return <PostJob/>
      case "jobdetails":
        return <JobDetails/>
      
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
                  className={`nav-link ${selectedLink === "providerhome" ? 'active text-white bg-dark' : ''}`}
                  onClick={() => setSelectedLink('providerhome')}
                >
                  Home
                </Link>
              </li>
            </div>

            <div className="col text-center">
              <li className="nav-item ">
                <Link
                  className={`nav-link ${selectedLink === "jobdetails" ? 'active text-white bg-dark' : ''}`}
                  onClick={() => setSelectedLink('jobdetails')}
                >
                  Job Details
                </Link>
              </li>
            </div>    

            <div className="col text-center">
              <li className="nav-item ">
                <Link
                  className={`nav-link ${selectedLink === "postjob" ? 'active text-white bg-dark' : ''}`}
                  onClick={() => setSelectedLink('postjob')}
                >
                  Post Job
                </Link>
              </li>
            </div> 


            <div className="col text-center">
              <li className="nav-item ">
                <Link
                  className={`nav-link ${selectedLink === "profile" ? 'active text-white bg-dark' : ''}`}
                  onClick={() => setSelectedLink('profile')}
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
