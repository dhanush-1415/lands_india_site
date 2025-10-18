import { filterOptions, properties, props } from "@/data/properties";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CallIcon from '@mui/icons-material/Call';
import AttachEmailSharpIcon from '@mui/icons-material/AttachEmailSharp';
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import DraftsTwoToneIcon from '@mui/icons-material/DraftsTwoTone';
import EnquiryForm from "@/components/common/Enquiry";
import { getProperties, updateWishlist, getUserWishList } from "@/apiCalls";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import { toast } from "react-toastify";

export default function Properties() {
  const navigate = useNavigate();

  const [wishListList, setWishListList] = useState([]);
  const [properties, setProperties] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(undefined);
  const [wishlistLoaded, setWishlistLoaded] = useState(false); // Track if wishlist has been loaded

  useEffect(() => {
    setProperties((prevProperties) =>
      prevProperties.map((property) => ({
        ...property,
        isWishlist: wishListList.includes(property.id),
      }))
    );
  }, [wishListList]);


  const displayedProperties = (() => {
    const maxCount = 8;
    const slicedProperties = properties.slice(0, maxCount);

    if (slicedProperties.length < maxCount && slicedProperties.length % 2 === 0) {
      slicedProperties.pop();
    }

    return slicedProperties;
  })();

  const fetchProperty = async () => {
    try {
      const filter = {
        location: "",
        minPrice: 0,
        maxPrice: 0,
        keyword: "",
        category: selectedCategory || "",
        subCategory: "",
        status: "Verified",
      };
      const data = await getProperties(filter);
      if (data.success) {
        const combined = data.properties.map((property) => {
          const propertyInputs = data.propertyInputs.filter(input => input.properties_postId === property.id);

          const inputsWithNames = propertyInputs.map((input) => {
            const inputData = data.inputs.find(i => i.id === input.input_id);
            return {
              ...input,
              input_name: inputData ? inputData.input_name : '',
              input_type: inputData ? inputData.input_type : '',
              options: inputData ? inputData.options : [],
            };
          });

          return {
            ...property,
            inputs: inputsWithNames,
            isWishlist: wishListList.includes(property.id), // Add isWishlist
          };
        });
        setProperties(combined);

      } else {
        setProperties([])
        // toast.error(data.message);
      }
    } catch (err) {
      console.error('Error fetching properties:', err);
    }
  };

  const fetchWishlist = async () => {
    const landsUser = JSON.parse(localStorage.getItem('LandsUser'));

    if (landsUser) {
      try {
        const data = await getUserWishList(landsUser.id);

        if (data.success) {
          setWishListList(data.wishList);
          setWishlistLoaded(true); // Mark wishlist as loaded
        } else {
          // toast.error(data.message);
        }
      } catch (err) {
        console.error('Error fetching wishlist:', err);
      }
    }
    else {
      fetchProperty();

    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  useEffect(() => {
    if (wishlistLoaded) {
      fetchProperty();
    }
  }, [wishlistLoaded]);

  useEffect(() => {
    fetchProperty();
  }, [selectedCategory]);

  const handleWishlist = async (elm, act) => {
    const landsUser = JSON.parse(localStorage.getItem('LandsUser'));

    if (landsUser) {
      const payLoad = {
        userId: landsUser.id,
        propertyId: elm.id,
        action: act,
      };

      try {
        const data = await updateWishlist(payLoad);
        if (data.success) {
          const updatedWishList = await getUserWishList(landsUser.id);
          
          if (updatedWishList.success) {
            setWishListList(updatedWishList.wishList);
          }
        } else {
          toast.error(data.message);
        }
      } catch (err) {
        console.error('Error updating wishlist:', err);
      }
    } else {
      toast.error("Please Login to Continue");
    }
  };

  const [open, setOpen] = React.useState(false);

  const [propertyId, setPropertyId] = useState(null);

  const handleClickOpen = (id) => {
    setOpen(true);
    setPropertyId(id);
  };

  const handleClose = () => {
    setOpen(false);
    setPropertyId(null);
  };


  // Map display category to API slug
  const getCategorySlug = (category) => {
    switch (category.trim().toLowerCase()) {
      case 'land & plots':
      case 'lands/plots':
      case 'land/plot':
      case 'land_plots':
      case 'land plots':
        return 'land/plot';
      case 'projects':
        return 'projects';
      case 'residential':
        return 'residential';
      case 'commercial':
        return 'commercial';
      default:
        return category.trim().toLowerCase().replace(/\s+/g, '_');
    }
  };

  const handleNavigation = (category) => {
    setSelectedCategory(category);
    const slug = getCategorySlug(category);
    navigate(`/properties/all?category=${encodeURIComponent(slug)}`);
  };


  



  return (
    <>
      <EnquiryForm open={open} handleClose={handleClose} id={propertyId} />
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
                i5 Property Stars <br />
                Recommended For You
              </h3>
            </div>
            <div className="d-flex gap-3 filter-list" style={{ fontWeight: 'bold', fontSize: '1rem' }}>
              <div className="custom-two">
                <p 
                  style={{ 
                    cursor: 'pointer',
                    color: selectedCategory === "Residential" ? '#018df7' : 'inherit',
                    fontWeight: selectedCategory === "Residential" ? 'bold' : 'normal'
                  }} 
                  onClick={() => { handleNavigation("Residential") }}
                >
                  Residential
                </p>
              </div>
              <div className="custom-two">
                <p 
                  style={{ 
                    cursor: 'pointer',
                    color: selectedCategory === "Commercial" ? '#018df7' : 'inherit',
                    fontWeight: selectedCategory === "Commercial" ? 'bold' : 'normal'
                  }} 
                  onClick={() => { handleNavigation("Commercial") }}
                >
                  Commercial
                </p>
              </div>
              <div className="custom-two">
                <p 
                  style={{ 
                    cursor: 'pointer',
                    color: selectedCategory === "land/plot" || selectedCategory === "Land & Plots" ? '#018df7' : 'inherit',
                    fontWeight: selectedCategory === "land/plot" || selectedCategory === "Land & Plots" ? 'bold' : 'normal'
                  }} 
                  onClick={() => { handleNavigation("Land & Plots") }}
                >
                  Land & Plots
                </p>
              </div>
              <div className="custom-two">
                <p 
                  style={{ 
                    cursor: 'pointer',
                    color: selectedCategory === "Projects" ? '#018df7' : 'inherit',
                    fontWeight: selectedCategory === "Projects" ? 'bold' : 'normal'
                  }} 
                  onClick={() => { handleNavigation("Projects") }}
                >
                  Projects
                </p>
              </div>
              <div className="custom-two custom-last-two">
                <p style={{ cursor: 'pointer' }} onClick={() => { window.location.href = "/properties/all" }}>See All Properties</p>
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
                  {displayedProperties.length > 0 && displayedProperties.map((elm, index) => (
                    <div key={index} className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                      <div className="homelengo-box" 
                           style={{ cursor: 'pointer' }}
                           onClick={() => window.location.href = `/property-details/${elm.id}`}>
                        <div className="archive-top">
                          <Link className="images-group">
                            <div className="images-style" style={{ position: "relative" }}>
                              <img
                                className="lazyload"
                                data-src={elm.file_path ? elm.file_path.split(',')[0] : ""}
                                alt=""
                                src={elm.file_path ? elm.file_path.split(',')[0] : ""}
                                style={{
                                  width: "615px",
                                  height: "250px",
                                  objectFit: "cover",
                                }}
                              />

                            </div>

                            {elm.isWishlist ? (
                              <div
                                style={{
                                  position: "absolute",
                                  bottom: 0,
                                  left: 0,
                                  right: 0,
                                  height: "100%",
                                  zIndex: 9999,
                                  padding: '10px 0px 0px 15px',
                                  background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.), rgba(0, 0, 0, 0))",
                                }}
                              // Replace with your wishlist handling function
                              >
                                <FavoriteIcon
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleWishlist(elm, "remove");
                                  }}
                                  sx={{
                                    backgroundColor: '#fff',
                                    position: 'absolute',
                                    color: 'red',
                                    top: '0px',
                                    left: '0px',
                                    padding: '3px',
                                    borderRadius: '2px',
                                    fontSize:'30px !important',
                                  }}
                                />

                              </div>
                            ) : (
                              <div
                                style={{
                                  position: "absolute",
                                  bottom: 0,
                                  left: 0,
                                  right: 0,
                                  height: "100%",
                                  zIndex: 9999,
                                  padding: '10px 0px 0px 15px',
                                  background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.), rgba(0, 0, 0, 0))",
                                }}
                              >
                                <FavoriteBorderIcon
                                  sx={{
                                    backgroundColor: '#fff',
                                    position: 'absolute',
                                    color: 'red',
                                    top: '0px',
                                    left: '0px',
                                    padding: '3px',
                                    borderRadius: '2px',
                                    fontSize:'30px !important',

                                  }}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleWishlist(elm, 'add');
                                  }} />
                              </div>
                            )}
                          </Link>
                        </div>

                        <div className="archive-bottom" style={{ backgroundColor: '#ffffff' }}>
                          <div className="content-top">
                            {/* Location above the title */}
                            <div style={{ 
                              fontSize: "14px", 
                              color: "#666", 
                              marginBottom: "8px",
                              display: "flex",
                              alignItems: "center",
                              gap: "4px"
                            }}>
                              <svg
                                width={14}
                                height={14}
                                viewBox="0 0 16 16"
                                fill="none"
                              >
                                <path
                                  d="M10 7C10 7.53043 9.78929 8.03914 9.41421 8.41421C9.03914 8.78929 8.53043 9 8 9C7.46957 9 6.96086 8.78929 6.58579 8.41421C6.21071 8.03914 6 7.53043 6 7C6 6.46957 6.21071 5.96086 6.58579 5.58579C6.96086 5.21071 7.46957 5 8 5C8.53043 5 9.03914 5.21071 9.41421 5.58579C9.78929 5.96086 10 6.46957 10 7Z"
                                  stroke="#666"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M13 7C13 11.7613 8 14.5 8 14.5C8 14.5 3 11.7613 3 7C3 5.67392 3.52678 4.40215 4.46447 3.46447C5.40215 2.52678 6.67392 2 8 2C9.32608 2 10.5979 2.52678 11.5355 3.46447C12.4732 4.40215 13 5.67392 13 7Z"
                                  stroke="#666"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              {elm.inputs.find(item => item.input_name === "City")?.input_value || ""}
                            </div>
                            
                            <h6
                              className="text-capitalize"
                              style={{
                                minHeight: "40px",
                                maxHeight: "40px",
                              }}
                            >
                              <Link
                                to={`/property-details/${elm.id}`}
                                className="link"
                                style={{
                                  display: "-webkit-box",
                                  WebkitLineClamp: 2, // Number of lines to display before truncating
                                  WebkitBoxOrient: "vertical",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {elm.inputs.find((item) => item.input_name === "Title")?.input_value || ""}
                              </Link>
                            </h6>


                            <ul className="meta-list" style={{ paddingLeft: '0px', minHeight: '30px', maxHeight: '30px' }}>
                              <li className="item">
                                <i className="icon icon-sqft" style={{ fontSize: '20px' }} />
                                <span className="text-variant-1">Sqft:</span>
                                <span className="fw-6">{
                                  elm.inputs.find(item => item.input_name === "Total Sqft")?.input_value || ""
                                }</span>
                              </li>
                              {elm.main_menuId === 8 ? (
                                <li className="item">
                                  <LocalParkingIcon style={{ fontSize: '24px' }} />
                                  <span className="text-variant-1">Parking:</span>
                                  <span className="fw-6">{
                                    elm.inputs.find(item => item.input_name === "Car Parking")?.input_value || ""
                                  }</span>
                                </li>
                              ) : elm.main_menuId === 3 ? (
                                <li className="item">
                                  <i className="icon icon-sqft" style={{ fontSize: '20px' }} />
                                  <span className="text-variant-1">Length:</span>
                                  <span className="fw-6">{
                                    elm.inputs.find(item => item.input_name === "Length")?.input_value || ""
                                  }</span>
                                </li>
                              ) : elm.main_menuId === 1 ? (
                                <li className="item">
                                  <i className="icon icon-bed" style={{ fontSize: '20px' }} />
                                  <span className="text-variant-1">Beds:</span>
                                  <span className="fw-6">{
                                    elm.inputs.find(item => item.input_name === "Bedrooms")?.input_value || ""
                                  }</span>
                                </li>
                              ) : (


                                <></>
                              )}
                            </ul>
                          </div>
                          <div className="content-bottom">
                            <h6 className="price">
                              ₹{
                                elm.inputs.find(item => item.input_name === "Price")?.input_value || ""
                              }
                            </h6>
                            <div className="d-flex gap-8 align-items-center">
                              <Link
                                to={`/property-details/${elm.id}`}
                                className="link"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <span style={{ cursor: 'pointer', fontWeight: 'bold', border: '1.5px dotted black', padding: '5px 10px' }} >View Details</span>
                              </Link>
                            </div>

                          </div>
                          <div className="content-bottom mt-3">
                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                                handleClickOpen(elm.id);
                              }}
                              className="d-flex justify-content-center align-items-center shadow-sm mt-1"
                              style={{
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                background: '#018df7',
                                color: '#ffffff',
                                padding: '10px 10px',
                                borderRadius: '0px',
                                textAlign: 'center',
                              }}
                            >
                              <DraftsTwoToneIcon sx={{ marginRight: '5px', fontSize: '20px' }} />
                              <span style={{ fontSize: '14px' }}>Enquiry Now</span>
                            </div>
                            <div
                              className="d-flex justify-content-around mt-1"
                              style={{ gap: '15px' }}
                            >
                              <div
                                className="d-flex justify-content-center align-items-center rounded-circle border shadow-sm"
                                style={{
                                  width: '44px',
                                  height: '44px',
                                  cursor: 'pointer',
                                  background: '#ffffff',
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.location.href = 'tel:+919363828393';
                                }}
                              >
                                <CallIcon sx={{ color: '#018df7' }} />
                              </div>
                              <div
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open('https://wa.me/919363828393?text=Hi, I would like to know more.', '_blank');
                                }}
                                className="d-flex justify-content-center align-items-center rounded-circle border shadow-sm"
                                style={{
                                  width: '44px',
                                  height: '44px',
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
              </div>
            </div>
          </div>
          
          {/* View More Button - Always Visible */}
          <div className="text-center" style={{ 
            marginTop: '30px', 
            marginBottom: '30px',
            display: 'block',
            visibility: 'visible',
            position: 'relative',
            // zIndex: 1000
          }}>
            <button
              onClick={() => {
                if (selectedCategory) {
                  const slug = getCategorySlug(selectedCategory);
                  navigate(`/properties/all?category=${encodeURIComponent(slug)}`);
                } else {
                  navigate(`/properties/all`);
                }
              }}
              className="tf-btn btn-view primary size-1 hover-btn-view"
              style={{
                cursor: 'pointer',
                border: 'none',
                background: '#018df7',
                color: '#ffffff',
                padding: '12px 24px',
                borderRadius: '5px',
                fontSize: '16px',
                fontWeight: 'bold',
                display: 'inline-block',
                visibility: 'visible'
              }}
            >
              View More
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
