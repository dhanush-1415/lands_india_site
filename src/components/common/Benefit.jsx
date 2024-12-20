import React from "react";

import { benefits } from "@/data/benefits";
export default function Benefit() {
  return (
    <section className="mx-5 bg-primary-new radius-30">
      <div className="flat-img-with-text">
        <div className="content-left img-animation wow">
          <img
            className="lazyload"
            data-src="https://i.pinimg.com/736x/40/6f/24/406f249cea2c19a38706dd7d69cc602c.jpg"
            alt=""
            src="https://i.pinimg.com/736x/40/6f/24/406f249cea2c19a38706dd7d69cc602c.jpg"
            width={950}
            height={908}
          />
        </div>
        <div className="content-right">
          <div className="box-title wow fadeInUp">
            <div className="text-subtitle text-primary">Our Benifit</div>
            <h3 className="title mt-4">Why Choose LandsIndia</h3>
            <p className="desc text-variant-1">
              Our seasoned team excels in real estate with years of successful
              market <br />
              navigation, offering informed decisions and optimal results.
            </p>
          </div>
          <div className="flat-service wow fadeInUp" data-wow-delay=".2s">
            {benefits.map((benefit, index) => (
              <a key={index} className="box-benefit hover-btn-view">
                <div className="icon-box">
                  <span className={`icon ${benefit.iconClass}`} />
                </div>
                <div className="content">
                  <h5 className="title">{benefit.title}</h5>
                  <p className="description">{benefit.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
