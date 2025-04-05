import { useEffect, useState } from "react"
import Modal from "../Modal"

const closeButtonStyle = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#555',
    fontSize: '25px'
  };
export const ViewRecipt = ({ landId, onClose }) => {
    const [reciptData, setReciptData] = useState({})

    function showErrors(response) {
        if (response.status === false && response.errors && response.errors.length > 0) {
            alert("Errors:\n" + response.errors.join("\n"));
        } else if (response.message) {
            alert(response.message);
        } else {
            alert("Unknown error occurred.");
        }
    }
    const getReciptData = async (requestedReceiptId) => {
        if (!requestedReceiptId) return
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
            setReciptData({
                "id": data._id,
                "fullName": data.full_name,
                "surveyNumber": data.survey_no,
                "address": data.address,
                "email": data.email,
                "area": data.area,
                "phoneNumber": data.phone,
                "aadharNumber": data.aadhar,
                "reciptNo": data.receiptId,
                "status": data.status,
                "createdBy": data.createdBy,
                "createdAt": new Date(data.createdAt).toLocaleDateString() + " " + new Date(data.createdAt).toLocaleTimeString()
            })
        } else {
            showErrors(res)
        }
    }
    useEffect(() => {
        getReciptData(landId)
    }, [landId])
    return (
        <Modal isOpen={!!landId} onClose={onClose}  >
            <div style={{fontSize: '20px', fontWeight: 'bold', display:'flex', justifyContent: 'space-between', marginBottom: '10px'}} >
                <p>Recipt Details</p>
                <button
                    style={closeButtonStyle}
                    onClick={onClose}
                >
                    &times;
                </button>
            </div>
            {Object.entries(reciptData).map(([key, val]) => {
                return <p key={key} style={{ fontSize: '15px', marginBottom: '5px' }} >{key} - {val}</p>
            })}
        </Modal>
    )
}