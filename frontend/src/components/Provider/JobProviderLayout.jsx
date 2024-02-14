import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import JobProviderHome from './JobProviderHome'; 
import OngoingJob from "./OngoingJob";
import PostJob from './PostJob';

import UpdateProfile from "./UpdateProfile";
import Payment from './Payment';
import WorkerDetalis from './WorkerDetalis';

export default function JobProviderLayout() {
    const navigate = useNavigate();
    const [selectedLink, setSelectedLink] = useState("jobproviderhome");

    const handleLinkClick = (link) => {
        setSelectedLink(link);
    };

    useEffect(() => {
        setSelectedLink('/jobproviderhome');
    }, []);

    const renderComponent = () => {
        switch (selectedLink) {
            case "ongoingwork":
                return <OngoingJob/>;
            case "postjob":
                return <PostJob/>;
            case "workerdetails":
                return <WorkerDetalis/>;
            case "payment":
                return <Payment/>;
            case "updateprofile":
                return <UpdateProfile/>;
            default:
                return <JobProviderHome/>;
        }
    };

    const handleLogout = () => {
        navigate("/");
    };

    return (
        <div className="container mt-3">
            <div>
                <ul className="nav navbar nav-pills container border rounded navbar-nav justify-content-center">
                    <div className="row w-100">
                        <div className="col text-center">
                            <li className="nav-item">
                                <Link
                                    className={`nav-link ${selectedLink === "jobproviderhome" ? 'active text-white bg-dark' : ''}`}
                                    // to="/"
                                    onClick={() => handleLinkClick('jobproviderhome')}
                                >
                                    Home
                                </Link>
                            </li>
                        </div>

                        <div className="col text-center">
                            <li className="nav-item ">
                                <Link
                                    className={`nav-link ${selectedLink === "ongoingwork" ? 'active text-white bg-dark' : ''}`}
                                    // to="/currentjob"
                                    onClick={() => handleLinkClick('ongoingwork')}
                                >
                                    Show Ongoing Job
                                </Link>
                            </li>
                        </div>

                        <div className="col text-center">
                            <li className="nav-item ">
                                <Link
                                    className={`nav-link ${selectedLink === "postjob" ? 'active text-white bg-dark' : ''}`}
                                    // to="/jobhistory"
                                    onClick={() => handleLinkClick('postjob')}
                                >
                                    Post Job
                                </Link>
                            </li>
                        </div>

                        <div className="col text-center">
                            <li className="nav-item ">
                                <Link
                                    className={`nav-link ${selectedLink === "workerdetails" ? 'active text-white bg-dark' : ''}`}
                                    // to="/updateprofile"
                                    onClick={() => handleLinkClick('workerdetails')}
                                >
                                    Worker Details
                                </Link>
                            </li>
                        </div>

                        <div className="col text-center">
                            <li className="nav-item ">
                                <Link
                                    className={`nav-link ${selectedLink === "payment" ? 'active text-white bg-dark' : ''}`}
                                    // to="/payment"
                                    onClick={() => handleLinkClick('payment')}
                                >
                                    Payment
                                </Link>
                            </li>
                        </div>

                        <div className="col text-center">
                            <li className="nav-item ">
                                <Link
                                    className={`nav-link ${selectedLink === "updateprofile" ? 'active text-white bg-dark' : ''}`}
                                    // to="/updateprofile"
                                    onClick={() => handleLinkClick('updateprofile')}
                                >
                                    Update Profile
                                </Link>
                            </li>
                        </div>

                        <div className="col text-center">
                            <li className="nav-item">
                                <button className="btn btn-outline-danger" onClick={handleLogout}>
                                    Logout
                                </button>
                            </li>
                        </div>
                    </div>
                </ul>
            </div>
            <div>{renderComponent()}</div>
        </div>
    );
}
