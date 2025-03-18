'use client'

export default () => {
    return (
        <section className="about-container" >
        <div className="about-content">
          <h2>About E-Land Records</h2>
          <div className="about-grid">
            <div className="about-card">
              <i className="fas fa-bullseye"></i>
              <h3>Our Mission</h3>
              <p>
                To provide a transparent, efficient, and secure platform for
                managing land records digitally, ensuring easy access and
                reliability for all citizens.
              </p>
            </div>

            <div className="about-card">
              <i className="fas fa-eye"></i>
              <h3>Our Vision</h3>
              <p>
                To revolutionize land record management through digital
                transformation, making it hassle-free and accessible to everyone.
              </p>
            </div>

            <div className="about-card">
              <i className="fas fa-chart-line"></i>
              <h3>Our Goals</h3>
              <ul>
                <li>Digitize all land records</li>
                <li>Reduce processing time</li>
                <li>Enhance transparency</li>
                <li>Improve accessibility</li>
              </ul>
            </div>

            <div className="about-card">
              <i className="fas fa-shield-alt"></i>
              <h3>Security & Privacy</h3>
              <p>
                We implement state-of-the-art security measures to protect your
                data and ensure confidentiality of all land records.
              </p>
            </div>
          </div>

          <div className="about-features">
            <h3>Key Features</h3>
            <div className="features-grid">
              <div className="feature-item">
                <i className="fas fa-digital"></i>
                <span>Digital Records</span>
              </div>
              <div className="feature-item">
                <i className="fas fa-search"></i>
                <span>Easy Search</span>
              </div>
              <div className="feature-item">
                <i className="fas fa-clock"></i>
                <span>24/7 Access</span>
              </div>
              <div className="feature-item">
                <i className="fas fa-mobile-alt"></i>
                <span>Mobile Friendly</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}