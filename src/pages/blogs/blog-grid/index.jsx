import Blogs2 from "@/components/blogs/Blogs2";

import PageTitle2 from "@/components/blogs/PageTitle2";
import PageTitle from "@/components/blogs/PageTitle";
import Footer1 from "@/components/footer/Footer1";
import Header1 from "@/components/headers/Header1";
import React, { useState, useEffect } from "react";
import { getBlogsList } from "@/apiCalls";
import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Blog Grid || Homelengo - Real Estate Reactjs Template",
  description: "Homelengo - Real Estate Reactjs Template",
};
export default function BlogGridPage() {

  const [blogs, setBlog] = useState([]);

  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const fetchBlogs = async () => {
    try {
      const data = await getBlogsList(currentPage);
      setBlog(data.data)
      if (data.success) {
        setBlog(data.data)
        if (data.pagination) {
          setTotalItems(data.pagination.totalItems)
          setCurrentPage(data.pagination.currentPage)
        }
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };


  useEffect(() => {
    fetchBlogs();
  }, [currentPage]);


  return (
    <>
      <PageTitle />
      <Blogs2
        blogs={blogs}
        totalItems={totalItems}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageSize={pageSize}
      />
      <Footer1 />
    </>
  );
}
