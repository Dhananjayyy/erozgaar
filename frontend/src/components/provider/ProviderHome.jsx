import provider from "../../assets/provider.jpg";

export default function ProviderHome() {
      return (
        <div className="container align-items-center justify-content-center mt-3" style={{ textAlign: "center" }}>
            <div className="d-flex align-items-center justify-content-center w-100 h-100">
                <img
                    src={provider}
                    alt="Welcome"
                    style={{ maxWidth: "50%", height: "auto" }}
                />
                
            </div>
            <h4>Welcome Provider</h4>
        </div>
      );
}