import React, { useState, useEffect } from "react";
import { Divider } from "@mui/material";
import { getValueAddedServiceList, getAllLocation } from "@/apiCalls";
import DropdownSelect from "./DropdownSelect";
import Pagination from "./Pagination";
import Footer2 from "../footer/Footer2";

export default function ValueAddedServices() {

  const [data, setData] = useState([]);
  const [isLogged, setIsLogged] = useState(false);

  const [location, setLocation] = useState("");
  const [service, setService] = useState("");
  const [type, setType] = useState("B2B");

  const [AllLocation, setAllLocations] = useState([{
         id: 1,
          name: "chennai",
          // Keep extra fields for potential future use
          stateName: "Tamil Nadu",
          districtName: "chennai",
      },
      {
         id: 2,
          name: "trichy",
          // Keep extra fields for potential future use
          stateName: "Tamil Nadu",
          districtName: "chennai",
      },
      {
         id: 3,
          name: "coimbatore",
          // Keep extra fields for potential future use
          stateName: "Tamil Nadu",
          districtName: "chennai",
      }]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const pageSize = 10; // Fixed per API
  
  const realEstateServices = [
    { id: 1, name: "Advocate & Auditor" },
    { id: 2, name: "Investor (Project Invest)" },
    { id: 3, name: "Reseller (Short Term Invest)" },
    { id: 4, name: "Bankers/Loan Provider" },
    { id: 5, name: "Builder/Construction" },
    { id: 6, name: "Interior" },
    { id: 7, name: "Civil Engineer/Architect" },
    { id: 8, name: "Plumbing & Electrical" },
    { id: 9, name: "Flooring" },
    { id: 10, name: "Approval Services" },
    { id: 11, name: "Building Valuation" },
    { id: 12, name: "Digital Security System" },
    { id: 13, name: "Landscaping" }
  ];

  const fetchLocation = async () => {
    try {
      const response = await getAllLocation();
      if (response.success) {
        const formatted = response.locations
          .filter(loc => loc?.trim())
          .map((loc, idx) => ({
            id: idx + 1,
            name: loc.trim(),
          }));
        setAllLocations(formatted);
      }
    } catch (err) {
      console.error("Error fetching Location:", err);
    }
  };

  const fetchServices = async () => {
    try {
      const filter = {
        type, // B2B by default
        page: currentPage,
        location: location,
        service: service
      };

      const response = await getValueAddedServiceList(filter);

      if (response.success) {
        setData(response.users || []);
        setTotalItems(response.totalRecords || 0);
        setCurrentPage(response.page || 1);
      }
    } catch (err) {
      console.error("Error fetching services:", err);
      setData([]);
      setTotalItems(0);
    }
  };

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [location, service]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("LandsUser"));
    setIsLogged(!!user);
  }, []);

  useEffect(() => {
    fetchLocation();
  }, []);

  useEffect(() => {
    fetchServices();
  }, [currentPage, location, service]);

  return (
    <>
      <section className="flat-section flat-agents" style={{ paddingTop: '0px' }}>

        {/* Header */}
        <div style={{ background: '#f0f3f4', padding: '20px 0' }}>
          <div style={{ width: '80%', margin: '50px auto' }}>
            <h4>Value Added Services</h4>
          </div>
        </div>

        {/* Show Register Prompt if not logged */}
        {!isLogged && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div
              className="d-flex custom-aligner align-items-center justify-content-between"
              style={{
                background: '#fff',
                padding: '10px 20px',
                marginTop: '-40px',
                boxShadow: "rgba(99,99,99,0.2) 0px 2px 8px",
                width: '70%'
              }}
            >
              <h5>Enhance Efficiency and Achieve More With Our Extra Services.</h5>
              <button
                onClick={() => {
                  const event = new CustomEvent("openLoginPopup");
                  window.dispatchEvent(event);
                }}
                style={{
                  border: 'none',
                  padding: '15px',
                  color: '#fff',
                  fontWeight: 'bold',
                  backgroundColor: "#008FF7",
                  cursor: 'pointer'
                }}
              >
                Register Now
              </button>
            </div>
          </div>
        )}

        {/* FILTER UI */}
        <div className="d-flex align-items-center justify-content-end container">
          <div style={{ width: '20%', marginRight: '1rem' }}>
            <DropdownSelect
              options={[
                "Select Location",
                ...AllLocation.map((l) => l.name)
              ]}
              onChange={(val) => setLocation(val !== "Select Location" ? val : "")}
            />
          </div>

          <div style={{ width: '20%' }}>
            <DropdownSelect
              options={[
                "Select Service",
                ...realEstateServices.map((s) => s.name)
              ]}
              onChange={(val) => setService(val !== "Select Service" ? val : "")}
            />
          </div>
        </div>

        {/* DATA GRID */}
        <div className="container" style={{ padding: "30px 0 40px" }}>
          <div className="row">
            {data?.length >= 1 ? (
              data.map((agent) => (
                <div className="col-lg-4 col-md-6 mb-4" key={agent.id}>
                  <div className="box-agent" style={{ padding: 20, boxShadow: "rgba(0,0,0,0.15) 0px 4px 12px" }}>
                    <img
                      src={agent.image}
                      alt={agent.full_name}
                      className="custom-image-bar"
                      style={{ width: "100%", height: 230, objectFit: "cover" }}
                    />
                    <div className="text-center mt-2">
                      <h5>{agent.full_name}</h5>
                      <p>{agent.gender}, {agent.age}</p>
                    </div>
                    <Divider />
                    <div className="text-center mt-2">
                      <strong>{agent.professional}</strong>
                      <p>{agent.location}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center mt-4">No Data Found</p>
            )}
          </div>
        </div>

        {/* PAGINATION */}
        {totalItems > 0 && (
          <ul className="wd-navigation mt-20" style={{ justifyContent: 'center', display: 'flex' }}>
            <Pagination
              currentPage={currentPage}
              setPage={setCurrentPage}
              itemLength={totalItems}
              itemPerPage={pageSize}
            />
          </ul>
        )}
      </section>

      <Footer2 />
    </>
  );
}