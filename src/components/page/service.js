'use client'

export default () => {
    return (
        <section className="services-container" >
                <div className="services-content">
                  <h2>Our Services</h2>
                  <div className="services-grid">
                    <div className="service-card">
                      <i className="fas fa-file-alt"></i>
                      <h3>Land Record Management</h3>
                      <p>
                        Comprehensive digital management of land records, ensuring
                        accuracy and accessibility.
                      </p>
                      <ul>
                        <li>Digital record keeping</li>
                        <li>Secure storage</li>
                        <li>Easy retrieval</li>
                        <li>Version history</li>
                      </ul>
                    </div>
        
                    <div className="service-card">
                      <i className="fas fa-search"></i>
                      <h3>Record Search & Verification</h3>
                      <p>
                        Quick and efficient search functionality to locate and verify land
                        records.
                      </p>
                      <ul>
                        <li>Advanced search options</li>
                        <li>Real-time verification</li>
                        <li>Document authenticity</li>
                        <li>History tracking</li>
                      </ul>
                    </div>
        
                    <div className="service-card">
                      <i className="fas fa-exchange-alt"></i>
                      <h3>Property Transfer</h3>
                      <p>
                        Streamlined process for transferring property ownership and
                        updating records.
                      </p>
                      <ul>
                        <li>Online applications</li>
                        <li>Status tracking</li>
                        <li>Document verification</li>
                        <li>Digital signatures</li>
                      </ul>
                    </div>
        
                    <div className="service-card">
                      <i className="fas fa-certificate"></i>
                      <h3>Certificate Generation</h3>
                      <p>
                        Automated generation of various land-related certificates and
                        documents.
                      </p>
                      <ul>
                        <li>Ownership certificates</li>
                        <li>Property details</li>
                        <li>Digital copies</li>
                        <li>Instant delivery</li>
                      </ul>
                    </div>
                  </div>
        
                  <div className="service-features">
                    <h3>Additional Features</h3>
                    <div className="service-features-grid">
                      <div className="feature-box">
                        <i className="fas fa-mobile-alt"></i>
                        <span>Mobile Access</span>
                        <p>Access services on any device</p>
                      </div>
                      <div className="feature-box">
                        <i className="fas fa-clock"></i>
                        <span>24/7 Availability</span>
                        <p>Services available round the clock</p>
                      </div>
                      <div className="feature-box">
                        <i className="fas fa-shield-alt"></i>
                        <span>Secure Platform</span>
                        <p>Enhanced security measures</p>
                      </div>
                      <div className="feature-box">
                        <i className="fas fa-headset"></i>
                        <span>Support</span>
                        <p>Dedicated customer support</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
    )
}