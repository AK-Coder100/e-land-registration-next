'use client'
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"

const Preview = () => {
    const router = useRouter()
    const searchParams = useSearchParams();
    const [reciptData, setReciptData] = useState({
        "id": "",
        "fullName": "",
        "surveyNumber": "",
        "address": "",
        "email": "",
        "area": "",
        "phoneNumber": "",
        "aadharNumber": "",
        "reciptNo": "",
        "createdAt": "",
        "status":''
    })

    function showErrors(response) {
        if (response.status === false && response.errors && response.errors.length > 0) {
            alert("Errors:\n" + response.errors.join("\n"));
        } else if (response.message) {
            alert(response.message);
        } else {
            alert("Unknown error occurred.");
        }
    }
    const updateResite = async () => {

        if(reciptData.status != 'generated') {
            await Swal.fire({
                title: "Warning",
                text: "Already Generated",
                icon: "warning",
                // showCancelButton: true,
                confirmButtonColor: "#3085d6",
                // cancelButtonColor: "#d33",
                confirmButtonText: "OK",
                // cancelButtonText: "Cancel"
            })
            router.replace('/user/receipt/inbox')
            return
        }
        try {
            const response = await fetch("http://localhost:8080/api/land/update-recipt-status", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    mode: 'no-cors',
                    authrization: document.cookie.split("token=")[1]
                },
                body: JSON.stringify({
                    id: reciptData.id,
                    status: "submitted"
                })
            });
            const res = await response.json()
            if (res.status) {
                const acc = await Swal.fire({
                    title: "Confirmation",
                    text: "File successfull",
                    icon: "success",
                    // showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    // cancelButtonColor: "#d33",
                    confirmButtonText: "Proceed",
                    // cancelButtonText: "Cancel"
                })
                
                router.replace('/user/receipt/inbox')
            }
        } catch {

        }
    }
    const getReciptData = async () => {
        const requestedReceiptId = searchParams.get('preview')
        const newPayload = {}
        const response = await fetch(`http://localhost:8080/api/land/get-recipt/${requestedReceiptId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                mode: 'no-cors',
                authrization: document.cookie.split("token=")[1]
            },
            // credentials: "include",
            body: JSON.stringify(newPayload)
        });


        const res = await response.json()
        if (response.ok) {
            const data = res.data
            console.log(data)
            setReciptData({
                "id": data._id,
                "username": "---",
                "fullName": data.full_name,
                "surveyNumber": data.survey_no,
                "address": data.address,
                "email": data.email,
                "area": data.area,
                "phoneNumber": data.phone,
                "aadharNumber": data.aadhar,
                "reciptNo": data.receiptId,
                "status":data.status,
                "createdAt": new Date(data.createdAt).toLocaleDateString() + " " + new Date(data.createdAt).toLocaleTimeString()
            })
        } else {
            showErrors(res)
        }
    }
    useEffect(() => {
        getReciptData()
    }, [searchParams])
    return (
        <>
            <section className="tab3-sec">
                <div className="acknowledge-navbar">
                    <div className="acknowledge-nav-buttons">
                        <button className="acknowledge-nav-btn">Movement</button>
                        <button className="acknowledge-nav-btn">Copy</button>
                        <button className="acknowledge-nav-btn">Send</button>
                        <button className="acknowledge-nav-btn">Put in a file</button>
                        <button className="acknowledge-nav-btn">Edit</button>
                        <button className="acknowledge-nav-btn">Attach ▼</button>
                        <button className="acknowledge-nav-btn">Draft</button>
                        <button className="acknowledge-nav-btn">Close</button>
                        <button className="acknowledge-nav-btn">Generate Acknowledgment</button>
                    </div>
                    <div className="acknowledge-header-text">
                        E Receipt No: {reciptData.reciptNo} | Subject: Land Record Management
                    </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }} >
                    <div className="acknowledge-container">
                        <div className="acknowledge-letter-section">
                            <div className="acknowledge-letter">
                                <h2>Acknowledgment Letter</h2>
                                <br />
                                <p>Date: {new Date().toLocaleDateString()}</p>
                                <p>To</p>
                                <p>Subject: Land Record </p>
                                <p>I am writing to acknowledge your request for land record management regarding the land located at {
                                    reciptData.address}. We have received your application and the following details:</p>
                                <br />
                                <ul>
                                    <li>Application Number: {reciptData.reciptNo}</li>
                                    <li>User Name: {reciptData.fullName}</li>
                                    <li>Aadhar Number: {reciptData.aadharNumber}</li>
                                    <li>Mobile Number: {reciptData.phoneNumber}</li>
                                    <li>Email: {reciptData.email}</li>
                                    <li>Address: {reciptData.address}</li>
                                    <li>Land Type: Agriculture</li>
                                    <li>Survey Number: {reciptData.surveyNumber}</li>
                                    <li>Location: {reciptData.address}</li>
                                    <li>Total Area: {reciptData.area}</li>
                                </ul>
                                <br />
                                <p>We will process your request and provide further updates. Please contact us for any queries.</p>

                            </div>
                        </div>
                    </div>
                    <div className="acknowledge-form-section">
                        <div className="acknowledge-header">
                            Receipt No: {reciptData.reciptNo} | Subject: Land Record Management
                        </div>
                        <div className="acknowledge-form-group">
                            <label className="acknowledge-label">Receipt ID</label>
                            <input type="text" className="acknowledge-input" value={reciptData.reciptNo} readOnly />
                        </div>
                        <h3>Basic Details</h3>
                        <div className="acknowledge-form-columns">
                            <div className="acknowledge-column">
                                <div className="acknowledge-form-group">
                                    <label className="acknowledge-label">Date & Time:</label>
                                    <input type="text" className="acknowledge-input" value={reciptData.createdAt} readOnly />
                                </div>
                                <div className="acknowledge-form-group">
                                    <label className="acknowledge-label">Application Number:</label>
                                    <input type="text" className="acknowledge-input" value={reciptData.reciptNo} readOnly />
                                </div>
                                <div className="acknowledge-form-group">
                                    <label className="acknowledge-label">User Name:</label>
                                    <input type="text" className="acknowledge-input" value={reciptData.fullName} readOnly />
                                </div>
                            </div>
                            <div className="acknowledge-column">
                                <div className="acknowledge-form-group">
                                    <label className="acknowledge-label">Aadhar Number:</label>
                                    <input type="text" className="acknowledge-input" value={reciptData.aadharNumber} readOnly />
                                </div>
                                <div className="acknowledge-form-group">
                                    <label className="acknowledge-label">Mobile Number:</label>
                                    <input type="text" className="acknowledge-input" value={reciptData.phoneNumber} readOnly />
                                </div>
                                <div className="acknowledge-form-group">
                                    <label className="acknowledge-label">Email:</label>
                                    <input type="email" className="acknowledge-input" value={reciptData.email} readOnly />
                                </div>
                            </div>
                        </div>
                        <div className="acknowledge-form-group">
                            <label className="acknowledge-label">Address:</label>
                            <input type="text" className="acknowledge-input" value={reciptData.address} readOnly />
                        </div>
                        <h3>Land Details</h3>
                        <div className="acknowledge-form-columns">
                            <div className="acknowledge-column">
                                <div className="acknowledge-form-group">
                                    <label className="acknowledge-label">Land Type:</label>
                                    <input type="text" className="acknowledge-input" value="Agriculture" readOnly />
                                </div>
                                <div className="acknowledge-form-group">
                                    <label className="acknowledge-label">Survey Number:</label>
                                    <input type="text" className="acknowledge-input" value={reciptData.surveyNumber} readOnly />
                                </div>
                                <div className="acknowledge-form-group">
                                    <label className="acknowledge-label">Total Area:</label>
                                    <input type="text" className="acknowledge-input" value={reciptData.area} readOnly />
                                </div>
                            </div>
                            <div className="acknowledge-column">
                                <div className="acknowledge-form-group">
                                    <label className="acknowledge-label">Location:</label>
                                    <input type="text" className="acknowledge-input" value={reciptData.address} readOnly />
                                </div>
                            </div>
                        </div>
                        <button className="acknowledge-button" onClick={updateResite}>Submit</button>

                    </div>
                </div>
                <footer className="acknowledge-footer">
                    Copyright © 20205, designed and developed by NTTW
                </footer>
            </section >
        </>
    )
}

export default Preview