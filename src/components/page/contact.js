'use client'

export default () => {
    const handleContactSubmit = () => {
        
    }
    return (
        <section className="contact-container" >
            <div className="contact-content">
                <h2>Contact Us</h2>
                <div className="contact-grid">
                    <div className="contact-form">
                        <h3>Send us a Message</h3>
                        <form id="contactForm" onSubmit={(event) => handleContactSubmit(event)}>
                            <div className="form-group">
                                <label htmlFor="name">Full Name</label>
                                <input type="text" id="name" name="name" required placeholder="Enter your full name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input type="email" id="email" name="email" required placeholder="Enter your email" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="subject">Subject</label>
                                <input type="text" id="subject" name="subject" required placeholder="Enter subject" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea id="message" name="message" required placeholder="Enter your message"></textarea>
                            </div>
                            <button type="submit" className="submit-button">
                                <i className="fas fa-paper-plane"></i>
                                Send Message
                            </button>
                        </form>
                    </div>

                    <div className="contact-info">
                        <h3>Get in Touch</h3>
                        <div className="info-card">
                            <i className="fas fa-map-marker-alt"></i>
                            <h4>Our Location</h4>
                            <p>123 Land Records Building<br />Main Street, City - 12345</p>
                        </div>
                        <div className="info-card">
                            <i className="fas fa-phone-alt"></i>
                            <h4>Phone Number</h4>
                            <p>+1 234 567 8900<br />+1 234 567 8901</p>
                        </div>
                        <div className="info-card">
                            <i className="fas fa-envelope"></i>
                            <h4>Email Address</h4>
                            <p>info@elandrecords.com<br />support@elandrecords.com</p>
                        </div>
                        <div className="info-card">
                            <i className="fas fa-clock"></i>
                            <h4>Working Hours</h4>
                            <p>
                                Monday - Friday: 9:00 AM - 6:00 PM<br />Saturday: 9:00 AM - 1:00
                                PM
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}