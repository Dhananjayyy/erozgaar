import erozgaarImage from "../../assets/erozgaar.png";

export default function Home() {
    return (
        <div className="container align-items-center justify-content-center mt-3" style={{ textAlign: "center" }}>
            <div className="d-flex align-items-center justify-content-center w-100 h-100">
                <img
                    src={erozgaarImage}
                    alt="Welcome"
                    style={{ maxWidth: "50%", height: "auto" }}
                />
            </div>
            <h4>Welcome to eRozgaar connect</h4>
        </div>
    );
}
