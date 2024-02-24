import { useEffect, useState } from "react";

export default function ApproveProvider() {
  const [obj1, setObj] = useState("");
  const [approvalMessage, setApprovalMessage] = useState("");
  const [deleteMsg, setdeleteMsg] = useState("");

  var userinfo;
  if (localStorage.getItem("loggedUser") != null) {
    userinfo = JSON.parse(localStorage.getItem("loggedUser"));
    console.log(userinfo);
  }

  const approveProvider = (user_id) => {
    console.log(user_id);
    fetch(`http://localhost:8080/approve?id=${user_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/text",
        "Authorization": `Bearer ${userinfo.accessToken}`,},
    })
      .then((response) => response.text())
      .then((data) => {
        console.log("Provider approved successfully:", data);
        setObj((prevObj) =>
          prevObj.filter((provider) => provider.id !== user_id)
        );
  
        setApprovalMessage(`Provider ${user_id} has been approved.`);
  
        setTimeout(() => {
          setApprovalMessage("");
        }, 3000);
      });
  };
  
  const rejectProvider = (provider_id) => {
    console.log(`provider deleted ${provider_id}`);
    setObj((prevObj) =>
      prevObj.filter((provider) => provider.provider_id !== provider_id)
    );
  
    setdeleteMsg(`Provider ${provider_id} has been rejected.`);
    setTimeout(() => {
      setdeleteMsg("");
    }, 3000);
  };
  

  useEffect(() => {
    if (localStorage.getItem("loggedUser")) {
      var userData = JSON.parse(localStorage.getItem("loggedUser"));
      console.log("User data:", userData);
    } else {
      console.log("User data does not exist.");
    }

    console.log("in show request");
    fetch(`http://localhost:8080/getProviderRegRequests`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${userinfo.accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(JSON.stringify(data));
        setObj(data);
      });
  }, []);
  
  var arr = [];
  for (var i = 0; i < obj1.length; i++) {
    console.log(i);
    console.log(obj1[i]);
    arr.push(obj1[i]);
  }
  return (
    <>
      {/* <h4>Welcome to show request page </h4> */}
      <div className="container mt-5 mb-5 border border-dark rounded ">
        <div className="mt-3 mb-5 display-5 text-center">Provider Requests</div>
        {approvalMessage && (
          <div className="alert alert-success">{approvalMessage}</div>
        )}
        {deleteMsg && <div className="alert alert-danger">{deleteMsg}</div>}
        <table className="table table-bordered table-hover rounded">
          <thead className="thead-dark">
            <tr>
              <th scope="col">provider ID</th>
              <th scope="col">First Name</th>
              <th scope="col">Middle Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Organization Name</th>
              <th scope="col">Approve</th>
              {/* <th scope="col">Delete</th> */}
            </tr>
          </thead>
          <tbody>
            {arr.map((v) => (
              <>
                <tr key={v.provider_id}>
                  <td>{v.id}</td>
                  <td>{v.firstName}</td>
                  <td>{v.middleName}</td>
                  <td>{v.lastName}</td>
                  <td>{v.organization}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        approveProvider(v.user.id);
                      }}
                    >
                      Approve
                    </button>
                  </td>
                  {/* <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        deleteProvider(v.provider_id);
                      }}
                    >
                      Delete
                    </button>
                  </td> */}
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
