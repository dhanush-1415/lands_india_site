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
        sqfeet: "1744"
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
    },
    {
      id: 2,
      postedBy: {
        name: "Di**a",
        email: "di***********r@gmail.com"
      },
      squareFeet: "1,744 sq",
      propertyDetails: {
        title: "New House for sale in Trichy",
        price: "75,00,000",
        postedBy: "Owner",
        postedDate: "Nov 9, 2024",
        description: "On-road New Residential House for Sale in Udumalpet",
        descriptions: [
          "Price : ₹ 75 Lakhs", "Location : Trichy", "Land Area : 1,000 Sq.ft", "Built-Up Area : 1,800 Sq.ft"
        ],
        amenities: [
          "East Facing",
          "Frontage : 20 Feet",
          "EB connection available",
          "Water supply available"
        ],
        location: {
          country: "India",
          state: "Tamil Nadu",
          district: "Tiruchirappalli",
          taluk: "Tiruchirappalli",
          village: "Eadamalaipatti pudur"
        },
        features: {
          
        beds: "2",
        baths: "-",
        sqfeet: "1800"
        },
        houseType: [
          "Ground Floor : 1 BHK",
          "1st Floor : 2 BHK",
          "Attached Bedroom & bathroom",
          "This property Located in On-Road Property"
        ],

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
        bathrooms: "-",
        furnished: "No Furnished",
        floorType: "Tiles",
        propertyAge: "-",
        carParking: "No Parking",
        frontage: "6 Meters",
        facing: "East",
        ebConnection: "Three Phase",
        hasSolar: "No",
        water: "Ground Water",
        compound: "No",
        ceiling: "-",
        rentalIncome: "-",
        roadWidth: "2 Meters",
        garden: "No"
      },
      img: [
        "https://file-manager.propertystores.in/file-manager/get/properties_store/properties/1731147602664SS902355257.jpg",
        "https://file-manager.propertystores.in/file-manager/get/properties_store/properties/1731147602746SS400186792.jpg",
        "https://file-manager.propertystores.in/file-manager/get/properties_store/properties/1731147602479SS898366810.jpg",
        "https://file-manager.propertystores.in/file-manager/get/properties_store/properties/1731147602723SS462947077.jpg",
        "https://file-manager.propertystores.in/file-manager/get/properties_store/properties/1731147602625SS190860447.jpg",
        "https://file-manager.propertystores.in/file-manager/get/properties_store/properties/1731147602648SS314473839.jpg",
        "https://file-manager.propertystores.in/file-manager/get/properties_store/properties/1731147602756SS743297980.jpg",
        "https://file-manager.propertystores.in/file-manager/get/properties_store/properties/1731147602852SS469732366.jpg"
      ]
    },
    {
      id: 3,
      postedBy: {
        name: "Di**a",
        email: "di***********r@gmail.com"
      },
      squareFeet: "3638 sq",
      propertyDetails: {
        title: "House for sale in Trichy",
        price: "1,20,00,000",
        postedBy: "Owner",
        postedDate: "Nov 8, 2024",
        description: "On-road New Residential House for Sale in Udumalpet",
        descriptions: [
          "Price : ₹ 1.20 Crore", "Location : Trichy ( 500 meters from Trichy to Madurai NH )", "Land Area : 3,638 Sq.ft", "Total Built-Up Area : 3,062 Sq.ft"
        ],
        amenities: [
          "South Facing",
          "Frontage : 50 Feet",
          "EB connection available",
          "Water supply available ( 400 Feet Borewell )",
          "Gated Community",
          "This house Located in On-Road Property",
          "Property Age : 6 Years",
          "Number of Floors: 2",
          "Attached Bedroom, bathroom"
        ],
        houseType: [
          "Ground Floor : 1,320 Sq.ft - (1 BHK House - one & 2 BHK house - one )",
          "1st Floor : 1,560 Sq.ft - ( 1 BHK house - Three )",
          "2nd Floor : Headroom with an area of 182 sq. ft - one",
          "Total Houses : 1 BHK - Three , 2 BHK - One"
        ],
        location: {
          country: "India",
          state: "Tamil Nadu",
          district: "Tiruchirappalli",
          taluk: "Tiruchirappalli",
          village: "Fathima Nagar"
        },
        features: {
          
        beds: "2",
        baths: "-",
        sqfeet: "1800"
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
        numberOfFloors: "Ground + 2 Floors",
        bathrooms: "4 Bathrooms",
        furnished: "No Furnished",
        floorType: "Tiles",
        propertyAge: "15 years",
        carParking: "No Parking",
        frontage: "6 Meters",
        facing: "South",
        ebConnection: "Single Phase",
        hasSolar: "No",
        water: "Ground Water",
        compound: "No",
        ceiling: "-",
        rentalIncome: "-",
        roadWidth: "10 Meters",
        garden: "No"
      },
      img: [
        "https://file-manager.propertystores.in/file-manager/get/properties_store/properties/1731055534055SS201975968.jpg",
        "https://file-manager.propertystores.in/file-manager/get/properties_store/properties/1731055533985SS678295636.jpg",
        "https://file-manager.propertystores.in/file-manager/get/properties_store/properties/1731055534079SS454163649.jpg",
      ]
    },
    {
      id: 3,
      postedBy: {
        name: "Di**a",
        email: "di***********r@gmail.com"
      },
      squareFeet: "3638 sq",
      propertyDetails: {
        title: "Cents Villa Sale in Kodaikanal with Monthly Rental Income",
        price: "85,00,000",
        postedBy: "Owner",
        postedDate: "Nov 12, 2024",
        description: "On-road New Residential House for Sale in Udumalpet",
        descriptions: [
          "Price : ₹ 85 Lakhs (Negotiable)", "Location : Vaalakaatu Odai, Kodaikanal", "Land Area : 6 cents", "Built-up Area : 1,800 Sq.ft"
        ],
        amenities: [
          "East Facing",
          "10000 ltrs water sump, 1 Small motor",
          "1 Bore with good ground water, 1.5 Hp motor bore",
          "3 phase power supply available",
          "3 Bedrooms with Hill view & attached bathrooms, (jaguar fittings)",
          "1 hall come bedroom with connectivity doors & 1 attached bathroom",
          "1 Separate kitchen room , Big Balcony view (55*6)",
          "4 cots with 12 inch matress, 1 Sofa (5 seater) , 1 Tv",
          "8 wooden chairs , 4 table, 6 plastic chairs",
          "1 round dining table nilkamal, 1 kichen table , 1 foam cofee table",
          "Vengai Wooden Doors & Sliding Glass Windows",
          "4 Geysers (AO Smith) , Syska & Luker LED Lighting",
          "Finolex Wiring & V-Guard Pressure Pump",
          "Connectivity : High-speed WiF , Mi Security Cam"
        ],
        houseType: [
          "Ground Floor : 1,320 Sq.ft - (1 BHK House - one & 2 BHK house - one )",
          "1st Floor : 1,560 Sq.ft - ( 1 BHK house - Three )",
          "2nd Floor : Headroom with an area of 182 sq. ft - one",
          "Total Houses : 1 BHK - Three , 2 BHK - One"
        ],
        location: {
          country: "India",
          state: "Tamil Nadu",
          district: "Dindigul",
          taluk: "Kodaikanal",
          village: "Vaalakaatu Odai"
        },
        features: {
          
        beds: "3",
        baths: "3",
        sqfeet: "1800"
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
      img: [
        "https://file-manager.propertystores.in/file-manager/get/properties_store/properties/1731407087419SS486726561.jpg",
        "https://file-manager.propertystores.in/file-manager/get/properties_store/properties/1731407087369SS859851007.jpg",
        "https://file-manager.propertystores.in/file-manager/get/properties_store/properties/1731407087181SS321031554.jpg",
        "https://file-manager.propertystores.in/file-manager/get/properties_store/properties/1731407087435SS235601531.jpg",
        "https://file-manager.propertystores.in/file-manager/get/properties_store/properties/1731407087342SS150856078.jpg",
        "https://file-manager.propertystores.in/file-manager/get/properties_store/properties/1731407092816SS949997914.jpg",
        "https://file-manager.propertystores.in/file-manager/get/properties_store/properties/1731407092848SS250449664.jpg"
      ]
    },
    {
      id: 3,
      postedBy: {
        name: "Di**a",
        email: "di***********r@gmail.com"
      },
      squareFeet: "3638 sq",
      propertyDetails: {
        title: "On- road 3 BHK Apartment Sale in ECR Road, Mamallapuram",
        price: "43,00,000",
        postedBy: "Owner",
        postedDate: "Nov 12, 2024",
        description: "On-road New Residential House for Sale in Udumalpet",
        descriptions: [
          "Price : ₹ 85 Lakhs (Negotiable)", "Location : Vaalakaatu Odai, Kodaikanal", "Land Area : 6 cents", "Built-up Area : 1,800 Sq.ft"
        ],
        amenities: [
          "East Facing private corner Plot",
          "Gated community",
          "Bedroom - 3 & Bathroom - 3",
          "Car parking available",
          "Property age : 6 years old",
          "EB connection available",
          "Water supply available",
          "This On-road property Located in ECR 6lane high way",
          "No of floors : Total 3 floors",
        ],
        houseType: [],
        location: {
          country: "India",
          state: "Tamil Nadu",
          district: "Kancheepuram",
          taluk: "Tirukalikundram",
          village: "Mamallapuram"
        },
        features: {
          
        beds: "2",
        baths: "-",
        sqfeet: "1800"
        },
        locationDetails: [
          "This On-road property located 60 meters from the main road",
          "100 meter from Dharapuram main road",
          "Located in Gated community"
        ],
        nearbyAreas: [
          "Mahabalipuram 1km and Poonjeri Junction",
          "OMR ling Road 2km"
        ]
      },
      img: [
        "https://file-manager.propertystores.in/file-manager/get/properties_store/properties/1731408906676SS686625907.jpg",
        "https://file-manager.propertystores.in/file-manager/get/properties_store/properties/1731408906685SS722212180.jpg",
        "https://file-manager.propertystores.in/file-manager/get/properties_store/properties/1731408906630SS985078097.jpg",
      ]
    }
  ]
  const projects = [
    
    {
      id: 1,
      postedBy: {
        name: "Di**a",
        email: "di***********r@gmail.com"
      },
      squareFeet: "4800 sq",
      propertyDetails: {
        title: "Beach front plot for sale in ECR , Mamallapuram",
        price: "55,00,000",
        postedBy: "Owner",
        postedDate: "jul 17, 2024",
        descriptions: [
          "Title : Beach front plot for sale in ECR Maamallapuram", "sqft : 2 Grounds, 4800 - sqft", "Price : 55laks / per Ground", "Gated community with Watchman !!", "150meter from Beach !!","1.5km from Maamallapuram bus stand Eb facility"
        ],
        
        location: {
          country: "India",
          state: "Tamil Nadu",
          district: "Kancheepuram",
          taluk: "Tirukalikundram",
          village: "Mamallapuram"
        },
      },
      img: [
        "https://file-manager.propertystores.in/file-manager/get/properties_store/properties/1721216563555SS259424391.jpg",
        "https://file-manager.propertystores.in/file-manager/get/properties_store/properties/1721216566804SS521158392.jpg",
        "https://file-manager.propertystores.in/file-manager/get/properties_store/properties/1721216570936SS541271682.jpg",
      ]
    },
    {
      id: 2,
      postedBy: {
        name: "Di**a",
        email: "di***********r@gmail.com"
      },
      squareFeet: "1200 sq",
      propertyDetails: {
        title: "Beach front plot for sale in ECR , Mamallapuram",
        price: "22,00,000",
        postedBy: "Owner",
        postedDate: "jul 18, 2024",
        descriptions: [
          "Title : Income cottage sale", "Offers: 12% Returns Yearly", "Location : ECR , Chennai", "Price : 22 lakhs", "SQFT : Plots Scale: 1200 Sqft Land , 400 Sqft Buildup Area","24/7 Service ,Swimming Pool , Fitness Center ,Restaurant ,Conference Hall ,Kidsplay Park ,Spa & Wellness"
        ],
        
        location: {
          country: "India",
          state: "Tamil Nadu",
          district: "Chengalpattu",
          taluk: "Thirukazhikundram",
          village: "Pudupattinam"
        },
      },
      img: [
        "https://file-manager.propertystores.in/file-manager/get/properties_store/properties/1726818481275SS782793669.jpg",
        "https://file-manager.propertystores.in/file-manager/get/properties_store/properties/1721281161254SS931112073.jpg",
        "https://file-manager.propertystores.in/file-manager/get/properties_store/properties/1726818481330SS201904029.jpg",
        "https://file-manager.propertystores.in/file-manager/get/properties_store/properties/1721720629542SS825523086.jpg",
        "https://file-manager.propertystores.in/file-manager/get/properties_store/properties/1721281154717SS637165200.jpg",
        "https://file-manager.propertystores.in/file-manager/get/properties_store/properties/1721281149266SS12290080.jpg",
        "https://file-manager.propertystores.in/file-manager/get/properties_store/properties/1726818481062SS30764972.jpg",
        "https://file-manager.propertystores.in/file-manager/get/properties_store/properties/1721281169588SS132337919.jpg",
        "https://file-manager.propertystores.in/file-manager/get/properties_store/properties/1726818481222SS55328135.jpg",
        "https://file-manager.propertystores.in/file-manager/get/properties_store/properties/1726818481277SS655268977.jpg"
      ]
    },
    {
      id: 3,
      postedBy: {
        name: "Di**a",
        email: "di***********r@gmail.com"
      },
      squareFeet: "3500 sq",
      propertyDetails: {
        title: "Beach front plot for sale in ECR , Mamallapuram",
        price: "3,500",
        postedBy: "Owner",
        postedDate: "jul 17, 2024",
        descriptions: [
          "Title : Residential Land for Sale", "Location : Kelambakkam, OMR (Behind Alliance Humming Garden)", "Offer Price : ₹ 3500 per sqft"
        ],
        
        location: {
          country: "India",
          state: "Tamil Nadu",
          district: "Chengalpattu",
          taluk: "Tiruporur",
          village: "Kelambakkam"
        },
      },
      img: [
        "https://file-manager.propertystores.in/file-manager/get/properties_store/properties/1721219201318SS403685325.jpg",
        "https://file-manager.propertystores.in/file-manager/get/properties_store/properties/1721219206090SS878496586.jpg",
        "https://file-manager.propertystores.in/file-manager/get/properties_store/properties/1721219209203SS466906581.jpg",
        "https://file-manager.propertystores.in/file-manager/get/properties_store/properties/1721219212077SS221768027.jpg",
      ]
    },
    {
      id: 4,
      postedBy: {
        name: "Di**a",
        email: "di***********r@gmail.com"
      },
      squareFeet: "1500 sq",
      propertyDetails: {
        title: "Beach front plot for sale in ECR , Mamallapuram",
        price: "36,00,000",
        postedBy: "Owner",
        postedDate: "jul 18, 2024",
        descriptions: [
          "Title : Kodaikanal to Pannaikadu DTCP EMI Plots for sale", "On Road Site", "PAY 50% First & Register", "PAY 50% Balance With Interest FREE EMI", "Investment one time & Get monthly returns 10 yrs","Monthly rental return 1%", "Maintenance 100% free", "Monthly 4 days free stay reserved for owner", "Vathalagundu to Kodaikanal on road sight", "Gated community with security", "Kids play area & Park available", "DTCP Approved", "Easy access to Moolaiyar River", "Easy access Kodaikanal, Palani and vathalagundu", "100% safe and secured property", "Plot size starts from 1500sqft", "Concrete Road and EB available"
        ],
        
        location: {
          country: "India",
          state: "Tamil Nadu",
          district: "Dindigul",
          taluk: "Kodaikanal",
          village: "Pannaikadu"
        },
      },
      img: [
        "https://file-manager.propertystores.in/file-manager/get/properties_store/properties/1721285409450SS970750546.jpg",
        "https://file-manager.propertystores.in/file-manager/get/properties_store/properties/1721285417005SS171686186.jpg",
        "https://file-manager.propertystores.in/file-manager/get/properties_store/properties/1721285421584SS279047873.jpg",
        "https://file-manager.propertystores.in/file-manager/get/properties_store/properties/1721285426471SS945095527.jpg",
        "https://file-manager.propertystores.in/file-manager/get/properties_store/properties/1721285436121SS268707929.jpg",
        "https://file-manager.propertystores.in/file-manager/get/properties_store/properties/1721285443528SS18985419.jpg",
        "https://file-manager.propertystores.in/file-manager/get/properties_store/properties/1721285446772SS432706533.jpg",
        "https://file-manager.propertystores.in/file-manager/get/properties_store/properties/1721285455411SS994089969.jpg"
      ]
    },
    {
      id: 4,
      postedBy: {
        name: "Di**a",
        email: "di***********r@gmail.com"
      },
      squareFeet: "9600 sq",
      propertyDetails: {
        title: "Beach front plot for sale in ECR , Mamallapuram",
        price: "26,40,000",
        postedBy: "Owner",
        postedDate: "Apr 12, 2024",
        descriptions: [
          "Gated Community", "Swimming Pool", "Water Falls", "Party Hall", "Restaurant","Kids Play Area", "Garden", "Indoor Games", "Outdoor Games & Etc...",
        ],
        additionalInformation: {
            "Dtcp": "Yes",
            "RERAApproved": "Yes",
          "NearByAmenities": [
            "Coutralam Falls",
            "Thirumalai Kovil"
          ],
          "RoadSize": "23 Feet",
          "CCTV": "Yes",
          "Security": "Yes",
          "KidsPlayPark": "Yes",
          "Garden": "Yes",
          "StreetLight": "Yes",
          "RoadType": "Concrete Road",
          "EbFacility": "Yes",
          "Water": "Ground Water",
          "CommunityType": "Gated Community",
          "Trees": "Yes"
        },        
        location: {
          country: "India",
          state: "Tamil Nadu",
          district: "Tenkasi",
          taluk: "Shenkottai",
          village: "Tenpottai"
        },
      },
      img: [
        "https://file-manager.propertystores.in/file-manager/get/properties_store/properties/1712920885828SS641824268.jpg",
        "https://file-manager.propertystores.in/file-manager/get/properties_store/properties/1712920885861SS807020942.jpg",
        "https://file-manager.propertystores.in/file-manager/get/properties_store/properties/1712920888303SS113070131.jpg",
        "https://file-manager.propertystores.in/file-manager/get/properties_store/properties/1712920900689SS77397891.jpg",
        "https://file-manager.propertystores.in/file-manager/get/properties_store/properties/1712920900724SS722469815.jpg",
        "https://file-manager.propertystores.in/file-manager/get/properties_store/properties/1712920900893SS520820400.jpg"
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
      <PropertyDetails  propertyDetails={propertyItem.propertyDetails} additionalInformation={propertyItem.additionalInformation} />
      <Footer1 />
    </>
  );
}
