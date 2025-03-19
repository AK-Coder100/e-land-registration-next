'use client'

import { useEffect, useState } from "react"

export default () => {

    const [userData, setUserData] = useState({
        name:'',
        username:'',
        mobileno:'',
        aadhar:''
    })

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user')) || {}
        setUserData(user)
    },[])
    return (
        <div className="row" id="user-dashboard-tab1">
            <div className="container-section">
                <div className="section">
                    <div className="section-header">File Details</div>
                    <div className="form-group">
                        <label>Data Not Available</label>
                    </div>
                    <div className="green-line"></div>
                </div>

                <div className="section">
                    <div className="section-header">User & Login Details</div>
                    <div className="form-group">
                        <label>Username</label>
                        <input defaultValue={userData.username} name="userName" type="text" readOnly disabled/>
                    </div>

                    <div className="form-group">
                        <label>PhoneNumber</label>
                        <input defaultValue={userData.mobileno} name="mobileno" type="text" readOnly disabled/>
                    </div>

                    <div className="form-group">
                        <label>AadharNumber</label>
                        <input defaultValue={userData.aadhar} name="addharNumber" type="text" readOnly disabled/>
                    </div>
                </div>

                <div className="section roles-section">
                    <div className="section-header">Current Assigned Roles</div>
                    <div className="form-group">
                        <label>User</label>
                    </div>
                    <div className="roles-history-tab">Roles History »</div>

                </div>
            </div>

            <div className="alerts-section">
                <div className="section1">
                    <div className="section-header">Alerts and Notification</div>
                </div>
            </div>
        </div>
    )
}