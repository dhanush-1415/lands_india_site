import React, { useEffect, useRef, useState } from "react";
import DropdownSelect from "../common/DropdownSelect";
import { Link } from "react-router-dom";
import AttachEmailSharpIcon from '@mui/icons-material/AttachEmailSharp';
import CallIcon from '@mui/icons-material/Call';
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import { toast } from "react-toastify";
import Pagination from "../common/Pagination";
import Slider from "rc-slider";
import { allProperties, featureOptions, projectData, indvidualData, props } from "@/data/properties";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getCategories, getProperties, getUserWishList, updateWishlist, getAllLocation } from "@/apiCalls";
import NorthEastIcon from '@mui/icons-material/NorthEast';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import DraftsTwoToneIcon from '@mui/icons-material/DraftsTwoTone';
import EnquiryForm from "@/components/common/Enquiry";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { useParams, useLocation } from "react-router-dom";



export default function Properties4() {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [sorted, setSorted] = useState();
  const [filtered, setFiltered] = useState([]);
  const [price, setPrice] = useState([500000, 10000000]);
  const [size, setSize] = useState([800, 2200]);
  const [rooms, setRooms] = useState("All");
  const [bedrooms, setBedrooms] = useState("All");
  const [bathrooms, setBathrooms] = useState("All");
  const [type, setType] = useState("All");
  const [features, setFeatures] = useState([]);
  const [sortingOption, setSortingOption] = useState("Sort by (Default)");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(9);
  const [page, setPage] = useState(1);

  const [properties, setProperties] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [locationFilter, setLocationFilter] = useState("");

  const loaderRef = useRef(null);

  const clearFilter = () => {
    setPrice([1800, 5500]);
    setSize([800, 2200]);
    setRooms("All");
    setBedrooms("All");
    setBathrooms("All");
    setType("All");
    setFeatures([]);
  };


  useEffect(() => {
    const params = new URLSearchParams(location.search);

    if (params.has("keyword")) {
      setKeyword(params.get("keyword") || "");
    }

    if (params.has("location")) {
      setLocationFilter(params.get("location") || "");
    }

    if (params.has("category")) {
      setSelectedCategory(params.get("category") || null);
    }

    if (params.has("subcategory")) {
      setSelectedSubCategory(params.get("subcategory") || null);
    }

    if (params.has("minPrice") && params.has("maxPrice")) {
      const minPrice = parseInt(params.get("minPrice") || "0", 10);
      const maxPrice = parseInt(params.get("maxPrice") || "0", 10);
      setPrice([minPrice, maxPrice]);
    }
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (keyword) params.append("keyword", keyword);
    if (locationFilter) params.append("location", locationFilter);

    if (selectedCategory && selectedCategory !== "category") {
      params.append("category", selectedCategory);
    }

    if (selectedSubCategory && selectedSubCategory !== "Sub Category") {
      params.append("subcategory", selectedSubCategory);
    }

    params.append("minPrice", price[0].toString());
    params.append("maxPrice", price[1].toString());

    navigate(`/properties/all?${params.toString()}`);
  };

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const data = await getCategories();
        if (data.success) {
          setCategories(data.data);
        } else {
          // toast.error(data.message);
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchCategoriesData();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category.name);
    const selectedSubCategories = category.subMenus || [];
    setSubCategories(selectedSubCategories);
    setSelectedSubCategory(null);
  };

  const handleSubCategoryChange = (subCategory) => {
    setSelectedSubCategory(subCategory.name);
  };

  const handleLocationChange = (data) => {
    setLocationFilter(data.name);
  };


  const [wishListList, setWishListList] = useState([]);

  const fetchWishlist = async () => {
    const landsUser = JSON.parse(localStorage.getItem('LandsUser'));

    if (landsUser) {
      try {
        const data = await getUserWishList(landsUser.id);

        if (data.success) {
          setWishListList(data.wishList);
        } else {
          // toast.error(data.message);
        }
      } catch (err) {
        console.error('Error fetching wishlist:', err);
      }
    }
  };

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
    fetchLocation()
  }, [])

  const fetchProperties = async () => {
    const location = searchParams.get("location");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const keyword = searchParams.get("keyword");
    const category = searchParams.get("category");
    const subCategory = searchParams.get("subcategory");

    const filter = {
      location: location || "",
      minPrice: minPrice ? parseInt(minPrice) : 0,
      maxPrice: maxPrice ? parseInt(maxPrice) : 0,
      keyword: keyword || "",
      category: category || "",
      subCategory: subCategory || "",
      page
    };

    try {
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

        setProperties((prevProperties) => {
          const uniqueProperties = [
            ...new Map(
              [...prevProperties, ...combined].map((property) => [property.id, property])
            ).values(),
          ];
          return uniqueProperties;
        });

        // setProperties((prevProperties) => [...prevProperties, ...combined]);
        setPage(page + 1);
      } else {
        // toast.error(data.message);
      }
    } catch (err) {
      console.error('Error fetching properties:', err);
    }
  };


  useEffect(() => {
    setProperties((prevProperties) =>
      prevProperties.map((property) => ({
        ...property,
        isWishlist: wishListList.includes(property.id),
      }))
    );
  }, [wishListList]);

  useEffect(() => {
    fetchWishlist();
    fetchProperties();
  }, [searchParams]);

  const handleWishlist = async (elm, act) => {
    const landsUser = JSON.parse(localStorage.getItem('LandsUser'));

    if (landsUser) {
      const payLoad = {
        userId: landsUser.id,
        propertyId: elm.id,
        action: act, // Adjust the action based on your requirements
      };

      try {
        const data = await updateWishlist(payLoad);
        if (data.success) {
          toast.success(data.message);

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

  useEffect(() => {
    if (!params.name) {
      window.location.href = '/properties/all';
      return;
    }

    if (params.name === "projects") {
      setSorted(projectData); // Replace with actual data
    } else if (params.name === "individuals") {
      setSorted(indvidualData); // Replace with actual data
    } else if (params.name === "all") {
      setSorted(props); // Replace with actual data
    }
  }, [params.name]);

  const allProps = {
    price,
    setPrice,
    size,
    setSize,
    setRooms,
    setBedrooms,
    setBathrooms,
    type,
    setType,
    features,
    setFeatures,
  };


  const [open, setOpen] = useState(false);

  const [propertyId, setPropertyId] = useState(null);

  const handleClickOpen = (id) => {
    setOpen(true);
    setPropertyId(id);
  };

  const handleClose = () => {
    setOpen(false);
    setPropertyId(null);
  };

  const handleScroll = (event) => {
    // fetchProperties();
    const bottom = event.target.scrollHeight - event.target.scrollTop === event.target.clientHeight;
    console.log(bottom, loading, "Scroll Position");

    // Allow a small tolerance, e.g., 5px, to trigger loading when close to the bottom
    if (bottom || event.target.scrollHeight - event.target.scrollTop <= event.target.clientHeight + 5) {
      if (!loading) {
        fetchProperties();
      }
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          handleScroll(); // Call the function when loader is visible
        }
      },
      {
        root: null, // Default is viewport
        rootMargin: "0px", // Trigger as soon as it's in the viewport
        threshold: 1.0, // Fully visible
      }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [handleScroll]);


  const sortProperties = (option) => {
    let sortedProperties;

    switch (option) {
      case "Latest Properties":
        // Sort by createdAt (newest first)
        sortedProperties = [...properties].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;

      case "Old properties":
        // Sort by createdAt (oldest first)
        sortedProperties = [...properties].sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        break;

      case "Price low to high":
        // Sort by price (ascending)
        sortedProperties = [...properties].sort((a, b) => a.price - b.price);
        break;

      case "Price high to low":
        sortedProperties = [...properties].sort((a, b) => b.price - a.price);
        break;

      default:
        // Default: no sorting
        sortedProperties = [...properties];
    }

    setProperties(sortedProperties);
  };



  // const sortProperties = (option) => {
  //   let sortedProperties;
  //   switch (option) {
  //     case 'Price Ascending':
  //       sortedProperties = [...properties].sort((a, b) => a.price - b.price);
  //       break;
  //     case 'Price Descending':
  //       sortedProperties = [...properties].sort((a, b) => b.price - a.price);
  //       break;
  //     default:
  //       sortedProperties = [...properties]; // Default: no sorting
  //   }
  //   setProperties(sortedProperties);
  // };

  function capitalizeFirstLetter(text) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }


  return (
    <section className="flat-section flat-recommended flat-sidebar" style={{ position: 'relative', padding: '0' }}>
      <style>
        {`
        .custom-col-one {
          width: 25%;
        }
        .custom-col-two {
          width: 75%;
        }

        @media (max-width: 750px) {
          .custom-col-one, .custom-col-two {
            width: 100%;
          }
        }
      `}
      </style>


      <EnquiryForm open={open} handleClose={handleClose} id={propertyId} />
      <div className="box-title-listing" style={{ background: '#f0f3f4', padding: '40px 8%' }}>

        <div >
          <div style={{}}>
            <h4>{selectedCategory ? capitalizeFirstLetter(`${selectedCategory}`) : "All"} Properties</h4>
          </div>

        </div>

        <div className="box-filter-tab" style={{ minWidth: '15%' }} >

          <DropdownSelect
            onChange={(option) => {
              setSortingOption(option);
              sortProperties(option);
            }}
            additionalParentClass="list-sort"
            style={{ border: 'none', borderBottom: '1px solid rgb(140 140 140)', background: '#f0f3f4', borderRadius: '0px' }}
            options={[
              "Sort By",
              "Latest Properties",
              "Old properties",
              "Price low to high",
              "Price high to low",
            ]}
          />
        </div>
      </div>
      <div className="container custom-container-header" style={{ maxWidth: '95%', marginBottom: '50px' }} >
        <div className="row">
          <div className="col-xl-4 col-lg-5 col-sm-12 custom-col-one" >
            <div className="widget-sidebar fixed-sidebar" >
              <div className="flat-tab flat-tab-form widget-filter-search widget-box" style={{ margin: "0", padding: '20px 20px' }}>
                {/* <ul className="nav-tab-form" role="tablist">
                  <li className="nav-tab-item" role="presentation">
                    <a
                      href="#forRent"
                      className="nav-link-item active"
                      data-bs-toggle="tab"
                    >
                      For Rent
                    </a>
                  </li>
                  <li className="nav-tab-item" role="presentation">
                    <a
                      href="#forSale"
                      className="nav-link-item"
                      data-bs-toggle="tab"
                    >
                      For Sale
                    </a>
                  </li>
                </ul> */}
                <div className="tab-content" >
                  <div className="tab-pane fade active show" role="tabpanel">
                    <div className="form-sl">
                      <form onSubmit={handleSubmit}>
                        <div className="wd-filter-select" style={{ boxShadow: 'none' }}>
                          <div className="inner-group">
                            <div className="box">
                              <div className="form-style"
                                style={{ borderBottom: '1px solid #e4e4e4' }}>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Type keyword...."
                                  defaultValue=""
                                  name="s"
                                  value={keyword}
                                  onChange={(e) => setKeyword(e.target.value)}
                                  title="Search for"
                                  style={{ border: 'none', display: 'flex', textAlign: 'left', justifyContent: 'flex-start', fontSize: '15px' }}
                                />
                              </div>
                              <div className="form-style">
                                <div className="group-select" style={{ borderBottom: '1px solid #e4e4e4' }}>
                                  <DropdownSelect
                                    options={["Location", ...(AllLocation?.map((loc) => loc.name) || [])]}
                                    defaultOption={locationFilter}
                                    onChange={(locationFilter) => {
                                      const location = AllLocation.find((loc) => loc.name === locationFilter);
                                      handleLocationChange(location);
                                    }}
                                    style={{ border: 'none' }}
                                  />
                                </div>
                              </div>
                              <div className="form-style">
                                <div className="group-select" style={{ borderBottom: '1px solid #e4e4e4' }}>
                                  <DropdownSelect
                                    options={["Category", ...(categories?.map((category) => category.name) || [])]}
                                    defaultOption={selectedCategory}
                                    onChange={(selectedCategory) => {
                                      const category = categories.find((cat) => cat.name === selectedCategory);
                                      handleCategoryChange(category);
                                    }}
                                    style={{ border: 'none' }}
                                  />
                                </div>
                              </div>
                              <div className="form-style box-select" style={{ borderBottom: '1px solid #e4e4e4' }}>
                                <DropdownSelect
                                  options={["Sub Category", ...(subCategories?.map((subCat) => subCat.name) || [])]}
                                  defaultOption={selectedSubCategory}
                                  onChange={(selectedSubCategory) => {
                                    const subCategory = subCategories.find((sub) => sub.name === selectedSubCategory);
                                    handleSubCategoryChange(subCategory);
                                  }}
                                  style={{ border: 'none' }}
                                />
                              </div>
                            </div>
                            <div className="box">
                              <div className="form-style widget-price">
                                <div className="box-title-price">
                                  <span className="title-price fw-6">
                                    Price:
                                  </span>
                                  <div className="caption-price">
                                    <span
                                      id="slider-range-value1"
                                      className="fw-6"
                                    >
                                      {" "}
                                      ₹{price[0]}{" "}
                                    </span>
                                    <span>-</span>
                                    <span
                                      id="slider-range-value2"
                                      className="fw-6"
                                    >
                                      ₹{price[1]}
                                    </span>
                                  </div>
                                </div>
                                <Slider
                                  range
                                  // formatLabel={() => ``}
                                  max={10000000}
                                  min={500000}
                                  value={price}
                                  onChange={setPrice}
                                />
                              </div>
                            </div>
                            <div className="box">
                              {/* <div className="form-style wd-amenities">
                                <div className="group-checkbox">
                                  <h6 className="title text-black-2">
                                    Amenities:
                                  </h6>
                                  <div className="group-amenities">
                                    {featureOptions.map((feature, index) => (
                                      <fieldset
                                        key={`cb${index + 1}`}
                                        className={`amenities-item `}
                                        onClick={() =>
                                          setFeatures((pre) =>
                                            pre.includes(feature)
                                              ? [
                                                  ...pre.filter(
                                                    (elm) => elm != feature
                                                  ),
                                                ]
                                              : [...pre, feature]
                                          )
                                        }
                                      >
                                        <input
                                          readOnly
                                          checked={features.includes(feature)}
                                          type="checkbox"
                                          className="tf-checkbox style-1"
                                        />
                                        <label className="text-cb-amenities">
                                          {feature}
                                        </label>
                                      </fieldset>
                                    ))}
                                  </div>
                                </div>
                              </div> */}
                            </div>
                            {/* <a
                              className="tf-btn btn-linemt-5 clear-filter"
                              onClick={clearFilter}
                            >
                              Clear Filter
                            </a> */}
                            <div className="form-style">
                              <button
                                type="submit"
                                className="tf-btn btn-view primary hover-btn-view"
                              >
                                Find Properties
                                <span className="icon icon-arrow-right2" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <div className="col-xl-8 col-lg-7 col-sm-12  custom-col-two flat-animate-tab" >
            <div className="tab-content" style={{ width: '100%' }}  >
              <div
                className="tab-pane active show"
                id="gridLayout"
                role="tabpanel"
              >

                <div className="row"
                  style={{
                    maxHeight: '700px', overflow: 'auto', scrollbarWidth: 'none', /* For Firefox */
                    msOverflowStyle: 'none',
                  }} // Set height and enable scrolling - 
                  onScroll={handleScroll} // Listen for scroll events
                >
                  {properties.length ? (
                    properties.map((elm, index) => (
                      <div key={index} className="col-xl-4 col-lg-6 col-md-6">
                        <div className="homelengo-box">
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
                                {
                                  elm.inputs.find(item => item.input_name === "City")?.input_value || ""
                                }
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
                                  <FavoriteIcon onClick={() => handleWishlist(elm, "remove")} />{/* You can use Font Awesome for the heart icon */}
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
                                  <FavoriteBorderIcon onClick={() => handleWishlist(elm, 'add')} />{/* You can use Font Awesome for the heart icon */}
                                </div>
                              )}
                            </Link>
                          </div>

                          <div className="archive-bottom" style={{ backgroundColor: '#ffffff' }}>
                            <div className="content-top">
                              <h6 className="text-capitalize">
                                <Link
                                  to={`/property-details/${elm.id}`}
                                  className="link"
                                >
                                  {
                                    elm.inputs.find(item => item.input_name === "Title")?.input_value || ""
                                  }
                                </Link>
                              </h6>
                              <ul className="meta-list" style={{ paddingLeft: '0px' }}>
                                <li className="item">
                                  <i className="icon icon-bed" style={{ fontSize: '20px' }} />
                                  <span className="text-variant-1">Beds:</span>
                                  <span className="fw-6">{
                                    elm.inputs.find(item => item.input_name === "beds")?.input_value || ""
                                  }</span>
                                </li>
                                <li className="item">
                                  <i className="icon icon-bath" style={{ fontSize: '20px' }} />
                                  <span className="text-variant-1">Baths:</span>
                                  <span className="fw-6">{
                                    elm.inputs.find(item => item.input_name === "baths")?.input_value || ""
                                  }</span>
                                </li>
                                <li className="item">
                                  <i className="icon icon-sqft" style={{ fontSize: '20px' }} />
                                  <span className="text-variant-1">Sqft:</span>
                                  <span className="fw-6">{
                                    elm.inputs.find(item => item.input_name === "Total Sqft")?.input_value || ""
                                  }</span>
                                </li>
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
                                >
                                  <span style={{ cursor: 'pointer', fontWeight: 'bold', border: '1.5px dotted black', padding: '5px 10px' }} >View Details</span>
                                </Link>
                              </div>

                            </div>
                            <div className="content-bottom mt-3">
                              <div
                                onClick={() => { handleClickOpen(elm.id) }}
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
                                <DraftsTwoToneIcon sx={{ marginRight: '5px' }} />
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
                                  onClick={() => window.location.href = 'tel:+919363828393'}
                                >
                                  <CallIcon sx={{ color: '#018df7' }} />
                                </div>
                                <div
                                  onClick={() => window.open('https://wa.me/919363828393?text=Hi, I would like to know more.', '_blank')}
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
                        {loading && <div ref={loaderRef} className="loader"></div>}
                      </div>
                    ))
                  ) : (
                    <div className="col-xl-4 col-lg-6 col-md-6">
                      <h5>No Properties Found</h5>
                    </div>
                  )}
                  {loading && <div>Loading...</div>} {/* Show loading indicator when fetching */}
                </div>


                {/* <ul className="wd-navigation mt-20" style={{ justifyContent: 'center' }} >
                  <Pagination
                    currentPage={currentPage}
                    setPage={setCurrentPage}
                    itemLength={sorted?.length}
                    itemPerPage={itemPerPage}
                  />
                </ul> */}
              </div>
              <div className="tab-pane" id="listLayout" role="tabpanel">
                {sorted && sorted
                  .slice(
                    (currentPage - 1) * itemPerPage,
                    currentPage * itemPerPage
                  )
                  .map((property, index) => (

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
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                {/* <ul className="wd-navigation mt-20" style={{ justifyContent: 'center' }} >
                  <Pagination
                    currentPage={currentPage}
                    setPage={setCurrentPage}
                    itemLength={sorted?.length}
                    itemPerPage={itemPerPage}
                  />
                </ul> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
