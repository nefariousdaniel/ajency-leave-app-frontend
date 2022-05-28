import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"

export default function EmployeeLeaves() {
    let navigate = useNavigate();
    var [leaves, setLeaves] = useState();
    async function handleEmployeeLeaves() {
        try {
            var response = await fetch("https://115q5lk5gk.execute-api.ap-south-1.amazonaws.com/prod/get-employee-leaves", {
                method: "POST",
                mode: "cors",
                body: JSON.stringify({token: sessionStorage.getItem("token")})
            });
            if(response.status === 401) navigate("/")
            response = await response.json();
            setLeaves(response);
        } catch (e) {
            navigate("/")
        }
    }
    useEffect(() => {
        handleEmployeeLeaves();
    },[])

    async function handleLeaveStatus(id, status, event) {
        event.target.lastChild.classList.remove("d-none")
        
        let postData = {
            "id": id,
            "status": status,
            "token": sessionStorage.getItem("token")
        }
        var response = await fetch("https://115q5lk5gk.execute-api.ap-south-1.amazonaws.com/prod/set-leave-status",{
            method: "POST",
            mode: "cors",
            body: JSON.stringify(postData),
            headers:{
                "Content-Type": "application/json"
            }
        });
        if(response.status == 200){
            response = await response.json();
            handleEmployeeLeaves()
        }

    }

    return (
        <div className="row position-relative">
            <div className="d-flex justify-content-between align-items-center sticky-top bg-secondary py-3 px-4">
                <h4 className="text-warning">Employee Leave</h4>
                <Link to={"/"} role="button" className="btn-close" />
            </div>

            

            <div className="mt-3 py-1 px-4">
                <ul className="list-group">
                    {
                        leaves && leaves.map(el => {
                            let ActionButtons = <div className="d-flex align-items-center gap-2 my-3">
                            <button className="btn btn-primary w-100" onClick={(e) => { handleLeaveStatus(el["Record ID"], "Approved",e) }}>
                                <span>Accept</span>
                                <span className="spinner-border spinner-border-sm text-light ms-2 d-none"></span>
                            </button>
                            <button className="btn btn-danger w-100" onClick={(e) => { handleLeaveStatus(el["Record ID"], "Rejected",e) }}>
                                <span>Reject</span>
                                <span className="spinner-border spinner-border-sm text-light ms-2 d-none"></span>
                            </button>
                            </div>;

                            return (
                                <li className="list-group-item" key={el["Record ID"]}>
                                    <h4>{el["Leave Reason"]}</h4>
                                    <p className="my-0">Name: {el["Name"]}</p>
                                    <p className="my-0">Email: {el["Email"]}</p>
                                    <p className="my-0">Start Date: {new Date(el["Start Date"]).toDateString()}</p>
                                    <p className="my-0">End Date: {new Date(el["End Date"]).toDateString()}</p>
                                    <p className="my-0">Request Date: {new Date(el["Request Date"]).toDateString()}</p>
                                    <p className="my-0">Number of Days: {el["Number of Days"]}</p>
                                    <p className="my-0">Leave Type: {el["Leave Type"]}</p>
                                    <p className="my-0">Status: {el["Status"] === undefined ? "Pending" : el["Status"]}</p>
                                        
                                    {el["Status"] === undefined ? ActionButtons : ""}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}