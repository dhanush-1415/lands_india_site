// import React, { useState } from "react";
// import { FaHome, FaInfoCircle, FaServicestack, FaEnvelope } from "react-icons/fa";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Dashboard from "@/components/dashboard/Dashboard";
// import AddProperty from "@/components/dashboard/AddProperty";
// import MyProfile from "@/components/dashboard/MyProfile";
// import MyProperty from "@/components/dashboard/MyProperty";
// import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

// const DashboardPage = () => {
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [activePage, setActivePage] = useState("Dashboard");

//   const menuItems = [
//     { id: "Dashboard", icon: <FaHome />, label: "Dashboard" },
//     { id: "my-profile", icon: <FaInfoCircle />, label: "My Profile" },
//     { id: "my-property", icon: <FaServicestack />, label: "My Property" },
//     { id: "add-property", icon: <FaEnvelope />, label: "Add Property" },
//   ];


//   const handleLogout = () => {
//     // Clear user data and navigate to the login page
//     localStorage.removeItem("LandsUser");
//     toast.success("Logout Sucessful")
//     setTimeout(() => {
//       window.location.href = "/"
//     }, 4000);
//   }

//   const landsUser = JSON.parse(localStorage.getItem("LandsUser"));

//   // Filter menu items based on user type
//   const filteredMenuItems = menuItems.filter((item) => {
//     if (landsUser?.type === "Agent" || landsUser?.type === "B2B") {
//       return item.id !== "my-property" && item.id !== "add-property";
//     }
//     return true;
//   });

//   // Add the Logout menu item
//   const finalMenuItems = [
//     ...filteredMenuItems,
//     { id: "logout", icon: null, label: "Logout", action: handleLogout },
//   ];




//   const handleCollapse = () => setIsCollapsed(!isCollapsed);

//   return (
//     <div className="d-flex vh-100">
//       {/* Sidebar */}
//       <div
//         className={` ${isCollapsed ? "collapsed-sidebar" : "expanded-sidebar"}`}
//         style={{
//           minWidth: isCollapsed ? "80px" : "280px",
//           transition: "width 0.3s",
//         }}
//       >
//         <div className="d-flex flex-column align-items-center py-3 h-100" >

//           <div className="flex-grow-1 w-100">
//             {finalMenuItems.map((item) => (
//               <div className="widget-sidebar fixed-sidebar" key={item.id} style={{cursor:'pointer'}}>
//                 <div
//                   className="flat-tab flat-tab-form widget-filter-search widget-box"
//                   style={{ margin: "0px 10px 15px", padding: "0" }}
//                 >
//                   <div className="tab-content">
//                     <div className="tab-pane fade active show" role="tabpanel">
//                       <div className="form-sl">
//                         <div
//                           className="wd-filter-select"
//                           style={{ boxShadow: "none", marginTop: "0" }}
//                         >
//                           <div className="inner-group">
//                             <div className="box">
//                               <div
//                                 className="form-style"
//                                 onClick={() =>
//                                   item.id === "logout" ? item.action() : setActivePage(item.id)
//                                 }
//                                 style={{
//                                   display: "flex",
//                                   justifyContent: "space-between",
//                                   flexDirection: "row",
//                                   padding: "20px 10px",
//                                 }}
//                               >
//                                 <span>{item.label}</span>
//                                 {item.id !== "logout" && <KeyboardArrowRightIcon />}
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//       <style>
//         {`
//           .custom-dashboard-header {
//             height: 800px; /* Corrected typo from "hight" to "height" */
//             overflow: auto;
//             scrollbar-width: none; /* Hides scrollbar in Firefox */
//           }

//           /* For WebKit-based browsers like Chrome, Edge, and Safari */
//           .custom-dashboard-header::-webkit-scrollbar {
//             display: none;
//           }
//         `}
//       </style>
//       {/* Dynamic Content */}
//       <div className="flex-grow-1 bg-light p-4 custom-dashboard-header" style={{ width: '75%' }}>
//         <div className="layout-wrap">
//           {activePage === 'Dashboard' ? (
//             <Dashboard />
//           ) : activePage === 'add-property' ? (
//             <AddProperty />
//           ) : activePage === 'my-profile' ? (
//             <MyProfile />
//           ) : activePage === 'my-property' ? (
//             <MyProperty />
//           ) : (
//             <>
//               <h2>{activePage}</h2>
//               <p>
//                 This is the {activePage} page content. Update this section dynamically based on the selected menu item.
//               </p>
//             </>
//           )}
//         </div>

