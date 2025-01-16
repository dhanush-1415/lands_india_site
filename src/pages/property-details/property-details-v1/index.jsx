import Footer1 from "@/components/footer/Footer1";
import Header1 from "@/components/headers/Header1";
import DetailsTitle1 from "@/components/property-details/DetailsTitle1";
import PropertyDetails from "@/components/property-details/PropertyDetails";
import Slider1 from "@/components/property-details/Slider1";
import { props } from "@/data/properties";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPropertyEdit } from "@/apiCalls";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Property Details 01 || Homelengo - Real Estate Reactjs Template",
  description: "Homelengo - Real Estate Reactjs Template",
};
export default function PropertyDetailsPageV1() {
  let params = useParams();

  const [propertyData, setPropertyData] = useState([]);

  console.log(propertyData, "ppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp")

  useEffect(() => {
    const fetchData = async () => {
      if (params.id) {
        const landsUser = JSON.parse(localStorage.getItem('LandsUser'));

        if (landsUser) {
          try {
            const data = await getPropertyEdit(params.id);
            if (data.success) {
              const combined = data.properties.map((property) => {
                const propertyInputs = data.propertyInputs?.filter(input => input.properties_postId === property.id);

                const inputsWithNames = propertyInputs.map((input) => {
                  const inputData = data.inputs.find(i => i.id === input.input_id);
                  return {
                    ...input,
                    input_name: inputData ? inputData.input_name : '',
                    input_type: inputData ? inputData.input_type : '',
                    options: inputData ? inputData.options : [],
                  };
                });

                return {
                  ...property,
                  inputs: inputsWithNames,
                };
              });

              setPropertyData(combined);

            } else {
              toast.error(data.message);
            }
          } catch (err) {
            console.error('Error fetching categories:', err);
          }
        } else {
          toast.error('You must be logged in to access this page');
        }
      }
    };

    fetchData();
  }, [params]);

  const propertyItem =
    props.filter((elm) => elm.id == params.id)[0] || props[0];
  return (
    <>
      <MetaComponent />
      {/* <Header1 /> */}
      {propertyData.length > 0 && (

        < DetailsTitle1 data={propertyData} />)}
      {propertyData.length > 0 && (

        <Slider1 data={propertyData} />
      )}
      {propertyData.length > 0 && (
        <PropertyDetails data={propertyData} />
      )}
      <Footer1 />
    </>
  );
}
