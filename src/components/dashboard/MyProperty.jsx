import React, { useEffect, useState } from "react";
import DropdownSelect from "../common/DropdownSelect";
import { Link } from "react-router-dom";

import { properties2 } from "@/data/properties";
import Pagination from "../common/Pagination";
import Pagination2 from "../common/Pagination2";
import { getSellerProperties, updatePropertyStatus } from "@/apiCalls";
import { toast } from "react-toastify";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';


export default function MyProperty() {


  const [properties, setProperties] = useState();


  const getProperties = async () => {

    const landsUser = JSON.parse(localStorage.getItem('LandsUser'));

    if (landsUser) {
      try {
        const data = await getSellerProperties(landsUser.id);

        if (data.success) {
          const combined = data.properties.map((property) => {
            const propertyInputs = data.propertyInput.filter(input => input.properties_postId === property.id);

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
          toast.error(data.message || data.error || "Something Went Wrong")
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    } else {
      toast.error("Seller Not Found")
      setTimeout(() => {
        window.location.href = "/"
      }, 4000);
    }

  }

  useEffect(() => {
    getProperties();
  }, [])


  const handleStatusUpdate = async (id, status) => {
    const landsUser = JSON.parse(localStorage.getItem('LandsUser'));

    if (landsUser) {
      try {

        const payLoad = {
          propertyId: id,
          status: status,
          isActive: status === 'Deleted' ? false : true
        }

        const data = await updatePropertyStatus(payLoad);

        if (data.success) {
          console.log(data)
          toast.success(data.message)
          getProperties();
        } else {
          toast.error(data.message || data.error || "Something Went Wrong")
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    } else {
      toast.error("Seller Not Found")
      setTimeout(() => {
        window.location.href = "/"
      }, 4000);
    }
  }

  return (
    <div className="main-content">
      <style>{`
        @media (min-width: 800px) {
          .custom-header-text {
            display: none;
          }
        }
      `}</style>
      <div className="main-content-inner wrap-dashboard-content">
        <div className="button-show-hide custom-header-text  d-flex justify-content-start align-items-center">
          < ArrowCircleLeftIcon sx={{ fontSize: '40px' }} />
          <span className="body-1">Menu</span>
        </div>
        <div className="button-show-hide" style={{ marginTop: '0px', display: 'flex' }}>
          <h3 className="body-1" style={{ color: '#000', padding: '20px 0', fontWeight: '600' }}>My Properties</h3>
        </div>
        {/* <div className="row">
          <div className="col-md-3">
            <fieldset className="box-fieldset">
              <label htmlFor="title">
                {" "}
                Post Status:<span>*</span>{" "}
              </label>

              <DropdownSelect
                options={["Select", "Publish", "Pending", "Hidden", "Sold"]}
              />
            </fieldset>
          </div>
          <div className="col-md-9">
            <fieldset className="box-fieldset">
              <label htmlFor="title">
                {" "}
                Search:<span>*</span>{" "}
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Search by title"
              />
            </fieldset>
          </div>
        </div> */}
        <div className="widget-box-2 wd-listing">
          {/* <h5 className="title">My Properties</h5> */}
          <div className="wrap-table">
            <div className="table-responsive">
              <table>
                <thead>
                  <tr style={{ background: '#008FF7' }}>
                    <th style={{ padding: '20px' }}>Listing</th>
                    <th style={{ padding: '20px' }}>Status</th>
                    <th style={{ padding: '20px' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* col 2 */}
                  {properties?.length && properties.map((elm, i) => (
                    <tr key={i} className="file-delete">
                      <td>
                        <div className="listing-box">
                          <div className="images">
                            <img
                              alt="images"
                              src={elm.file_path ? elm.file_path.split(',')[0] : ""}
                              width={388}
                              height={218}
                            />
                          </div>
                          <div className="content">
                            <div className="title">
                              <Link
                                to={`/property-details/${elm.id}`}
                                className="link"
                              >
                                {
                                  elm.inputs.find(item => item.input_name === "Title")?.input_value || ""
                                }

                              </Link>
                            </div>
                            <div className="text-date">
                              Posting date: {elm.createdAt.split('T')[0] || ""}
                            </div>
                            <div className="text-btn text-primary">
                              ₹{
                                elm.inputs.find(item => item.input_name === "Price")?.input_value || ""
                              }

                            </div>
                            <div className="text-btn text-secondary">
                              {
                                elm.inputs.find(item => item.input_name === "City")?.input_value || ""
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
                              }  ${elm.status == "Onhold" ? "onhold" : ""}  
                              ${elm.status == "Verified" ? "verified" : ""}
                               ${elm.status == "Sold" ? "Sold" : ""}
                                ${elm.status == "Rejected" ? "rejected" : ""}`}
                          >
                            {" "}
                            {elm.status}
                          </a>
                        </div>
                      </td>
                      <td>
                        <ul className="list-action">
                          <li>
                            <a href={`/add-property/${elm.id}`} className="item">
                              <svg
                                width={16}
                                height={16}
                                viewBox="0 0 16 16"
                                fill="#000000"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M11.2413 2.9915L12.366 1.86616C12.6005 1.63171 12.9184 1.5 13.25 1.5C13.5816 1.5 13.8995 1.63171 14.134 1.86616C14.3685 2.10062 14.5002 2.4186 14.5002 2.75016C14.5002 3.08173 14.3685 3.39971 14.134 3.63416L4.55467 13.2135C4.20222 13.5657 3.76758 13.8246 3.29 13.9668L1.5 14.5002L2.03333 12.7102C2.17552 12.2326 2.43442 11.7979 2.78667 11.4455L11.242 2.9915H11.2413ZM11.2413 2.9915L13 4.75016"
                                  stroke="#A3ABB0"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              Edit
                            </a>
                          </li>
                          <li>
                            <a className="item" onClick={() => { handleStatusUpdate(elm.id, 'Sold') }}>
                              <svg
                                width={16}
                                height={16}
                                viewBox="0 0 16 16"
                                fill="#000000"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12.2427 12.2427C13.3679 11.1175 14.0001 9.59135 14.0001 8.00004C14.0001 6.40873 13.3679 4.8826 12.2427 3.75737C11.1175 2.63214 9.59135 2 8.00004 2C6.40873 2 4.8826 2.63214 3.75737 3.75737M12.2427 12.2427C11.1175 13.3679 9.59135 14.0001 8.00004 14.0001C6.40873 14.0001 4.8826 13.3679 3.75737 12.2427C2.63214 11.1175 2 9.59135 2 8.00004C2 6.40873 2.63214 4.8826 3.75737 3.75737M12.2427 12.2427L3.75737 3.75737"
                                  stroke="#A3ABB0"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              Sold
                            </a>
                          </li>
                          <li>
                            <a className="remove-file item" onClick={() => { handleStatusUpdate(elm.id, 'Deleted') }}>
                              <svg
                                width={16}
                                height={16}
                                viewBox="0 0 16 16"
                                fill="#000000"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M9.82667 6.00035L9.596 12.0003M6.404 12.0003L6.17333 6.00035M12.8187 3.86035C13.0467 3.89501 13.2733 3.93168 13.5 3.97101M12.8187 3.86035L12.1067 13.1157C12.0776 13.4925 11.9074 13.8445 11.63 14.1012C11.3527 14.3579 10.9886 14.5005 10.6107 14.5003H5.38933C5.0114 14.5005 4.64735 14.3579 4.36999 14.1012C4.09262 13.8445 3.92239 13.4925 3.89333 13.1157L3.18133 3.86035M12.8187 3.86035C12.0492 3.74403 11.2758 3.65574 10.5 3.59568M3.18133 3.86035C2.95333 3.89435 2.72667 3.93101 2.5 3.97035M3.18133 3.86035C3.95076 3.74403 4.72416 3.65575 5.5 3.59568M10.5 3.59568V2.98501C10.5 2.19835 9.89333 1.54235 9.10667 1.51768C8.36908 1.49411 7.63092 1.49411 6.89333 1.51768C6.10667 1.54235 5.5 2.19901 5.5 2.98501V3.59568M10.5 3.59568C8.83581 3.46707 7.16419 3.46707 5.5 3.59568"
                                  stroke="#A3ABB0"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              Delete
                            </a>
                          </li>
                        </ul>
                      </td>
                    </tr>
                  ))}
                  {/* col 3 */}

                  {/* col 4 */}
                </tbody>
              </table>
            </div>
            {/* <ul className="wd-navigation">
              <Pagination2 />
            </ul> */}
          </div>
        </div>
      </div>
      <div className="footer-dashboard">
        <p>Copyright © 2024 Lands India</p>
      </div>
    </div>
  );
}
