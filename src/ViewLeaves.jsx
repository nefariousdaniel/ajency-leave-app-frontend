import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
export default function ViewLeaves() {

    var [leaves, setLeaves] = useState();
    async function handleViewLeaves() {
        var response = await fetch("http://localhost:5000/api/leaves", {
            method: "GET",
            mode: "cors",
            headers: {
                token: sessionStorage.getItem("token")
            }
        });
        response = await response.json();
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
                                    <p className="my-0">Start Date: {el["Start Date"]}</p>
                                    <p className="my-0">End Date: {el["End Date"]}</p>
                                    <p className="my-0">Request Date: {el["Request Date"]}</p>
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