import Blogs2 from "@/components/blogs/Blogs2";

import PageTitle2 from "@/components/blogs/PageTitle2";
import Footer1 from "@/components/footer/Footer1";
import Header1 from "@/components/headers/Header1";
import React, {useState , useEffect} from "react";
import { getBlogsList } from "@/apiCalls";
import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Blog Grid || Homelengo - Real Estate Reactjs Template",
  description: "Homelengo - Real Estate Reactjs Template",
};
export default function BlogGridPage() {

  const [blogs, setBlog] = useState([]);
  
  const fetchBlogs = async () => {
    try {
      const data = await getBlogsList();
      setBlog(data.data)
      if (data.success) {
        setBlog(data.data)
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  console.log(blogs , "llllllllllllllllllllllllllllllllll")

  useEffect(() => {
    fetchBlogs();
  }, []);


  return (
    <>
      <PageTitle2 />
      <Blogs2 blogs={blogs} />
      <Footer1 />
    </>
  );
}
