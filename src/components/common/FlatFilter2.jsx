import React, { useEffect, useRef, useState } from "react";
import AdvanceSearch from "./AdvanceSearch";
import DropdownSelect from "./DropdownSelect";

export default function FlatFilter2() {
  const ddContainer = useRef();
  const advanceBtnRef = useRef();

  const [activeTab, setActiveTab] = useState("individual");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        ddContainer.current &&
        !ddContainer.current.contains(event.target) &&
        advanceBtnRef.current &&
        !advanceBtnRef.current.contains(event.target)
      ) {
        ddContainer.current?.classList.remove("show");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Responsive check for mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderFormContent = () => {
    if (activeTab === "addedValue") {
      return (
        <div className="wd-filter-select">
          <div className="inner-group">
            <div className="form-group-4 form-style grid-2 gap-10">
              <div className="form-group-3 form-style">
                <DropdownSelect
                  defaultOption={isMobile ? "Services" : "Added Value Services"}
                  options={["Cleaning", "Maintenance", "Security"]}
                />
              </div>
              <div className="form-group-2 non-margin">
                <div className="group-ip ip-icon">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search Location"
                    name="location"
                    title="Search for"
                    required
                  />
                  <a href="#" className="icon-right icon-location"></a>
                </div>
              </div>
            </div>
            <div className="form-group-4 form-style">
              <button
                type="submit"
                className="tf-btn btn-search primary"
                href="#"
              >
                Search <i className="icon icon-search"></i>
              </button>
            </div>
          </div>
        </div>
      );
    }

    // Default form for Individual and Project tabs
    return (
      <div className="wd-filter-select">
        <div className="inner-group">
          <div className="form-group-1 form-style">
            <input
              type="text"
              className="form-control"
              placeholder="Search Keyword."
              name="s"
              title="Search for"
              required
            />
          </div>
          <div className="form-group-4 form-style grid-2 gap-10">
            <div className="form-group-2 form-style">
              <div className="group-ip ip-icon">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Location"
                  name="location"
                  title="Search for"
                  required
                />
                <a href="#" className="icon-right icon-location"></a>
              </div>
            </div>
            <div className="form-group-3 form-style non-margin">
              <DropdownSelect
                defaultOption="Property type"
                options={["Villa", "Studio", "Office"]}
              />
            </div>
          </div>
          <div className="form-group-4 form-style">
            <button
              type="submit"
              className="tf-btn btn-search primary"
              href="#"
            >
              Search <i className="icon icon-search"></i>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flat-tab flat-tab-form">
      <ul className="nav-tab-form style-2 style-3" role="tablist">
        <li className="nav-tab-item" role="presentation">
          <a
            href="#forRent"
            className={`nav-link-item ${activeTab === "individual" ? "active" : ""}`}
            onClick={() => setActiveTab("individual")}
          >
            Individual
          </a>
        </li>
        <li className="nav-tab-item" role="presentation">
          <a
            href="#forProject"
            className={`nav-link-item ${activeTab === "project" ? "active" : ""}`}
            onClick={() => setActiveTab("project")}
          >
            Project
          </a>
        </li>
        <li className="nav-tab-item" role="presentation">
          <a
            href="#forSale"
            className={`nav-link-item ${activeTab === "addedValue" ? "active" : ""}`}
            onClick={() => setActiveTab("addedValue")}
          >
            {isMobile ? "Services" : "Added Value Services"}
          </a>
        </li>
      </ul>
      <div className="tab-content">
        <div className="tab-pane fade active show" role="tabpanel">
          <div className="form-sl flat-filter-form">
            <form onSubmit={(e) => e.preventDefault()}>
              {renderFormContent()}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
