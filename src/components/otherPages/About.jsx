import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <section className="flat-section">
      <div className="container flat-header-wrapper-about">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <h1 className="title">Welcome to Lands India</h1>
            <p className="text-variant-1 desc">
              Welcome to Lands India, where we transform properties into perfect homes and make your dreams come true. At Lands India, we understand that a home is not just about the building, but about the community, comfort, and the future you envision.
            </p>
            <div className="signature-box">
              {/* <div className="top">
                <h6>Raghavan Suresh</h6>
                <p className="text-variant-2">CEO & Founder</p>
              </div> */}
              {/* <img
                alt="Raghavan Suresh"
                width="211"
                height="116"
                src="/images/banner/signature.png"
              /> */}
            </div>
            <Link
              to={`/contact`}
              className="tf-btn btn-view primary hover-btn-view"
            >
              Contact Us
              <span className="icon icon-arrow-right2"></span>
            </Link>
            <div className="box-img item1 ani5">
              <img
                alt="Luxury Property"
                width="155"
                height="155"
                src="/images/banner/item1.jpg"
              />
            </div>
            <div className="box-img item2 ani4">
              <img
                alt="Residential Property"
                width="181"
                height="181"
                src="/images/banner/item2.jpg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
