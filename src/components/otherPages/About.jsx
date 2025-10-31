import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <section className="flat-section" style={{ padding: '80px 0', backgroundColor: '#f8f9fa' }}>
      <style>{`
        .about-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 20px;
        }
        .about-header {
          text-align: center;
          margin-bottom: 60px;
        }
        .about-header h1 {
          font-size: 48px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 16px;
          line-height: 1.2;
        }
        .about-header .company-name {
          font-size: 32px;
          font-weight: 600;
          color: #008ff7;
          margin-bottom: 12px;
        }
        .about-header .tagline {
          font-size: 18px;
          color: #666;
          margin-bottom: 8px;
          font-weight: 500;
        }
        .about-header .since {
          font-size: 16px;
          color: #999;
          margin-bottom: 30px;
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 24px;
          margin: 40px 0;
        }
        .feature-item {
          background: white;
          padding: 24px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          text-align: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .feature-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.12);
        }
        .feature-item strong {
          display: block;
          font-size: 18px;
          color: #008ff7;
          margin-bottom: 8px;
          font-weight: 600;
        }
        .content-section {
          background: white;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.08);
          margin-bottom: 30px;
        }
        .content-section h2 {
          font-size: 28px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 3px solid #008ff7;
        }
        .content-section p {
          font-size: 16px;
          line-height: 1.8;
          color: #4a4a4a;
          margin-bottom: 20px;
        }
        .content-section p:last-child {
          margin-bottom: 0;
        }
        .cta-section {
          text-align: center;
          margin-top: 50px;
        }
        @media (max-width: 768px) {
          .about-header h1 {
            font-size: 36px;
          }
          .about-header .company-name {
            font-size: 24px;
          }
          .content-section {
            padding: 24px;
          }
          .features-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      <div className="container">
        <div className="about-container">
          <div className="about-header">
            <h1>About Us</h1>
            <div className="company-name">PropertyStores.in</div>
            <div className="tagline">Guided...Caring...Trusted</div>
            <div className="since">Unit of Lands India Group - Since 2012</div>
            
            <div className="features-grid">
              <div className="feature-item">
                <strong>100% Verified Properties</strong>
                <span>Authenticated listings</span>
              </div>
              <div className="feature-item">
                <strong>100% Verified Buyers</strong>
                <span>Trusted users</span>
              </div>
              <div className="feature-item">
                <strong>100 Years Legal Properties</strong>
                <span>Legally sound deals</span>
              </div>
            </div>
          </div>

          <div className="content-section">
            <h2>Who We Are</h2>
            <p>
              Welcome to Propertystores.in, your trusted real estate partner. As part of the Lands India Group, we bring a revolutionary approach to real estate with a seamless integration of technology and human expertise. Our platform is designed to simplify real estate transactions, ensuring 100% verified properties and buyers while providing legally sound properties for a stress-free experience.
            </p>
            <p>
              At Property Stores, we cater to a diverse audience, including individual property buyers, project developers, and investors. Our comprehensive suite of services includes property listings, premium rental solutions, real estate event management, and value-added services, all designed to meet the dynamic needs of the real estate industry.
            </p>
            <p>
              Our commitment is to <strong>Building Trust and Simplifying Real Estate</strong>, making property transactions transparent, efficient, and rewarding for all stakeholders.
            </p>
          </div>

          <div className="content-section">
            <h2>Our Mission</h2>
            <p>
              To transform real estate buying and selling with the right mix of digital technology and human interventions.
            </p>
          </div>

          <div className="content-section">
            <h2>Our Vision</h2>
            <p>
              To unite all real estate entities under one roof, creating an India-based real estate network that is trusted and provides amazing human experiences.
            </p>
          </div>

          <div className="cta-section">
            <Link
              to={`/contact`}
              className="tf-btn btn-view primary hover-btn-view"
              style={{
                padding: '14px 32px',
                fontSize: '16px',
                fontWeight: '600',
                borderRadius: '8px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              Contact Us
              <span className="icon icon-arrow-right2"></span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
