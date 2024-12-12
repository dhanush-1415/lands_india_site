import React from "react";

export default function Description({propertyDetails}) {

  return (
    <>
      {" "}
      <h5 className="fw-6 title">Description</h5>
      <p className="text-variant-1">
       {propertyDetails.description}
      </p>
      <ul>
        {propertyDetails.locationDetails.map((item, index) => (
          <li key={index}>
            <p className="text-variant-1">{item},</p>
          </li>
        ))}
      </ul>

      <p className="mt-8 text-variant-1">
        <strong style={{fontWeight:'bold'}}>NearBy: </strong>{propertyDetails.nearbyAreas}
      </p>
      {/* <a href="#" className="btn-view">
        <span className="text">View More</span>
      </a> */}
    </>
  );
}
