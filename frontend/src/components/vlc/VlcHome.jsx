//import { useDispatch} from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ShowRequest from "./VlcComponents/ShowRequest";
import { useState } from "react";
import RegisterWorker from "./VlcComponents/RegisterWorker";
import Profile from "./VlcComponents/Profile";
import Home from "./VlcComponents/Home";

export default function VlcHome() {
  //const dispatch = useDispatch();
    let navigate = useNavigate();
  
    const [selectedLink, setSelectedLink] = useState(null);
    //setSelectedLink(props.comp)
   
  
    const handleLinkClick = (link) => {
      setSelectedLink(link);
    };
    
  
    const renderComponent = () => {
      switch (selectedLink) {
        case "showRequest":
          return <ShowRequest/>
        case "home":
          return <Home/>;
        case "registerWorker":
          return <RegisterWorker/>
        case "profile":
          return <Profile/>
        // default:
        //   return <VlcHome/>;
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
      <ul className="nav navbar nav-pills container border rounded navbar-nav justify-content-center">
          <div className="row w-100">
            <div className="col text-center">
              <li className="nav-item">
                <Link
                   className={`nav-link ${selectedLink === "home" ? 'active text-white bg-dark' : ''}`}
                  onClick={() => handleLinkClick('home')}
                 // to="/home"
                >
                  Home
                </Link>
              </li>
            </div>

            <div className="col text-center">
              <li className="nav-item ">
                <Link
                  className={`nav-link ${selectedLink === "showRequest" ? 'active text-white bg-dark' : ''}`}
                   onClick={() => handleLinkClick('showRequest')}
                  //to="/showRequest"
                >
                  Show Worker Request
                </Link>
              </li>
            </div>

            

            <div className="col text-center">
              <li className="nav-item ">
                <Link
                   className={`nav-link ${selectedLink === "registerWorker" ? 'active text-white bg-dark' : ''}`}
                   onClick={() => handleLinkClick('registerWorker')}
                //to="/registerWorker"
                >
                  Register Worker 
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
    
    </>
  );
}