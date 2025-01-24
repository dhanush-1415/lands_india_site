import React from "react";
import { Link } from "react-router-dom";

import { blogPosts8 } from "@/data/blogs";
import Pagination from "../common/Pagination";
import Pagination2 from "../common/Pagination2";
import { getBlogsList } from "@/apiCalls";

export default function Blogs2({ blogs, totalItems, currentPage, setCurrentPage, pageSize ,  }) {

  return (
    <section className="flat-section">
      <div className="container custom-container-header">
        <div className="row">
          {blogs.length >= 1 && blogs.map((post, index) => (
            <div className="col-lg-4 col-md-6" key={index}>
              <Link
                to={`/blog-detail/${post.id}`}
                className="flat-blog-item hover-img"
              >
                <div className="img-style">
                  <img
                    className="lazyload"
                    data-src={post.image}
                    alt="img-blog"
                    src={post.image}
                    width={615}
                    height={405}
                  />
                </div>
                <div className="content-box">
                  <div className="post-author">
                    <span className="fw-7">{post?.author}</span>
                    <span>{post.createdAt?.split('T')[0]}</span>
                  </div>
                  <h5 className="title link">{post.title}</h5>
                  <p className="description">{post.description}</p>
                </div>
              </Link>
            </div>
          ))}
          <div className="col-12 text-center pt-26 line-t">

          </div>
        </div>
      </div>
      <ul className="wd-navigation mt-20" style={{ justifyContent: 'center' }} >
        <Pagination
          currentPage={currentPage}
          setPage={setCurrentPage}
          itemLength={totalItems}
          itemPerPage={pageSize}
        />
      </ul>
    </section>
  );
}
