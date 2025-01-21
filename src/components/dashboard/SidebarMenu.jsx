import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export default function SidebarMenu() {

  const handleLogout = () => {
    localStorage.removeItem("LandsUser");
    toast.success("Logout Successful");
    window.location.href = "/"
  }


  useEffect(() => {
    const removeFullWidth = () => {
      document.querySelector(".layout-wrap").classList.remove("full-width");
    };

    removeFullWidth();
  }, [])

  useEffect(() => {

    const toggleFullWidth = () => {
      document.querySelector(".layout-wrap").classList.toggle("full-width");
    };

    const removeFullWidth = () => {
      document.querySelector(".layout-wrap").classList.remove("full-width");
    };

    const buttonsShowHide = document.querySelectorAll(".button-show-hide");
    buttonsShowHide.forEach((button) =>
      button.addEventListener("click", toggleFullWidth)
    );

    const mobileNavToggler = document.querySelector(".mobile-nav-toggler");
    const overlayDashboard = document.querySelector(".overlay-dashboard");

    mobileNavToggler.addEventListener("click", removeFullWidth);
    overlayDashboard.addEventListener("click", removeFullWidth);

    // Cleanup event listeners when component unmounts
    return () => {
      buttonsShowHide.forEach((button) =>
        button.removeEventListener("click", toggleFullWidth)
      );
      mobileNavToggler.removeEventListener("click", removeFullWidth);
      overlayDashboard.removeEventListener("click", removeFullWidth);
    };

  }, []);

  const { pathname } = useLocation();
  return (
    <div className="sidebar-menu-dashboard">
      {/* <Link to={`/`} className="logo-box">
        <h3 className="text-white">Lands India</h3>
      </Link> */}
      <div className="menu-box">
        <div className="title fw-6">Menu</div>
        <ul className="box-menu-dashboard">
          <li
            className={`nav-menu-item ${pathname == "/dashboard" ? "active" : ""
              }`}
          >
            <Link className="nav-menu-link" to={`/dashboard`}>
              <svg
                width={22}
                height={22}
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.2">
                  <path
                    d="M6.75682 9.35156V15.64"
                    stroke="#F1FAEE"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11.0342 6.34375V15.6412"
                    stroke="#F1FAEE"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15.2412 12.6758V15.6412"
                    stroke="#F1FAEE"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.2939 1.83398H6.70346C3.70902 1.83398 1.83203 3.95339 1.83203 6.95371V15.0476C1.83203 18.0479 3.70029 20.1673 6.70346 20.1673H15.2939C18.2971 20.1673 20.1654 18.0479 20.1654 15.0476V6.95371C20.1654 3.95339 18.2971 1.83398 15.2939 1.83398Z"
                    stroke="#F1FAEE"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
              Dashboards
            </Link>
          </li>
          <li
            className={`nav-menu-item ${pathname == "/my-profile" ? "active" : ""
              }`}
          >
            <Link className="nav-menu-link" to={`/my-profile`}>
              <svg
                width={22}
                height={22}
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.2">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.987 14.0684C7.44168 14.0684 4.41406 14.6044 4.41406 16.7511C4.41406 18.8979 7.42247 19.4531 10.987 19.4531C14.5323 19.4531 17.5591 18.9162 17.5591 16.7703C17.5591 14.6245 14.5515 14.0684 10.987 14.0684Z"
                    stroke="#F1FAEE"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.9866 11.0056C13.3132 11.0056 15.1989 9.11897 15.1989 6.79238C15.1989 4.46579 13.3132 2.58008 10.9866 2.58008C8.66005 2.58008 6.77346 4.46579 6.77346 6.79238C6.7656 9.11111 8.6391 10.9977 10.957 11.0056H10.9866Z"
                    stroke="#F1FAEE"
                    strokeWidth="1.42857"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
              My Profile
            </Link>
          </li>
          <li
            className={`nav-menu-item ${pathname == "/my-property" ? "active" : ""
              }`}
          >
            <Link className="nav-menu-link" to={`/my-property`}>
              <svg
                width={22}
                height={22}
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.2">
                  <path
                    d="M10.533 2.55664H7.10561C4.28686 2.55664 2.51953 4.55222 2.51953 7.37739V14.9986C2.51953 17.8237 4.27861 19.8193 7.10561 19.8193H15.1943C18.0222 19.8193 19.7813 17.8237 19.7813 14.9986V11.3062"
                    stroke="#F1FAEE"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.09012 10.0111L14.9404 3.16086C15.7938 2.30836 17.177 2.30836 18.0305 3.16086L19.146 4.27644C19.9995 5.12986 19.9995 6.51403 19.146 7.36653L12.2628 14.2498C11.8897 14.6229 11.3837 14.8328 10.8557 14.8328H7.42188L7.50804 11.3678C7.52087 10.8581 7.72896 10.3723 8.09012 10.0111Z"
                    stroke="#F1FAEE"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.8984 4.21875L18.0839 8.40425"
                    stroke="#F1FAEE"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
              My Post
            </Link>
          </li>
          <li
            className={`nav-menu-item ${pathname == "/add-property" ? "active" : ""
              }`}
          >
            <Link className="nav-menu-link" to={`/add-property`}>
              <svg
                width={22}
                height={22}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.2">
                  <path
                    d="M19.5 3H4.5C4.10218 3 3.72064 3.15804 3.43934 3.43934C3.15804 3.72064 3 4.10218 3 4.5V19.5C3 19.8978 3.15804 20.2794 3.43934 20.5607C3.72064 20.842 4.10218 21 4.5 21H19.5C19.8978 21 20.2794 20.842 20.5607 20.5607C20.842 20.2794 21 19.8978 21 19.5V4.5C21 4.10218 20.842 3.72064 20.5607 3.43934C20.2794 3.15804 19.8978 3 19.5 3ZM19.5 19.5H4.5V4.5H19.5V19.5ZM16.5 12C16.5 12.1989 16.421 12.3897 16.2803 12.5303C16.1397 12.671 15.9489 12.75 15.75 12.75H12.75V15.75C12.75 15.9489 12.671 16.1397 12.5303 16.2803C12.3897 16.421 12.1989 16.5 12 16.5C11.8011 16.5 11.6103 16.421 11.4697 16.2803C11.329 16.1397 11.25 15.9489 11.25 15.75V12.75H8.25C8.05109 12.75 7.86032 12.671 7.71967 12.5303C7.57902 12.3897 7.5 12.1989 7.5 12C7.5 11.8011 7.57902 11.6103 7.71967 11.4697C7.86032 11.329 8.05109 11.25 8.25 11.25H11.25V8.25C11.25 8.05109 11.329 7.86032 11.4697 7.71967C11.6103 7.57902 11.8011 7.5 12 7.5C12.1989 7.5 12.3897 7.57902 12.5303 7.71967C12.671 7.86032 12.75 8.05109 12.75 8.25V11.25H15.75C15.9489 11.25 16.1397 11.329 16.2803 11.4697C16.421 11.6103 16.5 11.8011 16.5 12Z"
                    fill="#F1FAEE"
                  />
                </g>
              </svg>
              Add Property
            </Link>
          </li>
          <li
            className={`nav-menu-item ${pathname == "/my-favourites" ? "active" : ""
              }`}
          >
            <Link className="nav-menu-link" to={`/my-favourites`}>
              <svg
                width={22}
                height={22}
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.2">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2.63385 10.6318C1.65026 7.56096 2.79976 4.05104 6.02368 3.01246C7.71951 2.46521 9.59135 2.78788 11.0012 3.84846C12.3349 2.81721 14.2755 2.46888 15.9695 3.01246C19.1934 4.05104 20.3503 7.56096 19.3676 10.6318C17.8368 15.4993 11.0012 19.2485 11.0012 19.2485C11.0012 19.2485 4.21601 15.5561 2.63385 10.6318Z"
                    stroke="#F1FAEE"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14.668 6.14258C15.6488 6.45974 16.3418 7.33516 16.4252 8.36274"
                    stroke="#F1FAEE"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
              My favorite
            </Link>
          </li>

          <li
            className={`nav-menu-item ${pathname == "/my-requests" ? "active" : ""
              }`}
          >
            <Link className="nav-menu-link" to={`/my-requests`}>
              <svg
                width={22}
                height={22}
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.2">
                  <path
                    d="M16.4076 8.11328L12.3346 11.4252C11.5651 12.0357 10.4824 12.0357 9.71285 11.4252L5.60547 8.11328"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.4985 19.25C18.2864 19.2577 20.1654 16.9671 20.1654 14.1518V7.85584C20.1654 5.04059 18.2864 2.75 15.4985 2.75H6.49891C3.711 2.75 1.83203 5.04059 1.83203 7.85584V14.1518C1.83203 16.9671 3.711 19.2577 6.49891 19.25H15.4985Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
              My Requests
            </Link>
          </li>


          <li className={`nav-menu-item ${pathname == "/" ? "active" : ""}`}>
            <Link className="nav-menu-link" onClick={handleLogout}>
              <svg
                width={22}
                height={22}
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.2">
                  <path
                    d="M13.7627 6.77418V5.91893C13.7627 4.05352 12.2502 2.54102 10.3848 2.54102H5.91606C4.05156 2.54102 2.53906 4.05352 2.53906 5.91893V16.1214C2.53906 17.9868 4.05156 19.4993 5.91606 19.4993H10.394C12.2539 19.4993 13.7627 17.9914 13.7627 16.1315V15.2671"
                    stroke="#F1FAEE"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M19.9907 11.0208H8.95312"
                    stroke="#F1FAEE"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17.3047 8.34766L19.9887 11.0197L17.3047 13.6927"
                    stroke="#F1FAEE"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
