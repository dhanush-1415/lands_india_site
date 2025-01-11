import PageTitle from "@/components/blogs/PageTitle";
import Footer1 from "@/components/footer/Footer1";
import Header1 from "@/components/headers/Header1";
import React from "react";
import HelpForm from "./HelpForm";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Help || LandsIndia - Real Estate ",
  description: "LandsIndia - Real Estate",
};
export default function HelpAndSupport() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <HelpForm />
      <Footer1 />
    </>
  );
}
