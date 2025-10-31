import React from "react";
import { Link } from "react-router-dom";

export default function TermsAndConditions() {
  return (
    <section className="flat-section" style={{ padding: '80px 0', backgroundColor: '#f8f9fa' }}>
      <style>{`
        .terms-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 20px;
        }
        .terms-header {
          text-align: center;
          margin-bottom: 50px;
        }
        .terms-header h1 {
          font-size: 42px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 20px;
          line-height: 1.2;
        }
        .terms-header p {
          font-size: 18px;
          color: #666;
          line-height: 1.8;
          max-width: 800px;
          margin: 0 auto;
        }
        .terms-content {
          background: white;
          padding: 50px;
          border-radius: 12px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.08);
        }
        .terms-section {
          margin-bottom: 35px;
          padding-bottom: 30px;
          border-bottom: 1px solid #e5e5e5;
        }
        .terms-section:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }
        .terms-section h2 {
          font-size: 24px;
          font-weight: 700;
          color: #008ff7;
          margin-bottom: 16px;
        }
        .terms-section p,
        .terms-section li {
          font-size: 16px;
          line-height: 1.8;
          color: #4a4a4a;
          margin-bottom: 12px;
        }
        .terms-section ul {
          list-style: none;
          padding-left: 0;
          margin-top: 12px;
        }
        .terms-section ul li {
          padding-left: 24px;
          position: relative;
        }
        .terms-section ul li:before {
          content: "•";
          color: #008ff7;
          font-weight: bold;
          position: absolute;
          left: 0;
        }
        .acknowledgment {
          background: #f0f7ff;
          padding: 24px;
          border-radius: 8px;
          border-left: 4px solid #008ff7;
          margin-top: 40px;
        }
        .acknowledgment p {
          margin: 0;
          font-size: 16px;
          color: #4a4a4a;
          font-weight: 500;
        }
        .cta-section {
          text-align: center;
          margin-top: 50px;
        }
        @media (max-width: 768px) {
          .terms-header h1 {
            font-size: 32px;
          }
          .terms-content {
            padding: 30px 20px;
          }
          .terms-section h2 {
            font-size: 20px;
          }
        }
      `}</style>
      <div className="container">
        <div className="terms-container">
          <div className="terms-header">
            <h1>Terms and Conditions</h1>
            <p>
              Welcome to Propertystores.in. By using our website, you agree to comply with the following terms and conditions. If you do not agree with any part of these terms, please do not use our services.
            </p>
          </div>

          <div className="terms-content">
            <div className="terms-section">
              <h2>1. General Terms</h2>
              <ul>
                <li>
                  <strong>Eligibility:</strong> You must be at least 18 years old to use our platform.
                </li>
                <li>
                  <strong>User Responsibility:</strong> Users must provide accurate and lawful information. Any fraudulent activity may lead to account suspension.
                </li>
                <li>
                  <strong>Service Modifications:</strong> We reserve the right to modify or discontinue any service without prior notice.
                </li>
              </ul>
            </div>

            <div className="terms-section">
              <h2>2. Property Listings and Verification</h2>
              <p>
                Property Stores ensures that all listed properties undergo a verification process to maintain authenticity. We continuously monitor and verify property details to ensure accuracy and compliance with our standards.
              </p>
            </div>

            <div className="terms-section">
              <h2>3. Limitation of Liability</h2>
              <p>
                Property Stores shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use of our platform. While we strive to provide accurate information, we cannot guarantee the completeness or accuracy of all property listings.
              </p>
            </div>

            <div className="terms-section">
              <h2>4. Termination of Services</h2>
              <p>
                We reserve the right to suspend or terminate accounts found in violation of our policies. Users found engaging in fraudulent activities, providing false information, or violating our terms of service will have their accounts immediately terminated.
              </p>
            </div>

            <div className="acknowledgment">
              <p>
                By using our services, you acknowledge that you have read, understood, and agree to these terms and conditions.
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

