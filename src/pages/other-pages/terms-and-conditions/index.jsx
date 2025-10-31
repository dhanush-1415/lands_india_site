import Footer1 from "@/components/footer/Footer1";
import Header1 from "@/components/headers/Header1";
import PageTitle5 from "@/components/otherPages/PageTitle5";
import TermsAndConditions from "@/components/otherPages/TermsAndConditions";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Terms and Conditions || Homelengo - Real Estate Reactjs Template",
  description: "Homelengo - Real Estate Reactjs Template",
};
export default function TermsAndConditionsPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      {/* <Header1 /> */}
      {/* <PageTitle5 title="Terms and Conditions" breadcrumb="Terms and Conditions" /> */}
      <TermsAndConditions />
      <Footer1 />
    </>
  );
}

