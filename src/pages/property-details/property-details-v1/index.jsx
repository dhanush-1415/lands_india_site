import Footer1 from "@/components/footer/Footer1";
import Header1 from "@/components/headers/Header1";
import DetailsTitle1 from "@/components/property-details/DetailsTitle1";
import PropertyDetails from "@/components/property-details/PropertyDetails";
import Slider1 from "@/components/property-details/Slider1";
import { props } from "@/data/properties";
import React from "react";
import { useParams } from "react-router-dom";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Property Details 01 || Homelengo - Real Estate Reactjs Template",
  description: "Homelengo - Real Estate Reactjs Template",
};
export default function PropertyDetailsPageV1() {
  let params = useParams();
  

   
  const propertyItem =
    props.filter((elm) => elm.id == params.id)[0] || props[0];
  return (
    <>
      <MetaComponent  />
      {/* <Header1 /> */}
      <DetailsTitle1 propertyItem={propertyItem.propertyDetails} />
      <Slider1 imageItem={propertyItem.img}/>
      <PropertyDetails  propertyDetails={propertyItem.propertyDetails} additionalInformation={propertyItem.additionalInformation} />
      <Footer1 />
    </>
  );
}
