import React from "react";

export default function Description({propertyDetails}) {

  return (
    <>
      {" "}
      <p className="mb-10 text-variant-1">
        <strong style={{fontWeight:'bold'}}>Posted By: </strong>{propertyDetails?.postedBy}
      </p>
      <p className="mb-10 text-variant-1">
        <strong style={{fontWeight:'bold'}}>Posted On: </strong>{propertyDetails?.postedDate}
      </p>
    
      <h5 className="mt-8 fw-6 title">Description</h5>
      <p className="text-variant-1 mb-8 ">
       {propertyDetails.description}
      </p>
      {propertyDetails?.descriptions?.length &&
        <ul>
          {propertyDetails.descriptions?.map((item, index) => (
            <li key={index}>
            <p className="text-variant-1">•{item},</p>
            </li>
          ))}
        </ul>
      }
      <ul>
        {propertyDetails.locationDetails?.map((item, index) => (
          <li key={index}>
          <p className="text-variant-1">•{item},</p>
          </li>
        ))}
      </ul>

      {propertyDetails?.nearbyAreas &&
      <p className="mt-8 text-variant-1">
        <strong style={{fontWeight:'bold'}}>NearBy: </strong>{propertyDetails.nearbyAreas}
      </p>
      }
      
      {/* <a href="#" className="btn-view">
        <span className="text">View More</span>
      </a> */}
    </>
  );
}
