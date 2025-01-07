import { filterOptions, properties, props } from "@/data/properties";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CallIcon from '@mui/icons-material/Call';
import AttachEmailSharpIcon from '@mui/icons-material/AttachEmailSharp';
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import NorthEastIcon from '@mui/icons-material/NorthEast';

export default function Properties() {
  const [selectedOption, setSelectedOption] = useState(filterOptions[0]);
  const [filtered, setFiltered] = useState(props);
  useEffect(() => {
    if (selectedOption == "View All") {
      setFiltered(props);
    } else {
      setFiltered(
        props.filter((el) => el.filterOptions.includes(selectedOption))
      );
    }
    console.log('fffff', filtered);

  }, [selectedOption, props]);


  const services = [
    {
      icon: "bi bi-house",
      title: "Properties",
      description: "We help you find a new home by offering a smart real estate experience",
    },
    {
      icon: "bi bi-buildings",
      title: "Projects",
      description: "Find an experienced agent who knows your market best",
    },
    {
      icon: "bi bi-handshake",
      title: "Value Added Service",
      description: "Millions of houses and apartments in your favourite cities",
    },
    {
      icon: "bi bi-person-circle",
      title: "Agent",
      description: "Sign up now and sell or rent your own properties",
    },
    {
      icon: "bi bi-gear",
      title: "Property Management",
      description: "We help you find a new home by offering a smart real estate experience",
    },
    {
      icon: "bi bi-cash-stack",
      title: "Financial Services",
      description: "Find an experienced agent who knows your market best",
    },
    {
      icon: "bi bi-wallet2",
      title: "Wealth Advice",
      description: "Millions of houses and apartments in your favourite cities",
    },
    {
      icon: "bi bi-newspaper",
      title: "News and Articles",
      description: "Sign up now and sell or rent your own properties",
    },
    {
      icon: "bi bi-newspaper",
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
      <section className="flat-section flat-recommended flat-standby" style={{ position: 'relative' }}>
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
            {/* <ul className="nav-tab-recommended justify-content-md-center">
              {filterOptions.map((option, index) => (
                <li
                  onClick={() => setSelectedOption(option)}
                  key={index}
                  className="nav-tab-item"
                >
                  <a
                    className={`nav-link-item ${option === selectedOption ? "active" : ""
                      }`}
                  >
                    {option}
                  </a>
                </li>
              ))}
            </ul> */}
            <div className="tab-content">
              <div className="tab-pane active show">
                <div className="row">
                  {filtered.map((property, index) => (
                    <div key={index} className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                      <div className="homelengo-box">
                        <div className="archive-top">
                          <Link
                            to={`/property-details/${property.id}`}
                            className="images-group"

                          >
                            <div className="images-style">
                              <img
                                className="lazyload"
                                data-src={property.img[0]}
                                alt=""
                                src={property.img[0]}
                                style={{
                                  width: "615px",
                                  height: "250px",
                                  objectFit: "cover"
                                }}
                              />
                            </div>

                            {/* <div className="top">
                            <ul className="d-flex gap-6">
                              <li className="flag-tag primary">Featured</li>
                              <li className="flag-tag style-1">For Sale</li>
                            </ul>
                          </div> */}
                            <div className="bottom">
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
                              {property.propertyDetails.location.village}, {property.propertyDetails.location.district}, {property.propertyDetails.location.state}, {property.propertyDetails.location.country}
                            </div>
                          </Link>
                        </div>
                        <div className="archive-bottom">
                          <div className="content-top">
                            <h6 className="text-capitalize">
                              <Link
                                to={`/property-details/${property.id}`}
                                className="link"
                              >
                                {property.propertyDetails.title}
                              </Link>
                            </h6>
                            <ul className="meta-list">
                              <li className="item">
                                <i className="icon icon-bed" />
                                <span className="text-variant-1">Beds:</span>
                                <span className="fw-6">{8}</span>
                              </li>
                              <li className="item">
                                <i className="icon icon-bath" />
                                <span className="text-variant-1">Baths:</span>
                                <span className="fw-6">{property.baths}</span>
                              </li>
                              <li className="item">
                                <i className="icon icon-sqft" />
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
                              <span style={{ fontWeight: 'bold', border: '1.5px dotted black', padding: '3px 10px' }} >View Details</span>
                            </div>
                          </div>
                          <div className="content-bottom mt-3">
                            <div className="d-flex gap-8 align-items-center" style={{ fontWeight: 'bold', background: '#018df7', color: '#ffffff', padding: '4px 10px' }}>
                              <AttachEmailSharpIcon sx={{ padding: '0px 2px' }} /><span > Enquiry Now </span>
                            </div>
                            <div className="" style={{ padding: '3px', border: '1px solid black', borderRadius: '50%' }}>
                              <CallIcon />
                            </div>
                            <div className="" style={{ padding: '3px', border: '1px solid black', borderRadius: '50%' }}>
                              <PermPhoneMsgIcon />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <Link
                    to={`/properties`}
                    className="tf-btn btn-view primary size-1 hover-btn-view"
                  >
                    View All Properties
                    <span className="icon icon-arrow-right2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container py-5">
          <div className="row">
            {services.map((service, index) => (
              <div
                key={index}
                className={`col-md-4 text-center p-4 ${index % 3} ${index % 3 === 0 ? "border-top-0 border-start-0" : "" // First in the row
                  } ${index % 3 === 2 ? "border-end-0 border-top-0" : "" // Last in the row
                  } ${index % 3 === 1 ? "border-top-0" : "" // Last in the row
                  } ${index >= services.length - (services.length % 3 || 3) // Last row
                    ? "border-bottom-0 border-top-0"
                    : ""
                  }`}
                style={{
                  border: "2px solid #ddd",
                }}
              >
                <i className={`${service.icon} fs-1 mb-3`}></i>
                <h5 className="fw-bold">{service.title}</h5>
                <p className="text-muted">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
