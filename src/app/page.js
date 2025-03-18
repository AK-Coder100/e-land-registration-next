"use client"

import Help from "../components/page/help"
import Auth from "../components/page/auth"
import { useState } from "react"
import Contact from "../components/page/contact"
import About from "../components/page/about"
import Service from "../components/page/service"

export default function Home() {
  const [activeTab, setActiveTab] = useState('login')
  const showSection = (tab) => {
    setActiveTab(tab)
  }
  const handleContactSubmit = (tab) => {
    // setActiveTab(tab)
  }

  return (
    <div>

      <div className="blue-line">
        <div className="logo-container">
          <img src="earth.png" alt="Logo" />
          <span className="title">E-Land Records</span>
        </div>
        <span className="header-title">E-Land Record Management System</span>
      </div>

      <nav className="navbar">
        <ul className="nav-links">
          <li>
            <a href="#home" onClick={() => showSection('login')}><i className="fas fa-home"></i> Home</a>
          </li>
          <li>
            <a href="#about" onClick={() => showSection('about')}><i className="fas fa-info-circle"></i> About</a>
          </li>
          <li>
            <a href="#services" onClick={() => showSection('services')}><i className="fas fa-cogs"></i> Services</a>
          </li>
          <li>
            <a href="#contact" onClick={() => showSection('contact')}><i className="fas fa-envelope"></i> Contact</a>
          </li>
          <li>
            <a href="#help" onClick={() => showSection('help')}><i className="fas fa-question-circle"></i> Help</a>
          </li>
        </ul>
      </nav>

      {activeTab == 'about' && <About />}
      {activeTab == 'services' && <Service />}
      {activeTab == 'contact' && <Contact />}
      {activeTab == 'help' && <Help />}
      {activeTab == 'login' && <Auth />}

    </div>
  );
}