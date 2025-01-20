import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { properties2 } from "@/data/properties";
import Pagination from "../common/Pagination";
import Pagination2 from "../common/Pagination2";
import { getWishListProperties, getUserWishList, updateWishlist } from "@/apiCalls";
import { toast } from "react-toastify";

export default function MyFavorite() {


  const [wishListList, setWishListList] = useState([]);
  const [properties, setProperties] = useState([]);
  const [isEmpty, setEmpty] = useState(false);

  const fetchWishlist = async () => {
    const landsUser = JSON.parse(localStorage.getItem('LandsUser'));

    if (landsUser) {
      try {
        const data = await getUserWishList(landsUser.id);

        if (data.success) {
          setWishListList(data.wishList);
        } else {
          toast.error(data.message);
        }
      } catch (err) {
        console.error('Error fetching wishlist:', err);
      }
    }
  };


  const fetchWishlistProperties = async (wishListList) => {
    const landsUser = JSON.parse(localStorage.getItem('LandsUser'));

    if (landsUser) {
      try {
        const data = await getWishListProperties(wishListList);
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
            };
          });

          setProperties(combined);
        } else {
          toast.error(data.message);
        }
      } catch (err) {
        console.error('Error fetching wishlist:', err);
      }
    }
  };


  useEffect(() => {
    if (wishListList?.length > 0) {
      fetchWishlistProperties(wishListList)
    } else {
      setEmpty(true)
    }
  }, [wishListList])

  useEffect(() => {
    fetchWishlist()
  }, [])

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

          // Remove the object from properties
          setProperties((prevProperties) =>
            prevProperties.filter((property) => property.id !== elm.id)
          );
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


  return (
    <div className="main-content">
      <div className="main-content-inner">
        <div className="button-show-hide show-mb">
          <span className="body-1">Show Menu</span>
        </div>
        <div className="button-show-hide" style={{marginTop:'0px',display:'flex'}}>
          <h3 className="body-1" style={{color:'#000',padding:'20px 0',fontWeight:'600'}}>My Favourites</h3>
        </div>
        <div className="widget-box-2 wd-listing">
          {/* <h5 className="title">My Favorites</h5> */}
          <div className="wrap-table">
            {!isEmpty ? (
              <>
                <div>
                  <h3>Your WishList is Empty</h3>
                </div>

              </>
            ) : (
              <div className="table-responsive">
                <table>
                  <thead >
                    <tr style={{background:'#008FF7'}} >
                      <th style={{ padding: '20px' }}>Listing</th>
                      <th style={{ padding: '20px' }}>Status</th>
                      <th style={{ padding: '20px' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {properties?.length && properties.map((elm, i) => (
                      <tr key={i} className="file-delete">
                        <td>
                          <div className="listing-box">
                            <div className="images">
                              <img
                                alt="images"
                                src={elm.file_path ? elm.file_path?.split(',')[0] : ""}
                                width={615}
                                height={405}
                              />
                            </div>
                            <div className="content">
                              <div className="title">
                                <Link
                                  to={`/property-details/${elm.id}`}
                                  className="link"
                                >
                                  {elm.title}
                                </Link>
                              </div>
                              <div className="text-date">
                                Posting date: {elm.createdAt?.split('T')[0] || ""}
                              </div>
                              <div className="text-btn text-primary">
                                ₹{
                                  elm.inputs.find(item => item.input_name === "price")?.input_value || ""
                                }
                              </div>
                              <div className="text-btn text-secondary">
                                {
                                  elm.inputs.find(item => item.input_name === "location")?.input_value || ""
                                }

                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="status-wrap">
                            <a
                              href="#"
                              className={`btn-status ${elm.status == "Pending" ? "pending" : ""
                                }  ${elm.status == "Sold" ? "sold" : ""}`}
                            >
                              {" "}
                              {elm.status}

                            </a>
                          </div>
                        </td>
                        <td>
                          <ul className="list-action">

                            <li onClick={() => handleWishlist(elm, "remove")}>
                              <a className="remove-file item">
                                <svg
                                  width={16}
                                  height={16}
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M9.82667 6.00035L9.596 12.0003M6.404 12.0003L6.17333 6.00035M12.8187 3.86035C13.0467 3.89501 13.2733 3.93168 13.5 3.97101M12.8187 3.86035L12.1067 13.1157C12.0776 13.4925 11.9074 13.8445 11.63 14.1012C11.3527 14.3579 10.9886 14.5005 10.6107 14.5003H5.38933C5.0114 14.5005 4.64735 14.3579 4.36999 14.1012C4.09262 13.8445 3.92239 13.4925 3.89333 13.1157L3.18133 3.86035M12.8187 3.86035C12.0492 3.74403 11.2758 3.65574 10.5 3.59568M3.18133 3.86035C2.95333 3.89435 2.72667 3.93101 2.5 3.97035M3.18133 3.86035C3.95076 3.74403 4.72416 3.65575 5.5 3.59568M10.5 3.59568V2.98501C10.5 2.19835 9.89333 1.54235 9.10667 1.51768C8.36908 1.49411 7.63092 1.49411 6.89333 1.51768C6.10667 1.54235 5.5 2.19901 5.5 2.98501V3.59568M10.5 3.59568C8.83581 3.46707 7.16419 3.46707 5.5 3.59568"
                                    stroke="#A3ABB0"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                Remove
                              </a>
                            </li>
                          </ul>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div >
            )
            }
            {/* <ul className="wd-navigation">
              <Pagination2 />
            </ul> */}
          </div >
        </div >
      </div >
      <div className="footer-dashboard">
        <p>Copyright © 2024 Home Lengo</p>
      </div>
    </div >
  );
}
