import { agents } from "@/data/agents";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Divider } from "@mui/material";
import { Button } from "react-bootstrap";
import { getValueAddedServiceList, getAllLocation } from "@/apiCalls";
import DropdownSelect from "./DropdownSelect";

import Pagination from "./Pagination";
import Footer2 from "../footer/Footer2";
export default function ValueAddedServices() {



  const [data, setData] = useState();
  const [sorted, setSorted] = useState();
  const [itemPerPage, setItemPerPage] = useState(9);
  const [isLogged, setIsLogged] = useState(false);
  const [location, setLocation] = useState(null);
  const [service, setService] = useState(null);
  const [page, setPage] = useState(1)

  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(10);


  const [AllLocation, setAllLocations] = useState([]);

  const fetchLocation = async () => {
    try {
      const data = await getAllLocation();

      if (data.success) {
        const formattedLocations = data.locations
          .filter(location => location)
          .map((location, index) => ({
            id: index + 1,
            name: location.trim(),
          }));

        setAllLocations(formattedLocations);
        console.log(formattedLocations);
      } else {
        // toast.error(data.message);
      }
    } catch (err) {
      console.error('Error fetching Location:', err);
    }
  };

  useEffect(() => {
    const landsUser = JSON.parse(localStorage.getItem('LandsUser'));
    if (landsUser) {
      setIsLogged(true)
    } else {
      setIsLogged(false)
    }
  }, [])

  const fetchServices = async () => {
    try {

      const filter = {
        page: currentPage || 1,
        location: location || "",
        service: service || ""
      };

      const data = await getValueAddedServiceList(filter);
      if (data.success) {
        setData(data.data);
        if (data.pagination) {
          setTotalItems(data.pagination.totalItems)
          setCurrentPage(data.pagination.currentPage)
        }
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [currentPage, location, service]);

  useEffect(() => {
    fetchLocation()
  }, [])

  const realEstateServices = [
    { id: 1, name: "Advocate & Auditor" },
    { id: 2, name: "Investor (Project Invest)" },
    { id: 3, name: "Reseller (Short Term Invest)" },
    { id: 4, name: "Bankers/Loan Provider" },
    { id: 5, name: "Builder/Construction" },
    { id: 6, name: "Interior" },
    { id: 7, name: "Civil Engineer/Architect" },
    { id: 8, name: "Plumbing & Electrical" },
    { id: 9, name: "Flooring" },
    { id: 10, name: "Approval Services" },
    { id: 11, name: "Building Valuation" },
    { id: 12, name: "Digital Security System" },
    { id: 13, name: "Landscaping" }
  ];


  return (
    <>
      <section className="flat-section flat-agents" style={{ paddingTop: '0px' }}>
        <style>{`
      .custom-aligner{
      width:60%;
      }
      
        .custom-image-bar{
            width:100%;
            min-height:230px;
            max-height:230px;
        }
        .custom-filt-bar{
          width:20%;
          margin-top:2rem;
          margin-rignt:2rem;
        }
        @media (max-width: 768px) {
          .custom-filt-bar{
            width:50%;
          }
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
        {!isLogged && (

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
        )}


        <div className="d-flex align-items-center justify-content-end container custom-container-header">
          <div className="custom-filt-bar" style={{ marginTop: '2rem', marginRight: '2rem' }}>
            <DropdownSelect
              options={["Location", ...(AllLocation?.map((item) => item.name) || [])]} // Prepend "All" to the options
              onChange={(location) => {
                const item = AllLocation.find((cat) => cat.name === location);
                setLocation(item.name);
              }}
              style={{ border: 'none', borderBottom: '1px solid gray', borderRadius: '0' }}
            />

          </div>
          <div className="custom-filt-bar" style={{ marginTop: '2rem', marginRight: '6px' }}>
            <DropdownSelect
              options={["professional", ...(realEstateServices?.map((item) => item.name) || [])]} // Prepend "All" to the options
              onChange={(service) => {
                const item = realEstateServices.find((cat) => cat.name === service);
                setService(item.name);
              }}
              style={{ border: 'none', borderBottom: '1px solid gray', borderRadius: '0' }}
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
              {data?.length >= 1 ? data.map((agent) => (
                <SwiperSlide key={agent.id} className="swiper-slide">
                  <div
                    className="box-agent hover-img wow fadeInUp"
                    style={{ padding: '20px', boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px", gap: '10px', borderRadius: '3px' }} // WOW.js animation delay
                  >
                    <a href="#" className="box-img img-style" style={{ borderRadius: '0px' }}>
                      <img
                        className="custom-image-bar"
                        data-src={agent.image}
                        alt={`image-agent-${agent.name}`}
                        src={agent.image}
                        // width={450}
                        style={{ maxHeight: '230px !importent', minHeight: '230px !important', borderRadius: '3px' }}
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
                        <p className="text-variant-1" style={{ fontWeight: 'bold', marginBottom: 0 }}>{agent.professional}</p>

                        <p className="text-variant-1">{agent.location}</p>
                      </div>

                    </div>
                  </div>
                </SwiperSlide>
              )) : (
                <></>
              )}
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

        <ul className="wd-navigation mt-20" style={{ justifyContent: 'center' }} >
          <Pagination
            currentPage={currentPage}
            setPage={setCurrentPage}
            itemLength={totalItems}
            itemPerPage={pageSize}
          />
        </ul>
      </section>
      <Footer2 />
    </>
  );
}
