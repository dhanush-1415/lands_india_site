import { filterOptions, properties, props } from "@/data/properties";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

  return (
    <section className="flat-section flat-recommended" style={{position: 'relative', zIndex: '500'}}>
      <div className="container">
        <div className="box-title text-center wow fadeInUp">
          <div className="text-subtitle text-primary">Featured Properties</div>
          <h3 className="mt-4 title">Recommended For You</h3>
        </div>
        <div
          className="flat-tab-recommended flat-animate-tab wow fadeInUp"
          data-wow-delay=".2s"
        >
          <ul className="nav-tab-recommended justify-content-md-center">
            {filterOptions.map((option, index) => (
              <li
                onClick={() => setSelectedOption(option)}
                key={index}
                className="nav-tab-item"
              >
                <a
                  className={`nav-link-item ${
                    option === selectedOption ? "active" : ""
                  }`}
                >
                  {option}
                </a>
              </li>
            ))}
          </ul>
          <div className="tab-content">
            <div className="tab-pane active show">
              <div className="row">
                {filtered.map((property, index) => (
                  <div key={index} className="col-xl-4 col-lg-6 col-md-6">
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

                          <div className="top">
                            <ul className="d-flex gap-6">
                              <li className="flag-tag primary">Featured</li>
                              <li className="flag-tag style-1">For Sale</li>
                            </ul>
                          </div>
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
                          {/* <div className="d-flex gap-8 align-items-center">
                            <div className="avatar avt-40 round">
                              <img
                                alt="avt"
                                src={property.avatar}
                                width={34}
                                height={34}
                              />
                            </div>
                            <span>{property.agent}</span>
                          </div> */}
                          <h6 className="price">
                            ₹{property.propertyDetails.price}
                          </h6>
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
    </section>
  );
}
