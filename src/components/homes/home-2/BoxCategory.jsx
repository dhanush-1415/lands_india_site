import { filterOptions, properties, props } from "@/data/properties";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CallIcon from '@mui/icons-material/Call';
import AttachEmailSharpIcon from '@mui/icons-material/AttachEmailSharp';
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import NorthEastIcon from '@mui/icons-material/NorthEast';

export default function BoxCategory() {


  const services = [
    {
      img: "https://pixelprime.co/themes/resideo-wp/demo-1/wp-content/uploads/2020/07/services-1-200x200.png",
      title: "Properties",
      description: "We help you find a new home by offering a smart real estate experience",
    },
    {
      img: "https://pixelprime.co/themes/resideo-wp/demo-1/wp-content/uploads/2020/07/plan-business-200x200.png",
      title: "Projects",
      description: "Find an experienced agent who knows your market best",
    },
    {
      img: "https://pixelprime.co/themes/resideo-wp/demo-1/wp-content/uploads/2020/07/services-2-200x200.png",
      title: "Value Added Service",
      description: "Millions of houses and apartments in your favourite cities",
    },
    {
      img: "https://cdn-icons-png.flaticon.com/512/3693/3693231.png",
      title: "Agent",
      description: "Sign up now and sell or rent your own properties",
    },
    {
      img: "https://static.vecteezy.com/system/resources/thumbnails/035/642/059/small_2x/property-management-icon-line-illustration-vector.jpg",
      title: "Property Management",
      description: "We help you find a new home by offering a smart real estate experience",
    },
    {
      img:"",
      title: "Financial Services",
      description: "Find an experienced agent who knows your market best",
    },
    {
      img: "https://pixelprime.co/themes/resideo-wp/demo-1/wp-content/uploads/2020/07/services-3-200x200.png",
      title: "Wealth Advice",
      description: "Millions of houses and apartments in your favourite cities",
    },
    {
      img: "https://pixelprime.co/themes/resideo-wp/demo-1/wp-content/uploads/2020/07/services-4-200x200.png",
      title: "News and Articles",
      description: "Sign up now and sell or rent your own properties",
    },
  ];


  return (
    <>
      <style>
        {`
          .list-header-custom {
            display:flex;
            flex-direction: row;
            justify-content:space-between;
            align-items:center;
          }
            .service-card {
            position: relative;
            overflow: hidden;
            transition: transform 0.3s ease;
          }

          .service-card:hover {
            transform: scale(1.01); 
          }

          .learn-more-button {
            position: relative;
            bottom: 10;
            left: 50%;
            transform: translateX(-50%) translateY(100%);
            border: none;
            font-weight:bold;
            padding: 0rem 1rem;
            border-radius: 5px;
            font-size: 1rem;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.3s ease, transform 0.3s ease;
          }

          .service-custom-card:hover .learn-more-button {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
          }
          .text-muted {
              margin-bottom: 0.5rem; /* Adjust space below the paragraph */
            }

            .learn-more-button {
              margin-top: 0.5rem; /* Adjust space above the button */
            }

          @media (max-width: 768px) {
            .list-header-custom {
                flex-direction: column;
                align-items: flex-start;
            }
            .filter-list{
              width:100%;
              overflow:auto;
              padding:10px 0 20px;
            }
            .custom-two{
              width:100%;
            }
            .custom-last-two{
              display:flex;
              flex-direction:row;
            }
            .custom-two > p {
              width: max-content;
            }
          }
        `}
      </style>
      <section className="flat-section flat-recommended flat-standby" style={{ position: 'relative', background: '#ffffff !important' }}>
        <div className="d-flex align-items-center justify-content-center flex-column gap-6">
          <div>
            <h3>
              What We do
            </h3>
          </div>
          <div>
            <h6 style={{ fontWeight: 'lighter' }}>We offer perfect realestate services.</h6>
          </div>
        </div>
        <div className="container py-5 custom-container-header">
          <div className="row align-items-stretch">
            {/* {services.map((service, index) => (
              <div
                key={index}
                className={`col-md-3 d-flex flex-column text-center p-5`}
                style={{
                  border: "2px solid #ddd",
                  borderTop: index < 4 ? "none" : "2px solid #ddd",
                  borderRight: index % 4 === 3 ? "none" : "2px solid #ddd",
                  borderBottom : index % 4 === 1 || 2 || 3 ? "none" : "2px solid #ddd",
                  borderLeft: index % 4 === 0 ? "none" : "2px solid #ddd",
                  cursor:'pointer'
                }}
              >
                <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>
                    <img style={{maxWidth:'60%'}} src={service.img} alt="icon" />
                  </div>
                  <h5 className="fw-bold">{service.title}</h5>
                  <p className="text-muted">{service.description}</p>
                </div>
              </div>
            ))} */}
            {services.map((service, index) => (
              <div
                key={index}
                className="service-card col-md-3 d-flex flex-column text-center"
                style={{
                  border: "2px solid #ddd",
                  borderTop: index < 4 ? "none" : "1px solid #ddd",
                  borderRight: index % 4 === 3 ? "none" : "1px solid #ddd",
                  borderBottom: index % 4 === 1 || index % 4 === 2 || index % 4 === 3 ? "none" : "1px solid #ddd",
                  borderLeft: index % 4 === 0 ? "none" : "1px solid #ddd",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                  padding: "0px 3rem 3rem",
                }}
              >
                <div
                  className="service-custom-card"
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>
                    <img style={{ maxWidth: "60%" }} src={service.img} alt="icon" />
                  </div>
                  <h5 className="fw-bold">{service.title}</h5>
                  <p className="text-muted" style={{ marginBottom: "0.5rem" }}>{service.description}</p>
                  <h6 className="learn-more-button" style={{ marginTop: "0.5rem" }}>Learn More</h6>
                </div>
              </div>

            ))}

          </div>
        </div>

      </section>
    </>
  );
}
