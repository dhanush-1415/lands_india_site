import { agents } from "@/data/agents";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Divider } from "@mui/material";
import { Button } from "react-bootstrap";
import { getAgents } from "@/apiCalls";

import Pagination from "./Pagination";
import DropdownSelect from "./DropdownSelect";
import Footer2 from "../footer/Footer2";
import CreateAgent from "./CreateAgent";

export default function Agents() {


  const [data, setData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [sorted, setSorted] = useState();
  const [itemPerPage, setItemPerPage] = useState(9);
  const [location, setLocation] = useState("Location");
  const [service , setService ] = useState("Service")

  console.log(data, "ppppppppppppppppppp")

  const fetchAgents = async () => {
    try {
      const data = await getAgents({ location, });
      if (data.success) {
        setData(data.data)
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);


  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const AllLocation = [
    { "id": 1, "name": "Ariyalur" },
    { "id": 2, "name": "Chengalpattu" },
    { "id": 3, "name": "Chennai" },
    { "id": 4, "name": "Coimbatore" },
    { "id": 5, "name": "Cuddalore" },
    { "id": 6, "name": "Dharmapuri" },
    { "id": 7, "name": "Dindigul" },
    { "id": 8, "name": "Erode" },
    { "id": 9, "name": "Kallakurichi" },
    { "id": 10, "name": "Kancheepuram" },
    { "id": 11, "name": "Karur" },
    { "id": 12, "name": "Krishnagiri" },
    { "id": 13, "name": "Madurai" },
    { "id": 14, "name": "Mayiladuthurai" },
    { "id": 15, "name": "Nagapattinam" },
    { "id": 16, "name": "Kanyakumari" },
    { "id": 17, "name": "Namakkal" },
    { "id": 18, "name": "Perambalur" },
    { "id": 19, "name": "Pudukkottai" },
    { "id": 20, "name": "Ramanathapuram" },
    { "id": 21, "name": "Ranipet" },
    { "id": 22, "name": "Salem" },
    { "id": 23, "name": "Sivaganga" },
    { "id": 24, "name": "Tenkasi" },
    { "id": 25, "name": "Thanjavur" },
    { "id": 26, "name": "Theni" },
    { "id": 27, "name": "Thiruvallur" },
    { "id": 28, "name": "Thiruvarur" },
    { "id": 29, "name": "Thoothukudi" },
    { "id": 30, "name": "Tiruchirappalli" },
    { "id": 31, "name": "Tirunelveli" },
    { "id": 32, "name": "Tirupathur" },
    { "id": 33, "name": "Tiruppur" },
    { "id": 34, "name": "Tiruvannamalai" },
    { "id": 35, "name": "The Nilgiris" },
    { "id": 36, "name": "Vellore" },
    { "id": 37, "name": "Viluppuram" },
    { "id": 38, "name": "Virudhunagar" }
  ]


  const realEstateServices = [
    { id: 1, name: "Property Listing" },
    { id: 2, name: "Real Estate Brokerage" },
    { id: 3, name: "Property Management" },
    { id: 4, name: "Home Inspection" },
    { id: 5, name: "Real Estate Appraisal" },
    { id: 6, name: "Mortgage Services" },
    { id: 7, name: "Legal Assistance" },
    { id: 8, name: "Interior Design and Staging" },
    { id: 9, name: "Architectural Services" },
    { id: 10, name: "Construction and Renovation" },
    { id: 11, name: "Real Estate Photography" },
    { id: 12, name: "Virtual Tours and 3D Modeling" },
    { id: 13, name: "Title and Escrow Services" },
    { id: 14, name: "Property Marketing" },
    { id: 15, name: "Relocation Services" },
  ];



  return (
    <>
      <CreateAgent open={open} handleClose={handleClose} />
      <section className="flat-section flat-agents" style={{ paddingTop: '0px' }}>
        <style>{`
      .custom-aligner{
      width:60%;
      }
        .image-style {
          min-height: 320px !important;
          max-height: 320px !important;
          border-radius: 3px;
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
            <h4>Our Agents</h4>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="d-flex custom-aligner align-items-center justify-content-between" style={{ background: '#ffffff', padding: '10px 20px', marginTop: '-40px', boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}>
            <div>
              <h5>Sign Up to Start Your Journey as a Top-Tire Agent</h5>
            </div>
            <div>
              <button style={{ backgroundColor: "rgb(0, 143, 247)", border: 'none', padding: '15px', color: '#ffffff', fontWeight: 'bold' }} >Register As Agent</button>
            </div>
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-end container custom-container-header">
          <div style={{ width: '17%', marginTop: '2rem', marginRight: '2rem' }}>
            <DropdownSelect
              options={["Location", ...(AllLocation?.map((item) => item.name) || [])]} // Prepend "All" to the options
              onChange={(location) => {
                const item = AllLocation.find((cat) => cat.name === location);
                setLocation(item);
              }}
            />

          </div>
          <div style={{ width: '17%', marginTop: '2rem', marginRight: '6px' }}>
            <DropdownSelect
              options={["Service", ...(realEstateServices?.map((item) => item.name) || [])]} // Prepend "All" to the options
              onChange={(service) => {
                const item = realEstateServices.find((cat) => cat.name === service);
                setService(item);
              }}
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
                    <a className="box-img img-style" style={{ borderRadius: '0px' }}>
                      <img
                        className="lazyload image-style"
                        data-src={agent.imageURLs[0]}
                        alt={`image-agent-${agent.name}`}
                        src={agent.imageURLs[0]}
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
        {/* 
        <ul className="wd-navigation mt-20" style={{ justifyContent: 'center' }} >
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
