import { Link, useNavigate } from "react-router-dom";
import ShowRequest from "./VlcComponents/ShowRequest";
import { useState } from "react";

export default function VlcHome() {
    let navigate = useNavigate();
  
    const [selectedLink, setSelectedLink] = useState(null);
    //setSelectedLink(props.comp)
   
  
    const handleLinkClick = (link) => {
      dispatch(logout())
      setSelectedLink(link);
    };
  
    const renderComponent = () => {
      switch (selectedLink) {
        case "/showRequest":
          return <ShowRequest/>
        case "home":
          return <VlcHome/>;
        // case "changerequests":
        //   return <ChangeRequests/>
        // case "history":
        //   return <EditHistory/>
        // default:
        //   return <AdminHomePage/>;
      }
    };
  
    function handleLogout() {
      dispatch(logout())
      navigate("/LayoutHomePage");
    }

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
                //   onClick={() => handleLinkClick('home')}
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
                //   onClick={() => handleLinkClick('/showRequest')}
                  to="/showRequest"
                >
                  Show Worker Request
                </Link>
              </li>
            </div>

            <div className="col text-center">
              <li className="nav-item ">
                <Link
                   className="nav-link"
                //   onClick={() => handleLinkClick('changerequests')}
                to="/profile"
                >
                  Profile 
                </Link>
              </li>
            </div>

            <div className="col text-center">
              <li className="nav-item ">
                <Link
                   className="nav-link"
                //   onClick={() => handleLinkClick('history')}
                to="/registerWorker"
                >
                  Register Worker 
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
    
    </>
  );
}