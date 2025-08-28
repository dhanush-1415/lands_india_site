import { Gallery, Item } from "react-photoswipe-gallery";
import CollectionsIcon from '@mui/icons-material/Collections';

export default function Slider1({ data }) {
  // Split the file_path string into an array of image URLs
  const filePaths = (data && data[0]?.file_path) || "";
  const imageItems = filePaths ? filePaths.split(',').map((s) => s.trim()).filter(Boolean) : [];

  return (
    <Gallery>
      <section
        className="flat-slider-detail-v1 px-10"
        style={{
          height: "auto",
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

        {imageItems.length > 0 && (
          <>
            <div className="images-container">
              {imageItems.length === 3 ? (
                <div className="mosaic-grid-3">
                  <Item original={imageItems[0]} thumbnail={imageItems[0]} width={1600} height={900} key={`${imageItems[0]}-0`}>
              {({ ref, open }) => (
                      <div className="mosaic-left" onClick={open} ref={ref}>
                        <img src={imageItems[0]} alt="Image 1" />
                      </div>
              )}
            </Item>
                  <div className="mosaic-right-1">
                    {imageItems.slice(1, 3).map((src, index) => (
                      <Item original={src} thumbnail={src} width={1600} height={900} key={`${src}-${index + 1}`}>
                        {({ ref, open }) => (
                          <div className="mosaic-cell" onClick={open} ref={ref}>
                            <img src={src} alt={`Image ${index + 2}`} />
          </div>
                        )}
                      </Item>
                    ))}
                  </div>
                </div>
              ) : imageItems.length === 4 ? (
                <div className="mosaic-grid-4">
                  <Item original={imageItems[0]} thumbnail={imageItems[0]} width={1600} height={900} key={`${imageItems[0]}-0`}>
                {({ ref, open }) => (
                      <div className="mosaic-left" onClick={open} ref={ref}>
                        <img src={imageItems[0]} alt="Image 1" />
                  </div>
                )}
              </Item>
                  <div className="mosaic-right-4">
                    {imageItems.slice(1, 4).map((src, index) => (
                      <Item original={src} thumbnail={src} width={1600} height={900} key={`${src}-${index + 1}`}>
                {({ ref, open }) => (
                          <div className="mosaic-cell" onClick={open} ref={ref}>
                            <img src={src} alt={`Image ${index + 2}`} />
                          </div>
                        )}
                      </Item>
                    ))}
                  </div>
                </div>
              ) : imageItems.length >= 5 ? (
                <div className="mosaic-grid-5">
                  <Item original={imageItems[0]} thumbnail={imageItems[0]} width={1600} height={900} key={`${imageItems[0]}-0`}>
                    {({ ref, open }) => (
                      <div className="mosaic-left" onClick={open} ref={ref}>
                        <img src={imageItems[0]} alt="Image 1" />
                  </div>
                )}
              </Item>
                  <div className="mosaic-right">
                    {imageItems.slice(1, 5).map((src, index) => {
                      const isLastVisible = index === 3 && imageItems.length > 5;
                      const remainingCount = Math.max(imageItems.length - 5, 0);
                      return (
                        <Item original={src} thumbnail={src} width={1600} height={900} key={`${src}-${index + 1}`}>
                          {({ ref, open }) => (
                            <div className="mosaic-cell" onClick={open} ref={ref}>
                              <img src={src} alt={`Image ${index + 2}`} />
                              {isLastVisible && (
                                <div className="more-overlay">+{remainingCount}</div>
                              )}
            </div>
                          )}
                        </Item>
                      );
                    })}
                  </div>
                 {imageItems.length > 5 && (
                   <div style={{ display: 'none' }}>
                     {imageItems.slice(5).map((src, index) => (
                       <Item original={src} thumbnail={src} width={1600} height={900} key={`${src}-hidden-${index}`}>
                         {({ ref }) => (
                           <img ref={ref} src={src} alt={`Image hidden ${index + 6}`} />
                )}
              </Item>
                     ))}
                   </div>
                 )}
                </div>
              ) : (
                <>
                  <div className="image-grid">
                    {imageItems.slice(0, 5).map((src, index) => {
                      const isFifthWithMore = index === 4 && imageItems.length > 5;
                      const remainingCount = Math.max(imageItems.length - 5, 0);
                      return (
                        <Item original={src} thumbnail={src} width={1600} height={900} key={`${src}-${index}`}>
                {({ ref, open }) => (
                            <div className="image-card" onClick={open} ref={ref}>
                              <img
                                src={src}
                                alt={`Image ${index + 1}`}
                    />
                              {isFifthWithMore && (
                                <div className="more-overlay">+{remainingCount}</div>
                              )}
                            </div>
                          )}
                        </Item>
                      );
                    })}
                  </div>
                  {imageItems.length > 5 && (
                    <div style={{ display: 'none' }}>
                      {imageItems.slice(5).map((src, index) => (
                        <Item original={src} thumbnail={src} width={1600} height={900} key={`${src}-hidden-${index}`}>
                          {({ ref }) => (
                            <img ref={ref} src={src} alt={`Image hidden ${index + 6}`} />
                )}
              </Item>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </>
        )}

        {/* Responsive Styles */}
        <style>
          {`
            .flat-slider-detail-v1 .images-container {
              width: 90%;
              margin: 0 auto;
            }
            .flat-slider-detail-v1 .image-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
              gap: 10px;
              width: 100%;
            }

            .flat-slider-detail-v1 .image-card {
              position: relative;
              width: 100%;
              padding-top: 66.666%; /* 3:2 ratio */
              overflow: hidden;
              border-radius: 8px;
              cursor: pointer;
            }

            .flat-slider-detail-v1 .image-card img {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              object-fit: cover;
            }

            .flat-slider-detail-v1 .more-overlay {
              position: absolute;
              inset: 0;
              background: rgba(0, 0, 0, 0.45);
              color: #fff;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: 600;
              font-size: 28px;
              letter-spacing: 0.5px;
            }

            .flat-slider-detail-v1 .mosaic-grid-5 {
              display: grid;
              grid-template-columns: 50% 50%;
              grid-template-rows: 1fr 1fr;
              gap: 10px;
              width: 100%;
              height: 70vh;
            }
            .flat-slider-detail-v1 .mosaic-grid-5 .mosaic-right {
              grid-column: 2;
              grid-row: 1 / span 2;
              display: grid;
              grid-template-columns: 1fr 1fr;
              grid-template-rows: 1fr 1fr;
              gap: 10px;
            }
            .flat-slider-detail-v1 .mosaic-grid-3 {
              display: grid;
              grid-template-columns: 50% 50%;
              grid-template-rows: 1fr 1fr;
              gap: 10px;
              width: 100%;
              height: 65vh;
            }
            .flat-slider-detail-v1 .mosaic-right-1 {
              grid-column: 2;
              grid-row: 1 / span 2;
              display: grid;
              grid-template-rows: 1fr 1fr;
              gap: 10px;
            }
            .flat-slider-detail-v1 .mosaic-grid-4 {
              display: grid;
              grid-template-columns: 50% 50%;
              grid-template-rows: 1fr 1fr;
              gap: 10px;
              width: 100%;
              height: 70vh;
            }
            .flat-slider-detail-v1 .mosaic-grid-4 .mosaic-right-4 {
              grid-column: 2;
              grid-row: 1 / span 2;
              display: grid;
              grid-template-columns: 1fr 1fr;
              grid-template-rows: 1fr 1fr;
              gap: 10px;
            }
            .flat-slider-detail-v1 .mosaic-grid-4 .mosaic-right-4 .mosaic-cell:nth-child(3) {
              grid-column: 1 / span 2;
            }

            .flat-slider-detail-v1 .mosaic-left {
              position: relative;
              width: 100%;
              height: 100%;
              grid-row: 1 / span 2;
              overflow: hidden;
              border-radius: 8px;
              cursor: pointer;
            }

            .flat-slider-detail-v1 .mosaic-left img {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              object-fit: cover;
            }

            .flat-slider-detail-v1 .mosaic-cell {
              position: relative;
              width: 100%;
              height: 100%;
              overflow: hidden;
              border-radius: 8px;
              cursor: pointer;
            }

            .flat-slider-detail-v1 .mosaic-cell img {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              object-fit: cover;
            }

            @media (max-width: 768px) {
              .flat-slider-detail-v1 {
                height: auto;
              }
              .flat-slider-detail-v1 .images-container {
                width: 100%;
                padding: 0 10px;
              }
              .flat-slider-detail-v1 .image-grid {
                grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
                gap: 8px;
              }
              .flat-slider-detail-v1 .image-card {
                padding-top: 62.5%; /* 16:10 ratio on mobile */
              }
              .flat-slider-detail-v1 .more-overlay {
                font-size: 22px;
              }
              .flat-slider-detail-v1 .mosaic-grid-5,
              .flat-slider-detail-v1 .mosaic-grid-3,
              .flat-slider-detail-v1 .mosaic-grid-4 {
                grid-template-columns: 1fr;
                grid-template-rows: auto;
                height: auto;
              }
              .flat-slider-detail-v1 .mosaic-left,
              .flat-slider-detail-v1 .mosaic-cell {
                height: auto;
                aspect-ratio: 16 / 9; /* ensure visible height on mobile */
              }
              .flat-slider-detail-v1 .mosaic-right-1 {
                grid-row: auto;
              }
            }
          `}
        </style>
      </section>
    </Gallery>
  );
}
