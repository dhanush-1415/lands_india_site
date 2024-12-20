import { Swiper, SwiperSlide } from "swiper/react";

import { Pagination } from "swiper/modules";
import { Gallery, Item } from "react-photoswipe-gallery";
const propertyImages = [
  {
    src: "/images/banner/banner-property-1.jpg",
    alt: "img-property",
    width: 627,
    height: 694,
  },
  {
    src: "/images/banner/banner-property-3.jpg",
    alt: "img-property",
    width: 627,
    height: 694,
  },
  {
    src: "/images/banner/banner-property-2.jpg",
    alt: "img-property",
    width: 628,
    height: 694,
  },
  {
    src: "/images/banner/banner-property-1.jpg",
    alt: "img-property",
    width: 627,
    height: 694,
  },
];

export default function Slider1({ imageItem }) {
  return (
    <Gallery>
      <section className="flat-slider-detail-v1 px-10">
        <Swiper
          className="swiper tf-sw-location"
          slidesPerView={3}
          spaceBetween={10}
          breakpoints={{
            1200: {
              slidesPerView: 3, // for tablet
              spaceBetween: 10, // for space-lg
            },
            640: {
              slidesPerView: 2, // for mobile-sm
              spaceBetween: 10, // for space-md
            },
            0: {
              slidesPerView: 1, // for mobile
              spaceBetween: 10, // for space
            },
          }}
          modules={[Pagination]}
          pagination={{ clickable: true, el: ".spb18" }}
        >
          {imageItem.map((image, index) => (
            <SwiperSlide key={index}>
              <Item
                original={image}
                thumbnail={image}
                width={image.width}
                height={image.height}
              >
                {({ ref, open }) => (
                  <a
                    onClick={open}
                    data-fancybox="gallery"
                    className="box-img-detail d-block"
                  >
                    <img
                      ref={ref}
                      alt={image.alt}
                      src={image}
                      width={image.width}
                      // height={image.height}
                      style={{objectFit:'cover',height:'400px'}}                    />
                  </a>
                )}
              </Item>
            </SwiperSlide>
          ))}
          <div className="sw-pagination spb18 sw-pagination-location text-center" />
        </Swiper>
      </section>
    </Gallery>
  );
}
