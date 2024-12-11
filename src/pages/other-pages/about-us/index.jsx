import Agents from "@/components/common/Agents";
import Brands from "@/components/common/Brands";
import Testimonials2 from "@/components/common/Testimonials2";
import Footer1 from "@/components/footer/Footer1";
import Header1 from "@/components/headers/Header1";
import Benefit from "@/components/homes/home-2/Benefit";
import Banner from "@/components/common/Banner";
import About from "@/components/otherPages/About";
import Slider1 from "@/components/property-details/Slider1";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "About Us || Homelengo - Real Estate Reactjs Template",
  description: "Homelengo - Real Estate Reactjs Template",
};
export default function AboutUsPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      {/* <Header1 /> */}
      <About />
      <Slider1 />
      <Agents />
      <Brands />
      <Benefit />
      <Testimonials2 />
      <Banner />
      <Footer1 />
    </>
  );
}
