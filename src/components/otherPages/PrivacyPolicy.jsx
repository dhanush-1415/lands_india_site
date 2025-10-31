import React from "react";
import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  return (
    <section className="flat-section" style={{ padding: '80px 0', backgroundColor: '#f8f9fa' }}>
      <style>{`
        .privacy-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 20px;
        }
        .privacy-header {
          text-align: center;
          margin-bottom: 50px;
        }
        .privacy-header h1 {
          font-size: 42px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 20px;
          line-height: 1.2;
        }
        .privacy-header p {
          font-size: 18px;
          color: #666;
          line-height: 1.8;
          max-width: 800px;
          margin: 0 auto;
        }
        .privacy-content {
          background: white;
          padding: 50px;
          border-radius: 12px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.08);
        }
        .privacy-section {
          margin-bottom: 35px;
          padding-bottom: 30px;
          border-bottom: 1px solid #e5e5e5;
        }
        .privacy-section:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }
        .privacy-section h2 {
          font-size: 24px;
          font-weight: 700;
          color: #008ff7;
          margin-bottom: 16px;
        }
        .privacy-section p,
        .privacy-section li {
          font-size: 16px;
          line-height: 1.8;
          color: #4a4a4a;
          margin-bottom: 12px;
        }
        .privacy-section ul {
          list-style: none;
          padding-left: 0;
          margin-top: 12px;
        }
        .privacy-section ul li {
          padding-left: 24px;
          position: relative;
        }
        .privacy-section ul li:before {
          content: "•";
          color: #008ff7;
          font-weight: bold;
          position: absolute;
          left: 0;
        }
        .contact-box {
          background: #f0f7ff;
          padding: 24px;
          border-radius: 8px;
          border-left: 4px solid #008ff7;
          margin-top: 40px;
        }
        .contact-box p {
          margin: 0;
          font-size: 16px;
          color: #4a4a4a;
        }
        .contact-box strong {
          color: #008ff7;
        }
        .cta-section {
          text-align: center;
          margin-top: 50px;
        }
        @media (max-width: 768px) {
          .privacy-header h1 {
            font-size: 32px;
          }
          .privacy-content {
            padding: 30px 20px;
          }
          .privacy-section h2 {
            font-size: 20px;
          }
        }
      `}</style>
      <div className="container">
        <div className="privacy-container">
          <div className="privacy-header">
            <h1>Privacy Policy</h1>
            <p>
              At Propertystores.in, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and protect your data.
            </p>
          </div>

          <div className="privacy-content">
            <div className="privacy-section">
              <h2>1. Information We Collect</h2>
              <p>We collect information that helps us provide and improve our services:</p>
              <ul>
                <li>
                  <strong>Personal Information:</strong> Name, contact details, email address, and property preferences
                </li>
                <li>
                  <strong>Usage Data:</strong> Information on how you interact with our website, including pages visited, time spent, and actions taken
                </li>
              </ul>
            </div>

            <div className="privacy-section">
              <h2>2. How We Use Your Information</h2>
              <p>We use the collected information for the following purposes:</p>
              <ul>
                <li>To provide and improve our services</li>
                <li>To communicate with users regarding property listings and updates</li>
                <li>To ensure compliance with legal and regulatory obligations</li>
                <li>To personalize your experience and show relevant property recommendations</li>
              </ul>
            </div>

            <div className="privacy-section">
              <h2>3. Data Protection</h2>
              <p>
                We implement advanced security measures to protect user data. Our platform uses industry-standard encryption and security protocols to safeguard your information.
              </p>
              <p>
                <strong>Important:</strong> User data is not sold or shared with third parties except for service fulfillment. We only share data with trusted partners who assist us in operating our platform, and only as necessary to provide our services.
              </p>
            </div>

            <div className="privacy-section">
              <h2>4. Cookies and Tracking Technologies</h2>
              <p>
                We use cookies and similar tracking technologies to enhance user experience and analyze website traffic. Cookies help us remember your preferences and provide a more personalized experience.
              </p>
              <p>
                You can manage cookie preferences through your browser settings. However, disabling cookies may limit some functionality of our website.
              </p>
            </div>

            <div className="privacy-section">
              <h2>5. Your Rights</h2>
              <p>You have the right to:</p>
              <ul>
                <li>Request access to your personal data</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt out of marketing communications at any time</li>
                <li>Object to certain processing of your data</li>
              </ul>
            </div>

            <div className="privacy-section">
              <h2>6. Updates to Privacy Policy</h2>
              <p>
                We may update this Privacy Policy periodically to reflect changes in our practices or for legal, operational, or regulatory reasons. Users are advised to review this page regularly for any changes.
              </p>
              <p>
                Continued use of our services after any updates constitutes acceptance of the revised Privacy Policy.
              </p>
            </div>

            <div className="contact-box">
              <p>
                <strong>Privacy Inquiries:</strong> For any privacy-related queries or to exercise your rights, please contact us at <a href="mailto:admin@propertystores.in" style={{ color: '#008ff7', textDecoration: 'none' }}>admin@propertystores.in</a>
              </p>
            </div>
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
