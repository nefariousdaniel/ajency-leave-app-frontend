import { useEffect, useState } from "react"
import { handleLogout, ApplyLeaveModal, handleGetUserDetails } from "./Components.jsx"
import { Link } from "react-router-dom";


function App() {
  var [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));
  useEffect(() => {
    handleGetUserDetails();
    setUser(JSON.parse(sessionStorage.getItem("user")))
  }, [])

  function ShowAdminOptions(){
    if(user["Is Admin"] === "true"){
      return (<Link to={"/employeeleaves"} role="button" className="btn btn-warning w-100">Employee Leaves</Link>)
    }
  }

  if (user !== null || "" || undefined) {
    return (
      <div className="container py-5">
        <div className="card col-12">
          <div className="card-body">
            <h5 className="card-title">Overview</h5>
            <h6 className="card-subtitle mb-2 text-muted">{user.Name}</h6>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Email: {user.Email}</li>
              <li className="list-group-item">Leave Earned Count: {user["Leave Earned Count"]}</li>
              <li className="list-group-item">Leave Taken Count: {user["Leave Taken Count"]}</li>
              <li className="list-group-item">Leave Balance: {user["Leave Balance"]}</li>
            </ul>
            <div className="border border-1 rounded p-3 d-flex flex-column flex-lg-row gap-3 align-items-center">
              <Link to={"/viewleaves"} role="button" className="btn btn-primary w-100">View Leaves</Link>
              <button className="btn btn-primary w-100" onClick={(e)=>{document.querySelector("#ApplyLeaveModal").showModal()}}>Apply Leave</button>
              <ShowAdminOptions/>
              <button onClick={(e)=>{handleLogout(e)}} className="btn btn-danger w-100">Logout</button>
            </div>
          </div>
        </div>
        <ApplyLeaveModal></ApplyLeaveModal>
      </div>
    )
  }
  else {
    return (
      <div className="mt-5 container py-5">
        <h1 className="text-center">Welcome</h1>
        <div className="d-flex flex-column gap-3 align-items-center my-5">
          <Link to={"/login"} role="button" className="col-12 col-lg-4 py-5 btn btn-primary">Login</Link>
          <Link to={"/register"} role="button" className="col-12 col-lg-4 py-5 btn btn-danger">Register</Link>
        </div>
      </div>
    )
  }
}

export default App

