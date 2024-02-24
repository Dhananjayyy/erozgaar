import { useState } from "react";
import ShowAllJobs from "./ShowAllJobs";
import Worker from "./Worker";
import Vlc from "./Vlc";
import JobProvider from "./JobProvider";

export default function Dashboard() {
  const [selectedRole, setSelectedRole] = useState(0);

  const handleChange = (value) => {
    setSelectedRole(value);
    console.log("change");
  };

  const renderComponent = () => {
    switch (selectedRole) {
      case 0:
        return <Worker />;
      case 1:
        return <ShowAllJobs />;
      case 2:
        return <JobProvider/>;
      case 3:
        return <Vlc />;
      default:
        return null;
    }
  };

  return (
    <div className="container rounded mt-5 mb-5 ">
      <div className="mt-3 mb-5 display-5 text-center">Dashboard</div>
      <div>
        <div className="table-responsive">
          <div
            className="btn-group btn-group-toggle d-flex justify-content-center border rounded"
            data-toggle="buttons"
          >
            <label
              className={`btn ${
                selectedRole === 0 ? "btn-primary" : "btn-light"
              }`}
            >
              <input
                className="form-check-input"
                type="radio"
                name="selectedrole"
                autoComplete="off"
                value={0}
                style={{ display: "none" }}
                checked={selectedRole === 0}
                onChange={() => handleChange(0)}
              />{" "}
              Workers
            </label>

            <label
              className={`btn ${
                selectedRole === 1 ? "btn-primary" : "btn-light"
              }`}
            >
              <input
                className="form-check-input"
                type="radio"
                name="selectedrole"
                autoComplete="off"
                value={0}
                style={{ display: "none" }}
                checked={selectedRole === 1}
                onChange={() => handleChange(1)}
              />{" "}
              Jobs
            </label>

            <label
              className={`btn ${
                selectedRole === 2 ? "btn-primary" : "btn-light"
              }`}
            >
              <input
                className="form-check-input"
                type="radio"
                name="selectedrole"
                autoComplete="off"
                value={0}
                style={{ display: "none" }}
                checked={selectedRole === 2}
                onChange={() => handleChange(2)}
              />{" "}
              Job Providers
            </label>

            <label
              className={`btn ${
                selectedRole === 3 ? "btn-primary" : "btn-light"
              }`}
            >
              <input
                className="form-check-input"
                type="radio"
                name="selectedrole"
                autoComplete="off"
                value={1}
                style={{ display: "none" }}
                checked={selectedRole === 3}
                onChange={() => handleChange(3)}
              />{" "}
              Village Level Connectors
            </label>
          </div>
          <br />
          {renderComponent()}
        </div>
      </div>
    </div>
  );
}
