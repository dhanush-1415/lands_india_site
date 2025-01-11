import React, { useState } from "react";
import { FaHome, FaInfoCircle, FaServicestack, FaEnvelope } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "@/components/dashboard/Dashboard";
import AddProperty from "@/components/dashboard/AddProperty";
import MyProfile from "@/components/dashboard/MyProfile";
import MyProperty from "@/components/dashboard/MyProperty";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const DashboardPage = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activePage, setActivePage] = useState("Dashboard");

  const menuItems = [
    { id: "Dashboard", icon: <FaHome />, label: "Dashboard" },
    { id: "my-profile", icon: <FaInfoCircle />, label: "My Profile" },
    { id: "my-property", icon: <FaServicestack />, label: "My Property" },
    { id: "add-property", icon: <FaEnvelope />, label: "Add Property" },
  ];

  const handleCollapse = () => setIsCollapsed(!isCollapsed);

  return (
    <div className="d-flex vh-100">
      {/* Sidebar */}
      <div
        className={` ${isCollapsed ? "collapsed-sidebar" : "expanded-sidebar"}`}
        style={{
          minWidth: isCollapsed ? "80px" : "280px",
          transition: "width 0.3s",
        }}
      >
        <div className="d-flex flex-column align-items-center py-3 h-100" >
  
          <div className="flex-grow-1 w-100">
            {menuItems.map((item) => (
              <div className="widget-sidebar fixed-sidebar" key={item.id} >
                <div className="flat-tab flat-tab-form widget-filter-search widget-box" style={{ margin: '0px 10px 15px', padding: '0' }}>

                  <div className="tab-content" >
                    <div className="tab-pane fade active show" role="tabpanel">
                      <div className="form-sl">
                        <div className="wd-filter-select" style={{ boxShadow: 'none', marginTop: '0' }}>
                          <div className="inner-group">
                            <div className="box">
                              <div className="form-style" onClick={() => setActivePage(item.id)} style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', padding: '20px 10px' }}>
                                <span>{item.label}</span>
                                <KeyboardArrowRightIcon />

                              </div>

                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>

              </div>
              // <div
              //   key={item.id}
              //   className={`d-flex align-items-center py-2 px-3 mb-2 ${activePage === item.id ? "bg-primary text-white" : "text-white"
              //     }`}
              //   style={{ cursor: "pointer" }}
              //   onClick={() => setActivePage(item.id)}
              // >
              //   <span className="me-3">{item.icon}</span>
              //   {!isCollapsed && <span>{item.label}</span>}
              // </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dynamic Content */}
      <div className="flex-grow-1 bg-light p-4" style={{width:'75%'}}>
        <div className="layout-wrap">
          {activePage === 'Dashboard' ? (
            <Dashboard />
          ) : activePage === 'add-property' ? (
            <AddProperty />
          ) : activePage === 'my-profile' ? (
            <MyProfile />
          ) : activePage === 'my-property' ? (
            <MyProperty />
          ) : (
            <>
              <h2>{activePage}</h2>
              <p>
                This is the {activePage} page content. Update this section dynamically based on the selected menu item.
              </p>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;

// import Dashboard from "@/components/dashboard/Dashboard";
// import SidebarMenu from "@/components/dashboard/SidebarMenu";
// import Header2 from "@/components/headers/Header2";
// import React from "react";

// import MetaComponent from "@/components/common/MetaComponent";
// import Header1 from "@/components/headers/Header1";
// const metadata = {
//   title: "Dashboard || Homelengo - Real Estate Reactjs Template",
//   description: "Homelengo - Real Estate Reactjs Template",
// };
// export default function DashboardPage() {
//   return (
//     <>
//       <MetaComponent />
//       <div className="layout-wrap">
//         {/* <Header1 /> */}
//         <SidebarMenu />
//         <Dashboard />
//         <div className="overlay-dashboard" />
//       </div>
//     </>
//   );
// }


{/* <div className="widget-sidebar fixed-sidebar" >
<div className="flat-tab flat-tab-form widget-filter-search widget-box" style={{ margin: 0, padding: '0 20px' }}>

  <div className="tab-content" >
    <div className="tab-pane fade active show" role="tabpanel">
      <div className="form-sl">
        <form onSubmit={handleSubmit}>
          <div className="wd-filter-select" style={{ boxShadow: 'none' }}>
            <div className="inner-group">
              <div className="box">
                <div className="form-style" style={{display:'flex',justifyContent:'space-between',flexDirection:'row', padding:'10px 0'}}>
                  <span>Dashboard</span>
                  <KeyboardArrowRightIcon />

                </div>
                <div className="form-style" style={{display:'flex',justifyContent:'space-between',flexDirection:'row', padding:'10px 0'}}>
                  <span>Dashboard</span>
                  <KeyboardArrowRightIcon />

                </div>
                <div className="form-style" style={{display:'flex',justifyContent:'space-between',flexDirection:'row', padding:'10px 0'}}>
                  <span>Dashboard</span>
                  <KeyboardArrowRightIcon />

                </div>
                <div className="form-style" style={{display:'flex',justifyContent:'space-between',flexDirection:'row', padding:'10px 0'}}>
                  <span>Dashboard</span>
                  <KeyboardArrowRightIcon />

                </div>
                <div className="form-style" style={{display:'flex',justifyContent:'space-between',flexDirection:'row', padding:'10px 0'}}>
                  <span>Dashboard</span>
                  <KeyboardArrowRightIcon />

                </div>
              </div>
              </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

</div> */}


// import React, { useState } from "react";
// import { FaHome, FaInfoCircle, FaServicestack, FaEnvelope } from "react-icons/fa";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Dashboard from "@/components/dashboard/Dashboard";

// const DashboardPage = () => {
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [activePage, setActivePage] = useState("Home");

//   const menuItems = [
//     { id: "Home", icon: <FaHome />, label: "Home" },
//     { id: "About", icon: <FaInfoCircle />, label: "About" },
//     { id: "Services", icon: <FaServicestack />, label: "Services" },
//     { id: "Contact", icon: <FaEnvelope />, label: "Contact" },
//   ];

//   const handleCollapse = () => setIsCollapsed(!isCollapsed);

//   return (
//     <div className="d-flex vh-100">
//       {/* Sidebar */}
//       <div
//         className={`bg-dark text-white ${isCollapsed ? "collapsed-sidebar" : "expanded-sidebar"}`}
//         style={{
//           width: isCollapsed ? "80px" : "250px",
//           transition: "width 0.3s",
//         }}
//       >
//         <div className="d-flex flex-column align-items-center py-3 h-100">
//           {/* Toggle Button */}
//           <button
//             className="btn btn-outline-light mb-4"
//             onClick={handleCollapse}
//             style={{
//               width: "100%",
//               textAlign: "center",
//             }}
//           >
//             {isCollapsed ? "☰" : "✖"}
//           </button>

//           {/* Menu Items */}
//           <div className="flex-grow-1 w-100">
//             {menuItems.map((item) => (
//               <div
//                 key={item.id}
//                 className={`d-flex align-items-center py-2 px-3 mb-2 ${activePage === item.id ? "bg-primary text-white" : "text-white"
//                   }`}
//                 style={{ cursor: "pointer" }}
//                 onClick={() => setActivePage(item.id)}
//               >
//                 <span className="me-3">{item.icon}</span>
//                 {!isCollapsed && <span>{item.label}</span>}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Dynamic Content */}
//       <div className="flex-grow-1 bg-light p-4">
//         <div className="layout-wrap">
//         {activePage === 'About' ? (
//           <Dashboard />
//         ) : (
//           <>
//             <h2>{activePage}</h2>
//             <p>
//               This is the {activePage} page content. Update this section dynamically based on the selected menu item.
//             </p>
//           </>

//         )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardPage;
