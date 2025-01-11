import { filterOptions, properties, props } from "@/data/properties";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CallIcon from '@mui/icons-material/Call';
import AttachEmailSharpIcon from '@mui/icons-material/AttachEmailSharp';
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import DraftsTwoToneIcon from '@mui/icons-material/DraftsTwoTone';

export default function Properties() {
  const [selectedOption, setSelectedOption] = useState(filterOptions[2]);
  const [filtered, setFiltered] = useState(props);
  useEffect(() => {
    if (selectedOption == "View All") {
      const filteredProps = props.slice(0, 8);
      setFiltered(filteredProps);
    } else {
      setFiltered(
        props.filter((el) => el.filterOptions.includes(selectedOption))
      );
    }
  }, [selectedOption, props]);



  return (
    <>
      <style>
        {`
          .list-header-custom {
            display:flex;
            flex-direction: row;
            justify-content:space-between;
            align-items:center;
            padding-bottom:20px;
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
      <section className="flat-section flat-recommended flat-standby " style={{ position: 'relative', background: '#f0f3f4' }}>
        <div className="container">
          {/* <div className="box-title text-center wow fadeInUp">
            <div className="text-subtitle text-primary">Featured Properties</div>
            <h3 className="mt-4 title">Recommended For You</h3>
          </div> */}
          <div className="list-header-custom">
            <div>
              <h3 className="carousel-title">
                Property Stores <br />
                Recommended For You
              </h3>
            </div>
            <div className="d-flex gap-3 filter-list" style={{ fontWeight: 'bold', fontSize: '1rem' }}>
              <div className="custom-two">
                <p>Residential</p>
              </div>
              <div className="custom-two">
                <p>Commercial</p>
              </div>
              <div className="custom-two">
                <p>Land & Plots</p>
              </div>
              <div className="custom-two">
                <p>Projects</p>
              </div>
              <div className="custom-two custom-last-two">
                <p>See All Properties</p>
                < NorthEastIcon sx={{ margin: ' -5px 0px 0px 5px' }} />
              </div>
            </div>
          </div>
          <div
            className="flat-tab-recommended flat-animate-tab wow fadeInUp"
            data-wow-delay=".2s"
          >
            <div className="tab-content" >
              <div className="tab-pane active show">
                <div className="row">
                  {filtered.map((property, index) => (
                    <div key={index} className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                      <div className="homelengo-box">
                        <div className="archive-top">
                          <Link to={`/property-details/${property.id}`} className="images-group">
                            <div className="images-style" style={{ position: "relative" }}>
                              <img
                                className="lazyload"
                                data-src={property.img[0]}
                                alt=""
                                src={property.img[0]}
                                style={{
                                  width: "615px",
                                  height: "250px",
                                  objectFit: "cover",
                                }}
                              />
                              {/* Gradient Overlay */}
                              <div
                                style={{
                                  position: "absolute",
                                  bottom: 0,
                                  left: 0,
                                  right: 0,
                                  height: "50%",
                                  background: "linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0))",
                                }}
                              />
                            </div>
                            <div className="bottom" style={{ fontSize: "14px", position: "absolute", bottom: "10px", left: "10px", color: "white" }}>
                              <svg
                                width={16}
                                height={16}
                                viewBox="0 0 16 16"
                                fill="none"
                              >
                                <path
                                  d="M10 7C10 7.53043 9.78929 8.03914 9.41421 8.41421C9.03914 8.78929 8.53043 9 8 9C7.46957 9 6.96086 8.78929 6.58579 8.41421C6.21071 8.03914 6 7.53043 6 7C6 6.46957 6.21071 5.96086 6.58579 5.58579C6.96086 5.21071 7.46957 5 8 5C8.53043 5 9.03914 5.21071 9.41421 5.58579C9.78929 5.96086 10 6.46957 10 7Z"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M13 7C13 11.7613 8 14.5 8 14.5C8 14.5 3 11.7613 3 7C3 5.67392 3.52678 4.40215 4.46447 3.46447C5.40215 2.52678 6.67392 2 8 2C9.32608 2 10.5979 2.52678 11.5355 3.46447C12.4732 4.40215 13 5.67392 13 7Z"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              {property.propertyDetails.location.district}, {property.propertyDetails.location.state}
                            </div>
                          </Link>
                        </div>

                        <div className="archive-bottom" style={{ backgroundColor: '#ffffff' }}>
                          <div className="content-top">
                            <h6 className="text-capitalize">
                              <Link
                                to={`/property-details/${property.id}`}
                                className="link"
                              >
                                {property.propertyDetails.title}
                              </Link>
                            </h6>
                            <ul className="meta-list" style={{ paddingLeft: '0px' }}>
                              <li className="item">
                                <i className="icon icon-bed" style={{ fontSize: '25px' }} />
                                <span className="text-variant-1">Beds:</span>
                                <span className="fw-6">{8}</span>
                              </li>
                              <li className="item">
                                <i className="icon icon-bath" style={{ fontSize: '25px' }} />
                                <span className="text-variant-1">Baths:</span>
                                <span className="fw-6">{property.baths}</span>
                              </li>
                              <li className="item">
                                <i className="icon icon-sqft" style={{ fontSize: '25px' }} />
                                <span className="text-variant-1">Sqft:</span>
                                <span className="fw-6">{property.sqft}</span>
                              </li>
                            </ul>
                          </div>
                          <div className="content-bottom">
                            <h6 className="price">
                              ₹{property.propertyDetails.price}
                            </h6>
                            <div className="d-flex gap-8 align-items-center">
                              <span style={{ cursor: 'pointer', fontWeight: 'bold', border: '1.5px dotted black', padding: '5px 10px' }} >View Details</span>
                            </div>

                          </div>
                          <div className="content-bottom mt-3">
                            <div
                              className="d-flex justify-content-center align-items-center shadow-sm mt-3"
                              style={{
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                background: '#018df7',
                                color: '#ffffff',
                                padding: '10px 5px',
                                borderRadius: '0px',
                                textAlign: 'center',
                              }}
                            >
                              <DraftsTwoToneIcon sx={{ marginRight: '5px' }} />
                              <span>Enquiry Now</span>
                            </div>
                            <div
                              className="d-flex justify-content-around mt-3"
                              style={{ gap: '15px' }}
                            >
                              <div
                                className="d-flex justify-content-center align-items-center rounded-circle border shadow-sm"
                                style={{
                                  width: '50px',
                                  height: '50px',
                                  cursor: 'pointer',
                                  background: '#ffffff',
                                }}
                              >
                                <CallIcon sx={{ color: '#018df7' }} />
                              </div>
                              <div
                                className="d-flex justify-content-center align-items-center rounded-circle border shadow-sm"
                                style={{
                                  width: '50px',
                                  height: '50px',
                                  cursor: 'pointer',
                                  background: '#ffffff',
                                }}
                              >
                                <WhatsAppIcon sx={{ color: '#25D366' }} />
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* <div className="text-center">
                  <Link
                    to={`/properties`}
                    className="tf-btn btn-view primary size-1 hover-btn-view"
                  >
                    View All Properties
                    <span className="icon icon-arrow-right2" />
                  </Link>
                </div> */}
              </div>
            </div>
          </div>
        </div>

      </section>
    </>
  );
}
