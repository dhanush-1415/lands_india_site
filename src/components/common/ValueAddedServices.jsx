import React, { useState, useEffect, useCallback } from "react";
import { Divider } from "@mui/material";
import { getValueAddedServiceList, searchCity } from "@/apiCalls";
import DropdownSelect from "./DropdownSelect";
import CityDropdownSelect from "./CustomCityDropdownSelect";
import Pagination from "./Pagination";
import Footer2 from "../footer/Footer2";

export default function ValueAddedServices() {

  const [data, setData] = useState([]);
  const [isLogged, setIsLogged] = useState(false);

  const [location, setLocation] = useState("");
  const [service, setService] = useState("");
  const [type, setType] = useState("B2B");

  const [AllLocation, setAllLocations] = useState([
    {
      id: 1,
      name: "chennai",
      stateName: "Tamil Nadu",
      districtName: "chennai",
    },
    {
      id: 2,
      name: "trichy",
      stateName: "Tamil Nadu",
      districtName: "chennai",
    },
    {
      id: 3,
      name: "coimbatore",
      stateName: "Tamil Nadu",
      districtName: "chennai",
    }
  ]);
  const [isLocationLoading, setIsLocationLoading] = useState(false);

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

  // Fetch cities/locations from API - memoized to prevent unnecessary re-renders
  const fetchLocation = useCallback(async (query = "a") => {
    setIsLocationLoading(true);
    try {
      const data = await searchCity(query);

      if (data?.success && Array.isArray(data?.results)) {
        // Deduplicate by name and keep display-friendly name
        const uniqueNames = Array.from(
          new Map(
            data.results
              .filter((r) => typeof r?.name === "string" && r.name.trim().length > 0)
              .map((r) => [r.name.trim(), r])
          ).values()
        );

        const formattedLocations = uniqueNames.map((location, index) => ({
          id: index + 1,
          name: location.name.trim(),
          // Keep extra fields for potential future use
          stateName: location.state_name,
          districtName: location.district_name,
          talukaName: location.taluka_name,
          fullPath: location.full_path,
          uniqueCode: location.unique_code,
          type: location.type,
        }));

        setAllLocations(formattedLocations);
      }
    } catch (err) {
      console.error("Error fetching Location:", err);
    } finally {
      setIsLocationLoading(false);
    }
  }, []);

  // Memoized callback for search changes
  const handleSearchChange = useCallback((term) => {
    const q = term && term.trim().length > 0 ? term.trim() : "a";
    fetchLocation(q);
  }, [fetchLocation]);

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
    // Seed with a broad query to populate initial options
    fetchLocation("a");
  }, [fetchLocation]);

  useEffect(() => {
    fetchServices();
  }, [currentPage, location, service]);

  return (
    <>
      <section className="flat-section flat-agents" style={{ paddingTop: '0px' }}>
        <style>{`
          .custom-aligner{
            width:60%;
          }
          .custom-drop{
            width: 17%;
            margin-right: 2rem;
          }
          @media (max-width: 768px) {
            .custom-aligner{
              flex-direction:column;
              text-align:center;
              gap:20px;
              width:100%;
            }
            .custom-drop{
              width: 107%;
              margin-right:0;
            }
          }
        `}
        </style>
        {/* Header */}
        <div style={{ background: '#f0f3f4', padding: '20px 0' }}>
          <div style={{ width: '80%', margin: '50px auto' }}>
            <h4>Value Added Services</h4>
          </div>
        </div>

        {/* Show Register Prompt if not logged */}
        {!isLogged && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div
              className="d-flex custom-aligner align-items-center justify-content-between"
              style={{
                background: '#ffffff',
                padding: '10px 20px',
                marginTop: '-40px',
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              }}
            >
              <div>
                <h5>Enhance Efficiency and Achieve More With Our Extra Services.</h5>
              </div>
              <div>
                <button
                  onClick={() => {
                    const event = new CustomEvent("openLoginPopup");
                    window.dispatchEvent(event);
                  }}
                  style={{
                    backgroundColor: "rgb(0, 143, 247)",
                    border: 'none',
                    padding: '15px',
                    color: '#ffffff',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  Register Now
                </button>
              </div>
            </div>
          </div>
        )}

        {/* FILTER UI */}
        <div className="d-flex align-items-center justify-content-end container custom-container-header mt-5">
          <div className="custom-drop">
            <CityDropdownSelect
              searchable={true}
              placeholder="Search location..."
              options={[...(AllLocation?.map((item) => item.name) || [])]}
              onSearchChange={handleSearchChange}
              isLoading={isLocationLoading}
              onChange={(locationName) => {
                const item = AllLocation.find((cat) => cat.name === locationName);
                setLocation(item?.name || "");
              }}
              style={{ border: 'none', borderBottom: '1px solid gray', borderRadius: '0' }}
            />
          </div>

          <div className="custom-drop">
            <DropdownSelect
              options={[
                "Select Service",
                ...realEstateServices.map((s) => s.name)
              ]}
              onChange={(val) => setService(val !== "Select Service" ? val : "")}
              style={{ border: 'none', borderBottom: '1px solid gray', borderRadius: '0' }}
            />
          </div>
        </div>

        {/* DATA GRID */}
        <div className="container custom-container-header" style={{ padding: "30px 0 40px" }}>
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