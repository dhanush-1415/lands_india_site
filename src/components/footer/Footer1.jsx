// import React, { useEffect, useRef, useState } from "react";
// import { Link } from "react-router-dom";

// import emailjs from "@emailjs/browser";
// import { footerSections } from "@/data/footer";
// export default function Footer1() {
//   const formRef = useRef();
//   const [success, setSuccess] = useState(true);
//   const [showMessage, setShowMessage] = useState(false);

//   const handleShowMessage = () => {
//     setShowMessage(true);
//     setTimeout(() => {
//       setShowMessage(false);
//     }, 2000);
//   };

//   const sendMail = (e) => {
//     e.preventDefault();
//     emailjs
//       .sendForm("service_noj8796", "template_fs3xchn", formRef.current, {
//         publicKey: "iG4SCmR-YtJagQ4gV",
//       })
//       .then((res) => {
//         if (res.status === 200) {
//           setSuccess(true);
//           handleShowMessage();

//           formRef.current.reset();
//         } else {
//           setSuccess(false);
//           handleShowMessage();
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
//   useEffect(() => {
//     const headings = document.querySelectorAll(".footer-heading-mobile");

//     const toggleOpen = (event) => {
//       const parent = event.target.closest(".footer-col-block");
//       const content = parent.querySelector(".tf-collapse-content");

//       if (parent.classList.contains("open")) {
//         parent.classList.remove("open");
//         content.style.height = "0px";
//       } else {
//         parent.classList.add("open");
//         content.style.height = content.scrollHeight + "px";
//       }
//     };

//     headings.forEach((heading) => {
//       heading.addEventListener("click", toggleOpen);
//     });

//     // Clean up event listeners when the component unmounts
//     return () => {
//       headings.forEach((heading) => {
//         heading.removeEventListener("click", toggleOpen);
//       });
//     };
//   }, []); // Empty dependency array means this will run only once on mount

//   return (
//     <footer className="footer">
//       <div className="top-footer">
//         <div className="container">
//           <div className="content-footer-top">
//             <div className="footer-logo">
//               <Link to={`/`}>
//                 {/* <img
//                   alt="logo"
//                   width={166}
//                   height={48}
//                   src="/images/logo/logo-footer@2x.png"
//                 /> */}
//         <h3 className="text-white">Lands India</h3>

