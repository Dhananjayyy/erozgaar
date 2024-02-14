import { Link} from "react-router-dom";
import { useState, useEffect } from "react";
import WorkerRegistrationForm from "./forms/WorkerRegistrationForm";
import LoginForm from "./forms/LoginForm";
import Home from "./Home";
import ProviderRegistrationForm from "./forms/ProviderRegistrationForm";


export default function HomeLayout() {
  
  const [selectedLink, setSelectedLink] = useState(null);

  const handleLinkClick = (link) => {
    setSelectedLink(link);
  };

  useEffect(() => {
    setSelectedLink('home');
  }, []);

  const renderComponent = () => {
    switch (selectedLink) {
      case "workerregistration":
        return <WorkerRegistrationForm />;
      case "login":
        return <LoginForm />;
      case "providerregistration":
        return <ProviderRegistrationForm/>;
        case "home":
        return <Home />;
      
      // default:
      //   return <AdminHome />;
    }
  };

  

  return (
    <div className="container mt-3">
      <div>
        <ul className="nav navbar nav-pills container border rounded navbar-nav justify-content-center">
          <div className="row w-100">

          <div className="col text-center">
              <li className="nav-item ">
                <Link
                  className={`nav-link ${selectedLink === "home" ? 'active text-white bg-dark' : ''}`}
                  onClick={() => handleLinkClick('home')}
                  //to="/workerregistration"
                >
                    Home
                </Link>
              </li>
            </div>

            <div className="col text-center">
              <li className="nav-item">
                <Link
                  className={`nav-link ${selectedLink === "login" ? 'active text-white bg-dark' : ''}`}
                  onClick={() => handleLinkClick('login')}
                  // to="/login"
                >
                  Login
                </Link>
              </li>
            </div>

            <div className="col text-center">
              <li className="nav-item ">
                <Link
                  className={`nav-link ${selectedLink === "workerregistration" ? 'active text-white bg-dark' : ''}`}
                  onClick={() => handleLinkClick('workerregistration')}
                  //to="/workerregistration"
                >
                    Worker Registration
                </Link>
              </li>
            </div>

            <div className="col text-center">
              <li className="nav-item ">
                <Link
                  className={`nav-link ${selectedLink === "providerregistration" ? 'active text-white bg-dark' : ''}`}
                  onClick={() => handleLinkClick('providerregistration')}
                  //to="/providerregistration"
                >
                  Provider Registration
                </Link>
              </li>
            </div>

               
          
          </div>
        </ul>
      </div>
      <div>{renderComponent()}</div>
    </div>
  );
}
