'use client'

import { ViewRecipt } from "@/components/Model/ViewRecipt";
import { useEffect, useState } from "react";


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
                    status: 'file'
                })
            });
            const res = await response.json()
            if (res.status) {
                setReciptList(res.data)
                //         const tbody = document.getElementById('receipt-pending-list')
                //         tbody.innerHTML = ''
                //         res.data.forEach((rowData, index) => {
                //             const idss = rowData._id
                //             dataList[`${idss}`] = rowData
                //             const row = document.createElement('tr')
                //             const rowD = `<tr>
                //     <td>${index+1}</td>
                //     <td>${rowData.survey_no}</td>
                //     <td>${rowData.owner_name}</td>
                //     <td>Clerk</td>
                //     <td>${rowData.address}</td>
                //     <td>${new Date(rowData.updatedAt).toLocaleDateString()} ${new Date(rowData.updatedAt).toLocaleTimeString()}</td>
                //     <td><span className="status-badge ${rowData.status}" >${rowData.status}</span></td>
                //     <td>
                //       <div className="action-icons">
                //         <i className="fas fa-eye" onclick="showUserData('${rowData._id}')" title="View"></i>
                //         <i className="fas fa-download" onclick="downloadPDF('${rowData._id}')" title="Download"></i>
                //       </div>
                //     </td>
                //   </tr>`
                //             row.innerHTML = rowD
                //             tbody.appendChild(row)
                //         })

            }
        } catch {

        }
    }
    useEffect(() => {
        getLandList()
    }, [])
    return (
        <>
            <ViewRecipt landId={landToPreView} onClose={() => setLandToPreView('')} />
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
                                <i className="fas fa-eye" title="View" onClick={() => setLandToPreView(e.receiptId)} ></i>
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