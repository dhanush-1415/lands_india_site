import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <section className="flat-section">
      <div className="container flat-header-wrapper-about">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <h1 className="title">About Us</h1>
            <h2 className="text-variant-1">PropertyStores.in</h2>
            <p className="text-variant-1 desc">Guided...Caring...Trusted</p>
            <p className="text-variant-1 desc">Unit of Lands India Group - Since 2012</p>
            <ul className="text-variant-1 desc list-unstyled">
              <li>100% verified properties</li>
              <li>100% verified buyers</li>
              <li>100yrs legal properties</li>
            </ul>
            <p className="text-variant-1 desc">
              Welcome to Propertystores.in, your trusted real estate partner. As part of the Lands India Group, we bring a revolutionary approach to real estate with a seamless integration of technology and human expertise. Our platform is designed to simplify real estate transactions, ensuring 100% verified properties and buyers while providing legally sound properties for a stress-free experience.
            </p>
            <p className="text-variant-1 desc">
              At Property Stores, we cater to a diverse audience, including individual property buyers, project developers, and investors. Our comprehensive suite of services includes property listings, premium rental solutions, real estate event management, and value-added services, all designed to meet the dynamic needs of the real estate industry.
            </p>
            <p className="text-variant-1 desc">
              Our commitment is to Building Trust and Simplifying Real Estate, making property transactions transparent, efficient, and rewarding for all stakeholders.
            </p>
            <h2 className="title">Our Mission</h2>
            <p className="text-variant-1 desc">
              To transform real estate buying and selling with the right mix of digital technology and human interventions.
            </p>
            <h2 className="title">Our Vision</h2>
            <p className="text-variant-1 desc">
              To unite all real estate entities under one roof, creating an India-based real estate network that is trusted and provides amazing human experiences.
            </p>
            <h2 className="title">Terms and Conditions</h2>
            <p className="text-variant-1 desc">
              Welcome to Propertystores.in. By using our website, you agree to comply with the following terms and conditions. If you do not agree with any part of these terms, please do not use our services.
            </p>
            <ol className="text-variant-1 desc">
              <li><strong>General Terms</strong><br />
                Eligibility: You must be at least 18 years old to use our platform.<br />
                User Responsibility: Users must provide accurate and lawful information. Any fraudulent activity may lead to account suspension.<br />
                Service Modifications: We reserve the right to modify or discontinue any service without prior notice.
              </li>
              <li><strong>Property Listings and Verification</strong><br />
                Property Stores ensures that all listed properties undergo a verification process to maintain authenticity.
              </li>
              <li><strong>Limitation of Liability</strong><br />
                Property Stores shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use of our platform.
              </li>
              <li><strong>Termination of Services</strong><br />
                We reserve the right to suspend or terminate accounts found in violation of our policies.
              </li>
            </ol>
            <p className="text-variant-1 desc">
              By using our services, you acknowledge that you have read and agree to these terms.
            </p>
            <h2 className="title">Privacy Policy</h2>
            <p className="text-variant-1 desc">
              At Propertystores.in, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and protect your data.
            </p>
            <ol className="text-variant-1 desc">
              <li><strong>Information We Collect</strong><br />
                Personal Information: Name, contact details, email, and property preferences.<br />
                Usage Data: Information on how you interact with our website.
              </li>
              <li><strong>How We Use Your Information</strong><br />
                To provide and improve our services.<br />
                To communicate with users regarding property listings and updates.<br />
                To ensure compliance with legal and regulatory obligations.
              </li>
              <li><strong>Data Protection</strong><br />
                We implement advanced security measures to protect user data.<br />
                User data is not sold or shared with third parties except for service fulfillment.
              </li>
              <li><strong>Cookies and Tracking Technologies</strong><br />
                We use cookies to enhance user experience and analyze website traffic.<br />
                Users can manage cookie preferences through their browser settings.
              </li>
              <li><strong>Your Rights</strong><br />
                Users can request access to their data or opt out of marketing communications at any time.
              </li>
              <li><strong>Updates to Privacy Policy</strong><br />
                We may update this policy periodically. Users are advised to review this page for any changes.
              </li>
            </ol>
            <p className="text-variant-1 desc">
              For any privacy-related queries, contact us at admin@propertystores.in.
            </p>
            <Link
              to={`/contact`}
              className="tf-btn btn-view primary hover-btn-view"
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