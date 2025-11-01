import { agents } from "@/data/agents";
import React, { useState, useEffect, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Divider } from "@mui/material";
import { Button } from "react-bootstrap";
import { getAgents, searchCity } from "@/apiCalls";

import Pagination from "./Pagination";
import DropdownSelect from "./DropdownSelect";
import CityDropdownSelect from "./CustomCityDropdownSelect";
import Footer2 from "../footer/Footer2";
import CreateAgent from "./CreateAgent";
import { BorderBottom } from "@mui/icons-material";

export default function Agents() {


  const [data, setData] = useState();
  const [sorted, setSorted] = useState();
  const [itemPerPage, setItemPerPage] = useState(9);
  const [location, setLocation] = useState(null);
  const [service, setService] = useState(null);
  const [isLogged, setIsLogged] = useState(false);

  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const [AllLocation, setAllLocations] = useState([
    {
      id: 1,
      name: "chennai",
      stateName: "Tamil Nadu",
      districtName: "chennai",
    },
    {
      id: 2,
      name: "trichy",
      stateName: "Tamil Nadu",
      districtName: "chennai",
    },
    {
      id: 3,
      name: "coimbatore",
      stateName: "Tamil Nadu",
      districtName: "chennai",
    }
  ]);
  const [isLocationLoading, setIsLocationLoading] = useState(false);

  // Fetch cities/locations from API - memoized to prevent unnecessary re-renders
  const fetchLocation = useCallback(async (query = "a") => {
    setIsLocationLoading(true);
    try {
      const data = await searchCity(query);

      if (data?.success && Array.isArray(data?.results)) {
        // Deduplicate by name and keep display-friendly name
        const uniqueNames = Array.from(
          new Map(
            data.results
              .filter((r) => typeof r?.name === "string" && r.name.trim().length > 0)
              .map((r) => [r.name.trim(), r])
          ).values()
        );

        const formattedLocations = uniqueNames.map((location, index) => ({
          id: index + 1,
          name: location.name.trim(),
          // Keep extra fields for potential future use
          stateName: location.state_name,
          districtName: location.district_name,
          talukaName: location.taluka_name,
          fullPath: location.full_path,
          uniqueCode: location.unique_code,
          type: location.type,
        }));

        setAllLocations(formattedLocations);
      }
    } catch (err) {
      console.error("Error fetching Location:", err);
    } finally {
      setIsLocationLoading(false);
    }
  }, []);

  // Memoized callback for search changes
  const handleSearchChange = useCallback((term) => {
    const q = term && term.trim().length > 0 ? term.trim() : "a";
    fetchLocation(q);
  }, [fetchLocation]);


  useEffect(() => {
    const landsUser = JSON.parse(localStorage.getItem('LandsUser'));
    if (landsUser) {
      setIsLogged(true)
    } else {
      setIsLogged(false)
    }
  }, [])

  const fetchAgents = async () => {
    try {

      const filter = {
        page: currentPage || 1,
        location: location || "",
        service: service || ""
      };


      const data = await getAgents(filter);
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
    fetchAgents();
  }, [location, service, currentPage]);

  useEffect(() => {
    // Seed with a broad query to populate initial options
    fetchLocation("a");
  }, [fetchLocation])


  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const realEstateServices = [
    { id: 1, name: "RealEstate Broker" },
    { id: 2, name: "RealEstate Promoter" },
    { id: 3, name: "RealEstate Marketer" }
  ]


  return (
    <>
      <CreateAgent open={open} handleClose={handleClose} />
      <section className="flat-section flat-agents" style={{ paddingTop: '0px' }}>
        <style>{`
      .custom-aligner{
        width:60%;
        }
        .custom-drop{
          width: 17%;
          margin-right: 2rem;
        }
        .custom-img{
          max-height:230px !important;
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
          .custom-drop{
            width: 107%;
             margin-right:0;
          }
        }
        `}
        </style>
        <div style={{ background: '#f0f3f4', padding: '20px 0' }}>
          <div style={{ width: '80%', margin: '50px auto' }}>
            <h4>Our Agents</h4>
          </div>
        </div>
        {!isLogged && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="d-flex custom-aligner align-items-center justify-content-between" style={{ background: '#ffffff', padding: '10px 20px', marginTop: '-40px', boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}>
              <div>
                <h5>Sign Up to Start Your Journey as a Top-Tire Agent</h5>
              </div>
              <div>
                <button 
                  onClick={() => {
                    // Open login popup by triggering a custom event
                    const event = new CustomEvent('openLoginPopup');
                    window.dispatchEvent(event);
                  }}
                  style={{ backgroundColor: "rgb(0, 143, 247)", border: 'none', padding: '15px', color: '#ffffff', fontWeight: 'bold', cursor: 'pointer' }} 
                >
                  Register As Agent
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="d-flex align-items-center justify-content-end container  custom-container-header mt-5">
          <div className="custom-drop">
            <CityDropdownSelect
              searchable={true}
              placeholder="Search location..."
              options={[...(AllLocation?.map((item) => item.name) || [])]}
              onSearchChange={handleSearchChange}
              isLoading={isLocationLoading}
              onChange={(locationName) => {
                const item = AllLocation.find((cat) => cat.name === locationName);
                setLocation(item?.name || null);
              }}
              style={{ border: 'none', borderBottom: '1px solid gray', borderRadius: '0' }}
            />

          </div>
          <div className="custom-drop">
            <DropdownSelect
              options={["Service", ...(realEstateServices?.map((item) => item.name) || [])]} // Prepend "All" to the options
              onChange={(service) => {
                if (service === "Service") {
                  setService(null);
                } else {
                  const item = realEstateServices.find((cat) => cat.name === service);
                  setService(item?.name || null);
                }
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
              {data?.length >= 1 && data.map((agent) => (
                <SwiperSlide key={agent.id} className="swiper-slide">
                  <div
                    className="box-agent hover-img wow fadeInUp"
                    style={{ animationDelay: agent.wowDelay, padding: '20px', boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px", gap: '10px', borderRadius: '3px' }} // WOW.js animation delay
                  >
                    <a className="box-img img-style custom-img" style={{ borderRadius: '0px' }}>
                      <img
                        className="lazyload image-style"
                        data-src={JSON.parse(agent?.image) || ""}
                        alt={`image-agent-${agent.name}`}
                        src={JSON.parse(agent?.image)}
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
