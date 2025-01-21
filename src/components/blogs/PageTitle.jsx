import React from "react";
import { Link } from "react-router-dom";
export default function PageTitle() {
  return (
    // <section
    //   className="flat-title-page"
    //   style={{ background: "#f0f3f4" }}
    // >
    //   <style>
    //     {`
    //       .custom-container-text{
    //         background:transparent !important;
    //       }
    //     `}
    //   </style>
    //   <div className="custom-container-header custom-container-text">
    //     <div className="breadcrumb-content">
    //       <ul className="breadcrumb">
    //         {/* <li>
    //           <Link to={`/`} className="text-white">
    //             Home
    //           </Link>
    //         </li>
    //         <li className="text-white">/ Pages</li>
    //         <li className="text-white">/ Latest News</li> */}
    //       </ul>
    //       <h1 className="text-center text-white title" >Latest Blogs</h1>
    //     </div>
    //   </div>
    // </section>
    <section className="flat-section flat-agents" style={{ paddingTop: '0px' }}>
    <div style={{ background: '#f0f3f4', padding: '20px 0' }}>
      <div style={{ width: '80%', margin: '50px auto' }}>
        <h4>Latest Blogs</h4>
      </div>
    </div>
    </section>
  );
}
