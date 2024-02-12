import { Link, } from "react-router-dom";
import { useState } from "react";
import ProviderRequest from "./ProviderRequest";
import Profile from "./Profile";
import AddVLC from "./AddVLC";

export default function AdminHome() {
    // let navigate = useNavigate();
  
    const [selectedLink, setSelectedLink] = useState(null);   
  
    const handleLinkClick = (link) => {
    //   dispatch(logout())
      setSelectedLink(link);
    };
  
    const renderComponent = () => {
      switch (selectedLink) {
        case "/showRequest":
          return <ProviderRequest/>
        case "/home":
          return <AdminHome/>;
        case "/profile":
          return <Profile/>
        case "/addvlc":
          return <AddVLC/>
        default:
          return <AdminHome/>;
      }
    };
  
    // function handleLogout() {
    //    dispatch(logout())
    //   navigate("/LayoutHomePage");
    // }

  return (
    <>
      <div className="container mt-3">
      <div>
        <ul className="nav navbar container border rounded navbar-nav justify-content-center">
          <div className="row w-100">

            <div className="col text-center">
              <li className="nav-item">
                <Link
                   className="nav-link"
                  onClick={() => handleLinkClick('home')}
                  to="/home"
                >
                  Home
                </Link>
              </li>
            </div>

            <div className="col text-center">
              <li className="nav-item ">
                <Link
                  className="nav-link"
                  onClick={() => handleLinkClick('/showRequest')}
                  to="/showRequest"
                >
                  Show provider request
                </Link>
              </li>
            </div>

            <div className="col text-center">
              <li className="nav-item ">
                <Link
                   className="nav-link"
                  onClick={() => handleLinkClick('addvlc')}
                to="/addvlc"
                >
                  Add VLC
                </Link>
              </li>
            </div>

            <div className="col text-center">
              <li className="nav-item ">
                <Link
                   className="nav-link"
                  onClick={() => handleLinkClick('profile')}
                to="/profile"
                >
                  Profile 
                </Link>
              </li>
            </div>     
            <div className="col text-center">
              <li className="nav-item">
                <button className="btn btn-outline-danger" 
                // onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </div>
          </div>
        </ul>
      </div>
      <div>{renderComponent()}</div>
    </div>
    
    </>
  );
}