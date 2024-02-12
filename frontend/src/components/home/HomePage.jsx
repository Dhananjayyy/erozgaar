import { useNavigate } from "react-router-dom";
export default function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="container mt-3">
      <div className="border border-dark rounded d-flex align-items-center justify-content-center w-100 h-100">
        <h3 className="pt-2">Welcome to eRozgaar Connect</h3>
      </div>

      <div className="row p-3 m-3">
        <div className="row w-100">
          {/* Worker */}
          <div className="col-md m-2 p-3 text-center border border-dark rounded">
            <h5>Worker</h5>
            <button type="button" className="btn btn-primary" onClick={()=>{
              navigate('/registerworker');
            }}>Register</button>
          </div>

          {/* Provider */}
          <div className="col-md m-2 p-3 text-center border border-dark rounded">
          <h5>Job Provider</h5>
          <button type="button" className="btn btn-primary" onClick={()=>{
              navigate('/registerprovider');
            }}>Register</button>
          </div>
        </div>

        {/* Login */}
        <div className="row w-100">
          <div className="col-md m-2 p-3 text-center border border-dark rounded">
          <h5>Login</h5>
          <button type="button" className="btn btn-primary" onClick={()=>{
              navigate('/login');
            }}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}
