import admin from "../../assets/admin.jpg";
export default function AdminHome() {

  return (
    <div className="container align-items-center justify-content-center mt-3" style={{ textAlign: "center" }}>
            <div className="d-flex align-items-center justify-content-center w-100 h-100">
                <img
                    src={admin}
                    alt="Welcome"
                    style={{ maxWidth: "50%", height: "auto" }}
                />
                
            </div>
            <h4>Welcome Admin</h4>
        </div>
  );
}
