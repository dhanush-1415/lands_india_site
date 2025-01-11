import "../public/scss/styles.scss";
import "photoswipe/dist/photoswipe.css";
import 'boxicons/css/boxicons.min.css';
import "react-modal-video/scss/modal-video.scss";
import "rc-slider/assets/index.css";
import WOW from "./utlis/wow";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages";
// import HomePage2 from "./pages/homes/home-02";
// import HomePage3 from "./pages/homes/home-03";
// import HomePage4 from "./pages/homes/home-04";
// import HomePage5 from "./pages/homes/home-05";
// import HomePage6 from "./pages/homes/home-06";
import { useEffect } from "react";
import LoginModals from "./components/modals/LoginModals";
import Register from "./components/modals/Register";
import BackToTop from "./components/common/BackToTop";
import ScrollTopBehaviour from "./components/common/ScrollTopBehaviour";
import PropertyHalfmapGridPage from "./pages/properties/property-halfmap-grid";
import PropertyHalfmapListPage from "./pages/properties/property-halfmap-list";
import TopmapGridPage from "./pages/properties/topmap-grid";
import TopmapListPage from "./pages/properties/topmap-list";
import SidebarGridPage from "./pages/properties/sidebar-grid";
import SidebarListPage from "./pages/properties/sidebar-list";
import PropertyDetailsPageV1 from "./pages/property-details/property-details-v1";
import PropertyDetailsPageV2 from "./pages/property-details/property-details-v2";
import PropertyDetailsPageV3 from "./pages/property-details/property-details-v3";
import PropertyDetailsPageV4 from "./pages/property-details/property-details-v4";
import AboutUsPage from "./pages/other-pages/about-us";
import OurServicePage from "./pages/other-pages/our-service";
import PricingPage from "./pages/other-pages/pricing";
import ContactPage from "./pages/other-pages/contact";
import FaqPage from "./pages/other-pages/faq";
import PrivacyPolicyPage from "./pages/other-pages/privacy-policy";
import BlogPage from "./pages/blogs/blog";
import BlogGridPage from "./pages/blogs/blog-grid";
import BlogDetailsPage from "./pages/blogs/blog-detail";
import DashboardPage from "./pages/dashboard/dashboard";
import MyPropertyPage from "./pages/dashboard/my-property";
import MessagePage from "./pages/dashboard/message";
import MyFavoritePage from "./pages/dashboard/my-favorites";
import ReviewPage from "./pages/dashboard/reviews";
import HelpAndSupport from "./pages/Help&Support/HelpAndSupport";
import Agents from "./components/common/Agents";
import ValueAddedServices from "./components/common/ValueAddedServices";
import Franchise from "./components/common/Franchise";
import MyProfilePage from "./pages/dashboard/my-profile";
import AddPropertyPage from "./pages/dashboard/add-property";
import Header1 from "./components/headers/Header1";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Import the script only on the client side
      import("bootstrap/dist/js/bootstrap.esm").then(() => {
        // Module is imported, you can access any exported functionality if
      });
    }
  }, []);

  useEffect(() => {
    const wow = new WOW({
      mobile: false,
      live: false,
    });
    wow.init();
  }, [pathname]);
  return (
    <>
      <div id="wrapper">
        <div id="pagee" className="clearfix">
        <Header1 />
        <ToastContainer />
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />
              {/* <Route path="home-02" element={<HomePage2 />} />

              <Route path="home-03" element={<HomePage3 />} />
              <Route path="home-04" element={<HomePage4 />} />
              <Route path="home-05" element={<HomePage5 />} />
              <Route path="home-06" element={<HomePage6 />} /> */}





              <Route path="properties" element={<SidebarGridPage />} />
              <Route path="support" element={<HelpAndSupport />} />
              <Route path="agents" element={<Agents />} />
              <Route path="franchise" element={<Franchise />} />
              <Route path="value-added-services" element={<ValueAddedServices />} />
              <Route path="properties/:name" element={<SidebarGridPage />} />
              <Route
                path="property-details"
                element={<PropertyDetailsPageV1 />}
              />
              <Route
                path="property-details/:id"
                element={<PropertyDetailsPageV1 />}
              />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="my-property" element={<MyPropertyPage />} />
              <Route path="my-profile" element={<MyProfilePage />} />
              <Route path="add-property" element={<AddPropertyPage />} />








              {/* <Route
                path="property-halfmap-grid"
                element={<PropertyHalfmapGridPage />}
              />
              <Route
                path="property-halfmap-list"
                element={<PropertyHalfmapListPage />}
              />
              <Route path="topmap-grid" element={<TopmapGridPage />} />
              <Route path="topmap-list" element={<TopmapListPage />} />
              <Route path="sidebar-grid" element={<SidebarGridPage />} />
              <Route path="sidebar-list" element={<SidebarListPage />} />
    
              <Route
                path="property-details-v1/:id"
                element={<PropertyDetailsPageV1 />}
              />
              <Route
                path="property-details-v2"
                element={<PropertyDetailsPageV2 />}
              />
              <Route
                path="property-details-v3"
                element={<PropertyDetailsPageV3 />}
              />
              <Route
                path="property-details-v4"
                element={<PropertyDetailsPageV4 />}
              />

              <Route path="about-us" element={<AboutUsPage />} />
              <Route path="our-service" element={<OurServicePage />} />
              <Route path="pricing" element={<PricingPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="faq" element={<FaqPage />} />
              <Route path="privacy-policy" element={<PrivacyPolicyPage />} />

              <Route path="blog" element={<BlogPage />} />
              <Route path="blog-grid" element={<BlogGridPage />} />
              <Route path="blog-detail/:id" element={<BlogDetailsPage />} />

              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="my-property" element={<MyPropertyPage />} />
              <Route path="message" element={<MessagePage />} />
              <Route path="my-favorites" element={<MyFavoritePage />} />
              <Route path="reviews" element={<ReviewPage />} />
              <Route path="my-profile" element={<MyProfilePage />} />
              <Route path="add-property" element={<AddPropertyPage />} /> */}
            </Route>
          </Routes>
        </div>
      </div>
      <LoginModals />
      <Register />
      <BackToTop />
      <ScrollTopBehaviour />
    </>
  );
}

export default App;
