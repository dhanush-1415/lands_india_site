import Footer1 from "@/components/footer/Footer1";
import Header1 from "@/components/headers/Header1";
import DetailsTitle1 from "@/components/property-details/DetailsTitle1";
import PropertyDetails from "@/components/property-details/PropertyDetails";
import Slider1 from "@/components/property-details/Slider1";
import { allProperties } from "@/data/properties";
import React from "react";
import { useParams } from "react-router-dom";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Property Details 01 || Homelengo - Real Estate Reactjs Template",
  description: "Homelengo - Real Estate Reactjs Template",
};
export default function PropertyDetailsPageV1() {
  let params = useParams();
  const data = [
    {
      id: 1,
      postedBy: {
        name: "Di**a",
        email: "di***********r@gmail.com"
      },
      squareFeet: "1,744 sq",
      propertyDetails: {
        title: "On-road New House sale in Udumalpet",
        price: "97,00,000",
        postedBy: "Owner",
        postedDate: "Sep 25, 2024",
        description: "On-road New Residential House for Sale in Udumalpet",
        amenities: [
          "North Facing",
          "Semi - Furnished House",
          "EB connection available",
          "Water supply available",
          "DTCP Approved Property"
        ],
        location: {
          country: "India",
          state: "Tamil Nadu",
          district: "Tiruppur",
          taluk: "Udumalaipettai",
          village: "Udumalpet"
        },
        features: {
          
        beds: "2",
        baths: "4",
        sqfeet: "2600"
        },
        locationDetails: [
          "This On-road property located 60 meters from the main road",
          "100 meter from Dharapuram main road",
          "Located in Gated community"
        ],
        nearbyAreas: [
          "Newly by-pass road work going on from 600m from the property which is visible from our property"
        ]
      },
      additionalInformation: {
        bhk: "2 BHK",
        numberOfFloors: "Ground + 1 Floors",
        bathrooms: "4 Bathrooms",
        furnished: "Semi Furnished",
        floorType: "Tiles",
        propertyAge: "-",
        carParking: "Open Parking",
        frontage: "60 Meters",
        facing: "North",
        ebConnection: "Single Phase",
        hasSolar: "No",
        water: "Ground Water",
        compound: "No",
        ceiling: "-",
        rentalIncome: "₹ 30,000",
        roadWidth: "3 Meters",
        garden: "No"
      },
      img: [
        "https://file-manager.propertystores.in/file-manager/get/properties_store/properties/1727247877009SS160970086.jpg",
        "https://file-manager.propertystores.in/file-manager/get/properties_store/properties/1727247877334SS68113705.jpg",
        "https://file-manager.propertystores.in/file-manager/get/properties_store/properties/1727247877820SS608923572.jpg",
        "https://file-manager.propertystores.in/file-manager/get/properties_store/properties/1727247877770SS562809115.jpg",
        "https://file-manager.propertystores.in/file-manager/get/properties_store/properties/1727247877472SS686744401.jpg",
        "https://file-manager.propertystores.in/file-manager/get/properties_store/properties/1727247880122SS9333709.jpg"
      ]
    }
  ]
  const propertyItem =
    data.filter((elm) => elm.id == params.id)[0] || data[0];
  return (
    <>
      <MetaComponent  />
      {/* <Header1 /> */}
      <DetailsTitle1 propertyItem={propertyItem.propertyDetails} />
      <Slider1 imageItem={propertyItem.img}/>
      <PropertyDetails   />
      <Footer1 />
    </>
  );
}
