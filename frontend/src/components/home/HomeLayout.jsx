import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./Home";
import WorkerRegistrationForm from "../forms/WorkerRegistrationForm";
import ProviderRegistrationForm from "../forms/ProviderRegistrationForm";
import WorkerHome from "../worker/WorkerHomeLayout";
// import stylesheet
import "../../styles/nav.css";
import LoginForm from "../forms/LoginForm";

export default function HomeLayout() {
  const [selectedLink, setSelectedLink] = useState(null);

  const handleLinkClick = (link) => {
    setSelectedLink(link);
  };

  useEffect(() => {
    setSelectedLink("home");
  }, []);

  const renderComponent = () => {
    switch (selectedLink) {
      case "workerregistration":
        return <WorkerRegistrationForm />;
      case "login":
        return <LoginForm/>;
      case "providerregistration":
        return <ProviderRegistrationForm />;
      case "home":
        return <Home />;

      // default:
      //   return <AdminHome />;
    }
  };

  return (
    <div className="container mt-3">
      <div>
        <nav className="nav navbar navbar-expand-lg nav-pills container border justify-content-between rounded navbar-nav ">
          <div
            className="collapse w-100 navbar-collapse justify-content-center"
            id="navbarToggleExternalContent"
          >
            <div className="row navbar-nav w-100">
              <div className="col text-center">
                <li className="nav-item">
                  <Link
                    className={`navbar-brand nav-link ${
                      selectedLink === "home" ? "active text-white bg-dark" : ""
                    }`}
                    onClick={() => handleLinkClick("home")}
                  >
                    Home
                  </Link>
                </li>
              </div>

              <div className="col text-center">
                <li className="nav-item">
                  <Link
                    className={`navbar-brand nav-link ${
                      selectedLink === "login"
                        ? "active text-white bg-dark"
                        : ""
                    }`}
                    onClick={() => handleLinkClick("login")}
                  >
                    Login
                  </Link>
                </li>
              </div>

              <div className="col text-center">
                <li className="nav-item">
                  <Link
                    className={` navbar-brand nav-link ${
                      selectedLink === "workerregistration"
                        ? "active text-white bg-dark"
                        : ""
                    }`}
                    onClick={() => handleLinkClick("workerregistration")}
                  >
                    Worker Registration
                  </Link>
                </li>
              </div>

              <div className="col text-center">
                <li className="nav-item">
                  <Link
                    className={`navbar-brand nav-link ${
                      selectedLink === "providerregistration"
                        ? "active text-white bg-dark"
                        : ""
                    }`}
                    onClick={() => handleLinkClick("providerregistration")}
                  >
                    Provider Registration
                  </Link>
                </li>
              </div>
            </div>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarToggleExternalContent"
            aria-controls="navbarToggleExternalContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </nav>
      </div>
      <div>{renderComponent()}</div>
      {/* {<WorkerHome/>} */}
    </div>
  );
}
