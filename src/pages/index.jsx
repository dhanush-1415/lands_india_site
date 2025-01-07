import Footer1 from "@/components/footer/Footer1";
import Header1 from "@/components/headers/Header1";
import Agents from "@/components/common/Agents";
import Benefit from "@/components/common/Benefit";
import Blogs from "@/components/homes/home-1/Blogs";
import Brands from "@/components/common/Brands";
import Hero from "@/components/homes/home-2/Hero";
import Locations from "@/components/common/Locations";
import Properties from "@/components/homes/home-1/Properties";
import Properties2 from "@/components/homes/home-1/Properties2";
import Services from "@/components/homes/home-1/Services";
import Testimonials from "@/components/common/Testimonials";
import Carousel from "@/components/homes/home-2/Carousel";
import BottomCarousel from "@/components/homes/home-2/BannerCarousel";

import MetaComponent from "@/components/common/MetaComponent";
// const metadata = {
//   title: "Lands India",
//   description: "Homelengo - Real Estate Reactjs Template",
// };
export default function Home() {
  return (
    <>
    {/* meta={metadata} */}
      <MetaComponent  />
      {/* <Header1 /> */}
      <Hero />
      <Carousel />
      <Properties />
      {/* <Locations /> */}
      {/* <Services /> */}
      {/* <Benefit /> */}
      {/* <Properties2 /> */}
      <Testimonials />
      {/* <Agents /> */}
      {/* <Brands /> */}
      <Blogs />
      <BottomCarousel />
      <Footer1 />
    </>
  );
}
