import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AdminHome from "./AdminHome";
import Profile from "./Profile";
import VlcRegistrationForm from "../forms/VlcRegistrationForm";
import ApproveProvider from "./ApproveProvider";


export default function AdminHomeLayout() {
  let navigate = useNavigate();
  const [selectedLink, setSelectedLink] = useState(null);

  const handleLinkClick = (link) => {
    setSelectedLink(link);
  };

  useEffect(() => {
    setSelectedLink('adminhome');
  }, []);

  const renderComponent = () => {
    switch (selectedLink) {
      case "showrequest":
        return <ApproveProvider/>
      case "adminhome":
        return <AdminHome />;
      case "profile":
        return <Profile />;
      case "addvlc":
        return <VlcRegistrationForm/>;
      // default:
      //   return <AdminHome />;
    }
  };

  function handleLogout() {
    navigate("/");
  }

  return (
    <div className="container mt-3">
      <div>
        <ul className="nav navbar nav-pills container border rounded navbar-nav justify-content-center">
          <div className="row w-100">
            <div className="col text-center">
              <li className="nav-item">
                <Link
                  className={`nav-link ${selectedLink === "adminhome" ? 'active text-white bg-dark' : ''}`}
                  onClick={() => handleLinkClick('adminhome')}
                  // to="/home"
                >
                  Home
                </Link>
              </li>
            </div>

            <div className="col text-center">
              <li className="nav-item ">
                <Link
                  className={`nav-link ${selectedLink === "showrequest" ? 'active text-white bg-dark' : ''}`}
                  onClick={() => handleLinkClick('showrequest')}
                  //to="/showrequest"
                >
                    Provider
                </Link>
              </li>
            </div>

            <div className="col text-center">
              <li className="nav-item ">
                <Link
                  className={`nav-link ${selectedLink === "addvlc" ? 'active text-white bg-dark' : ''}`}
                  onClick={() => handleLinkClick('addvlc')}
                  //to="/addvlc"
                >
                  VLC
                </Link>
              </li>
            </div>

            <div className="col text-center">
              <li className="nav-item ">
                <Link
                  className={`nav-link ${selectedLink === "profile" ? 'active text-white bg-dark' : ''}`}
                  onClick={() => handleLinkClick('profile')}
                  //to="/profile"
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
