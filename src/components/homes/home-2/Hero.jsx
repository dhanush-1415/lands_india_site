import FilterTab from "@/components/common/FilterTab";
import TyperComponent from "@/components/common/Typer";
import { sliderImages } from "@/data/heroSlides";
import React from "react";

import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Hero() {

  return (
    <>
      <section className="flat-slider home-2 bg-primary-new">
        <div className="container relative">
          <div className="row">
            <div className="col-xl-10">
              <div className="slider-content">
                <div className="wrap-search-link">
                  {/* <p className="body-2">What are you looking for:</p> */}
                  <div className="categories-list">
                    <a href="#" style={{background:'#008ff7',lineHeight:'30px',boxShadow:'0px 1px 5px #00000054',color:'#ffffff !important'}}>
                      {/* <i className="icon icon-house-fill" />  */}
                      <span style={{fontSize:'20px',color:'#ffffff'}}>100%</span>
                    </a>
                    <a href="#">
                      {/* <i className="icon icon-villa-fill" />  */}
                      Verified Properties
                    </a>
                    <a href="#">
                      {/* <i className="icon icon-office-fill" /> */}
                      Verified Buyers
                    </a>
                    <a href="#">
                      {/* <i className="icon icon-apartment" />  */}
                      100YRS Legal Properties
                    </a>
                  </div>
                </div>
                <div className="heading">
                  <h3 className="fw-8 title animationtext clip head-header">
                    Find Real Properties at the <br /> Best Prices on PropertyStore

                    {/* <TyperComponent
                    strings={["Fits Perfectly", "Fits Dream Home"]}
                  /> */}
                  </h3>
                  {/* <p
                  className="subtitle body-2 wow fadeInUp"
                  data-wow-delay=".2s"
                >
                  We are a real estate agency that will help you find the best{" "}
                  <br />
                  residence you dream of.
                </p> */}
                </div>

                <FilterTab tabClass="nav-tab-form style-2" styleClass="style-2" />

              </div>
            </div>
          </div>
        </div>
        <div className="img-banner-left">
          <img
            alt="img"
            src="/images/slider/graplic-slider-2.png"
            width={412}
            height={187}
          />
        </div>
        <div className="img-banner-right">
          <Swiper
            effect="fade"
            modules={[EffectFade, Autoplay]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            speed={500}
            className="swiper slider-sw-home2"
          >
            {sliderImages.map((image, index) => (
              <SwiperSlide className="swiper-slide" key={index}>
                <div className={`slider-home2 ${image.className || ""}`}>
                  <img
                    alt={image.alt}
                    src={image.src}
                    width={image.width}
                    height={image.height}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
}
