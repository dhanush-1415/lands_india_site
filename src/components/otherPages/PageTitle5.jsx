import React from "react";
import { Link } from "react-router-dom";
export default function PageTitle5({ title = "Privacy Policy", breadcrumb = "Privacy Policy" }) {
  return (
    <section
      className="flat-title-page"
      style={{ backgroundImage: "url(/images/page-title/page-title-7.jpg)" }}
    >
      <div className="container">
        <div className="breadcrumb-content">
          <ul className="breadcrumb">
            <li>
              <Link to={`/`} className="text-white">
                Home
              </Link>
            </li>
            <li className="text-white">/ Pages</li>
            <li className="text-white">/ {breadcrumb}</li>
          </ul>
          <h1 className="text-center text-white title">{title}</h1>
        </div>
      </div>
    </section>
  );
}
