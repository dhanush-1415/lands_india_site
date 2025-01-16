import { Gallery, Item } from "react-photoswipe-gallery";
import CollectionsIcon from '@mui/icons-material/Collections';

export default function Slider1({ data }) {
  // Split the file_path string into an array of image URLs
  const filePaths = data[0]?.file_path || "";
  const imageItems = filePaths.split(',');

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
        {/* <button
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
        </button> */}

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
            <Item original={imageItems[0]} thumbnail={imageItems[0]} width={500} height={500}>
              {({ ref, open }) => (
                <img
                  ref={ref}
                  onClick={open}
                  src={imageItems[0]}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                  alt="Image 1"
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
              <Item original={imageItems[1]} thumbnail={imageItems[1]} width={500} height={500}>
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
                      src={imageItems[1]}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      alt="Image 2"
                    />
                  </div>
                )}
              </Item>
              <Item original={imageItems[2]} thumbnail={imageItems[2]} width={500} height={500}>
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
                      src={imageItems[2]}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      alt="Image 3"
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
              <Item original={imageItems[3]} thumbnail={imageItems[3]} width={500} height={500}>
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
                      src={imageItems[3]}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      alt="Image 4"
                    />
                  </div>
                )}
              </Item>
              <Item original={imageItems[4]} thumbnail={imageItems[4]} width={500} height={500}>
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
                      src={imageItems[4]}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      alt="Image 5"
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
