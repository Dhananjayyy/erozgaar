import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Payment from "./Payment";
import CurrentJob from "./CurrentJob";
import JobHistroy from "./JobHistroy";
import UpdateProfile from "./UpdateProfile";
import WorkerHome from "./WorkerHome";

export default function WorkerHomeLayout() {
  let navigate = useNavigate();
  const [selectedLink, setSelectedLink] = useState("WorkerHome");

  const handleLinkClick = (link) => {
    setSelectedLink(link);
  };

  useEffect(() => {
    setSelectedLink('workerhome');
  }, []);

  const renderComponent = () => {
    switch (selectedLink) {
      case "currentjob":
        return <CurrentJob/>;
      case "jobhistory":
        return <JobHistroy/>;
      case "updateprofile":
        return <UpdateProfile/>;
      case "payment":
        return <Payment/>;
  
      default:
        return <WorkerHome/>;
    }
  };

  function handleLogout() {
    navigate("/workerhome");
  }

  return (
    <div className="container mt-3">
      <div>
        <ul className="nav navbar nav-pills container border rounded navbar-nav justify-content-center">
          <div className="row w-100">
            <div className="col text-center">
              <li className="nav-item">
                <Link
                  className={`nav-link ${selectedLink === "workerhome" ? 'active text-white bg-dark' : ''}`}
                  // to="/"
                  onClick={() => handleLinkClick('workerhome')}
                >
                  Home
                </Link>
              </li>
            </div>

            <div className="col text-center">
              <li className="nav-item ">
                <Link
                  className={`nav-link ${selectedLink === "currentjob" ? 'active text-white bg-dark' : ''}`}
                  // to="/currentjob"
                  onClick={() => handleLinkClick('currentjob')}
                >
                  Show Current Job
                </Link>
              </li>
            </div>

            <div className="col text-center">
              <li className="nav-item ">
                <Link
                  className={`nav-link ${selectedLink === "jobhistory" ? 'active text-white bg-dark' : ''}`}
                  // to="/jobhistory"
                  onClick={() => handleLinkClick('jobhistory')}
                >
                  Job History
                </Link>
              </li>
            </div>

            <div className="col text-center">
              <li className="nav-item ">
                <Link
                  className={`nav-link ${selectedLink === "updateprofile" ? 'active text-white bg-dark' : ''}`}
                  // to="/updateprofile"
                  onClick={() => handleLinkClick('updateprofile')}
                >
                  Update Profile
                </Link>
              </li>
            </div>

            <div className="col text-center">
              <li className="nav-item ">
                <Link
                  className={`nav-link ${selectedLink === "payment" ? 'active text-white bg-dark' : ''}`}
                  // to="/payment"
                  onClick={() => handleLinkClick('payment')}
                >
                  Payment
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
