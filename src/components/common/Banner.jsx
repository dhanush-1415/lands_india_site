import React from "react";
import { Link } from "react-router-dom";

export default function Banner() {
  return (
    <section className="flat-section pt-0 flat-banner">
      <div className="container">
        <div className="wrap-banner bg-primary-new">
          <div className="box-left">
            <div className="box-title">
              <div className="text-subtitle text-primary">Become Partners</div>
              <h3 className="mt-4 fw-8">
                List your Properties on Lands India, join Us Now!
              </h3>
            </div>
            <Link
              to={`/contact`}
              className="tf-btn btn-view primary size-1 hover-btn-view"
            >
              Join <span className="icon icon-arrow-right2" />
            </Link>
          </div>
          <div className="box-right">
            <img
              alt="image"
              src="/images/banner/banner.png"
              width={748}
              height={280}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
