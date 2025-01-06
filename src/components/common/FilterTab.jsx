import React, { useEffect, useRef } from "react";
import DropdownSelect from "./DropdownSelect";
import AdvanceSearch from "./AdvanceSearch";

export default function FilterTab({
  tabClass = "nav-tab-form style-1 justify-content-start",
  styleClass = "",
}) {
  const ddContainer = useRef();
  const advanceBtnRef = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside the dropdown and the button
      if (
        ddContainer.current &&
        !ddContainer.current.contains(event.target) &&
        advanceBtnRef.current &&
        !advanceBtnRef.current.contains(event.target)
      ) {
        ddContainer.current?.classList.remove("show");
      }
    };
    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="flat-tab flat-tab-form">
      <ul className={tabClass} role="tablist">
        <li className="nav-tab-item" role="presentation">
          <a href="#" className="custom-home-icon">
            <div className="icon-box">
              <svg
                color="#000000"
                width={41}
                height={41}
                viewBox="0 0 41 41"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_13442_15603)">
                  <path
                    d="M17.1315 9.2395H11.2041C10.6654 9.2395 10.2275 9.67747 10.2275 10.2161V19.8984C10.2275 20.4367 10.6654 20.875 11.2041 20.875H17.1314C17.6701 20.875 18.108 20.4367 18.108 19.8984V10.2161C18.108 9.67747 17.6702 9.2395 17.1315 9.2395ZM13.5817 19.7031H11.3994V17.3068H13.5817V19.7031ZM13.5817 16.135H11.3994V13.9792H13.5817V16.135ZM13.5817 12.8073H11.3994V10.4114H13.5817V12.8073ZM16.9362 19.7031H14.7536V17.3068H16.9362V19.7031ZM16.9362 16.135H14.7536V13.9792H16.9362V16.135ZM16.9362 12.8073H14.7536V10.4114H16.9362V12.8073ZM24.9901 32.6325C24.8347 32.6325 24.6857 32.6942 24.5758 32.8041C24.4659 32.914 24.4042 33.063 24.4042 33.2184V34.6253C24.4042 34.7807 24.4659 34.9297 24.5758 35.0396C24.6857 35.1495 24.8347 35.2112 24.9901 35.2112C25.1455 35.2112 25.2946 35.1495 25.4044 35.0396C25.5143 34.9297 25.5761 34.7807 25.5761 34.6253V33.2184C25.5761 33.063 25.5143 32.914 25.4044 32.8041C25.2946 32.6942 25.1455 32.6325 24.9901 32.6325Z"
                    fill="#A3ABB0"
                  />
                  <path
                    d="M40.4946 26.7152C40.4682 26.5107 40.3616 26.3251 40.1983 26.1991L27.7846 16.5944C27.5127 16.3827 27.1777 16.2682 26.8331 16.2691C26.4855 16.2691 26.1565 16.3816 25.881 16.5947L24.0035 18.0473V16.3645C24.0035 16.0408 23.7414 15.7786 23.4176 15.7786C23.0939 15.7786 22.8317 16.0408 22.8317 16.3645V18.954L13.4682 26.1988C13.3047 26.3258 13.198 26.5123 13.1714 26.7176C13.1581 26.819 13.1649 26.9221 13.1916 27.0209C13.2182 27.1197 13.2641 27.2122 13.3267 27.2932L14.2767 28.5289C14.3494 28.6238 14.443 28.7005 14.5502 28.7532C14.6575 28.806 14.7754 28.8332 14.8949 28.8328C15.0664 28.8328 15.2358 28.7752 15.3719 28.6698L26.8331 19.802L35.4961 26.5049V38.7133H30.7769V37.6146C30.7769 37.2909 30.5147 37.0287 30.191 37.0287C29.8672 37.0287 29.605 37.2909 29.605 37.6146V38.7133H24.0603V29.7367H29.605V34.8606C29.605 35.1845 29.8671 35.4466 30.191 35.4466C30.5148 35.4466 30.7769 35.1845 30.7769 34.8606V29.5414C30.7769 29.0031 30.3386 28.5648 29.8003 28.5648H23.8653C23.3267 28.5648 22.8884 29.0031 22.8884 29.5414V38.7133H18.4359V37.1151C18.4359 36.5764 17.998 36.1385 17.4593 36.1385H16.8984C16.9451 35.9053 16.9704 35.6645 16.9704 35.418C16.9704 33.3901 15.3204 31.7403 13.2924 31.7403C12.1917 31.7403 11.1617 32.2454 10.4729 33.0645C10.206 32.9801 9.92771 32.9371 9.64776 32.9372C9.43659 32.9372 9.22901 32.9607 9.02729 33.0077C8.38917 31.9145 7.19839 31.2114 5.9112 31.2114C5.77417 31.2114 5.63862 31.22 5.50495 31.2356V11.6217L14.1683 4.91828L22.832 11.6217V13.6298C22.832 13.9536 23.0941 14.2157 23.4179 14.2157C23.5733 14.2157 23.7224 14.154 23.8322 14.0441C23.9421 13.9342 24.0039 13.7852 24.0039 13.6298V12.5284L25.6298 13.7863C25.7664 13.8918 25.934 13.9491 26.1065 13.9493C26.2261 13.9498 26.3442 13.9225 26.4516 13.8697C26.5589 13.8168 26.6525 13.7399 26.7251 13.6448L26.7315 13.6362L27.6415 12.407L27.6473 12.3996C27.7074 12.3243 27.8671 12.1244 27.8298 11.8316C27.8168 11.7303 27.784 11.6326 27.7331 11.5441C27.6823 11.4555 27.6144 11.3779 27.5335 11.3156L15.1202 1.71094C14.8449 1.4982 14.5159 1.38563 14.1683 1.38563C13.8207 1.38563 13.4917 1.4982 13.2162 1.71125L9.80792 4.34828V3.60977C10.2687 3.53164 10.6209 3.13063 10.6209 2.64812V1.47656C10.6209 0.937891 10.1826 0.5 9.64432 0.5H4.8962C4.35784 0.5 3.91964 0.937891 3.91964 1.47656V2.64781C3.91964 3.13063 4.27174 3.53133 4.7326 3.60977V8.27523L0.804401 11.3148C0.640544 11.4415 0.533522 11.6279 0.506744 11.8333C0.493267 11.9348 0.500032 12.038 0.526649 12.1369C0.553266 12.2358 0.599208 12.3284 0.661822 12.4095L1.61182 13.6452C1.68442 13.7402 1.77802 13.8171 1.8853 13.8698C1.99258 13.9226 2.11062 13.9498 2.23018 13.9494C2.40167 13.9494 2.57073 13.8917 2.70745 13.7864L4.33307 12.5285V31.5801C3.40292 32.0378 2.68667 32.8862 2.42057 33.921C1.53706 34.2616 0.930104 35.1198 0.930104 36.0939C0.930104 36.2013 0.93776 36.3069 0.951744 36.4106C0.765885 36.5886 0.649947 36.8382 0.649947 37.115V38.9087C0.649947 39.4471 1.08784 39.8853 1.62651 39.8853H38.3664C38.5218 39.8853 38.6708 39.8236 38.7807 39.7137C38.8906 39.6038 38.9523 39.4548 38.9523 39.2994C38.9523 38.9756 38.6901 38.7134 38.3664 38.7134H36.668V27.4117L38.2943 28.6699C38.4309 28.7752 38.5985 28.8325 38.771 28.8329C38.8906 28.8334 39.0088 28.8061 39.1161 28.7532C39.2234 28.7003 39.317 28.6232 39.3896 28.528L39.396 28.5198L40.3064 27.2902L40.3124 27.2826C40.3722 27.2076 40.5315 27.0076 40.4946 26.7153V26.7152ZM13.2924 32.9121C14.6743 32.9121 15.7985 34.0363 15.7985 35.4179C15.7985 35.6684 15.7607 35.9102 15.6921 36.1384H12.3498C12.3751 35.9895 12.3892 35.8363 12.3892 35.6801C12.3892 34.8851 12.0489 34.1685 11.5071 33.6668C11.9704 33.1965 12.6113 32.9121 13.2924 32.9121ZM5.09151 1.67188H9.44909V2.4525H5.09151V1.67188ZM8.63604 3.62438V5.25492L5.90456 7.36859V3.62438H8.63604ZM2.30135 12.6191L1.82862 12.0042L13.9329 2.63805C14.0022 2.58469 14.0813 2.5575 14.1682 2.5575C14.2552 2.5575 14.3342 2.58469 14.4032 2.63773L26.4912 11.9911L26.0298 12.6145L14.5269 3.71414C14.4242 3.63475 14.2981 3.59168 14.1683 3.59168C14.0385 3.59168 13.9124 3.63475 13.8097 3.71414L2.30135 12.6191ZM17.2641 38.7135H1.82182V37.3103H7.21917C7.37457 37.3103 7.5236 37.2486 7.63349 37.1387C7.74337 37.0288 7.8051 36.8798 7.8051 36.7244C7.8051 36.569 7.74337 36.4199 7.63349 36.3101C7.5236 36.2002 7.37457 36.1384 7.21917 36.1384H2.10354C2.10292 36.1234 2.10198 36.1088 2.10198 36.0939C2.10198 35.5412 2.49471 35.0636 3.03635 34.9586C3.15588 34.9354 3.26522 34.8756 3.34919 34.7874C3.43315 34.6993 3.48756 34.5872 3.50487 34.4666C3.67573 33.2792 4.71034 32.3835 5.91112 32.3835C6.90846 32.3835 7.82034 33.0095 8.18018 33.9409C8.20915 34.016 8.25332 34.0844 8.30991 34.1418C8.3665 34.1991 8.4343 34.2442 8.50909 34.2741C8.58395 34.304 8.66416 34.3181 8.74472 34.3156C8.82528 34.313 8.90445 34.2939 8.97729 34.2595C9.18683 34.1601 9.41588 34.1089 9.64776 34.1093C10.5132 34.1093 11.2173 34.814 11.2173 35.6804C11.2173 35.84 11.1923 35.9934 11.1478 36.1384H10.0317C9.87627 36.1384 9.72723 36.2002 9.61735 36.3101C9.50746 36.4199 9.44573 36.569 9.44573 36.7244C9.44573 37.0481 9.70784 37.3103 10.0317 37.3103H17.264L17.2641 38.7135ZM38.6948 27.498L27.1917 18.5978C27.089 18.5183 26.9629 18.4751 26.8331 18.4751C26.7032 18.4751 26.5771 18.5183 26.4745 18.5978L14.9657 27.5025L14.4931 26.8877L26.5978 17.5218C26.6647 17.4689 26.7477 17.4404 26.8331 17.4409C26.9198 17.4409 26.9991 17.468 27.0681 17.5215L39.1561 26.8745L38.6948 27.498Z"
                    fill="#A3ABB0"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_13442_15603">
                    <rect
                      width={40}
                      height={40}
                      fill="white"
                      transform="translate(0.5 0.5)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <p className="content text-center fw-7">Residential Properties</p>
          </a>
        </li>
        <li className="nav-tab-item" role="presentation">
          <a href="#" className="custom-home-icon">
            <div className="icon-box">
              <svg
                width={41}
                height={41}
                viewBox="0 0 41 41"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_13442_15596)">
                  <path
                    d="M30.5344 14.4126V14.4426L30.5607 14.4567L40.5543 19.8132C40.5545 19.8133 40.5547 19.8135 40.5549 19.8136C40.5833 19.8298 40.6105 19.8427 40.6342 19.8541C40.641 19.8573 40.6476 19.8605 40.6539 19.8635C40.6827 19.8776 40.7053 19.89 40.7252 19.9063C40.7627 19.9372 40.7985 19.9888 40.8291 20.1151C40.8911 20.372 40.9238 20.9027 40.9389 22.0792C40.9554 23.372 40.9507 25.4369 40.9431 28.7595C40.9369 31.4727 40.9289 35.0245 40.9289 39.6793C40.9289 39.9078 40.8529 40.0943 40.7236 40.2236C40.5943 40.3529 40.4078 40.4289 40.1793 40.4289H1.79958C1.57107 40.4289 1.38453 40.3529 1.25524 40.2236C1.12595 40.0943 1.05 39.9078 1.05 39.6793V12.4937C1.05 12.2651 1.12595 12.0786 1.25524 11.9493C1.38453 11.82 1.57107 11.7441 1.79958 11.7441H11.3945H11.4445V11.6941V5.29746C11.4445 5.06895 11.5205 4.88241 11.6497 4.75312C11.779 4.62384 11.9656 4.54789 12.1941 4.54789H12.9937H13.0437V4.49789V1.29958C13.0437 1.07107 13.1196 0.884526 13.2489 0.755239C13.3782 0.625952 13.5647 0.55 13.7932 0.55H28.1856C28.4141 0.55 28.6007 0.625952 28.73 0.755239C28.8592 0.884526 28.9352 1.07107 28.9352 1.29958V4.49789V4.54789H28.9852H29.7848C30.0133 4.54789 30.1998 4.62384 30.3291 4.75312C30.4584 4.88241 30.5344 5.06895 30.5344 5.29746V14.4126ZM14.5928 2.04915H14.5428V2.09915V4.49789V4.54789H14.5928H27.386H27.436V4.49789V2.09915V2.04915H27.386H14.5928ZM11.3945 33.3327H11.4445V33.2827V31.6835V31.6335H11.3945H5.79746H5.74746V31.6835V33.2827V33.3327H5.79746H11.3945ZM11.3945 26.1365H11.4445V26.0865V24.4873V24.4373H11.3945H5.79746H5.74746V24.4873V26.0865V26.1365H5.79746H11.3945ZM11.3945 18.9403H11.4445V18.8903V17.2911V17.2411H11.3945H5.79746H5.74746V17.2911V18.8903V18.9403H5.79746H11.3945ZM2.59915 13.2432H2.54915V13.2932V38.8797V38.9297H2.59915H11.3945H11.4445V38.8797V34.8818V34.8318H11.3945H4.99789C4.76937 34.8318 4.58283 34.7559 4.45355 34.6266C4.32426 34.4973 4.24831 34.3107 4.24831 34.0822V30.8839C4.24831 30.6554 4.32426 30.4689 4.45355 30.3396C4.58283 30.2103 4.76937 30.1344 4.99789 30.1344H11.3945H11.4445V30.0844V27.6856V27.6356H11.3945H4.99789C4.76937 27.6356 4.58283 27.5597 4.45355 27.4304C4.32426 27.3011 4.24831 27.1146 4.24831 26.886V23.6877C4.24831 23.4592 4.32426 23.2727 4.45355 23.1434C4.58283 23.0141 4.76937 22.9382 4.99789 22.9382H11.3945H11.4445V22.8882V20.4894V20.4394H11.3945H4.99789C4.76937 20.4394 4.58283 20.3635 4.45355 20.2342C4.32426 20.1049 4.24831 19.9184 4.24831 19.6898V16.4915C4.24831 16.263 4.32426 16.0765 4.45355 15.9472C4.58283 15.8179 4.76937 15.742 4.99789 15.742H11.3945H11.4445V15.692V13.2932V13.2432H11.3945H2.59915ZM12.9937 6.04704H12.9437V6.09704V38.8797V38.9297H12.9937H15.3924H15.4424V38.8797V30.8839C15.4424 30.6554 15.5183 30.4689 15.6476 30.3396C15.7769 30.2103 15.9635 30.1344 16.192 30.1344H25.7869C26.0154 30.1344 26.2019 30.2103 26.3312 30.3396C26.4605 30.4689 26.5365 30.6554 26.5365 30.8839V38.8797V38.9297H26.5865H28.9852H29.0352V38.8797V6.09704V6.04704H28.9852H12.9937ZM16.9415 38.8797V38.9297H16.9915H24.9873H25.0373V38.8797V31.6835V31.6335H24.9873H16.9915H16.9415V31.6835V38.8797ZM39.3797 38.9297H39.4297V38.8797V20.9692V20.9393L39.4033 20.9251L30.608 16.2076L30.5344 16.1681V16.2517V38.8797V38.9297H30.5844H39.3797Z"
                    fill="#A3ABB0"
                    stroke="white"
                    strokeWidth="0.1"
                  />
                  <path
                    d="M16.9917 10.045H16.9417V10.095V11.6942V11.7442H16.9917H18.5909H18.6409V11.6942V10.095V10.045H18.5909H16.9917ZM23.3883 10.045H23.3383V10.095V11.6942V11.7442H23.3883H24.9875H25.0375V11.6942V10.095V10.045H24.9875H23.3883ZM16.9917 17.2412H16.9417V17.2912V18.8904V18.9404H16.9917H18.5909H18.6409V18.8904V17.2912V17.2412H18.5909H16.9917ZM23.3883 17.2412H23.3383V17.2912V18.8904V18.9404H23.3883H24.9875H25.0375V18.8904V17.2912V17.2412H24.9875H23.3883ZM16.9917 24.4374H16.9417V24.4874V26.0865V26.1365H16.9917H18.5909H18.6409V26.0865V24.4874V24.4374H18.5909H16.9917ZM23.3883 24.4374H23.3383V24.4874V26.0865V26.1365H23.3883H24.9875H25.0375V26.0865V24.4874V24.4374H24.9875H23.3883ZM33.7829 24.4374H33.7329V24.4874V26.0865V26.1365H33.7829H35.382H35.432V26.0865V24.4874V24.4374H35.382H33.7829ZM33.7829 31.6336H33.7329V31.6836V33.2827V33.3327H33.7829H35.382H35.432V33.2827V31.6836V31.6336H35.382H33.7829ZM19.3905 13.2433H16.1922C15.9636 13.2433 15.7771 13.1674 15.6478 13.0381C15.5185 12.9088 15.4426 12.7222 15.4426 12.4937V9.29543C15.4426 9.06692 15.5185 8.88038 15.6478 8.75109C15.7771 8.6218 15.9636 8.54585 16.1922 8.54585H19.3905C19.619 8.54585 19.8055 8.6218 19.9348 8.75109C20.0641 8.88038 20.14 9.06692 20.14 9.29543V12.4937C20.14 12.7222 20.0641 12.9088 19.9348 13.0381C19.8055 13.1674 19.619 13.2433 19.3905 13.2433ZM25.7871 13.2433H22.5888C22.3603 13.2433 22.1737 13.1674 22.0444 13.0381C21.9151 12.9088 21.8392 12.7222 21.8392 12.4937V9.29543C21.8392 9.06692 21.9151 8.88038 22.0444 8.75109C22.1737 8.6218 22.3603 8.54585 22.5888 8.54585H25.7871C26.0156 8.54585 26.2021 8.6218 26.3314 8.75109C26.4607 8.88038 26.5367 9.06692 26.5367 9.29543V12.4937C26.5367 12.7222 26.4607 12.9088 26.3314 13.0381C26.2021 13.1674 26.0156 13.2433 25.7871 13.2433ZM19.3905 20.4395H16.1922C15.9636 20.4395 15.7771 20.3636 15.6478 20.2343C15.5185 20.105 15.4426 19.9184 15.4426 19.6899V16.4916C15.4426 16.2631 15.5185 16.0766 15.6478 15.9473C15.7771 15.818 15.9636 15.742 16.1922 15.742H19.3905C19.619 15.742 19.8055 15.818 19.9348 15.9473C20.0641 16.0766 20.14 16.2631 20.14 16.4916V19.6899C20.14 19.9184 20.0641 20.105 19.9348 20.2343C19.8055 20.3636 19.619 20.4395 19.3905 20.4395ZM25.7871 20.4395H22.5888C22.3603 20.4395 22.1737 20.3636 22.0444 20.2343C21.9151 20.105 21.8392 19.9184 21.8392 19.6899V16.4916C21.8392 16.2631 21.9151 16.0766 22.0444 15.9473C22.1737 15.818 22.3603 15.742 22.5888 15.742H25.7871C26.0156 15.742 26.2021 15.818 26.3314 15.9473C26.4607 16.0766 26.5367 16.2631 26.5367 16.4916V19.6899C26.5367 19.9184 26.4607 20.105 26.3314 20.2343C26.2021 20.3636 26.0156 20.4395 25.7871 20.4395ZM19.3905 27.6357H16.1922C15.9636 27.6357 15.7771 27.5597 15.6478 27.4305C15.5185 27.3012 15.4426 27.1146 15.4426 26.8861V23.6878C15.4426 23.4593 15.5185 23.2728 15.6478 23.1435C15.7771 23.0142 15.9636 22.9382 16.1922 22.9382H19.3905C19.619 22.9382 19.8055 23.0142 19.9348 23.1435C20.0641 23.2728 20.14 23.4593 20.14 23.6878V26.8861C20.14 27.1146 20.0641 27.3012 19.9348 27.4305C19.8055 27.5597 19.619 27.6357 19.3905 27.6357ZM25.7871 27.6357H22.5888C22.3603 27.6357 22.1737 27.5597 22.0444 27.4305C21.9151 27.3012 21.8392 27.1146 21.8392 26.8861V23.6878C21.8392 23.4593 21.9151 23.2728 22.0444 23.1435C22.1737 23.0142 22.3603 22.9382 22.5888 22.9382H25.7871C26.0156 22.9382 26.2021 23.0142 26.3314 23.1435C26.4607 23.2728 26.5367 23.4593 26.5367 23.6878V26.8861C26.5367 27.1146 26.4607 27.3012 26.3314 27.4305C26.2021 27.5597 26.0156 27.6357 25.7871 27.6357ZM36.1816 27.6357H32.9833C32.7548 27.6357 32.5682 27.5597 32.4389 27.4305C32.3096 27.3012 32.2337 27.1146 32.2337 26.8861V23.6878C32.2337 23.4593 32.3096 23.2728 32.4389 23.1435C32.5682 23.0142 32.7548 22.9382 32.9833 22.9382H36.1816C36.4101 22.9382 36.5966 23.0142 36.7259 23.1435C36.8552 23.2728 36.9312 23.4593 36.9312 23.6878V26.8861C36.9312 27.1146 36.8552 27.3012 36.7259 27.4305C36.5966 27.5597 36.4101 27.6357 36.1816 27.6357ZM36.1816 34.8319H32.9833C32.7548 34.8319 32.5682 34.7559 32.4389 34.6267C32.3096 34.4974 32.2337 34.3108 32.2337 34.0823V30.884C32.2337 30.6555 32.3096 30.469 32.4389 30.3397C32.5682 30.2104 32.7548 30.1344 32.9833 30.1344H36.1816C36.4101 30.1344 36.5966 30.2104 36.7259 30.3397C36.8552 30.469 36.9312 30.6555 36.9312 30.884V34.0823C36.9312 34.3108 36.8552 34.4974 36.7259 34.6267C36.5966 34.7559 36.4101 34.8319 36.1816 34.8319Z"
                    fill="#A3ABB0"
                    stroke="white"
                    strokeWidth="0.1"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_13442_15596">
                    <rect
                      width={40}
                      height={40}
                      fill="white"
                      transform="translate(0.5 0.5)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <p className="content text-center fw-7">Commercial Properties</p>
          </a>
        </li>
        <li className="nav-tab-item" role="presentation">
          <a href="#" className="custom-home-icon">
            <div className="icon-box">
              <svg
                width={41}
                height={41}
                viewBox="0 0 41 41"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_13442_15617)">
                  <path
                    d="M7.65002 17.1166H6.38331V15.5499H9.94573L5.22309 28.7833H0.55V27.2166H4.07501H4.11024L4.12209 27.1835L7.6971 17.1835L7.721 17.1166H7.65002ZM12.3654 15.5499H15.45V17.1166H13.675H13.6346L13.6261 17.1562L11.4845 27.1562L11.4715 27.2166H11.5333H29.4667H29.5285L29.5155 27.1562L27.3738 17.1562L27.3654 17.1166H27.3249H25.5499V15.5499H28.6345L31.4715 28.7833H9.52855L12.3654 15.5499ZM35.7769 28.7833L31.0543 15.5499H34.6166V17.1166H33.35H33.279L33.3029 17.1835L36.8779 27.1835L36.8898 27.2166H36.925H40.45V28.7833H35.7769ZM0.55 38.8832H40.45V40.4499H0.55V38.8832ZM1.38332 33.0499H3.78335V34.6166H1.38332V33.0499ZM6.38331 33.0499H8.78334V34.6166H6.38331V33.0499ZM11.3833 33.0499H13.7833V34.6166H11.3833V33.0499ZM16.3833 33.0499H18.7833V34.6166H16.3833V33.0499ZM21.3834 33.0499H23.7834V34.6166H21.3834V33.0499ZM26.3833 33.0499H28.7834V34.6166H26.3833V33.0499ZM31.3833 33.0499H33.7834V34.6166H31.3833V33.0499ZM36.3833 33.0499H38.7834V34.6166H36.3833V33.0499ZM28.05 11.3833H32.95V12.9499H28.05V11.3833ZM8.05003 11.3833H12.95V12.9499H8.05003V11.3833Z"
                    fill="#A3ABB0"
                    stroke="white"
                    strokeWidth="0.1"
                  />
                  <path
                    d="M20.4595 17.4964L20.4996 17.5505L20.5398 17.4964C21.2821 16.4955 22.5336 14.7227 23.5997 12.7813C24.6646 10.8422 25.5496 8.72618 25.5496 7.04164C25.5496 4.32122 23.2844 2.11664 20.4996 2.11664C17.7149 2.11664 15.4496 4.32114 15.4496 7.04164C15.4496 8.72622 16.3347 10.8422 17.3996 12.7813C18.4657 14.7227 19.7172 16.4955 20.4595 17.4964ZM21.1107 19.327L20.4996 20.0791L19.889 19.3275C19.8889 19.3274 19.8888 19.3273 19.8888 19.3272C19.8836 19.3206 19.876 19.311 19.8661 19.2984C19.6399 19.0121 18.2029 17.1922 16.7935 14.8585C16.0574 13.6396 15.3294 12.2814 14.7855 10.9291C14.2414 9.57625 13.883 8.23253 13.883 7.04164C13.883 3.46185 16.8514 0.55 20.4996 0.55C24.1479 0.55 27.1163 3.46185 27.1163 7.04164C27.1163 8.23462 26.7578 9.57991 26.2137 10.9338C25.6699 12.2871 24.9419 13.6458 24.2058 14.8647C22.7339 17.3019 21.2318 19.1766 21.1108 19.3268C21.1108 19.3269 21.1107 19.3269 21.1107 19.327Z"
                    fill="#A3ABB0"
                    stroke="white"
                    strokeWidth="0.1"
                  />
                  <path
                    d="M19.6167 7.16654C19.6167 6.68058 20.0141 6.28322 20.5 6.28322C20.986 6.28322 21.3834 6.68065 21.3834 7.16654H19.6167ZM19.6167 7.16654C19.6167 7.6525 20.0141 8.04986 20.5 8.04986M19.6167 7.16654L20.5 8.04986M20.5 8.04986C20.986 8.04986 21.3833 7.65251 21.3834 7.16655L20.5 8.04986ZM20.5 9.61658C19.1527 9.61658 18.05 8.51397 18.05 7.16654C18.05 5.81911 19.1526 4.7165 20.5 4.7165C21.8475 4.7165 22.9501 5.81911 22.9501 7.16654C22.9501 8.51397 21.8475 9.61658 20.5 9.61658Z"
                    fill="#A3ABB0"
                    stroke="white"
                    strokeWidth="0.1"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_13442_15617">
                    <rect
                      width={40}
                      height={40}
                      fill="white"
                      transform="translate(0.5 0.5)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <p className="content text-center fw-7">Land & Plots</p>
          </a>
        </li>
        <li className="nav-tab-item" role="presentation">
          <a href="#" className="custom-home-icon">
            <div className="icon-box">
              <svg
                width={41}
                height={41}
                viewBox="0 0 41 41"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.6933 8.11508H25.3068C25.4518 8.11508 25.5909 8.05746 25.6935 7.9549C25.7961 7.85234 25.8537 7.71324 25.8537 7.5682V4.49414C25.8537 4.3491 25.7961 4.21 25.6935 4.10744C25.5909 4.00488 25.4518 3.94727 25.3068 3.94727H15.6933C15.5482 3.94727 15.4091 4.00488 15.3066 4.10744C15.204 4.21 15.1464 4.3491 15.1464 4.49414V7.5682C15.1464 7.71324 15.204 7.85234 15.3066 7.9549C15.4091 8.05746 15.5482 8.11508 15.6933 8.11508ZM16.2402 5.04102H24.7599V7.02133H16.2402V5.04102ZM15.6933 14.1495H25.3068C25.4518 14.1495 25.5909 14.0918 25.6935 13.9893C25.7961 13.8867 25.8537 13.7476 25.8537 13.6026V10.5286C25.8537 10.3836 25.7961 10.2445 25.6935 10.1419C25.5909 10.0393 25.4518 9.98172 25.3068 9.98172H15.6933C15.5482 9.98172 15.4091 10.0393 15.3066 10.1419C15.204 10.2445 15.1464 10.3836 15.1464 10.5286V13.6026C15.1464 13.7476 15.204 13.8867 15.3066 13.9893C15.4091 14.0918 15.5482 14.1495 15.6933 14.1495ZM16.2402 11.0755H24.7599V13.0557H16.2402V11.0755ZM15.6933 20.1839H25.3068C25.4518 20.1839 25.5909 20.1263 25.6935 20.0237C25.7961 19.9212 25.8537 19.7821 25.8537 19.637V16.563C25.8537 16.4179 25.7961 16.2788 25.6935 16.1763C25.5909 16.0737 25.4518 16.0161 25.3068 16.0161H15.6933C15.5482 16.0161 15.4091 16.0737 15.3066 16.1763C15.204 16.2788 15.1464 16.4179 15.1464 16.563V19.637C15.1464 19.7821 15.204 19.9212 15.3066 20.0237C15.4091 20.1263 15.5482 20.1839 15.6933 20.1839ZM16.2402 17.1098H24.7599V19.0902H16.2402V17.1098ZM15.6933 26.2184H25.3068C25.4518 26.2184 25.5909 26.1607 25.6935 26.0582C25.7961 25.9556 25.8537 25.8165 25.8537 25.6715V22.5975C25.8537 22.4525 25.7961 22.3134 25.6935 22.2108C25.5909 22.1082 25.4518 22.0506 25.3068 22.0506H15.6933C15.5482 22.0506 15.4091 22.1082 15.3066 22.2108C15.204 22.3134 15.1464 22.4525 15.1464 22.5975V25.6715C15.1464 25.8165 15.204 25.9556 15.3066 26.0582C15.4091 26.1607 15.5482 26.2184 15.6933 26.2184ZM16.2402 23.1445H24.7599V25.1247H16.2402V23.1445ZM39.25 38.7031H37.4531V7.5682C37.4531 7.42316 37.3955 7.28406 37.2929 7.1815C37.1904 7.07895 37.0513 7.02133 36.9062 7.02133H28.4273V1.75C28.4273 1.60496 28.3697 1.46586 28.2672 1.3633C28.1646 1.26074 28.0255 1.20312 27.8805 1.20312H13.1195C12.9745 1.20312 12.8354 1.26074 12.7328 1.3633C12.6303 1.46586 12.5727 1.60496 12.5727 1.75V7.02133H4.09375C3.94871 7.02133 3.80961 7.07895 3.70705 7.1815C3.60449 7.28406 3.54688 7.42316 3.54688 7.5682V38.7031H1.75C1.60496 38.7031 1.46586 38.7607 1.3633 38.8633C1.26074 38.9659 1.20313 39.105 1.20312 39.25C1.20313 39.395 1.26074 39.5341 1.3633 39.6367C1.46586 39.7393 1.60496 39.7969 1.75 39.7969H39.25C39.395 39.7969 39.5341 39.7393 39.6367 39.6367C39.7393 39.5341 39.7969 39.395 39.7969 39.25C39.7969 39.105 39.7393 38.9659 39.6367 38.8633C39.5341 38.7607 39.395 38.7031 39.25 38.7031ZM36.3594 8.11508V38.7031H28.4273V8.11508H36.3594ZM27.3336 2.29688V38.7031H25.8536V30.2392C25.8536 30.0942 25.796 29.9551 25.6934 29.8525C25.5909 29.75 25.4518 29.6923 25.3067 29.6923H15.6933C15.5482 29.6923 15.4091 29.75 15.3066 29.8525C15.204 29.9551 15.1464 30.0942 15.1464 30.2392V38.7031H13.6664V2.29688H27.3336ZM21.0469 30.7861H24.7598V38.7031H21.0469V30.7861ZM19.9531 38.7031H16.2402V30.7861H19.9531V38.7031ZM4.64062 8.11508H12.5727V38.7031H4.64062V8.11508ZM30.8773 14.1495H33.9095C34.0545 14.1495 34.1936 14.0918 34.2962 13.9893C34.3987 13.8867 34.4563 13.7476 34.4563 13.6026V10.5705C34.4563 10.4255 34.3987 10.2864 34.2962 10.1838C34.1936 10.0813 34.0545 10.0237 33.9095 10.0237H30.8773C30.7323 10.0237 30.5932 10.0813 30.4906 10.1838C30.3881 10.2864 30.3305 10.4255 30.3305 10.5705V13.6026C30.3305 13.7476 30.3881 13.8867 30.4906 13.9893C30.5932 14.0918 30.7323 14.1495 30.8773 14.1495ZM31.4242 11.1174H33.3626V13.0557H31.4242V11.1174ZM30.8773 19.8472H33.9095C34.0545 19.8472 34.1936 19.7896 34.2962 19.687C34.3987 19.5845 34.4563 19.4454 34.4563 19.3003V16.2682C34.4563 16.1232 34.3987 15.9841 34.2962 15.8815C34.1936 15.7789 34.0545 15.7213 33.9095 15.7213H30.8773C30.7323 15.7213 30.5932 15.7789 30.4906 15.8815C30.3881 15.9841 30.3305 16.1232 30.3305 16.2682V19.3003C30.3305 19.4454 30.3881 19.5845 30.4906 19.687C30.5932 19.7896 30.7323 19.8472 30.8773 19.8472ZM31.4242 16.8151H33.3626V18.7534H31.4242V16.8151ZM30.8773 25.5448H33.9095C34.0545 25.5448 34.1936 25.4871 34.2962 25.3846C34.3987 25.282 34.4563 25.1429 34.4563 24.9979V21.9658C34.4563 21.8207 34.3987 21.6816 34.2962 21.5791C34.1936 21.4765 34.0545 21.4189 33.9095 21.4189H30.8773C30.7323 21.4189 30.5932 21.4765 30.4906 21.5791C30.3881 21.6816 30.3305 21.8207 30.3305 21.9658V24.9979C30.3305 25.1429 30.3881 25.282 30.4906 25.3846C30.5932 25.4871 30.7323 25.5448 30.8773 25.5448ZM31.4242 22.5127H33.3626V24.4511H31.4242V22.5127ZM30.8773 31.2424H33.9095C34.0545 31.2424 34.1936 31.1848 34.2962 31.0822C34.3987 30.9797 34.4563 30.8406 34.4563 30.6955V27.6635C34.4563 27.5185 34.3987 27.3794 34.2962 27.2768C34.1936 27.1743 34.0545 27.1166 33.9095 27.1166H30.8773C30.7323 27.1166 30.5932 27.1743 30.4906 27.2768C30.3881 27.3794 30.3305 27.5185 30.3305 27.6635V30.6955C30.3305 30.8406 30.3881 30.9797 30.4906 31.0822C30.5932 31.1848 30.7323 31.2424 30.8773 31.2424ZM31.4242 28.2104H33.3626V30.1487H31.4242V28.2104ZM30.8773 36.9402H33.9095C34.0545 36.9402 34.1936 36.8826 34.2962 36.7801C34.3987 36.6775 34.4563 36.5384 34.4563 36.3934V33.3612C34.4563 33.2162 34.3987 33.0771 34.2962 32.9746C34.1936 32.872 34.0545 32.8144 33.9095 32.8144H30.8773C30.7323 32.8144 30.5932 32.872 30.4906 32.9746C30.3881 33.0771 30.3305 33.2162 30.3305 33.3612V36.3934C30.3305 36.5384 30.3881 36.6775 30.4906 36.7801C30.5932 36.8826 30.7323 36.9402 30.8773 36.9402ZM31.4242 33.9081H33.3626V35.8465H31.4242V33.9081ZM10.1227 10.0237H7.09062C6.94558 10.0237 6.80649 10.0813 6.70393 10.1838C6.60137 10.2864 6.54375 10.4255 6.54375 10.5705V13.6026C6.54375 13.7476 6.60137 13.8867 6.70393 13.9893C6.80649 14.0918 6.94558 14.1495 7.09062 14.1495H10.1227C10.1945 14.1495 10.2656 14.1353 10.3319 14.1078C10.3983 14.0803 10.4586 14.0401 10.5094 13.9893C10.5601 13.9385 10.6004 13.8782 10.6279 13.8119C10.6554 13.7455 10.6695 13.6744 10.6695 13.6026V10.5705C10.6695 10.4255 10.6119 10.2864 10.5094 10.1838C10.4068 10.0813 10.2677 10.0237 10.1227 10.0237ZM9.57578 13.0557H7.6375V11.1174H9.57578V13.0557ZM10.1227 15.7213H7.09062C6.94558 15.7213 6.80649 15.7789 6.70393 15.8815C6.60137 15.9841 6.54375 16.1232 6.54375 16.2682V19.3003C6.54375 19.4454 6.60137 19.5845 6.70393 19.687C6.80649 19.7896 6.94558 19.8472 7.09062 19.8472H10.1227C10.1945 19.8472 10.2656 19.833 10.3319 19.8056C10.3983 19.7781 10.4586 19.7378 10.5094 19.687C10.5601 19.6362 10.6004 19.5759 10.6279 19.5096C10.6554 19.4432 10.6695 19.3721 10.6695 19.3003V16.2682C10.6695 16.1232 10.6119 15.9841 10.5094 15.8815C10.4068 15.7789 10.2677 15.7213 10.1227 15.7213ZM9.57578 18.7534H7.6375V16.8151H9.57578V18.7534ZM10.1227 21.419H7.09062C6.94558 21.419 6.80649 21.4766 6.70393 21.5792C6.60137 21.6817 6.54375 21.8208 6.54375 21.9659V24.998C6.54375 25.143 6.60137 25.2821 6.70393 25.3847C6.80649 25.4872 6.94558 25.5448 7.09062 25.5448H10.1227C10.1945 25.5448 10.2656 25.5307 10.3319 25.5032C10.3983 25.4757 10.4586 25.4354 10.5094 25.3847C10.5601 25.3339 10.6004 25.2736 10.6279 25.2072C10.6554 25.1409 10.6695 25.0698 10.6695 24.998V21.9659C10.6695 21.8208 10.6119 21.6817 10.5094 21.5792C10.4068 21.4766 10.2677 21.419 10.1227 21.419ZM9.57578 24.451H7.6375V22.5127H9.57578V24.451ZM10.1227 27.1166H7.09062C6.94558 27.1166 6.80649 27.1743 6.70393 27.2768C6.60137 27.3794 6.54375 27.5185 6.54375 27.6635V30.6955C6.54375 30.8406 6.60137 30.9797 6.70393 31.0822C6.80649 31.1848 6.94558 31.2424 7.09062 31.2424H10.1227C10.1945 31.2424 10.2656 31.2283 10.3319 31.2008C10.3983 31.1733 10.4586 31.133 10.5094 31.0822C10.5601 31.0315 10.6004 30.9712 10.6279 30.9048C10.6554 30.8385 10.6695 30.7674 10.6695 30.6955V27.6635C10.6695 27.5185 10.6119 27.3794 10.5094 27.2768C10.4068 27.1743 10.2677 27.1166 10.1227 27.1166ZM9.57578 30.1487H7.6375V28.2104H9.57578V30.1487ZM10.1227 32.8144H7.09062C6.94558 32.8144 6.80649 32.872 6.70393 32.9746C6.60137 33.0771 6.54375 33.2162 6.54375 33.3612V36.3934C6.54375 36.5384 6.60137 36.6775 6.70393 36.7801C6.80649 36.8826 6.94558 36.9402 7.09062 36.9402H10.1227C10.1945 36.9402 10.2656 36.9261 10.3319 36.8986C10.3983 36.8711 10.4586 36.8308 10.5094 36.7801C10.5601 36.7293 10.6004 36.669 10.6279 36.6026C10.6554 36.5363 10.6695 36.4652 10.6695 36.3934V33.3612C10.6695 33.2162 10.6119 33.0771 10.5094 32.9746C10.4068 32.872 10.2677 32.8144 10.1227 32.8144ZM9.57578 35.8465H7.6375V33.9081H9.57578V35.8465Z"
                  fill="#A3ABB0"
                />
              </svg>
            </div>
            <p className="content text-center fw-7">New Projects</p>
          </a>
        </li>
      </ul>
      <div className="tab-content filter-search-bar">
        <div className="tab-pane fade active show" role="tabpanel">
          <div className="form-sl">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className={`wd-find-select ${styleClass}`}>
                <div className="inner-group">
                  <div className="form-group-1 search-form form-style custom-search-field">
                    {/* <label>Type</label> */}
                    <div className="group-select">
                      <input
                        type="text"
                        className="form-control custom-search-input"
                        placeholder="Search by Residential Properties"
                        defaultValue=""
                        name="s"
                        title="Search for"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group-2 form-style custom-search-field">
                    {/* <label>Location</label> */}
                    {/* <div className="group-ip">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search Location"
                        defaultValue=""
                        name="s"
                        title="Search for"
                        required
                      />
                      <a href="#" className="icon icon-location">
                        {" "}
                      </a>
                    </div> */}
                    <DropdownSelect
                      options={["Location", "All", "Villa", "Studio", "Office", "House"]}
                    />
                  </div>
                  <div className="form-group-3 form-style custom-search-field">
                    {/* <label>Keyword</label> */}
                    <DropdownSelect
                      options={["Budget", "All", "Villa", "Studio", "Office", "House"]}
                    />
                  </div>
                </div>
                <div className="box-btn-advanced">
                  {/* <div className="form-group-4 box-filter">
                    <a
                      onClick={() =>
                        ddContainer.current.classList.toggle("show")
                      }
                      ref={advanceBtnRef}
                      className="tf-btn btn-line filter-advanced pull-right"
                    >
                      <span className="text-1">Search advanced</span>
                      <svg
                        width={22}
                        height={22}
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.5 12.375V3.4375M5.5 12.375C5.86467 12.375 6.21441 12.5199 6.47227 12.7777C6.73013 13.0356 6.875 13.3853 6.875 13.75C6.875 14.1147 6.73013 14.4644 6.47227 14.7223C6.21441 14.9801 5.86467 15.125 5.5 15.125M5.5 12.375C5.13533 12.375 4.78559 12.5199 4.52773 12.7777C4.26987 13.0356 4.125 13.3853 4.125 13.75C4.125 14.1147 4.26987 14.4644 4.52773 14.7223C4.78559 14.9801 5.13533 15.125 5.5 15.125M5.5 15.125V18.5625M16.5 12.375V3.4375M16.5 12.375C16.8647 12.375 17.2144 12.5199 17.4723 12.7777C17.7301 13.0356 17.875 13.3853 17.875 13.75C17.875 14.1147 17.7301 14.4644 17.4723 14.7223C17.2144 14.9801 16.8647 15.125 16.5 15.125M16.5 12.375C16.1353 12.375 15.7856 12.5199 15.5277 12.7777C15.2699 13.0356 15.125 13.3853 15.125 13.75C15.125 14.1147 15.2699 14.4644 15.5277 14.7223C15.7856 14.9801 16.1353 15.125 16.5 15.125M16.5 15.125V18.5625M11 6.875V3.4375M11 6.875C11.3647 6.875 11.7144 7.01987 11.9723 7.27773C12.2301 7.53559 12.375 7.88533 12.375 8.25C12.375 8.61467 12.2301 8.96441 11.9723 9.22227C11.7144 9.48013 11.3647 9.625 11 9.625M11 6.875C10.6353 6.875 10.2856 7.01987 10.0277 7.27773C9.76987 7.53559 9.625 7.88533 9.625 8.25C9.625 8.61467 9.76987 8.96441 10.0277 9.22227C10.2856 9.48013 10.6353 9.625 11 9.625M11 9.625V18.5625"
                          stroke="#161E2D"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  </div> */}
                  <button
                    type="submit"
                    className="tf-btn btn-search primary custom-search-btn"
                    href="#"
                  >
                    Search <i className="icon icon-search" />
                  </button>
                </div>
              </div>
              <div ref={ddContainer} className="wd-search-form">
                <AdvanceSearch />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
