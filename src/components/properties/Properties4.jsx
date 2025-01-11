import React, { useEffect, useState } from "react";
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
import { getCategories, getProperties } from "@/apiCalls";
import NorthEastIcon from '@mui/icons-material/NorthEast';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import DraftsTwoToneIcon from '@mui/icons-material/DraftsTwoTone';


import { useParams } from "react-router-dom";



export default function Properties4() {
  const params = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [sorted, setSorted] = useState();
  const [filtered, setFiltered] = useState([]);
  const [price, setPrice] = useState([1800, 5500]);
  const [size, setSize] = useState([800, 2200]);
  const [rooms, setRooms] = useState("All");
  const [bedrooms, setBedrooms] = useState("All");
  const [bathrooms, setBathrooms] = useState("All");
  const [type, setType] = useState("All");
  const [features, setFeatures] = useState([]);
  const [sortingOption, setSortingOption] = useState("Sort by (Default)");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(9);

  const [properties, setProperties] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [combinedData, setCombinedData] = useState([]); // Final combined data
  const [inputDetails, setInputDetails] = useState([]); // inputDetails data
  const [propertyInputs, setPropertyInputs] = useState([]); // propertyInputs data

  console.log(properties, "mmmmmmmmmmmmmmmmmmmmmmmmmmmmm")

  // useEffect(() => {
  //   // Ensure all required data is available
  //   if (properties.length && propertyInputs.length && inputDetails.length) {
  //     // Combine data
  //     const result = properties.map((property) => {
  //       // Filter inputs related to the current property
  //       const relatedInputs = propertyInputs.filter(
  //         (input) => input.properties_postId === property.id
  //       );

  //       // Map inputs to include inputDetails
  //       const inputsWithDetails = relatedInputs.map((input) => {
  //         const inputDetail = inputDetails.find(
  //           (detail) => detail.id === input.input_id
  //         );
  //         return {
  //           ...input,
  //           inputDetail, // Add input detail if available
  //         };
  //       });

  //       // Combine property with its inputs
  //       return {
  //         ...property,
  //         inputs: inputsWithDetails, // Attach processed inputs
  //       };
  //     });

  //     // Store the result in state
  //     setCombinedData(result);
  //   }
  // }, [properties, propertyInputs, inputDetails]);

  // console.log(combinedData,  "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")


  // Clear filters function
  const clearFilter = () => {
    setPrice([1800, 5500]);
    setSize([800, 2200]);
    setRooms("All");
    setBedrooms("All");
    setBathrooms("All");
    setType("All");
    setFeatures([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (keyword) params.append("keyword", keyword);
    if (location) params.append("location", location);

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


  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const params = new URLSearchParams();
  //   if (keyword) params.append("keyword", keyword);
  //   if (location) params.append("location", location);
  //   if (selectedCategory !== "category" || selectedCategory != null || selectedCategory != '' ) { params.append("category", selectedCategory)};
  //   if (selectedSubCategory !== "Sub Category" || selectedSubCategory != null || selectedSubCategory != ''  )  {params.append("subcategory", selectedSubCategory)};
  //   params.append("minPrice", price[0].toString());
  //   params.append("maxPrice", price[1].toString());
  //   navigate(`/properties/all?${params.toString()}`);
  // };

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const data = await getCategories();
        if (data.success) {
          setCategories(data.data);
        } else {
          toast.error(data.message);
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchCategoriesData();
  }, []);

  // Handle category selection
  const handleCategoryChange = (category) => {
    setSelectedCategory(category.name);
    const selectedSubCategories = category.subMenus || [];
    setSubCategories(selectedSubCategories);
    setSelectedSubCategory(null);
  };

  // Handle subcategory selection
  const handleSubCategoryChange = (subCategory) => {
    setSelectedSubCategory(subCategory.name);
  };

  // Handle location change
  const handleLocationChange = (data) => {
    setLocation(data.name);
  };

  // Fetch properties based on search parameters
  useEffect(() => {
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
      };

      try {
        const data = await getProperties(filter);
        setProperties(data.data);
        if (data.success) {
          setProperties(data.data);
          // setInputDetails(data.inputDetails);
          // setPropertyInputs(data.propertyInputs);
        } else {
          toast.error(data.message);
        }
      } catch (err) {
        console.error('Error fetching properties:', err);
      }
    };

    fetchProperties();
  }, [searchParams]);

  // Set sorted data based on URL params
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
  return (
    <section className="flat-section flat-recommended flat-sidebar" style={{ position: 'relative', padding: '0' }}>
      <div className="box-title-listing" style={{ background: '#f0f3f4', padding: '40px 8%' }}>
          
          <div >
            <div style={{  }}>
              <h4>Residential Property</h4>
            </div>

          </div>
            
            <div className="box-filter-tab" >
  
              <DropdownSelect
                onChange={setSortingOption}
                addtionalParentClass="list-sort"
                style={{border: 'none', borderBottom: '1px solid #e4e4e4', background: '#f0f3f4' }}
                options={[
                  "Sort by price",
  
                  "Price Ascending",
                  "Price Descending",
                ]}
              />
              <ul className="nav-tab-filter" role="tablist" style={{margin: 0}} >
                <li className="nav-tab-item" role="presentation">
                  <a
                    href="#gridLayout"
                    className="nav-link-item active"
                    data-bs-toggle="tab"
                  >
                    <svg
                      className="icon"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.54883 5.90508C4.54883 5.1222 5.17272 4.5 5.91981 4.5C6.66686 4.5 7.2908 5.12221 7.2908 5.90508C7.2908 6.68801 6.66722 7.3101 5.91981 7.3101C5.17241 7.3101 4.54883 6.68801 4.54883 5.90508Z"
                        stroke="#A3ABB0"
                      />
                      <path
                        d="M10.6045 5.90508C10.6045 5.12221 11.2284 4.5 11.9755 4.5C12.7229 4.5 13.3466 5.1222 13.3466 5.90508C13.3466 6.68789 12.7227 7.3101 11.9755 7.3101C11.2284 7.3101 10.6045 6.68794 10.6045 5.90508Z"
                        stroke="#A3ABB0"
                      />
                      <path
                        d="M19.4998 5.90514C19.4998 6.68797 18.8757 7.31016 18.1288 7.31016C17.3818 7.31016 16.7578 6.68794 16.7578 5.90508C16.7578 5.12211 17.3813 4.5 18.1288 4.5C18.8763 4.5 19.4998 5.12215 19.4998 5.90514Z"
                        stroke="#A3ABB0"
                      />
                      <path
                        d="M7.24249 12.0098C7.24249 12.7927 6.61849 13.4148 5.87133 13.4148C5.12411 13.4148 4.5 12.7926 4.5 12.0098C4.5 11.2268 5.12419 10.6045 5.87133 10.6045C6.61842 10.6045 7.24249 11.2267 7.24249 12.0098Z"
                        stroke="#A3ABB0"
                      />
                      <path
                        d="M13.2976 12.0098C13.2976 12.7927 12.6736 13.4148 11.9266 13.4148C11.1795 13.4148 10.5557 12.7928 10.5557 12.0098C10.5557 11.2266 11.1793 10.6045 11.9266 10.6045C12.6741 10.6045 13.2976 11.2265 13.2976 12.0098Z"
                        stroke="#A3ABB0"
                      />
                      <path
                        d="M19.4516 12.0098C19.4516 12.7928 18.828 13.4148 18.0807 13.4148C17.3329 13.4148 16.709 12.7926 16.709 12.0098C16.709 11.2268 17.3332 10.6045 18.0807 10.6045C18.8279 10.6045 19.4516 11.2266 19.4516 12.0098Z"
                        stroke="#A3ABB0"
                      />
                      <path
                        d="M4.54297 18.0945C4.54297 17.3116 5.16709 16.6895 5.9143 16.6895C6.66137 16.6895 7.28523 17.3114 7.28523 18.0945C7.28523 18.8776 6.66139 19.4996 5.9143 19.4996C5.16714 19.4996 4.54297 18.8771 4.54297 18.0945Z"
                        stroke="#A3ABB0"
                      />
                      <path
                        d="M10.5986 18.0945C10.5986 17.3116 11.2227 16.6895 11.97 16.6895C12.7169 16.6895 13.3409 17.3115 13.3409 18.0945C13.3409 18.8776 12.7169 19.4996 11.97 19.4996C11.2225 19.4996 10.5986 18.8772 10.5986 18.0945Z"
                        stroke="#A3ABB0"
                      />
                      <path
                        d="M16.752 18.0945C16.752 17.3115 17.376 16.6895 18.1229 16.6895C18.8699 16.6895 19.4939 17.3115 19.4939 18.0945C19.4939 18.8776 18.8702 19.4996 18.1229 19.4996C17.376 19.4996 16.752 18.8772 16.752 18.0945Z"
                        stroke="#A3ABB0"
                      />
                    </svg>
                  </a>
                </li>
                <li className="nav-tab-item" role="presentation">
                  <a
                    href="#listLayout"
                    className="nav-link-item"
                    data-bs-toggle="tab"
                  >
                    <svg
                      className="icon"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19.2016 17.8316H8.50246C8.0615 17.8316 7.7041 17.4742 7.7041 17.0332C7.7041 16.5923 8.0615 16.2349 8.50246 16.2349H19.2013C19.6423 16.2349 19.9997 16.5923 19.9997 17.0332C19.9997 17.4742 19.6426 17.8316 19.2016 17.8316Z"
                        fill="#A3ABB0"
                      />
                      <path
                        d="M19.2016 12.8199H8.50246C8.0615 12.8199 7.7041 12.4625 7.7041 12.0215C7.7041 11.5805 8.0615 11.2231 8.50246 11.2231H19.2013C19.6423 11.2231 19.9997 11.5805 19.9997 12.0215C20 12.4625 19.6426 12.8199 19.2016 12.8199Z"
                        fill="#A3ABB0"
                      />
                      <path
                        d="M19.2016 7.80913H8.50246C8.0615 7.80913 7.7041 7.45173 7.7041 7.01077C7.7041 6.5698 8.0615 6.2124 8.50246 6.2124H19.2013C19.6423 6.2124 19.9997 6.5698 19.9997 7.01077C19.9997 7.45173 19.6426 7.80913 19.2016 7.80913Z"
                        fill="#A3ABB0"
                      />
                      <path
                        d="M5.0722 8.1444C5.66436 8.1444 6.1444 7.66436 6.1444 7.0722C6.1444 6.48004 5.66436 6 5.0722 6C4.48004 6 4 6.48004 4 7.0722C4 7.66436 4.48004 8.1444 5.0722 8.1444Z"
                        fill="#A3ABB0"
                      />
                      <path
                        d="M5.0722 13.0941C5.66436 13.0941 6.1444 12.6141 6.1444 12.0219C6.1444 11.4297 5.66436 10.9497 5.0722 10.9497C4.48004 10.9497 4 11.4297 4 12.0219C4 12.6141 4.48004 13.0941 5.0722 13.0941Z"
                        fill="#A3ABB0"
                      />
                      <path
                        d="M5.0722 18.0433C5.66436 18.0433 6.1444 17.5633 6.1444 16.9711C6.1444 16.379 5.66436 15.8989 5.0722 15.8989C4.48004 15.8989 4 16.379 4 16.9711C4 17.5633 4.48004 18.0433 5.0722 18.0433Z"
                        fill="#A3ABB0"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
  
              {/* <DropdownSelect
                onChange={(value) => {
                  const match = value.match(/\d+/); // Match the digits in the value
                  if (match) {
                    setitemPerPage(parseInt(match[0], 10)); // Parse the first matched number
                    setCurrentPage(1);
                  }
                }}
                addtionalParentClass="list-page"
                options={["Show: 8", "Show: 10", "Show: 12"]}
              /> */}
  
            </div>
          </div>
      <div className="container custom-container-header" style={{maxWidth: '95%', marginBottom: '50px'}} >
      
        
        <div className="row">
          <div className="col-xl-4 col-lg-5" style={{ width: '25%' }}>
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
                                  style={{ border: 'none' }}
                                  required
                                />
                              </div>
                              <div className="form-style">
                                <div className="group-select" style={{ borderBottom: '1px solid #e4e4e4' }}>
                                  <DropdownSelect
                                    options={["Location", ...(categories?.map((category) => category.name) || [])]} // Prepend "All" to the options
                                    onChange={(selectedCategory) => {
                                      const category = categories.find((cat) => cat.name === selectedCategory);
                                      handleLocationChange(category);
                                    }}
                                    style={{ border: 'none' }}
                                  />
                                </div>
                              </div>
                              <div className="form-style">
                                <div className="group-select" style={{ borderBottom: '1px solid #e4e4e4' }}>
                                  <DropdownSelect
                                    options={["Category", ...(categories?.map((category) => category.name) || [])]} // Prepend "All" to the options
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
                                  options={["Sub Category", ...(subCategories?.map((subCat) => subCat.name) || [])]} // Prepend "All" to the options
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
                                  max={6000}
                                  min={1500}
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
          <div className="col-xl-8 col-lg-7 flat-animate-tab" style={{ width: '75%' }} >
            <div className="tab-content" style={{ width: '100%' }}  >
              <div
                className="tab-pane active show"
                id="gridLayout"
                role="tabpanel"
              >
                <div className="row">
                  {sorted && sorted
                    .slice(
                      (currentPage - 1) * itemPerPage,
                      currentPage * itemPerPage
                    )
                    .map((property, index) => (

                      <div key={index} className="col-xl-4 col-lg-6 col-md-6">
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
                <ul className="wd-navigation mt-20" style={{ justifyContent: 'center' }} >
                  <Pagination
                    currentPage={currentPage}
                    setPage={setCurrentPage}
                    itemLength={sorted?.length}
                    itemPerPage={itemPerPage}
                  />
                </ul>
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
                <ul className="wd-navigation mt-20" style={{ justifyContent: 'center' }} >
                  <Pagination
                    currentPage={currentPage}
                    setPage={setCurrentPage}
                    itemLength={sorted?.length}
                    itemPerPage={itemPerPage}
                  />
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
