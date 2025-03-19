'use client'
import { useCallback, useEffect, useState } from 'react'
import './create.css'
import Preview from './preview'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default () => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams();
    const [landData, setLandData] = useState({})
    const [showPreview, setShowPreview] = useState(false)
    const removePDF = () => {
        setLandData((e) => ({ ...e, file: '' }))
    }
    
    function showErrors(response) {
        if (response.status === false && response.errors && response.errors.length > 0) {
            alert("Errors:\n" + response.errors.join("\n"));
        } else if (response.message) {
            alert(response.message);
        } else {
            alert("Unknown error occurred.");
        }
    }
    const createQueryString = useCallback(
        (name, value) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)

            return params.toString()
        }, [searchParams])

    const handleReciptSubmit = async (e) => {
        e.preventDefault();
        if (!landData.file) {
            alert('Please upload a PDF file before submitting.');
            return;
        }
        let formData = new FormData(e.target);
        const payload = Object.fromEntries(formData)
        const newPayload = {
            full_name: payload.fullName,
            phone: payload.phoneNumber,
            aadhar: payload.aadharNumber,
            dob: payload.dob,
            owner_name: payload.ownerName,
            survey_no: payload.surveyNumber,
            ...payload
        }
        try {
            const response = await fetch("http://localhost:8080/api/land/generate-recipt", {
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
                alert(res.message);
                router.push(pathname + '?' + createQueryString('preview', res.data.reciptNo))
            } else {
                showErrors(res)
            }
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        const recipNo = searchParams.get('preview')
        setShowPreview(!!recipNo)
    }, [searchParams])
    return (
        <>
            {!showPreview ? <section className="tab3-sec">
                <div className="land-request-container">
                    <div className="land-request-doc-viewer">
                        {!landData.file ? <div className="land-request-pdf-display" id="land-request-pdf-display">
                            <p>Document Viewer (Placeholder for uploaded document)</p>
                        </div> :
                            <iframe style={{ height: '100%' }} src={landData.file} ></iframe>}
                    </div>

                    <div className="land-request-form-section">
                        <form id="land-request-form" onSubmit={handleReciptSubmit} >
                            <div className="land-request-upload-section">
                                <input type="file" id="land-request-pdf-upload" name="land-request-pdf-upload"
                                    accept="application/pdf" onChange={(e) => setLandData({ ...landData, file: URL.createObjectURL(e.target.files[0]) })} className="land-request-input" style={{ display: 'none' }} />
                                <button type="button" className="land-request-upload-btn" ><label
                                    htmlFor="land-request-pdf-upload">Upload ↑</label></button>
                                <button type="button" className="land-request-remove-btn" onClick={removePDF}>Remove ×</button>
                                <span className="land-request-pdf-info">PDF Only ≤ 20 MB *</span>
                            </div>

                            <h3 className="land-request-heading">Personal Details</h3>
                            <div className="land-request-form-columns">
                                <div className="land-request-column">
                                    <div className="land-request-form-group">
                                        <label className="land-request-label" htmlFor="land-request-fullName">Full Name:</label>
                                        <input type="text" id="land-request-fullName" name="fullName" className="land-request-input"
                                            required />
                                    </div>
                                    <div className="land-request-form-group">
                                        <label className="land-request-label" htmlFor="land-request-email">Email:</label>
                                        <input type="email" id="land-request-email" name="email" className="land-request-input"
                                            required />
                                    </div>
                                    <div className="land-request-form-group">
                                        <label className="land-request-label" htmlFor="land-request-phoneNumber">Phone Number:</label>
                                        <input type="number" id="land-request-phoneNumber" name="phoneNumber"
                                            className="land-request-input" required />
                                    </div>
                                </div>
                                <div className="land-request-column">
                                    <div className="land-request-form-group">
                                        <label className="land-request-label" htmlFor="land-request-aadharNumber">Aadhar Number:</label>
                                        <input type="number" id="land-request-aadharNumber" name="aadharNumber"
                                            className="land-request-input" required />
                                    </div>
                                    <div className="land-request-form-group">
                                        <label className="land-request-label" htmlFor="land-request-dob">Date of Birth:</label>
                                        <input type="date" id="land-request-dob" name="dob" className="land-request-input" required />
                                    </div>
                                </div>
                            </div>

                            <h3 className="land-request-heading">Land Registration Details</h3>
                            <div className="land-request-form-columns">
                                <div className="land-request-column">
                                    <div className="land-request-form-group">
                                        <label className="land-request-label" htmlFor="land-request-ownerName">Owner Name:</label>
                                        <input type="text" id="land-request-ownerName" name="ownerName" className="land-request-input"
                                            required />
                                    </div>
                                    <div className="land-request-form-group">
                                        <label className="land-request-label" htmlFor="land-request-surveyNumber">Survey Number:</label>
                                        <input type="text" id="land-request-surveyNumber" name="surveyNumber"
                                            className="land-request-input" required />
                                    </div>
                                    <div className="land-request-form-group">
                                        <label className="land-request-label" htmlFor="land-request-area">Area (in sq. ft):</label>
                                        <input type="number" id="land-request-area" name="area" className="land-request-input" required />
                                    </div>
                                    <div className="land-request-form-group">
                                        <label className="land-request-label" htmlFor="land-request-address">Address:</label>
                                        <input type="text" id="land-request-address" name="address" className="land-request-input"
                                            required />
                                    </div>
                                </div>
                                <div className="land-request-column">
                                    <div className="land-request-form-group">
                                        <label className="land-request-label" htmlFor="land-request-state">State:</label>
                                        <input type="text" id="land-request-state" name="state" className="land-request-input" required />
                                    </div>
                                    <div className="land-request-form-group">
                                        <label className="land-request-label" htmlFor="land-request-cityDistrict">City/District:</label>
                                        <input type="text" id="land-request-cityDistrict" name="cityDistrict"
                                            className="land-request-input" required />
                                    </div>
                                    <div className="land-request-form-group">
                                        <label className="land-request-label" htmlFor="land-request-pinCode">Pin Code:</label>
                                        <input type="number" id="land-request-pinCode" name="pinCode" className="land-request-input"
                                            required />
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="land-request-button">Generate</button>
                        </form>
                    </div>
                </div>
            </section> :
                <Preview />}
        </>
    )
}