//       </div>
//     </div>
//   );
// };

// export default DashboardPage;

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
//       <div className="layout-wrap custom-mobile-class">
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
// import AddProperty from "@/components/dashboard/AddProperty";
// import MyProfile from "@/components/dashboard/MyProfile";
// import MyProperty from "@/components/dashboard/MyProperty";
// import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

// const DashboardPage = () => {
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [activePage, setActivePage] = useState("Dashboard");

//   const menuItems = [
//     { id: "Dashboard", icon: <FaHome />, label: "Dashboard" },
//     { id: "my-profile", icon: <FaInfoCircle />, label: "My Profile" },
//     { id: "my-property", icon: <FaServicestack />, label: "My Property" },
//     { id: "add-property", icon: <FaEnvelope />, label: "Add Property" },
//   ];


//   const handleLogout = () => {
//     // Clear user data and navigate to the login page
//     localStorage.removeItem("LandsUser");
//     toast.success("Logout Sucessful")
//     setTimeout(() => {
//       window.location.href = "/"
//     }, 4000);
//   }

//   const landsUser = JSON.parse(localStorage.getItem("LandsUser"));

//   // Filter menu items based on user type
//   const filteredMenuItems = menuItems.filter((item) => {
//     if (landsUser?.type === "Agent" || landsUser?.type === "B2B") {
//       return item.id !== "my-property" && item.id !== "add-property";
//     }
//     return true;
//   });

//   // Add the Logout menu item
//   const finalMenuItems = [
//     ...filteredMenuItems,
//     { id: "logout", icon: null, label: "Logout", action: handleLogout },
//   ];


//   const handleCollapse = () => setIsCollapsed(!isCollapsed);

//   return (
//     <div className="d-flex vh-100">
//       <div
//         className={`bg-dark text-white ${isCollapsed ? "collapsed-sidebar" : "expanded-sidebar"}`}
//         style={{
//           width: isCollapsed ? "80px" : "250px",
//           transition: "width 0.3s",
//         }}
//       >
//         <div className="d-flex flex-column align-items-center py-3 h-100">
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

//       <div className="flex-grow-1 bg-light p-4 custom-dashboard-header" style={{ width: '75%' }}>
//         <div className="layout-wrap">
//           {activePage === 'Dashboard' ? (
//             <Dashboard />
//           ) : activePage === 'add-property' ? (
//             <AddProperty />
//           ) : activePage === 'my-profile' ? (
//             <MyProfile />
//           ) : activePage === 'my-property' ? (
//             <MyProperty />
//           ) : (
//             <>
//               <h2>{activePage}</h2>
//               <p>
//                 This is the {activePage} page content. Update this section dynamically based on the selected menu item.
//               </p>
//             </>
//           )}
//         </div>

//       </div>
//     </div>
//   );
// };

// export default DashboardPage;


import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SidebarMenu from "@/components/dashboard/SidebarMenu";
import Dashboard from "@/components/dashboard/Dashboard";
import AddProperty from "@/components/dashboard/AddProperty";
import MyProfile from "@/components/dashboard/MyProfile";
import MyProperty from "@/components/dashboard/MyProperty";
import MyFavorite from "@/components/dashboard/MyFavorite";
import { Home, Person, PostAdd, Favorite, AddCircle, RequestPage } from '@mui/icons-material';
import Messages from "@/components/dashboard/Messages";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { toast } from "react-toastify";

