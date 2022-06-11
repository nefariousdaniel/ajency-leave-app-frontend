import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function handleLogout(event) {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    document.location.href = "/";
}

export async function handleGetUserDetails(){
    var response = await fetch("https://leave-api-server.herokuapp.com/api/user/fetchUserDetails",{
        mode: 'cors',
        method: "GET",
        headers:{
            "authorization": `Bearer ${sessionStorage.getItem("token")}`
        },
    });
    response = await response.json();
    sessionStorage.setItem("user",JSON.stringify(response.data));
}

export function Navbar() {
    var [token, setToken] = useState(sessionStorage.getItem("token"))

    useEffect(() => {
        setToken(sessionStorage.getItem("token"));
    })


    return (
        <nav className="navbar navbar-dark bg-dark sticky-top">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand text-warning">Ajency.in Leave App</Link>
            </div>
        </nav>
    )
}

export function ApplyLeaveModal() {

    async function handleApplyLeave(event) {
        event.preventDefault();
        event.target[4].childNodes[1].classList.toggle("d-none");
        event.target[4].setAttribute("disabled", "")
        var postData = {
            "startDate": event.target[0].value,
            "endDate": event.target[1].value,
            "reason": event.target[2].value === ""? "No reason Specified." : event.target[2].value,
        };

        try {
            var response = await fetch("https://leave-api-server.herokuapp.com/api/leaves/requestLeave", {
                mode: 'cors',
                body: JSON.stringify(postData),
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization":`Bearer ${sessionStorage.getItem("token")}`
                }
            });
            response = await response.json();
            event.target[4].childNodes[1].classList.toggle("d-none");
            event.target[4].removeAttribute("disabled", "")
            if (response.statusCode == 200) {
                alert(response.message);
                document.querySelector("#ApplyLeaveModal").close();
                event.target.reset();
                return;
            }
        } catch (e) {
            event.target[4].childNodes[1].classList.toggle("d-none");
            event.target[4].removeAttribute("disabled", "")
            alert(e);
        }
    }
    let today = new Date().toISOString();
    today = today.split("T");
    today = today[0]; 
    return (
        <dialog id="ApplyLeaveModal" className="border-0 col-12 col-lg-6 rounded shadow-lg">
            <h3>Apply Leave</h3>
            <form onSubmit={(e) => { e.preventDefault(); handleApplyLeave(e) }} className="mt-3">
                <div className="mb-3">
                    <label htmlFor="start_date" className="form-label">Start Date</label>
                    <input type="date" min={today} className="form-control" id="start_date" required onChange={(e) => { document.querySelector("#end_date").setAttribute("min", e.target.value) }}></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="end_date" className="form-label">End Date</label>
                    <input type="date" className="form-control" id="end_date" required ></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="reason" className="form-label">Reason</label>
                    <input type="text" className="form-control" id="reason" placeholder="Optional" ></input>
                </div>
                <div className="d-flex justify-content-between">
                    <button className="btn btn-danger" onClick={(e) => { e.preventDefault(); document.querySelector("#ApplyLeaveModal").close() }}>Cancel</button>
                    <button className="btn btn-primary" type="submit">
                        <span>Apply</span>
                        <span className="spinner-border spinner-border-sm text-light ms-2 d-none"></span>
                    </button>
                </div>
            </form>
        </dialog>
    )
}