//               </Link>
//             </div>
//             <div className="wd-social">
//               <span>Follow Us:</span>
//               <ul className="list-social d-flex align-items-center">
//                 <li>
//                   <a href="#" className="box-icon w-40 social">
//                     <svg
//                       className="icon"
//                       width={9}
//                       height={16}
//                       viewBox="0 0 9 16"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         d="M7.60547 9L8.00541 6.10437H5.50481V4.22531C5.50481 3.43313 5.85413 2.66094 6.97406 2.66094H8.11087V0.195625C8.11087 0.195625 7.07925 0 6.09291 0C4.03359 0 2.68753 1.38688 2.68753 3.8975V6.10437H0.398438V9H2.68753V16H5.50481V9H7.60547Z"
//                         fill="white"
//                       />
//                     </svg>
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="box-icon w-40 social">
//                     <svg
//                       width={16}
//                       height={16}
//                       viewBox="0 0 16 16"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         d="M3.58151 16H0.264292V5.31762H3.58151V16ZM1.92111 3.86044C0.860376 3.86044 0 2.98185 0 1.92111C7.59231e-09 1.4116 0.202403 0.92296 0.562681 0.562681C0.92296 0.202403 1.4116 0 1.92111 0C2.43063 0 2.91927 0.202403 3.27955 0.562681C3.63983 0.92296 3.84223 1.4116 3.84223 1.92111C3.84223 2.98185 2.98149 3.86044 1.92111 3.86044ZM15.9968 16H12.6867V10.7999C12.6867 9.56057 12.6617 7.97125 10.962 7.97125C9.23735 7.97125 8.97306 9.31771 8.97306 10.7106V16H5.65941V5.31762H8.84091V6.77479H8.88734C9.33021 5.93549 10.412 5.04976 12.026 5.04976C15.3832 5.04976 16.0004 7.26052 16.0004 10.132V16H15.9968Z"
//                         fill="white"
//                       />
//                     </svg>
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="box-icon w-40 social">
//                     <svg
//                       width={14}
//                       height={14}
//                       viewBox="0 0 14 14"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         d="M8.30314 5.92804L13.4029 0H12.1944L7.7663 5.14724L4.22958 0H0.150391L5.4986 7.78354L0.150391 14H1.35894L6.03514 8.56434L9.77017 14H13.8494L8.30284 5.92804H8.30314ZM6.64787 7.85211L6.10598 7.07705L1.79439 0.909771H3.65065L7.13015 5.88696L7.67204 6.66202L12.195 13.1316H10.3387L6.64787 7.85241V7.85211Z"
//                         fill="white"
//                       />
//                     </svg>
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="box-icon w-40 social">
//                     <svg
//                       width={13}
//                       height={16}
//                       viewBox="0 0 13 16"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         d="M6.53967 0C3.2506 0 0 2.19271 0 5.74145C0 7.99827 1.26947 9.28056 2.03884 9.28056C2.3562 9.28056 2.53893 8.39578 2.53893 8.14574C2.53893 7.8476 1.77918 7.21287 1.77918 5.97226C1.77918 3.39486 3.74108 1.5676 6.28001 1.5676C8.4631 1.5676 10.0788 2.80821 10.0788 5.08748C10.0788 6.78972 9.39597 9.98261 7.18402 9.98261C6.3858 9.98261 5.70298 9.40558 5.70298 8.57851C5.70298 7.36675 6.54929 6.19345 6.54929 4.94322C6.54929 2.82103 3.53912 3.20572 3.53912 5.7703C3.53912 6.30886 3.60644 6.90512 3.84686 7.3956C3.40448 9.2998 2.50046 12.1369 2.50046 14.0988C2.50046 14.7046 2.58702 15.3009 2.64472 15.9068C2.75371 16.0286 2.69922 16.0158 2.86591 15.9549C4.4816 13.7429 4.42389 13.3102 5.1548 10.4154C5.5491 11.1655 6.56852 11.5694 7.37636 11.5694C10.7808 11.5694 12.31 8.25152 12.31 5.26059C12.31 2.07731 9.55946 0 6.53967 0Z"
//                         fill="white"
//                       />
//                     </svg>
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="box-icon w-40 social">
//                     <svg
//                       width={14}
//                       height={14}
//                       viewBox="0 0 14 14"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         d="M6.99812 4.66567C5.71277 4.66567 4.66383 5.71463 4.66383 7C4.66383 8.28537 5.71277 9.33433 6.99812 9.33433C8.28346 9.33433 9.3324 8.28537 9.3324 7C9.3324 5.71463 8.28346 4.66567 6.99812 4.66567ZM13.9992 7C13.9992 6.03335 14.008 5.07545 13.9537 4.11055C13.8994 2.98979 13.6437 1.99512 12.8242 1.17556C12.0029 0.35426 11.01 0.100338 9.88927 0.0460516C8.92263 -0.00823506 7.96475 0.000520879 6.99987 0.000520879C6.03323 0.000520879 5.07536 -0.00823506 4.11047 0.0460516C2.98973 0.100338 1.99508 0.356011 1.17554 1.17556C0.354253 1.99687 0.100336 2.98979 0.0460508 4.11055C-0.00823491 5.0772 0.00052087 6.0351 0.00052087 7C0.00052087 7.9649 -0.00823491 8.92455 0.0460508 9.88945C0.100336 11.0102 0.356004 12.0049 1.17554 12.8244C1.99683 13.6457 2.98973 13.8997 4.11047 13.9539C5.07711 14.0082 6.03499 13.9995 6.99987 13.9995C7.9665 13.9995 8.92438 14.0082 9.88927 13.9539C11.01 13.8997 12.0047 13.644 12.8242 12.8244C13.6455 12.0031 13.8994 11.0102 13.9537 9.88945C14.0097 8.92455 13.9992 7.96665 13.9992 7ZM6.99812 10.5917C5.01056 10.5917 3.40651 8.98759 3.40651 7C3.40651 5.01241 5.01056 3.40832 6.99812 3.40832C8.98567 3.40832 10.5897 5.01241 10.5897 7C10.5897 8.98759 8.98567 10.5917 6.99812 10.5917ZM10.7368 4.10004C10.2728 4.10004 9.89802 3.72529 9.89802 3.26122C9.89802 2.79716 10.2728 2.42241 10.7368 2.42241C11.2009 2.42241 11.5756 2.79716 11.5756 3.26122C11.5758 3.37142 11.5542 3.48056 11.5121 3.58239C11.47 3.68422 11.4082 3.77675 11.3303 3.85467C11.2523 3.93258 11.1598 3.99437 11.058 4.03647C10.9562 4.07858 10.847 4.10018 10.7368 4.10004Z"
//                         fill="white"
//                       />
//                     </svg>
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="box-icon w-40 social">
//                     <svg
//                       width={16}
//                       height={12}
//                       viewBox="0 0 16 12"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         d="M15.6657 1.76024C15.4817 1.06737 14.9395 0.521689 14.2511 0.336504C13.0033 0 8 0 8 0C8 0 2.99669 0 1.7489 0.336504C1.06052 0.521718 0.518349 1.06737 0.334336 1.76024C0 3.01611 0 5.63636 0 5.63636C0 5.63636 0 8.25661 0.334336 9.51248C0.518349 10.2053 1.06052 10.7283 1.7489 10.9135C2.99669 11.25 8 11.25 8 11.25C8 11.25 13.0033 11.25 14.2511 10.9135C14.9395 10.7283 15.4817 10.2053 15.6657 9.51248C16 8.25661 16 5.63636 16 5.63636C16 5.63636 16 3.01611 15.6657 1.76024ZM6.36363 8.01535V3.25737L10.5454 5.63642L6.36363 8.01535Z"
//                         fill="white"
//                       />
//                     </svg>
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="inner-footer">
//         <div className="container">
//           <div className="row">
//             <div className="col-lg-4 col-md-6">
//               <div className="footer-cl-1">
//                 <p className="text-variant-2">
//                   Specializes in providing high-class tours for those in need.
//                   Contact Us
//                 </p>
//                 <ul className="mt-12">
//                   <li className="mt-12 d-flex align-items-center gap-8">
//                     <i className="icon icon-mapPinLine fs-20 text-variant-2" />
//                     <p className="text-white">
//                     LIP Prpoerties pvt Ltd
//                     </p>
//                   </li>
//                   <li className="mt-12 d-flex align-items-center gap-8">
//                     <i className="icon icon-phone2 fs-20 text-variant-2" />
//                     <a
//                       href="tel:1-333-345-6868"
//                       className="text-white caption-1"
//                     >
//                       +91 9994547709
//                     </a>
//                   </li>
//                   <li className="mt-12 d-flex align-items-center gap-8">
//                     <i className="icon icon-mail fs-20 text-variant-2" />
//                     <p className="text-white">admin@propertystores.com</p>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//             {footerSections.map((section, index) => (
//               <div key={index} className="col-lg-2 col-md-6">
//                 <div className={`footer-cl-${index + 2} footer-col-block`}>
//                   <div className="fw-7 text-white footer-heading-mobile">
//                     {section.heading}
//                   </div>
//                   <div className="tf-collapse-content">
//                     <ul className="mt-10 navigation-menu-footer">
//                       {section.links.map((link, linkIndex) => (
//                         <li key={linkIndex}>
//                           <Link
//                             to={link.href}
//                             className="caption-1 text-variant-2"
//                           >
//                             {link.label}
//                           </Link>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             ))}
//             <div className="col-lg-4 col-md-6">
//               <div className="footer-cl-4 footer-col-block">
//                 <div className="fw-7 text-white footer-heading-mobile">
//                   Terms
//                 </div>
//                 <div className="tf-collapse-content">
//                   <p className="mt-12 text-variant-2">
//                     Your Weekly/Monthly Dose of Knowledge and Inspiration
//                   </p>
//                   <div
//                     className={`tfSubscribeMsg  footer-sub-element ${
//                       showMessage ? "active" : ""
//                     }`}
//                   >
//                     {success ? (
//                       <p style={{ color: "rgb(52, 168, 83)" }}>
//                         You have successfully subscribed.
//                       </p>
//                     ) : (
//                       <p style={{ color: "red" }}>Something went wrong</p>
//                     )}
//                   </div>
//                   <form id="subscribe-form" onSubmit={sendMail} ref={formRef}>
//                     <div id="subscribe-content">
//                       <input
//                         type="email"
//                         name="email-form"
//                         id="subscribe-email"
//                         placeholder="Your email address"
//                         required
//                       />
//                       <button
//                         type="submit"
//                         id="subscribe-button"
//                         className="button-subscribe"
//                       >
//                         <svg
//                           width={20}
//                           height={20}
//                           viewBox="0 0 20 20"
//                           fill="none"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <path
//                             d="M5.00044 9.99935L2.72461 2.60352C8.16867 4.18685 13.3024 6.68806 17.9046 9.99935C13.3027 13.3106 8.16921 15.8118 2.72544 17.3952L5.00044 9.99935ZM5.00044 9.99935H11.2504"
//                             stroke="#1563DF"
//                             strokeWidth="1.5"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                           />
//                         </svg>
//                       </button>
//                     </div>
//                     <div id="subscribe-msg" />
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="bottom-footer">
//         <div className="container">
//           <div className="content-footer-bottom">
//             <div className="copyright">
//               ©{new Date().getFullYear()} Lands India. All Rights Reserved.
//             </div>
//             <ul className="menu-bottom">
//               <li>
//                 <Link to={`/our-service`}>Terms Of Services</Link>
//               </li>
//               <li>
//                 <Link to={`/pricing`}>Privacy Policy</Link>
//               </li>
//               <li>
//                 <Link to={`/contact`}>Cookie Policy</Link>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }


