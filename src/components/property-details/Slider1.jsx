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
      <section className="flat-slider-detail-v1 px-10" style={{height: '70vh',display: 'flex', justifyContent: 'center'}}>
        {/* <Swiper
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
        </Swiper> */}
        <div style={{ display: 'flex', width: '98%', height: '100%' }}>
  <div style={{ width: '50%', height: '100%' }}>
    <Item original={imageItem[0]} thumbnail={imageItem[0]} width={500} height={500}>
      {({ ref, open }) => (
        <img
          ref={ref}
          onClick={open}
          src={imageItem[0]}
          style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}
          alt=""
        />
      )}
    </Item>
  </div>
  <div style={{ width: '50%', height: '100%' }}>
    <div
      style={{
        width: '99%',
        height: '49%',
        marginLeft: '1%',
        marginBottom: '1%',
        display: 'flex',
      }}
    >
      <Item original={imageItem[1]} thumbnail={imageItem[1]} width={500} height={500}>
        {({ ref, open }) => (
          <div style={{ width: '50%', height: '100%', backgroundColor: 'black', cursor: 'pointer' }}>
            <img
              ref={ref}
              onClick={open}
              src={imageItem[1]}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              alt=""
            />
          </div>
        )}
      </Item>
      <Item original={imageItem[2]} thumbnail={imageItem[2]} width={500} height={500}>
        {({ ref, open }) => (
          <div
            style={{
              width: '50%',
              height: '100%',
              backgroundColor: 'black',
              marginLeft: '1%',
              cursor: 'pointer',
            }}
          >
            <img
              ref={ref}
              onClick={open}
              src={imageItem[2]}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              alt=""
            />
          </div>
        )}
      </Item>
    </div>
    <div
      style={{
        width: '99%',
        height: '50%',
        marginLeft: '1%',
        marginBottom: '1%',
        display: 'flex',
      }}
    >
      <Item original={imageItem[3]} thumbnail={imageItem[3]} width={500} height={500}>
        {({ ref, open }) => (
          <div style={{ width: '50%', height: '100%', backgroundColor: 'black', cursor: 'pointer' }}>
            <img
              ref={ref}
              onClick={open}
              src={imageItem[3]}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              alt=""
            />
          </div>
        )}
      </Item>
      <Item original={imageItem[4]} thumbnail={imageItem[4]} width={500} height={500}>
        {({ ref, open }) => (
          <div
            style={{
              width: '50%',
              height: '100%',
              backgroundColor: 'black',
              marginLeft: '1%',
              cursor: 'pointer',
            }}
          >
            <img
              ref={ref}
              onClick={open}
              src={imageItem[4]}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              alt=""
            />
          </div>
        )}
      </Item>
    </div>
  </div>
</div>


      </section>
    </Gallery>
  );
}
