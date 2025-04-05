'use client'

import { ViewLand } from "@/components/Model/ViewLand"
import { useEffect, useState } from "react"
export default () => {
    const [landList, setLandList] = useState([])
    const [paginationData, setPaginationData] = useState({
        currentPage: 0,
        totalPages: 0
    })
    const [landToPreView, setLandToPreView] = useState("")
    const [loadingStatus, setLoadingStatus] = useState(0) // 0 => none, 1 => loading
    const [userData, setUserData] = useState({
        name: '',
        username: '',
        mobileno: '',
        aadhar: ''
    })

    function showErrors(response) {
        if (response.status === false && response.errors && response.errors.length > 0) {
            alert("Errors:\n" + response.errors.join("\n"));
        } else {
            alert("Unknown error occurred.");
        }
    }
    const getLandList = async (page = 1) => {
        try {
            setLoadingStatus(1)
            const response = await fetch("http://localhost:8080/api/land/list-all", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    mode: 'no-cors',
                    authrization: document.cookie.split("token=")[1]
                },
                body: JSON.stringify({
                    reviewedBY: 'revenuedepartmentofficer',
                    page: page,
                    limit: 10
                })
            });
            setLoadingStatus(0)
            const res = await response.json()
            if (res.status) {
                setLandList(res.data)
                setPaginationData({
                    currentPage: res.pagination.currentPage,
                    totalPages: res.pagination.totalPages
                })
            }

        } catch {

        }
    }

    const updateStatus = async (status, id) => {
        try {
            const response = await fetch("http://localhost:8080/api/land/update-status", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    mode: 'no-cors',
                    authrization: document.cookie.split("token=")[1]
                },
                body: JSON.stringify({ status, id, reviewedBY: "jointcollector" })
            });
            if (response.ok) {
                alert('updated')
                getLandList()
            }
        } catch (error) {

        }
    }
    const changePage = (page) => {
        if (loadingStatus == 0 && page > 0 && page <= paginationData.totalPages) {
            getLandList(page)
        }
    }
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('official')) || {}
        setUserData(user)
        getLandList()
    }, [])
    return (
        <>
            <div className="body-container">
                <div className="content" style={{ flexGrow: '1' }}>
                    <div id="pendingApplicationsSection" className="rectangle">
                        <div className="rectangle-title">
                            <i className="fas fa-clipboard-list"></i>
                            <span>Pending Applications</span>
                        </div>
                        <div className="rectangle-notes">
                            Process and manage pending land record applications.
                        </div>
                        <div className="quick-actions">
                            <button className="action-button">
                                <i className="fas fa-filter"></i>
                                Filter
                            </button>
                            <button className="action-button">
                                <i className="fas fa-sort"></i>
                                Sort
                            </button>
                            <div className="search-box">
                                <input type="text" placeholder="Search applications..." />
                                <button><i className="fas fa-search"></i></button>
                            </div>
                        </div>
                        {loadingStatus == 1 && <div>Loading...</div>}
                        <div className="applications-table">
                            <table className="records-table">
                                <thead>
                                    <tr>
                                        <th>Application ID</th>
                                        <th>Servey No</th>
                                        <th>Owner Name</th>
                                        <th>Area</th>
                                        <th>Address</th>
                                        <th>Created At</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {landList.map((record) => {
                                        return (
                                            <tr key={record._id} >
                                                <td>{record.applicationId}</td>
                                                <td>{record.survey_no}</td>
                                                <td>{record.owner_name}</td>
                                                <td>{record.area}</td>
                                                <td>{record.address}</td>
                                                <td>{new Date(record.createdAt).toLocaleDateString()}</td>
                                                <td> <span className={`status-badge ${record.status}`} >{record.status}</span></td>
                                                <td>
                                                    <div className="action-icons">
                                                        <i onClick={() => setLandToPreView(record._id)} className="fas fa-eye" title="View Details"></i>
                                                        <i onClick={() => updateStatus('approved', record._id)} className="fas fa-check-circle" title="Approve"></i>
                                                        <i onClick={() => updateStatus('rejected', record._id)} className="fas fa-times-circle" title="Reject"></i>
                                                        <i className="fas fa-comment" title="Add Comment"></i>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div id="land-list-pagination" className="pagination">
                            <button onClick={() => changePage(paginationData.currentPage - 1)} className="page-button">
                                <i className="fas fa-chevron-left"></i>
                            </button>
                            <div className="pagination-btn" style={{ display: 'flex', gap: '3px' }}>
                                {new Array(paginationData.totalPages).fill('').map((page, index) => {
                                    return (
                                        <button key={index} className={`page-button ${index + 1 == paginationData.currentPage ? 'active' : ''}`}
                                            onClick={() => changePage(index + 1)}
                                        >{index + 1}</button>
                                    )
                                })}
                            </div>
                            <button onClick={() => changePage(paginationData.currentPage + 1)} className="page-button">
                                <i className="fas fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ViewLand landId={landToPreView} onClose={() => setLandToPreView('')} />
        </>
    )
}
