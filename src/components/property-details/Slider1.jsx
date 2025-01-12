import { Gallery, Item } from "react-photoswipe-gallery";
import CollectionsIcon from '@mui/icons-material/Collections';

export default function Slider1({ imageItem }) {
  return (
    <Gallery>
      <section
        className="flat-slider-detail-v1 px-10"
        style={{
          height: "70vh",
          display: "flex",
          justifyContent: "center",
          padding: "0px 0px 40px",
          position: "relative",
        }}
      >
        <button
          style={{
            position: "absolute",
            top: "30px",
            right: "100px",
            padding: "13px 20px",
            backgroundColor: "#008ff7",
            color: "#ffffff",
            border: "none",
            cursor: "pointer",
            zIndex: 10,
          }}
        >
          <CollectionsIcon sx={{marginRight:'5px'}} />
          View All Photos
        </button>

        <div
          style={{
            display: "flex",
            width: "90%",
            height: "100%",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              width: "50%",
              height: "100%",
            }}
          >
            <Item original={imageItem[0]} thumbnail={imageItem[0]} width={500} height={500}>
              {({ ref, open }) => (
                <img
                  ref={ref}
                  onClick={open}
                  src={imageItem[0]}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                  alt=""
                />
              )}
            </Item>
          </div>

          <div
            style={{
              width: "50%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                width: "99%",
                height: "49%",
                marginLeft: "1%",
                marginBottom: "1%",
                display: "flex",
              }}
            >
              <Item original={imageItem[1]} thumbnail={imageItem[1]} width={500} height={500}>
                {({ ref, open }) => (
                  <div
                    style={{
                      width: "50%",
                      height: "100%",
                      backgroundColor: "black",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      ref={ref}
                      onClick={open}
                      src={imageItem[1]}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      alt=""
                    />
                  </div>
                )}
              </Item>
              <Item original={imageItem[2]} thumbnail={imageItem[2]} width={500} height={500}>
                {({ ref, open }) => (
                  <div
                    style={{
                      width: "50%",
                      height: "100%",
                      backgroundColor: "black",
                      marginLeft: "1%",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      ref={ref}
                      onClick={open}
                      src={imageItem[2]}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      alt=""
                    />
                  </div>
                )}
              </Item>
            </div>
            <div
              style={{
                width: "99%",
                height: "50%",
                marginLeft: "1%",
                marginBottom: "1%",
                display: "flex",
              }}
            >
              <Item original={imageItem[3]} thumbnail={imageItem[3]} width={500} height={500}>
                {({ ref, open }) => (
                  <div
                    style={{
                      width: "50%",
                      height: "100%",
                      backgroundColor: "black",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      ref={ref}
                      onClick={open}
                      src={imageItem[3]}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      alt=""
                    />
                  </div>
                )}
              </Item>
              <Item original={imageItem[4]} thumbnail={imageItem[4]} width={500} height={500}>
                {({ ref, open }) => (
                  <div
                    style={{
                      width: "50%",
                      height: "100%",
                      backgroundColor: "black",
                      marginLeft: "1%",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      ref={ref}
                      onClick={open}
                      src={imageItem[4]}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      alt=""
                    />
                  </div>
                )}
              </Item>
            </div>
          </div>
        </div>

        {/* Responsive Styles */}
        <style>
          {`
            @media (max-width: 768px) {
              .flat-slider-detail-v1 {
                height: auto;
              }
              .flat-slider-detail-v1 > div {
                flex-direction: column;
              }
              .flat-slider-detail-v1 img {
                width: 100% !important;
                height: auto !important;
              }
              .flat-slider-detail-v1 div[style*="width: 50%;"] {
                width: 100% !important;
                height: auto !important;
              }
              .flat-slider-detail-v1 div[style*="height: 49%;"] {
                height: auto !important;
                margin-bottom: 10px;
              }
            }
          `}
        </style>
      </section>
    </Gallery>
  );
}
