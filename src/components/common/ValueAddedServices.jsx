import { agents } from "@/data/agents";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Divider } from "@mui/material";
import { Button } from "react-bootstrap";
import { getValueAddedServiceList } from "@/apiCalls";
import DropdownSelect from "./DropdownSelect";

import Pagination from "./Pagination";
import Footer2 from "../footer/Footer2";
export default function ValueAddedServices() {



  const [data, setData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [sorted, setSorted] = useState();
  const [itemPerPage, setItemPerPage] = useState(9);

  const fetchServices = async () => {
    try {
      const data = await getValueAddedServiceList();
      console.log(data , "mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm")

      if (data.success) {
        console.log(data , "mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm")
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <>
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
        <div style={{ background: '#f0f3f4', padding: '20px 0' }}>
          <div style={{ width: '80%', margin: '50px auto' }}>
            <h4>Value Added Services</h4>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="d-flex custom-aligner align-items-center justify-content-between" style={{ background: '#ffffff', padding: '10px 20px', marginTop: '-40px', boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px", width: '70%' }}>
            <div>
              <h5>Enhance Effeciency and Achieve More With Our Extra Services.</h5>
            </div>
            <div>
              <button style={{ backgroundColor: "rgb(0, 143, 247)", border: 'none', padding: '15px', color: '#ffffff', fontWeight: 'bold' }} >Register Now</button>
            </div>
          </div>
        </div>



        <div className="d-flex align-items-center justify-content-end container custom-container-header">
          <div style={{ width: '17%', marginTop: '2rem', marginRight: '2rem' }}>
            <DropdownSelect
              style={{ borderRadius: '0', fontWeight: '700', border: 'none', borderBottom: '1px solid #e4e4e4' }}
              // onChange={setSortingOption}
              addtionalParentClass="list-sort"
              options={[
                "Location",
                "Chennai",
                "Trichy",
              ]}
            />

          </div>
          <div style={{ width: '17%', marginTop: '2rem', marginRight: '6px' }}>
            <DropdownSelect
              style={{ borderRadius: '0', fontWeight: '700', border: 'none', borderBottom: '1px solid #e4e4e4' }}
              // onChange={setSortingOption}
              addtionalParentClass="list-sort"
              options={[
                "Professional",
                "Realestate broker"
              ]}
            />

          </div>

        </div>
        <div className="container custom-container-header" style={{ padding: '30px 0 40px' }}>
          {/* 
        <div className="box-title text-center wow fadeInUp">
          <div className="text-subtitle text-primary">Our Teams</div>
          <h3 className="title mt-4">Meet Our Agents</h3>
        </div> */}
          <div className="swiper tf-sw-mobile-1 non-swiper-on-575" style={{ overflow: 'visible', padding: '0px 20px' }}>
            <div className="tf-layout-mobile-sm xl-col-4 sm-col-2 swiper-wrapper">
              {data?.length && data.map((agent) => (
                <SwiperSlide key={agent.id} className="swiper-slide">
                  <div
                    className="box-agent hover-img wow fadeInUp"
                    style={{ animationDelay: agent.wowDelay, padding: '20px', boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px", gap: '10px', borderRadius: '3px' }} // WOW.js animation delay
                  >
                    <a href="#" className="box-img img-style" style={{ borderRadius: '0px' }}>
                      <img
                        className="lazyload mh-100"
                        data-src={agent.imgSrc}
                        alt={`image-agent-${agent.name}`}
                        src={agent.imageURL}
                        // width={450}
                        style={{ maxHeight: '50px !importent', borderRadius: '3px' }}
                        height={450}
                      />
                    </a>
                    <div className="content justify-content-center">
                      <div className="info" style={{ textAlign: 'center' }}>
                        <h5>
                          <a className="link custom-link">
                            {agent.name}
                          </a>
                        </h5>
                        <p className="text-variant-1" style={{ marginBottom: 0 }}>{agent.gender}, {agent.age} </p>
                      </div>
                      {/* <div className="box-icon">
                      <span className="icon icon-phone" />
                      <span className="icon icon-mail" />
                    </div> */}
                    </div>
                    < Divider style={{ backgroundColor: 'black', marginBottom: '10px' }} />
                    <div className="content justify-content-center">
                      <div className="info" style={{ textAlign: 'center' }}>
                        <p className="text-variant-1" style={{ fontWeight: 'bold', marginBottom: 0 }}>{agent.service}</p>

                        <p className="text-variant-1">{agent.location}</p>
                      </div>

                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </div>
            <div className="sw-pagination spb3 sw-pagination-mb-1 text-center d-sm-none d-block" />
          </div>

          {/* <Swiper
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
                    <div className="box-icon">
                      <span className="icon icon-phone" />
                      <span className="icon icon-mail" />
                    </div>
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
        </Swiper> */}
        </div>

        {/* <ul className="wd-navigation mt-20" style={{ justifyContent: 'center' }} >
          <Pagination
            currentPage={currentPage}
            setPage={setCurrentPage}
            itemLength={sorted?.length}
            itemPerPage={itemPerPage}
          />
        </ul> */}
      </section>
      <Footer2 />
    </>
  );
}
