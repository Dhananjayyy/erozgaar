import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ProviderRequest from "./ProviderRequest";
import AddVLC from "./AddVLC";
import AdminHome from "./AdminHome";
import Profile from "./Profile";


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
        return <ProviderRequest />;
      case "adminhome":
        return <AdminHome />;
      case "profile":
        return <Profile />;
      case "addvlc":
        return <AddVLC />;
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
                    Show provider request
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
                  Add VLC
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