import React from 'react';
import { Box, Grid, Typography, Button, Link, IconButton, Divider } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";


const Footer1 = () => {

  const handleNavigation = (path) => {
    if (path === "add-property") {
      const landsUser = JSON.parse(localStorage.getItem('LandsUser'));

      if (landsUser) {
        window.location.href = `/${path}`
      } else {
        toast.error("Please Login to Continue")
      }
    } else {

      window.location.href = `/${path}`
    }

  }


  return (
    <Grid sx={{ backgroundColor: '#1c1c1e', color: '#fff' }}>
      <Box sx={{ py: 5, width: { xs: '85%', sm: '85%', md: '90%' }, margin: '0px auto' }}>
        <Grid container sx={{ justifyContent: { xs: 'space-between' } }}>
          <Grid container sx={{ justifyContent: { xs: 'space-between' }, margin: '50px 0' }}>

            <Grid item xs={12} md={5.8} sx={{ margin: '20px 0' }}>
              <Grid container justifyContent='space-between' sx={{ backgroundColor: '#2e2e2e', borderRadius: '5px', padding: { xs: '20px', sm: '20px', md: '0px' } }}>
                <Grid item xs={12} md={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src="https://themesflat.co/html/dreamhomehtml/assets/images/icon/footer-icon-1.png" alt='logo' />
                </Grid>
                <Grid item xs={12} md={9}>
                  <Box
                    sx={{

                      borderRadius: 2,
                      p: 3,
                      textAlign: { xs: 'center', sm: 'center', md: 'left' },
                    }}
                  >
                    <Typography variant="h5" fontWeight='bold' gutterBottom color='#ffffff'>
                      Are you looking to Buy
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Tell us your needs, we will give you thousands of suggestions
                      {/* for the dream home. */}
                    </Typography>
                  </Box>
                </Grid>
                <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center',cursor:'pointer' }}>
                  <Grid>
                    <Grid onClick={() => { handleNavigation('support') }} container justifyContent='space-between' flexDirection="row" sx={{ backgroundColor: '#343434', borderRadius: '5px', boxShadow: " rgba(99, 99, 99, 0.2) 0px 2px 8px 0px", marginBottom: '-20px', padding: '10px 20px' }} >
                      <Grid>
                        <PhoneIcon />
                      </Grid>
                      <Grid>
                        <Divider orientation="vertical" flexItem sx={{ border: '1px solid #ffffff', height: '100%', margin: '0px 10px' }} />
                      </Grid>
                      <Grid>
                        <Typography variant='subtitle2' fontWeight='bold' color="#ffffff" >Contact Us</Typography>
                      </Grid>
                    </Grid>
                  </Grid>

                </Grid>
              </Grid>

            </Grid>
            <Grid item xs={12} md={5.8} sx={{ margin: '20px 0' }}>
              <Grid container justifyContent='space-between' sx={{ backgroundColor: '#2e2e2e', borderRadius: '5px', padding: { xs: '20px', sm: '20px', md: '0px' } }}>
                <Grid item xs={12} md={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src="https://themesflat.co/html/dreamhomehtml/assets/images/icon/footer-icon-2.png" alt='logo' />
                </Grid>
                <Grid item xs={12} md={9}>
                  <Box
                    sx={{
                      borderRadius: 2,
                      p: 3,
                      textAlign: { xs: 'center', sm: 'center', md: 'left' },
                    }}
                  >
                    <Typography variant="h5" fontWeight='bold' gutterBottom color='#ffffff'>
                      Sell your Property
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      We will connect you to thousands of people who need to buy a home.
                    </Typography>

                  </Box>
                </Grid>
                <Grid onClick={() => { handleNavigation('add-property') }} container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', cursor:'pointer'  }}>
                  <Grid>
                    <Grid container justifyContent='space-between' flexDirection="row" sx={{ backgroundColor: '#343434', borderRadius: '5px', boxShadow: " rgba(99, 99, 99, 0.2) 0px 2px 8px 0px", marginBottom: '-20px', padding: '10px 20px' }} >
                      <Grid>
                        <HomeWorkIcon />
                      </Grid>
                      <Grid>
                        <Divider orientation="vertical" flexItem sx={{ border: '1px solid #ffffff', height: '100%', margin: '0px 10px' }} />
                      </Grid>
                      <Grid>
                        <Typography variant='subtitle2' fontWeight='bold' color="#ffffff" >Sell Property</Typography>
                      </Grid>
                    </Grid>
                  </Grid>

                </Grid>

              </Grid>

            </Grid>
          </Grid>

          {/* Bottom Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom color='#ffffff' fontWeight='bold'>
              Office Address
            </Typography>
            <Typography variant="body2" fontWeight='bold' color='gray' sx={{ mt: 3 }}>
              Corporate office:
            </Typography>
            <Typography variant="body2" fontWeight='bold'>
              #59 Dharga Road, Zamin pallavaram, Chennai-600043 
            </Typography>
            <Typography variant="body2" fontWeight='bold' color='gray' sx={{ mt: 3 }}>
              Dubai office:
            </Typography>
            <Typography variant="body2" fontWeight='bold'>
              No.12, Al Masraf Tower, Baniyas Square, Deira - Dubai
            </Typography>
            <Typography variant="body2" fontWeight='bold' color='gray' sx={{ mt: 1 }}>
              Branch office in India:
            </Typography>
            <Typography variant="body2" fontWeight='bold' >
              Chrompet, Kalpakkam, Thuvakudi, Melmaruvathur, Veppur, Pannadam, Ullundhurpet, Chidambaram, Trichy, Preambalur, Courtallam & More
            </Typography>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom color='#ffffff' fontWeight='bold'>
              Contact Our Team
            </Typography>
            <Typography variant="body2" fontWeight='bold' color='gray' sx={{ mt: 3 }}>
              Support Team:
            </Typography>
            <Typography variant="body2">
              <PhoneIcon fontSize="small" /> +91 93638 28393
            </Typography>
            <Typography variant="body2" fontWeight='bold' color='gray' sx={{ mt: 1 }}>
              Sales Team:
            </Typography>
            <Typography variant="body2" >
              <PhoneIcon fontSize="small" />  +91 93638 28393
            </Typography>
            <Typography variant="body2" fontWeight='bold' color='gray' sx={{ mt: 1 }}>
              Email:
            </Typography>
            <Typography variant="body2" >
              <EmailIcon fontSize="small" /> admin@propertystores.in
            </Typography>
          </Grid>

          <Grid item xs={12} md={2.5}>
            <Typography variant="h6" gutterBottom color='#ffffff' fontWeight='bold'>
              Our Company
            </Typography>
            <Link href="/about-us" color="inherit" underline="hover" variant="body2" display="block" sx={{ mt: 3 }}>
              <KeyboardArrowRightIcon sx={{ fontSize: '20px' }} />About Us
            </Link>
            <Link href="/" color="inherit" underline="hover" variant="body2" display="block">
              <KeyboardArrowRightIcon sx={{ fontSize: '20px' }} />Career
            </Link>
            <Link href="/agents" color="inherit" underline="hover" variant="body2" display="block">
              <KeyboardArrowRightIcon sx={{ fontSize: '20px' }} />Our Agents
            </Link>
            <Link href="/support" color="inherit" underline="hover" variant="body2" display="block">
              <KeyboardArrowRightIcon sx={{ fontSize: '20px' }} />Join Us
            </Link>
            <Link href="/blogs" color="inherit" underline="hover" variant="body2" display="block">
              <KeyboardArrowRightIcon sx={{ fontSize: '20px' }} />Blogs
            </Link>
          </Grid>

          <Grid item xs={12} md={2.5}>
            <Typography variant="h6" gutterBottom color='#ffffff' fontWeight='bold'>
              Group Of Companies
            </Typography>
            <Link href="#" color="inherit" underline="hover" variant="body2" display="block" sx={{ mt: 3 }}>
              <KeyboardArrowRightIcon sx={{ fontSize: '20px' }} />LIP Properties pvt ltd 
            </Link>
            <Link href="#" color="inherit" underline="hover" variant="body2" display="block">
              <KeyboardArrowRightIcon sx={{ fontSize: '20px' }} />Modern Tourism Network
            </Link>
            <Link href="#" color="inherit" underline="hover" variant="body2" display="block">
              <KeyboardArrowRightIcon sx={{ fontSize: '20px' }} />Addsbazar Classifieds Pvt Ltd
            </Link>
            <Link href="#" color="inherit" underline="hover" variant="body2" display="block">
              <KeyboardArrowRightIcon sx={{ fontSize: '20px' }} />Wise Global Realestate LLC Dubai
            </Link>
            <Link href="#" color="inherit" underline="hover" variant="body2" display="block">
              <KeyboardArrowRightIcon sx={{ fontSize: '20px' }} />Signmedia Infotech
            </Link>
          </Grid>
        </Grid>

        <Box
          sx={{
            borderTop: '1px solid #333',
            mt: 4,
            mb: 4,
            pt: 2,
            pb: 2,
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            borderBottom: '1px solid #333'
          }}
        >
          <Box>
            <Link href="#" color="inherit" underline="hover" sx={{ mr: 2 }}>
              Terms and Conditions
            </Link>
            <Link href="#" color="inherit" underline="hover">
              Privacy Policy
            </Link>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <IconButton
              color="inherit"
              sx={{
                border: '1px solid gray',
                borderRadius: '50%',
                padding: 1,
                '&:hover': {
                  backgroundColor: '#3b5998',
                  '& svg': {
                    color: 'white',
                  },
                },
              }}
            >
              <FaFacebookF sx={{ fontSize: '20px', color: '#3b5998' }} />
            </IconButton>

            
            <IconButton
              color="inherit"
              sx={{
                border: '1px solid gray',
                borderRadius: '50%',
                padding: 1,
                '&:hover': {
                  backgroundColor: '#e4405f',
                  '& svg': {
                    color: 'white',
                  },
                },
              }}
            >
              <FaInstagram sx={{ fontSize: '20px', color: '#e4405f' }} />
            </IconButton>

            <IconButton
              color="inherit"
              sx={{
                border: '1px solid gray',
                borderRadius: '50%',
                padding: 1,
                '&:hover': {
                  backgroundColor: '#0077b5',
                  '& svg': {
                    color: 'white',
                  },
                },
              }}
            >
              <FaYoutube sx={{ fontSize: '20px', color: '#0077b5' }} />
            </IconButton>

            <IconButton
              color="inherit"
              sx={{
                border: '1px solid gray',
                borderRadius: '50%',
                padding: 1,
                '&:hover': {
                  backgroundColor: '#0077b5',
                  '& svg': {
                    color: 'white',
                  },
                },
              }}
            >
              <FaLinkedinIn sx={{ fontSize: '20px', color: '#0077b5' }} />
            </IconButton>

            

          </Box>

        </Box>

        <Typography variant="body2" sx={{ textAlign: 'center', mt: 2 }}>
          Copyright © 2025 Property Store. All Rights Reserved. Developed by
        </Typography>
      </Box>
    </Grid>

  );
};

export default Footer1;
