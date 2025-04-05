import { useEffect, useState } from "react"
import Modal from "../Modal"

const closeButtonStyle = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#555',
    fontSize: '25px'
  };
export const ViewLand = ({ landId, onClose }) => {
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
        // const newPayload = {}
        const response = await fetch(`http://localhost:8080/api/land/get-land/${requestedReceiptId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                mode: 'no-cors',
                authrization: document.cookie.split("token=")[1]
            },
            // credentials: "include",
            // body: JSON.stringify(newPayload)
        });
        const res = await response.json()
        // {
        //     "_id": "67d9571874acf2c24115c426",
        //     "applicationId": "APP-1742296856755-815",
        //     "full_name": "Abhishek Gupta",
        //     "email": "lapiteck@gmail.com",
        //     "phone": "7054916134",
        //     "aadhar": "323232323243",
        //     "dor": "2025-03-18T11:20:14.640Z",
        //     "owner_name": "truhytygjhn",
        //     "survey_no": "457657",
        //     "area": "324234",
        //     "state": "Karnataka",
        //     "pincode": "656598",
        //     "address": "near novel office, Marathahalli",
        //     "status": "pending",
        //     "reviewedBy": "",
        //     "createdBy": "67cffbb62654572801991a6c",
        //     "createdAt": "2025-03-18T11:20:56.790Z",
        //     "updatedAt": "2025-03-18T11:20:56.790Z",
        //     "__v": 0
        //   }
        if (response.ok) {
            const data = res.data
            const j = {
                "applicationId": data.applicationId,
                "full_name": data.full_name,
                "email": data.email,
                "phone": data.phone,
                "aadhar": data.aadhar,
                "Date of register": new Date(data.dor).toLocaleDateString() + " " + new Date(data.dor).toLocaleTimeString(),
                "owner_name": data.owner_name,
                "survey_no": data.survey_no,
                "area": data.area,
                "state": data.state,
                "pincode": data.pincode,
                "address": data.address,
                "status": data.status,
                "reviewedBy": data.reviewedBy,
                "createdBy":data.createdBy,
                "createdAt": new Date(data.createdAt).toLocaleDateString() + " " + new Date(data.createdAt).toLocaleTimeString(),
                "updatedAt": new Date(data.updatedAt).toLocaleDateString() + " " + new Date(data.updatedAt).toLocaleTimeString(),
              }
            setReciptData(j)
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
                <p>Land Details</p>
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