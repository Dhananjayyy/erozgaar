import { useNavigate } from "react-router-dom";
import vlc from "../../assets/vlc.jpg";

export default function VLCHome(){
    return (
        <div className="container align-items-center justify-content-center mt-3" style={{ textAlign: "center" }}>
        <div className="d-flex align-items-center justify-content-center w-100 h-100">
            <img src={vlc} alt="Welcome" style={{ maxWidth: "50%", height: "auto" }}/>
        </div>
        <h4>Welcome to VLC home page</h4>
        </div>
    );
}
