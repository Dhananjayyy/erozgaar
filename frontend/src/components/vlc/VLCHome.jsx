import { useNavigate } from "react-router-dom";

export default function VlcHome() {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (localStorage.getItem("user")) {
      localStorage.removeItem("user");
      navigate("/");
    } else {
      console.log("User data does not exist.");
    }
  };

  if (localStorage.getItem("user")) {
    var userData = JSON.parse(localStorage.getItem("user"));
    console.log("User data:", userData);
  } else {
    console.log("User data does not exist.");
  }

  return (
    <>
      <div className="container mt-3">
        <div className="border border-dark rounded d-flex align-items-center justify-content-center w-100 h-100">
          <h3 className="pt-2">
            Welcome {userData.firstName + " " + userData.lastName}
          </h3>
        </div>
        <div>
          <h3>Village Level Controller Dashboard </h3>
        </div>
        <div>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
