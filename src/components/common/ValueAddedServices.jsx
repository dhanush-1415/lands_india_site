import { agents } from "@/data/agents";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Divider } from "@mui/material";
import { Button } from "react-bootstrap";
import DropdownSelect from "./DropdownSelect";

import { Pagination } from "swiper/modules";
export default function ValueAddedServices() {


    return (
        <section className="flat-section flat-agents" style={{ paddingTop: '0px' }}>
            <style>{`
      .custom-aligner{
      width:60%;
      }
        @media (max-width: 768px) {
          .custom-aligner{
            flex-direction:column;
            text-align:center;
            gap:20px;
            width:100%;
          }
        }
        `}
            </style>
            <div style={{ background: '#f8f9fa', padding: '20px 0' }}>
                <div style={{ width: '80%', margin: '50px auto' }}>
                    <h4>Value Added Services</h4>
                </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="d-flex custom-aligner align-items-center justify-content-between" style={{ background: '#ffffff', padding: '10px 20px', marginTop: '-40px', boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}>
                    <div>
                        <h5>Enhance Effeciency and Achieve More With Our Extra Services.</h5>
                    </div>
                    <div>
                        <button style={{ backgroundColor: "#0095ff", border: 'none', padding: '15px', color: '#ffffff', fontWeight: 'bold' }} >Register Now</button>
                    </div>
                </div>
            </div>

            <div className="container" style={{ padding: '70px 0' }}>
                {/* 
        <div className="box-title text-center wow fadeInUp">
          <div className="text-subtitle text-primary">Our Teams</div>
          <h3 className="title mt-4">Meet Our Agents</h3>
        </div> */}
                <div className="d-flex align-items-center justify-content-end">
                    <div style={{ width: '15%',marginRight:'20px', marginBottom:'2rem' }}>
                        <DropdownSelect
                            style={{ borderRadius: '0', fontWeight:'bold' }}
                            // onChange={setSortingOption}
                            addtionalParentClass="list-sort"
                            options={[
                                "Professional Sorting",
                                "Price Ascending",
                                "Price Descending",
                            ]}
                        />

                    </div>

                </div>
                <div className="swiper tf-sw-mobile-1 non-swiper-on-575" style={{ overflow: 'visible', padding: '0px 20px' }}>
                    <div className="tf-layout-mobile-sm xl-col-4 sm-col-2 swiper-wrapper">
                        {agents.map((agent) => (
                            <SwiperSlide key={agent.id} className="swiper-slide">
                                <div
                                    className="box-agent hover-img wow fadeInUp"
                                    style={{ animationDelay: agent.wowDelay, padding: '20px', boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px", }} // WOW.js animation delay
                                >
                                    <a href="#" className="box-img img-style" style={{ borderRadius: '0px' }}>
                                        <img
                                            className="lazyload mh-100"
                                            data-src={agent.imgSrc}
                                            alt={`image-agent-${agent.name}`}
                                            src={agent.imgSrc}
                                            // width={450}
                                            style={{ maxHeight: '40px !importent' }}
                                            height={450}
                                        />
                                        <ul className="agent-social">
                                            <li>
                                                <span className="icon icon-facebook" />
                                            </li>
                                            <li>
                                                <span className="icon icon-x" />
                                            </li>
                                            <li>
                                                <span className="icon icon-linkedin" />
                                            </li>
                                            <li>
                                                <span className="icon icon-instargram" />
                                            </li>
                                        </ul>
                                    </a>
                                    <div className="content justify-content-center">
                                        <div className="info" style={{ textAlign: 'center' }}>
                                            <h5>
                                                <a className="link" href="#">
                                                    {agent.name}
                                                </a>
                                            </h5>
                                            <p className="text-variant-1">{agent.position}</p>
                                        </div>
                                        {/* <div className="box-icon">
                      <span className="icon icon-phone" />
                      <span className="icon icon-mail" />
                    </div> */}
                                    </div>
                                    <Divider sx={{ border: '1px solid black' }} />
                                    <div className="content justify-content-center">
                                        <div className="info" style={{ textAlign: 'center' }}>
                                            <p className="text-variant-1" style={{ fontWeight: 'bold' }}>{agent.position}</p>

                                            <p className="text-variant-1">{agent.position}</p>
                                        </div>

                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </div>
                    <div className="sw-pagination spb3 sw-pagination-mb-1 text-center d-sm-none d-block" />
                </div>
                <Swiper
                    spaceBetween={30}
                    slidesPerView={1}
                    className="swiper tf-sw-mobile-1 swiper-on-575"
                    modules={[Pagination]}
                    pagination={{ clickable: true, el: ".spb3" }}
                >
                    {agents.map((agent) => (
                        <SwiperSlide key={agent.id} className="swiper-slide">
                            <div
                                className="box-agent hover-img wow fadeInUp"
                                style={{ animationDelay: agent.wowDelay }} // WOW.js animation delay
                            >
                                <a href="#" className="box-img img-style">
                                    <img
                                        className="lazyload"
                                        data-src={agent.imgSrc}
                                        alt={`image-agent-${agent.name}`}
                                        src={agent.imgSrc}
                                        width={450}
                                        height={450}
                                    />
                                    <ul className="agent-social">
                                        <li>
                                            <span className="icon icon-facebook" />
                                        </li>
                                        <li>
                                            <span className="icon icon-x" />
                                        </li>
                                        <li>
                                            <span className="icon icon-linkedin" />
                                        </li>
                                        <li>
                                            <span className="icon icon-instargram" />
                                        </li>
                                    </ul>
                                </a>
                                <div className="content justify-content-center">
                                    <div className="info" style={{ textAlign: 'center' }}>
                                        <h5>
                                            <a className="link" href="#">
                                                {agent.name}
                                            </a>
                                        </h5>
                                        <p className="text-variant-1">{agent.position}</p>
                                    </div>
                                    {/* <div className="box-icon">
                      <span className="icon icon-phone" />
                      <span className="icon icon-mail" />
                    </div> */}
                                </div>
                                <Divider sx={{ border: '1px solid black' }} />
                                <div className="content justify-content-center">
                                    <div className="info" style={{ textAlign: 'center' }}>
                                        <p className="text-variant-1" style={{ fontWeight: 'bold' }}>{agent.position}</p>

                                        <p className="text-variant-1">{agent.position}</p>
                                    </div>

                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                    <div className="sw-pagination spb3 sw-pagination-mb-1 text-center d-sm-none d-block" />
                </Swiper>
            </div>
        </section>
    );
}
