//import { useDispatch} from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import ShowWorkerRequest from "./ShowRequest";
import VLCHome from "./VLCHome";
import VLCProfile from "./VLCProfile";
import AddWorker from "./AddWorker";

export default function VLCHomeLayout() {
  //const dispatch = useDispatch();
    let navigate = useNavigate();
  
    const [selectedLink, setSelectedLink] = useState(null);   
  
    const handleLinkClick = (link) => {
      setSelectedLink(link);
    };

    useEffect(() => {
      setSelectedLink('vlchome');
    }, []);
    
  
    const renderComponent = () => {
      switch (selectedLink) {
        case "showworkerrequest":
          return <ShowWorkerRequest/>
        case "vlchome":
          return <VLCHome/>;
        case "addWorker":
          return <AddWorker/>
        case "vlcprofile":
          return <VLCProfile/>
        // default:
        //   return <VlcHome/>;
      }
    };
  
    function handleLogout() {
      navigate("/");
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
                   className={`nav-link ${selectedLink === "vlchome" ? 'active text-white bg-dark' : ''} `}
                  onClick={() => handleLinkClick('vlchome')}
                 // to="/home"
                >
                  Home
                </Link>
              </li>
            </div>

            <div className="col text-center">
              <li className="nav-item ">
                <Link
                  className={`nav-link ${selectedLink === "showworkerrequest" ? 'active text-white bg-dark' : ''}`}
                   onClick={() => handleLinkClick('showworkerrequest')}
                  //to="/showRequest"
                >
                  Show Worker Request
                </Link>
              </li>
            </div>

            

            <div className="col text-center">
              <li className="nav-item ">
                <Link
                   className={`nav-link ${selectedLink === "addWorker" ? 'active text-white bg-dark' : ''}`}
                   onClick={() => handleLinkClick('addWorker')}
                //to="/registerWorker"
                >
                  Add Worker 
                </Link>
              </li>
            </div> 
            <div className="col text-center">
              <li className="nav-item ">
                <Link
                   className={`nav-link ${selectedLink === "vlcprofile" ? 'active text-white bg-dark' : ''}`}
                   onClick={() => handleLinkClick('vlcprofile')}
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