const DashboardPage = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activePage, setActivePage] = useState("Dashboard");

  const themeColor = "#008ff7";
  const menuItems = [
    { id: "Dashboard", icon: <Home />, label: "My Dashboard" },
    { id: "my-profile", icon: <Person />, label: "My Profile" },
    { id: "my-property", icon: <PostAdd />, label: "My Post" },
    { id: "add-property", icon: <AddCircle />, label: "Add Property" },
    { id: "my-favourites", icon: <Favorite />, label: "My Favourites" },
    { id: "my-requests", icon: <RequestPage />, label: "My Requests" },
  ];


  const handleLogout = () => {
    console.log("logout")
    localStorage.removeItem("LandsUser");
    setTimeout(() => {
      window.location.href = "/";
    }, 2400);
    toast.success("Logout Successful");

  };

  const finalMenuItems = [
    ...menuItems,
    { id: "logout", icon: <ExitToAppIcon />, label: "Logout", action: handleLogout },
  ];

  return (
    <>
      <style>{`
        .sidebar {
          background-color: #f8f9fa;
        }

        .toggle-btn {
          font-size: 1.2rem;
        }

        .menu-item {
          border-radius: 0px;
          transition: background-color 0.3s, color 0.3s;
        }

        .menu-item:hover {
          background-color: ${themeColor};
          color: #fff;
        }

        .menu-item.active {
          background-color: ${themeColor};
          color: #fff;
        }

        .main-content {
          overflow-y: auto;
                    background:#f0f3f4;

        }
                .custom-side{
          background:#ffffff;
        }     

        .menu-item:hover span {
          transform: scale(1.07);
          transition: transform 0.3s ease;
        }

        @media (min-width: 800px) {
          .custom-mobile-class {
            display: none !important;
          }
          .custom-desktop-class {
            display: flex !important;
          }
        }

        @media (max-width: 799px) {
          .custom-desktop-class {
            display: none !important;
          }
          .custom-mobile-class {
            display: flex !important;
          }
        }
      `}</style>

      <div className="layout-wrap custom-mobile-class">
        {/* <Header1 /> */}
        <SidebarMenu />
        {activePage === "Dashboard" ? (
          <Dashboard />
        ) : activePage === "add-property" ? (
          <AddProperty />
        ) : activePage === "my-profile" ? (
          <MyProfile />
        ) : activePage === "my-property" ? (
          <MyProperty />
        ) : activePage === "my-favourites" ? (
          <MyFavorite />
        ) : activePage === "my-requests" ? (
          <Messages />
        ) : (
          <>
            <h2>{activePage}</h2>
            <p>
              This is the {activePage} page content. Update this section dynamically based on the selected menu item.
            </p>
          </>
        )}
        <div className="overlay-dashboard" />
      </div>
      <div className="d-flex vh-100 custom-desktop-class">
        {/* Sidebar */}
        <div
          className={`bg-light text-dark sidebar ${isCollapsed ? "collapsed" : ""}`}
          style={{
            width: isCollapsed ? "80px" : "250px",
            transition: "width 0.3s",
            position: 'sticky'
          }}
        >
          <div className="d-flex flex-column align-items-center py-3 h-100 custom-side">

            <div className="flex-grow-1 w-100">
              {finalMenuItems.map((item) => (
                <div
                  key={item.id}
                  style={{ cursor: "pointer", transition: "transform 0.3s ease" }}
                  className={`d-flex align-items-center py-3 px-3 mb-2 menu-item ${activePage === item.id ? "active" : ""
                    }`}
                  onClick={() => {
                    if (item.id === "logout" && item.action) {
                      item.action();
                    } else {
                      setActivePage(item.id);
                    }
                  }}
                >
                  <span className="me-3" style={{ fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{item.icon}</span>
                  {!isCollapsed && <span style={{ fontWeight: '500' }}>{item.label}</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div
          className="flex-grow-1 bg-white p-4 main-content"
          style={{
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            margin: "16px",
            scrollbarWidth: 'none',
            background:'#f0f3f4',
          }}
        >
          <div className="layout-wrap">
            {activePage === "Dashboard" ? (
              <Dashboard />
            ) : activePage === "add-property" ? (
              <AddProperty />
            ) : activePage === "my-profile" ? (
              <MyProfile />
            ) : activePage === "my-property" ? (
              <MyProperty />
            ) : activePage === "my-favourites" ? (
              <MyFavorite />
            ) : activePage === "my-requests" ? (
              <Messages />
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
    </>

  );
};

export default DashboardPage;
