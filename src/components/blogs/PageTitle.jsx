import React from "react";
import { Link } from "react-router-dom";
export default function PageTitle() {
  return (
    <section
      className="flat-title-page"
      style={{ backgroundImage: "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVgHh3W92W3IfNuHxC7wT4abGYRZFq-SfHXA&s)" }}
    >
      <style>
        {`
          .custom-container-text{
            background:transparent !important;
          }
        `}
      </style>
      <div className="custom-container-header custom-container-text" style={{background:'transparent !important'}}>
        <div className="breadcrumb-content">
          <ul className="breadcrumb">
            {/* <li>
              <Link to={`/`} className="text-white">
                Home
              </Link>
            </li>
            <li className="text-white">/ Pages</li>
            <li className="text-white">/ Latest News</li> */}
          </ul>
          <h1 className="text-center text-white title" >Latest Blogs</h1>
        </div>
      </div>
    </section>
  );
}
