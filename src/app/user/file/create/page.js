'use client'
import { useCallback, useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Swal from 'sweetalert2'

export default () => {
    const defaultSelectedData = {
        survey_no: '',
        area: '',
        status: "",
        address: ''
    }
    const [reciptList, setReciptList] = useState([])
    const [selectedReciptData, setSelectedReciptData] = useState({ ...defaultSelectedData })
    const router = useRouter()

    function showErrors(response) {
        if (response.status === false && response.errors && response.errors.length > 0) {
            alert("Errors:\n" + response.errors.join("\n"));
        } else if (response.message) {
            alert(response.message);
        } else {
            alert("Unknown error occurred.");
        }
    }
    const handleChange = (e) => {
        setUserFormData({
            ...selectedReciptData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSurveyChange = (event) => {
        const survey = reciptList.find(e => e.survey_no == event.target.value)
        if (survey) {
            setSelectedReciptData(survey)
        } else {
            setSelectedReciptData()
        }
    }

    const updateResite = async () => {
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
                    id: selectedReciptData._id,
                    status: "file"
                })
            });
            const res = await response.json()
            if (res.status) {
                const acc = await Swal.fire({
                    title: "Confirmation",
                    text: "File successfull",
                    icon: "warning",
                    // showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    // cancelButtonColor: "#d33",
                    confirmButtonText: "Proceed",
                    // cancelButtonText: "Cancel"
                })

                router.replace('/user/file/inbox')
            }
        } catch {
            showErrors(error)
        }
    }
    const getReiceptList = async () => {
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
                    status: 'submitted'
                })
            });
            const res = await response.json()
            if (res.status) {
                setReciptList(res.data)
            } else {
                showErrors(res)
            }
        } catch (error) {
            showErrors(error)
        }
    }
    useEffect(() => {
        getReiceptList()
    }, [])

    return (
        <>
            <section className="file_create-sec">
                <div className="file_create-container">
                    <div className="file_create-header">
                        <h1>Land Record</h1>
                    </div>

                    <div className="file_create-section">
                        <h2>Land Details</h2>
                        <div className="file_create-form-group">
                            <label className="file_create-label" htmlFor="survey_number">Choose Survey Number:</label>
                            <select value={selectedReciptData.survey_no}
                                onChange={handleSurveyChange} className="file_create-select" id="survey_number" name="survey_number" required>
                                <option value="">-- Select Survey Number --</option>
                                {reciptList.map((e) => {
                                    return <option key={e.survey_no} value={e.survey_no}>{e.survey_no}</option>
                                })}
                            </select>
                        </div>
                        <div className="file_create-form-group">
                            <label className="file_create-label" htmlFor="total-area">Total Area (in acres/hectares)</label>
                            <input value={selectedReciptData.area} className="file_create-input" type="text" id="total-area" readOnly disabled />
                        </div>
                        <div className="file_create-form-group">
                            <label className="file_create-label" htmlFor="purpose">Purpose</label>
                            <div className="file_create-dropdown-group">
                                <select className="file_create-select" id="purpose-file">
                                    <option value="">File No.</option>
                                    <option value="file1">File 1</option>
                                    <option value="file2">File 2</option>
                                </select>
                                <select className="file_create-select" id="purpose-choice1">
                                    <option value="">Choose One</option>
                                    <option value="choice1">Choice 1</option>
                                    <option value="choice2">Choice 2</option>
                                </select>
                                <select className="file_create-select" id="purpose-choice2">
                                    <option value="">Choose One</option>
                                    <option value="choice1">Choice 1</option>
                                    <option value="choice2">Choice 2</option>
                                </select>
                                <select className="file_create-select" id="purpose-choice3">
                                    <option value="">Choose One</option>
                                    <option value="choice1">Choice 1</option>
                                    <option value="choice2">Choice 2</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="file_create-section">
                        <h2>Land Address</h2>
                        <div className="file_create-form-group">
                            <textarea value={selectedReciptData.address} onChange={handleChange} className="file_create-textarea" id="land-address" readOnly disabled></textarea>
                        </div>
                    </div>

                    <div className="file_create-section">
                        <h2>Other Details</h2>
                        <div className="file_create-form-group">
                            <label className="file_create-label" htmlFor="remarks">Remarks</label>
                            <textarea value={selectedReciptData.remark} className="file_create-textarea" id="remarks" placeholder="Enter remarks"></textarea>
                        </div>
                    </div>

                    <div className="file_create-submit-btn">
                        <button className="file_create-btn" onClick={() => updateResite('file')}>Continue Working</button>
                    </div>
                </div>

            </section>
        </>
    )
}