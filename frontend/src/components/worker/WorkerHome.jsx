import worker from "../../assets/worker.png";

export default function WorkerHome() {
    return(
        <div className="container align-items-center justify-content-center mt-3" style={{ textAlign: "center" }}>
            <div className="d-flex align-items-center justify-content-center w-100 h-100">
                <img
                    src={worker}
                    alt="Welcome"
                    style={{ maxWidth: "50%", height: "auto" }}
                />
                
            </div>
            <h4>Welcome Worker</h4>
        </div>
    )
}