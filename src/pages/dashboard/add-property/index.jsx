// import AddProperty from "@/components/dashboard/AddProperty";

// import SidebarMenu from "@/components/dashboard/SidebarMenu";
// import Header2 from "@/components/headers/Header2";
// import React from "react";

// import MetaComponent from "@/components/common/MetaComponent";
// const metadata = {
//   title: "Add Property || Homelengo - Real Estate Reactjs Template",
//   description: "Homelengo - Real Estate Reactjs Template",
// };
// export default function AddPropertyPage() {
//   return (
//     <>
//       <MetaComponent />
//       <div className="layout-wrap">
//         {/* <Header2 /> */}
//         <SidebarMenu />
//         <AddProperty />
//         <div className="overlay-dashboard" />
//       </div>
//     </>
//   );
// }



import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SidebarMenu from "@/components/dashboard/SidebarMenu";
import Dashboard from "@/components/dashboard/Dashboard";
import AddProperty from "@/components/dashboard/AddProperty";
import MyProfile from "@/components/dashboard/MyProfile";
import MyProperty from "@/components/dashboard/MyProperty";
import MyFavorite from "@/components/dashboard/MyFavorite";
import Messages from "@/components/dashboard/Messages";
import { Home, Person, PostAdd, Favorite, AddCircle, RequestPage } from '@mui/icons-material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { toast } from "react-toastify";

const AddPropertyPage = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activePage, setActivePage] = useState("add-property");

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
        <Dashboard />
        <div className="overlay-dashboard" />
      </div>
      <div className="d-flex vh-100 custom-desktop-class">
        {/* Sidebar */}
        <div
          className={`bg-light text-dark sidebar ${isCollapsed ? "collapsed" : ""}`}
          style={{
            width: isCollapsed ? "80px" : "250px",
            transition: "width 0.3s",
            boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
            position: 'sticky'
          }}
        >
          <div className="d-flex flex-column align-items-center py-3 h-100">

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

export default AddPropertyPage;
