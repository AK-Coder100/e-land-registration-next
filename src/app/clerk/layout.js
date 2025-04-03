'use client'

import { useEffect, useState } from "react";
import '../user/layout.css'
import '../user/inbox.css'
import '../user/file.css'
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/slices/user";

export default ({ children }) => {
    const dispatch = useAppDispatch()
    const [userData, setUserData] = useState({
        username: ''
    })

    const router = useRouter()
    const pathname = usePathname()
    const tabItems = [
        { id: "dashboard", label: "DASHBOARD", href: "/clerk/dashboard", disabled: true },
        { id: "view", label: "View", href: "/clerk/dashboard" },
        { id: "receipt", label: "RECEIPT", href: "/clerk/receipt", disabled: true },
        { id: "create", label: "Create", href: "/clerk/receipt/create" },
        { id: "inbox", label: "Inbox", href: "/clerk/receipt/inbox" },
        { id: "sent", label: "Sent", href: "/clerk/receipt/sent" },
        { id: "search", label: "Advance Search", href: "/clerk/receipt/search" },
        { id: "file", label: "FILE", disabled: true },
        { id: "file-create", label: "Create", href: "/clerk/file/create" },
        { id: "file-inbox", label: "Inbox", href: "/clerk/file/inbox" },
        { id: "filesent", label: "Sent", href: "/clerk/file/sent" },
        { id: "issue", label: "ISSUE", href: "/clerk/issue", disabled: true },
        { id: "issue-inbox", label: "Inbox", href: "/clerk/issue/inbox" },
        { id: "issue-returned", label: "Returned", href: "/clerk/issue/returned" },
    ];

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('official')) || {}
        setUserData(user)
    }, [])
    return (
        <>
                <header>
                    <div className="header-left">
                        <div className="globe-icon"></div>
                        <h1 className="header-title">E - Land Records</h1>
                    </div>
                    <div className="header-right">
                        <i className="fas fa-bell notification-icon"></i>
                        <div className="dropdown">
                            <button className="dropbtn">{userData.username}</button>
                            <div className="dropdown-content">
                                <a href="#">Profile</a>
                                <a href="#">Settings</a>
                                <span onClick={() => dispatch(logout())} >Logout</span>
                            </div>
                        </div>
                        <i className="fas fa-user-circle user-icon"></i>

                    </div>
                </header>
                <div className="sidebar">
                    <div className="sidebar-icon " data-icon="menu"><i className="fas fa-bars"></i></div>
                    {/* <div className="sidebar-icon active" data-icon="menu"><i className="fas fa-bars"></i></div> */}
                    <div className="sidebar-icon" data-icon="file"><i className="fas fa-file"></i></div>
                    <div className="sidebar-icon" data-icon="folder"><i className="fas fa-folder"></i></div>
                    <div className="sidebar-icon" data-icon="pdf"><i className="fas fa-file-pdf"></i></div>
                    <div className="sidebar-icon" data-icon="document"><i className="fas fa-file-alt"></i></div>
                    <div className="sidebar-icon" data-icon="email"><i className="fas fa-envelope"></i></div>
                    <div className="sidebar-icon" data-icon="message"><i className="fas fa-comment"></i></div>
                    <div className="sidebar-icon" data-icon="inbox"><i className="fas fa-inbox"></i></div>
                    <div className="sidebar-icon" data-icon="sent"><i className="fas fa-paper-plane"></i></div>
                    <div className="sidebar-icon" data-icon="settings"><i className="fas fa-cog"></i></div>
                </div>
                <div className="notebook" >
                    {/* <div className="tab-buttons" style={{ marginBottom: '10px' }}>
                        {tabItems.map((tab) => (
                            tab.disabled ? (
                                <button key={tab.id} className="tab-btn disabled" disabled>
                                    {tab.label}
                                </button>
                            ) : (
                                <Link key={tab.id} href={tab.href} passHref>
                                    <button className={`tab-btn ${pathname === tab.href ? "active" : ""}`}>
                                        {tab.label}
                                    </button>
                                </Link>
                            )
                        ))}
                    </div> */}
                    <div id="tab-content">
                        {children}
                    </div>
                </div>

        </>
    );
}
