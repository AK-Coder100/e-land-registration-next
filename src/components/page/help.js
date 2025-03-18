'use client'

export default () => {
    const showSection = () => {

    }
    const handleContactSubmit = () => {

    }
    return (
        <section className="help-container" >
            <div className="help-content">
                <h2>Help & Support</h2>
                <div className="help-grid">
                    <div className="help-card">
                        <i className="fas fa-book"></i>
                        <h3>User Guide</h3>
                        <p>
                            Learn how to use our platform effectively with our comprehensive
                            user guide.
                        </p>
                        <ul>
                            <li>Registration Process</li>
                            <li>Document Upload</li>
                            <li>Record Search</li>
                            <li>Application Status</li>
                        </ul>
                    </div>

                    <div className="help-card">
                        <i className="fas fa-question-circle"></i>
                        <h3>FAQs</h3>
                        <p>Find answers to commonly asked questions about our services.</p>
                        <ul>
                            <li>Account Management</li>
                            <li>Document Requirements</li>
                            <li>Processing Time</li>
                            <li>Payment Methods</li>
                        </ul>
                    </div>

                    <div className="help-card">
                        <i className="fas fa-headset"></i>
                        <h3>Support Channels</h3>
                        <p>Multiple ways to get in touch with our support team.</p>
                        <ul>
                            <li>24/7 Helpline</li>
                            <li>Email Support</li>
                            <li>Live Chat</li>
                            <li>Support Ticket</li>
                        </ul>
                    </div>

                    <div className="help-card">
                        <i className="fas fa-tools"></i>
                        <h3>Troubleshooting</h3>
                        <p>
                            Common issues and their solutions to help you resolve problems
                            quickly.
                        </p>
                        <ul>
                            <li>Login Issues</li>
                            <li>Upload Problems</li>
                            <li>Payment Errors</li>
                            <li>Technical Support</li>
                        </ul>
                    </div>
                </div>

                <div className="help-resources">
                    <h3>Additional Resources</h3>
                    <div className="resources-grid">
                        <div className="resource-item">
                            <i className="fas fa-file-pdf"></i>
                            <span>User Manual</span>
                        </div>
                        <div className="resource-item">
                            <i className="fas fa-video"></i>
                            <span>Video Tutorials</span>
                        </div>
                        <div className="resource-item">
                            <i className="fas fa-newspaper"></i>
                            <span>Latest Updates</span>
                        </div>
                        <div className="resource-item">
                            <i className="fas fa-comments"></i>
                            <span>Community Forum</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}