'use client'

import { useEffect, useState } from "react";

import { ViewLand } from "@/components/Model/ViewLand";
export default () => {
    const [recilList, setReciptList] = useState([])
    const [landToPreView, setLandToPreView] = useState("")

    var getLandList = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/land/get-recipt-list", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    mode: 'no-cors',
                    authrization: document.cookie.split("token=")[1]
                },
                body: JSON.stringify({
                    page: 1,
                    limit: 10,
                    status: ['submitted']
                })
            });
            const res = await response.json()
            if (res.status) {
                setReciptList(res.data)

            }
        } catch {

        }
    }
    useEffect(() => {
        getLandList()
    }, [])
    return (
        <>
            <ViewLand landId={landToPreView} />
            <table className="doc-table-container">
                <thead>
                    <tr>
                        <th >SN</th>
                        <th>Survey No.</th>
                        <th>Owner name</th>
                        {/* <th>Sent To</th> */}
                        <th>Address</th>
                        <th>Sent On</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="receipt-pending-list">

                    {recilList.length ? recilList.map((e, index) => <tr key={index} >
                        <td>{index + 1}</td>
                        <td>{e.survey_no}</td>
                        <td>{e.owner_name}</td>
                        {/* <td>Clerk</td> */}
                        <td>{e.address}</td>
                        <td>{new Date(e.updatedAt).toLocaleDateString()} {new Date(e.updatedAt).toLocaleTimeString()}</td>
                        <td><span className={`status-badge ${e.status}`} >{e.status}</span></td>
                        <td>
                            <div className="action-icons">
                                <i className="fas fa-eye" title="View" onClick={() => setLandToPreView(e._id)}></i>
                                <i className="fas fa-download" title="Download"></i>
                            </div>
                        </td>
                    </tr>) :
                        <tr>
                            <td colSpan="9" style={{ textAlign: 'center' }}>No Record(s) Found</td>
                        </tr>}
                </tbody>
            </table>
        </>
    )
}