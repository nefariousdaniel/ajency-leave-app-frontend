import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
export default function ViewLeaves() {

    var [leaves, setLeaves] = useState();
    async function handleViewLeaves() {
        var response = await fetch("https://leave-api-server.herokuapp.com/api/leaves/fetchUserLeaves", {
            method: "GET",
            mode: "cors",
            headers:{"Content-type":"application/json","authorization":`Bearer ${sessionStorage.getItem("token")}`}
        });
        response = await response.json();
        console.log(response)
        setLeaves(response.data);
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
                                <li className="list-group-item" key={el.fields["Record ID"]}>
                                    <h4>{el.fields["Leave Reason"]}</h4>
                                    <p className="my-0">Start Date: {new Date(el.fields["Start Date"]).toDateString()}</p>
                                    <p className="my-0">End Date: {new Date(el.fields["End Date"]).toDateString()}</p>
                                    <p className="my-0">Request Date: {new Date(el.fields["Request Date"]).toDateString()}</p>
                                    <p className="my-0">Number of Days: {el.fields["Number of Days"]}</p>
                                    <p className="my-0">Leave Type: {el.fields["Leave Type"]}</p>
                                    <p className="my-0">Status: {el.fields["Status"] === undefined?"Pending":el.fields["Status"]}</p>
                                </li>
                            )
                        })
                    }

                </ul>
            </div>
        </div>
    )
}