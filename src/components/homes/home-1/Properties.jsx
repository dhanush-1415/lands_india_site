import { filterOptions, properties, props } from "@/data/properties";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

  //   const [wishListList, setWishListList] = useState([]);

  //   // sample wishListList [32 , 33 ]

  //   const fetchWishlist = async () => {

  //     const landsUser = JSON.parse(localStorage.getItem('LandsUser'));

  //     if (landsUser) {

  //       try {
  //         const data = await getUserWishList(landsUser.id);

  //         if (data.success) {
  //           setWishListList(data.wishList)
  //         } else {
  //           toast.error(data.message)
  //         }
  //       } catch (err) {
  //         console.error('Error fetching categories:', err);
  //       }
  //     }
  //   }

  //   useEffect(() => {
  //     fetchWishlist()
  //   }, [])



  //   const [properties, setProperties] = useState([]);

  //   sampleProperties
  //  [
  //     {
  //       "id": 32,
  //       "sub_menuId": 1,
  //       "sellerId": 1,
  //       "location": "chennai",
  //       "price": "200000000",
  //       "status": "Available",
  //       "file_path": "http://luxcycs.com:4400/lands-india-api/uploads/1736842210277-profile-new.jpg",
  //       "isPremium": true,
  //       "createdAt": "2025-01-14T08:10:10.000Z",
  //       "updatedAt": "2025-01-14T08:10:10.000Z",
  //       "inputs": [
  //           {
  //               "id": 31,
  //               "properties_postId": 32,
  //               "input_id": 1,
  //               "input_value": "chk",
  //               "createdAt": "2025-01-14T08:10:10.000Z",
  //               "updatedAt": "2025-01-14T08:10:10.000Z",
  //               "input_name": "title",
  //               "input_type": "text",
  //               "options": null
  //           },
  //           {
  //               "id": 32,
  //               "properties_postId": 32,
  //               "input_id": 2,
  //               "input_value": "chk desc",
  //               "createdAt": "2025-01-14T08:10:10.000Z",
  //               "updatedAt": "2025-01-14T08:10:10.000Z",
  //               "input_name": "description",
  //               "input_type": "textarea",
  //               "options": null
  //           },
  //           {
  //               "id": 33,
  //               "properties_postId": 32,
  //               "input_id": 3,
  //               "input_value": "200000000",
  //               "createdAt": "2025-01-14T08:10:10.000Z",
  //               "updatedAt": "2025-01-14T08:10:10.000Z",
  //               "input_name": "price",
  //               "input_type": "text",
  //               "options": null
  //           },
  //           {
  //               "id": 34,
  //               "properties_postId": 32,
  //               "input_id": 4,
  //               "input_value": "Chennai",
  //               "createdAt": "2025-01-14T08:10:10.000Z",
  //               "updatedAt": "2025-01-14T08:10:10.000Z",
  //               "input_name": "location",
  //               "input_type": "text",
  //               "options": null
  //           },
  //           {
  //               "id": 35,
  //               "properties_postId": 32,
  //               "input_id": 9,
  //               "input_value": "45678",
  //               "createdAt": "2025-01-14T08:10:10.000Z",
  //               "updatedAt": "2025-01-14T08:10:10.000Z",
  //               "input_name": "check ",
  //               "input_type": "number",
  //               "options": [
  //                   ""
  //               ]
  //           },
  //           {
  //               "id": 36,
  //               "properties_postId": 32,
  //               "input_id": 10,
  //               "input_value": "no,true",
  //               "createdAt": "2025-01-14T08:10:10.000Z",
  //               "updatedAt": "2025-01-14T08:10:10.000Z",
  //               "input_name": "Propert Name",
  //               "input_type": "checkbox",
  //               "options": [
  //                   "yes",
  //                   "no",
  //                   "true",
  //                   "false"
  //               ]
  //           }
  //       ]
  //   },
  //   {
  //       "id": 36,
  //       "sub_menuId": 1,
  //       "sellerId": 1,
  //       "location": "hyderabad",
  //       "price": "5000000",
  //       "status": "Available",
  //       "file_path": "uploads/1736845533690-Default.jpg",
  //       "isPremium": true,
  //       "createdAt": "2025-01-14T09:05:41.000Z",
  //       "updatedAt": "2025-01-14T09:05:41.000Z",
  //       "inputs": [
  //           {
  //               "id": 51,
  //               "properties_postId": 36,
  //               "input_id": 1,
  //               "input_value": "villa",
  //               "createdAt": "2025-01-14T09:05:41.000Z",
  //               "updatedAt": "2025-01-14T09:05:41.000Z",
  //               "input_name": "title",
  //               "input_type": "text",
  //               "options": null
  //           },
  //           {
  //               "id": 52,
  //               "properties_postId": 36,
  //               "input_id": 2,
  //               "input_value": "Dreams",
  //               "createdAt": "2025-01-14T09:05:41.000Z",
  //               "updatedAt": "2025-01-14T09:05:41.000Z",
  //               "input_name": "description",
  //               "input_type": "textarea",
  //               "options": null
  //           },
  //           {
  //               "id": 53,
  //               "properties_postId": 36,
  //               "input_id": 3,
  //               "input_value": "5000000",
  //               "createdAt": "2025-01-14T09:05:41.000Z",
  //               "updatedAt": "2025-01-14T09:05:41.000Z",
  //               "input_name": "price",
  //               "input_type": "text",
  //               "options": null
  //           },
  //           {
  //               "id": 54,
  //               "properties_postId": 36,
  //               "input_id": 4,
  //               "input_value": "chennai",
  //               "createdAt": "2025-01-14T09:05:41.000Z",
  //               "updatedAt": "2025-01-14T09:05:41.000Z",
  //               "input_name": "location",
  //               "input_type": "text",
  //               "options": null
  //           },
  //           {
  //               "id": 55,
  //               "properties_postId": 36,
  //               "input_id": 10,
  //               "input_value": "on",
  //               "createdAt": "2025-01-14T09:05:41.000Z",
  //               "updatedAt": "2025-01-14T09:05:41.000Z",
  //               "input_name": "Propert Name",
  //               "input_type": "checkbox",
  //               "options": [
  //                   "yes",
  //                   "no",
  //                   "true",
  //                   "false"
  //               ]
  //           },
  //           {
  //               "id": 56,
  //               "properties_postId": 36,
  //               "input_id": 9,
  //               "input_value": "-5",
  //               "createdAt": "2025-01-14T09:05:41.000Z",
  //               "updatedAt": "2025-01-14T09:05:41.000Z",
  //               "input_name": "check ",
  //               "input_type": "number",
  //               "options": [
  //                   ""
  //               ]
  //           }
  //       ]
  //   }
  // ]

  //   const fetchProperty = async () => {
  //     try {
  //       const filter = {
  //         location: "",
  //         minPrice: 0,
  //         maxPrice: 0,
  //         keyword: "",
  //         category: "",
  //         subCategory: "",
  //       };
  //       const data = await getProperties(filter);
  //       if (data.success) {
  //         const combined = data.properties.map((property) => {
  //           const propertyInputs = data.propertyInputs.filter(input => input.properties_postId === property.id);

  //           const inputsWithNames = propertyInputs.map((input) => {
  //             const inputData = data.inputs.find(i => i.id === input.input_id);
  //             return {
  //               ...input,
  //               input_name: inputData ? inputData.input_name : '',
  //               input_type: inputData ? inputData.input_type : '',
  //               options: inputData ? inputData.options : [],
  //             };
  //           });

  //           return {
  //             ...property,
  //             inputs: inputsWithNames,
  //           };
  //         });

  //         setProperties(combined);
  //       } else {
  //         toast.error(data.message)
  //       }
  //     } catch (err) {
  //       console.error('Error fetching categories:', err);
  //     }
  //   };

  //   useEffect(() => {
  //     fetchProperty();
  //   }, []);


  //   const handleWishlist = async (elm) => {

  //     const landsUser = JSON.parse(localStorage.getItem('LandsUser'));

  //     if (landsUser) {

  //       const payLoad = {
  //         userId: landsUser.id,
  //         propertyId: elm.id,
  //         action: 'add',
  //       }

  //       try {

  //         const data = await updateWishlist(payLoad);
  //         if (data.success) {
  //           toast.success(data.message)
  //         } else {
  //           toast.error(data.message)
  //         }
  //       } catch (err) {
  //         console.error('Error fetching categories:', err);
  //       }

  //     } else {
  //       toast.error("Please Login to Continue")
  //     }


  //     console.log(elm)
  //   }


  // // const combineData = (e) => {
  // //
  // const combined = data.properties.map((property) => {
  //   const propertyInputs = data.propertyInputs.filter(input => input.properties_postId === property.id);

  //   const inputsWithNames = propertyInputs.map((input) => {
  //     const inputData = data.inputs.find(i => i.id === input.input_id);
  //     return {
  //       ...input,
  //       input_name: inputData ? inputData.input_name : '',
  //       input_type: inputData ? inputData.input_type : '',
  //       options: inputData ? inputData.options : [],
  //     };
  //   });

  //   return {
  //     ...property,
  //     inputs: inputsWithNames,
  //   };
  // });

  // setProperties(combined);
  // // };


  // const [wishListList, setWishListList] = useState([]);
  // const [properties, setProperties] = useState([]);
  // const [selectedCategory , setSelectedCategory ] = useState()

  // const displayedProperties = (() => {
  //   const maxCount = 8;
  //   const slicedProperties = properties.slice(0, maxCount);

  //   if (slicedProperties.length < maxCount && slicedProperties.length % 2 === 0) {
  //     slicedProperties.pop();
  //   }

  //   return slicedProperties;
  // })();

  // const fetchProperty = async () => {
  //   try {
  //     const filter = {
  //       location: "",
  //       minPrice: 0,
  //       maxPrice: 0,
  //       keyword: "",
  //       category: selectedCategory || "",
  //       subCategory: "",
  //     };
  //     const data = await getProperties(filter);
  //     if (data.success) {
  //       const combined = data.properties.map((property) => {
  //         const propertyInputs = data.propertyInputs.filter(input => input.properties_postId === property.id);

  //         const inputsWithNames = propertyInputs.map((input) => {
  //           const inputData = data.inputs.find(i => i.id === input.input_id);
  //           return {
  //             ...input,
  //             input_name: inputData ? inputData.input_name : '',
  //             input_type: inputData ? inputData.input_type : '',
  //             options: inputData ? inputData.options : [],
  //           };
  //         });

  //         return {
  //           ...property,
  //           inputs: inputsWithNames,
  //           isWishlist: wishListList.includes(property.id), // Add isWishlist
  //         };
  //       });

  //       setProperties(combined);
  //     } else {
  //       toast.error(data.message);
  //     }
  //   } catch (err) {
  //     console.error('Error fetching properties:', err);
  //   }
  // };

  // const fetchWishlist = async () => {
  //   const landsUser = JSON.parse(localStorage.getItem('LandsUser'));

  //   if (landsUser) {
  //     try {
  //       const data = await getUserWishList(landsUser.id);

  //       if (data.success) {
  //         setWishListList(data.wishList);
  //         fetchProperty();
  //       } else {
  //         toast.error(data.message);
  //       }
  //     } catch (err) {
  //       console.error('Error fetching wishlist:', err);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   setProperties((prevProperties) =>
  //     prevProperties.map((property) => ({
  //       ...property,
  //       isWishlist: wishListList?.includes(property.id),
  //     }))
  //   );
  // }, [wishListList]);

  // useEffect(() => {
  //   fetchWishlist();
  //   fetchProperty();
  // }, [selectedCategory]);

  // const handleWishlist = async (elm, act) => {
  //   const landsUser = JSON.parse(localStorage.getItem('LandsUser'));

  //   if (landsUser) {
  //     const payLoad = {
  //       userId: landsUser.id,
  //       propertyId: elm.id,
  //       action: act, // Adjust the action based on your requirements
  //     };

  //     try {
  //       const data = await updateWishlist(payLoad);
  //       if (data.success) {
  //         toast.success(data.message);

  //         const updatedWishList = await getUserWishList(landsUser.id);
  //         if (updatedWishList.success) {
  //           setWishListList(updatedWishList.wishList);
  //         }
  //       } else {
  //         toast.error(data.message);
  //       }
  //     } catch (err) {
  //       console.error('Error updating wishlist:', err);
  //     }
  //   } else {
  //     toast.error("Please Login to Continue");
  //   }
  // };


  // const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  // const handleNavigation = (category) => {
  //   setSelectedCategory(category);
  // }


  const [wishListList, setWishListList] = useState([]);
  const [properties, setProperties] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
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
    console.log("rrrrrrrrrrrr wissssssssssssss");
    
  }, []);

  useEffect(() => {
    if (wishlistLoaded) {
      fetchProperty();
    }
  }, [wishlistLoaded, selectedCategory]);

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

    const landsUser = JSON.parse(localStorage.getItem('LandsUser'));

    if (landsUser) {
      setOpen(true);
      setPropertyId(id);
    } else {
      toast.info('Please Login to continue')
    }
  };

  const handleClose = () => {
    setOpen(false);
    setPropertyId(null);
  };


  const handleNavigation = (category) => {
    setSelectedCategory(category);
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
                Property Stores <br />
                Recommended For You
              </h3>
            </div>
            <div className="d-flex gap-3 filter-list" style={{ fontWeight: 'bold', fontSize: '1rem' }}>
              <div className="custom-two">
                <p style={{ cursor: 'pointer' }} onClick={() => { handleNavigation("Residential") }}>Residential</p>
              </div>
              <div className="custom-two">
                <p style={{ cursor: 'pointer' }} onClick={() => { handleNavigation("Commercial") }}>Commercial</p>
              </div>
              <div className="custom-two">
                <p style={{ cursor: 'pointer' }} onClick={() => { handleNavigation("land/plot") }}>Land & Plots</p>
              </div>
              <div className="custom-two">
                <p style={{ cursor: 'pointer' }} onClick={() => { handleNavigation("Projects") }}>Projects</p>
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
                            {/* <h6 className="text-capitalize">
                              <Link
                                to={`/property-details/${elm.id}`}
                                className="link"
                              >
                                {
                                  elm.inputs.find(item => item.input_name === "Title")?.input_value || ""
                                }
                              </Link>
                            </h6> */}
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
        </div >

      </section >
    </>
  );
}
