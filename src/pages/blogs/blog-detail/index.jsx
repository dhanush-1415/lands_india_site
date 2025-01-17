import BlogDetails from "@/components/blogs/BlogDetails";
import PageTitle from "@/components/blogs/PageTitle";
import Footer1 from "@/components/footer/Footer1";
import Header1 from "@/components/headers/Header1";
import { allBlogs } from "@/data/blogs";
import React, {useState , useEffect} from "react";
import { useParams } from "react-router-dom";
import { getBlogDetail } from "@/apiCalls";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Blog Details || LandsIndia - Real Estate ",
  description: "LandsIndia - Real Estate",
};
export default function BlogDetailsPage() {
  let params = useParams();
  const blogItem =
    allBlogs.filter((elm) => elm.id == params.id)[0] || allBlogs[0];


  const [blogs, setBlog] = useState([]);

  const fetchBlogs = async () => {
    try {
      const data = await getBlogDetail(params.id);
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

  useEffect(() => {
    fetchBlogs();
  }, [params]);


  return (
    <>
      <PageTitle />
      <BlogDetails blogItem={blogs} />
      <Footer1 />
    </>
  );
}
