import { blogPosts } from "@/data/blogs";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { Pagination } from "swiper/modules";
import NorthEastIcon from '@mui/icons-material/NorthEast';

export default function Blogs() {
  return (
    <section className="flat-section bg-primary-new">
      <style>
        {`
          .blog-cont-custom {
              background: rgb(255, 255, 255);
              z-index: 5;
              margin-top: -50px;
              position: relative;
              width: 90%;
              float: right;
              padding: 10px;
          }
        `}
      </style>
      <div className="container">
        <div className="list-header-custom">
          <div>
            <h3 className="carousel-title">
              From Our Blogs
            </h3>
            <p>Read our latest articles on real estate.</p>
          </div>
          <div className="d-flex gap-3 filter-list" style={{ fontWeight: 'bold', fontSize: '1rem' }}>
            <div className="custom-two custom-last-two">
              <p>See All Our Blogs</p>
              <NorthEastIcon sx={{ margin: ' -5px 0px 0px 5px' }} />
            </div>
          </div>
        </div>
        <Swiper
          className="swiper tf-sw-latest wow fadeInUp"
          data-wow-delay=".2s"
          spaceBetween={15} // equivalent to data-space
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 15, // equivalent to data-space-md and data-space-mobile
            },
            576: {
              slidesPerView: 2,
              spaceBetween: 15, // equivalent to data-space-mobile-sm
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 15, // tablet setting
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30, // desktop (equivalent to data-space-lg)
            },
          }}
          modules={[Pagination]}
          pagination={{ clickable: true }}
        >
          {blogPosts.map((post, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <Link
                // to={`/blog-detail/${post.id}`}
                className="flat-blog-item hover-img"
              >
                <div className="img-style" style={{ borderRadius: '5px' }}>
                  <img
                    style={{ position: 'relative' }}
                    className="lazyload"
                    data-src={post.imgSrc}
                    alt={post.alt}
                    src={post.imgSrc}
                    width={615}
                    height={405}
                  />
                </div>
                <div className="blog-cont-custom">
                  <div className="post-author">
                    <span className="fw-6" style={{color:'gray'}}>{post.author}</span>
                  </div>
                  <h5 className="title link" style={{padding:'5px 0'}}>{post.title}</h5>
                  <p className="description">{post.date}</p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
