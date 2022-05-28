import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
export default function ViewLeaves() {

    var [leaves, setLeaves] = useState();
    async function handleViewLeaves() {
        var response = await fetch("https://115q5lk5gk.execute-api.ap-south-1.amazonaws.com/prod/get-user-leaves", {
            method: "POST",
            mode: "cors",
            body: JSON.stringify({token: sessionStorage.getItem("token")}),
            headers:{"Content-type":"application/json"}
        });
        response = await response.json();
        console.log(response)
        setLeaves(response);
    }
    useEffect(() => {
        handleViewLeaves();
    }, [])

    return (
        <div className="row position-relative">
            <div className="d-flex justify-content-between align-items-center sticky-top bg-secondary py-3 px-4">
                <h4 className="text-warning">View Leave</h4>
                <Link to={"/"} role="button" className="btn-close" />
            </div>

            <div className="mt-3 py-4 px-4">
                <ul className="list-group">
                    {
                        leaves && leaves.map(el => {
                            return (
                                <li className="list-group-item" key={el["Record ID"]}>
                                    <h4>{el["Leave Reason"]}</h4>
                                    <p className="my-0">Start Date: {new Date(el["Start Date"]).toDateString()}</p>
                                    <p className="my-0">End Date: {new Date(el["End Date"]).toDateString()}</p>
                                    <p className="my-0">Request Date: {new Date(el["Request Date"]).toDateString()}</p>
                                    <p className="my-0">Number of Days: {el["Number of Days"]}</p>
                                    <p className="my-0">Leave Type: {el["Leave Type"]}</p>
                                    <p className="my-0">Status: {el["Status"] === undefined?"Pending":el["Status"]}</p>
                                </li>
                            )
                        })
                    }

                </ul>
            </div>
        </div>
    )
}