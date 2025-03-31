'use client'

import { useAppDispatch } from "@/store/hooks"
import { login } from "@/store/slices/user"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const [userFormData, setUserFormData] = useState({
        username: '',
        password: ''
    })
    const [officialFormData, setofficialFormData] = useState({
        officialId: '',
        role: '',
        password: ''
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
    const handleUserLogin = async (event) => {
        event.preventDefault();
        // Basic validation
        if (!userFormData.username || !userFormData.password) {
            alert("Please fill in all fields");
            // return;
        }
        const response = await fetch("http://localhost:8080/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                mode: 'no-cors'
            },
            body: JSON.stringify(userFormData)
        });
        const res = await response.json()
        if (!res.status || !res.data) {
            showErrors(res)
        } else {
            dispatch(login(res.data))
            // Redirect to user dashboard
            document.cookie = `token=${res.data.token}`;
            delete res.token
            localStorage.setItem('user', JSON.stringify(res.data))
            // document.cookie = `token=${res.data.token}; HttpOnly; Secure`;
            router.push("user/dashboard");
        }

    }
    const handleOfficialLogin = async (event) => {
        event.preventDefault()
        const response = await fetch("http://localhost:8080/api/official/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                mode: 'no-cors'
            },
            body: JSON.stringify(officialFormData)
        });
        const res = await response.json()
        if (!response.ok) {
            alert(res.message)
            return
        }
    }
    const handleChange = (e) => {
        setUserFormData({
            ...userFormData,
            [e.target.name]: e.target.value,
        });
    };
    const handleOficialChange = (e) => {
        setofficialFormData({
            ...officialFormData,
            [e.target.name]: e.target.value,
        });
    };
    const roles = [
        { value: "", text: "Select Role" },
        { value: "ministryofwelfare", text: "Ministry of Welfare" },
        { value: "district_collector", text: "District Collector" },
        { value: "jointcollector", text: "Joint Collector" },
        { value: "revenuedepartmentofficer", text: "Revenue Department Officer" },
        { value: "revenueinspector", text: "Revenue Inspector" },
        { value: "vro", text: "VRO (Village Revenue Officer)" },
        { value: "mro", text: "MRO (Mandal Revenue Officer)" },
        { value: "surveyor", text: "Surveyor" },
        { value: "project_officer", text: "Project Officer" },
        { value: "superintendent", text: "Superintendent" },
        { value: "officer", text: "Officer" },
        { value: "clerk", text: "Clerk" }
    ];

    return (
        <section className="login-container">
            <div className="login-container">
                <div className="login-box">
                    <h2>User Login</h2>
                    <form id="userLoginForm" onSubmit={handleUserLogin}>
                        <input onChange={(e) => handleChange(e)} value={userFormData.username} type="text" name="username" placeholder="Username" required />
                        <input onChange={(e) => handleChange(e)} value={userFormData.password} type="password" name="password" placeholder="Password" required />
                        <div className="spacer"></div>
                        <button type="submit" className="button">
                            <i className="fas fa-sign-in-alt"></i>
                            Login
                        </button>
                        <p>New User? <a href="register.html">Register</a></p>
                        <p className="forgot-password">
                            <a href="forgot-password.html">Forgot Password?</a>
                        </p>
                    </form>
                </div>

                <div className="login-box">
                    <h2>Official Login</h2>
                    {officialFormData.role}
                    <form id="officialLoginForm" onSubmit={handleOfficialLogin}>
                        <input type="text" placeholder="Official ID" value={officialFormData.officialId} onChange={handleOficialChange} name="officialId" required />
                        <select name="role" value={officialFormData.role} onChange={handleOficialChange} required>
                            {roles.map((item, index) => <option key={index} value={item.value}>{item.text}</option>)}
                        </select>
                        <input type="password" value={officialFormData.password} onChange={handleOficialChange} placeholder="Password" name="password" required />
                        <button type="submit" className="button">
                            <i className="fas fa-user-shield"></i>
                            Login
                        </button>
                        <p>
                            New Official? <a href="officialregistration.html">Register</a>
                        </p>
                        <p className="forgot-password">
                            <a href="forgot-password.html">Forgot Password?</a>
                        </p>
                    </form>
                </div>
            </div>
        </section>
    )
}