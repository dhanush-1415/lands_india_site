import { agents } from "@/data/agents";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Divider } from "@mui/material";
import { Button } from "react-bootstrap";
import { getEventsList } from "@/apiCalls";
import DropdownSelect from "./DropdownSelect";
import { Gallery, Item } from "react-photoswipe-gallery";

import Pagination from "./Pagination";
import Footer2 from "../footer/Footer2";
import { Upcoming } from "@mui/icons-material";
import { Container, Row, Col, Modal } from "react-bootstrap";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CallIcon from '@mui/icons-material/Call';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';


export default function Events() {



    // const imagesData = [
    //     {
    //         id: 1,
    //         images: [
    //             "https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=1024x1024&w=0&k=20&c=z8_rWaI8x4zApNEEG9DnWlGXyDIXe-OmsAyQ5fGPVV8=",
    //             "https://static.vecteezy.com/system/resources/thumbnails/026/746/427/small_2x/illustration-image-nature-and-sustainability-eco-friendly-living-and-conservation-concept-art-of-earth-and-animal-life-in-different-environments-generative-ai-illustration-free-photo.jpg",
    //             "https://static.vecteezy.com/system/resources/thumbnails/024/669/489/small_2x/mountain-countryside-landscape-at-sunset-dramatic-sky-over-a-distant-valley-green-fields-and-trees-on-hill-beautiful-natural-landscapes-of-the-carpathians-generative-ai-variation-5-photo.jpeg",
    //         ],
    //     },
    //     {
    //         id: 2,
    //         images: [
    //             "https://media.istockphoto.com/id/1403500817/photo/the-craggies-in-the-blue-ridge-mountains.jpg?s=612x612&w=0&k=20&c=N-pGA8OClRVDzRfj_9AqANnOaDS3devZWwrQNwZuDSk=",
    //             "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
    //         ],
    //     },
    //     {
    //         id: 3,
    //         images: [
    //             "https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=1024x1024&w=0&k=20&c=z8_rWaI8x4zApNEEG9DnWlGXyDIXe-OmsAyQ5fGPVV8=",
    //             "https://static.vecteezy.com/system/resources/thumbnails/026/746/427/small_2x/illustration-image-nature-and-sustainability-eco-friendly-living-and-conservation-concept-art-of-earth-and-animal-life-in-different-environments-generative-ai-illustration-free-photo.jpg",
    //             "https://static.vecteezy.com/system/resources/thumbnails/024/669/489/small_2x/mountain-countryside-landscape-at-sunset-dramatic-sky-over-a-distant-valley-green-fields-and-trees-on-hill-beautiful-natural-landscapes-of-the-carpathians-generative-ai-variation-5-photo.jpeg",
    //             "https://media.istockphoto.com/id/1403500817/photo/the-craggies-in-the-blue-ridge-mountains.jpg?s=612x612&w=0&k=20&c=N-pGA8OClRVDzRfj_9AqANnOaDS3devZWwrQNwZuDSk=",
    //         ],
    //     },
    //     {
    //         id: 4,
    //         images: [
    //             "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
    //         ],
    //     },
    // ];

    const [imagesData, setImageData] = useState();


    const [showModal, setShowModal] = useState(false);
    const [currentGroup, setCurrentGroup] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleImageClick = (images, index) => {
        setCurrentGroup(images);
        setCurrentIndex(index);
        setShowModal(true);
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % currentGroup.length);
    };

    const handlePrev = () => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + currentGroup.length) % currentGroup.length
        );
    };



    const [data, setData] = useState();
    const [sorted, setSorted] = useState();
    const [itemPerPage, setItemPerPage] = useState(9);
    const [activeTab, setActiveTab] = useState('upcoming');
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const handleChange = (name) => {
        setActiveTab(name)
        setCurrentPage(1)
    }

    const fetchAgents = async () => {
        const flag = activeTab === 'upcoming' ? 1 : 0;
        try {
            const data = await getEventsList(flag, currentPage);
            if (data.success) {
                if (data.data.length  >= 1) {
                    setData(data.data);
                    if (activeTab === 'past') {
                        setImageData(data.data)
                    }
                } else {
                    setData()
                }
                if (data.pagination) {
                    setTotalItems(data.pagination.totalItems)
                    setCurrentPage(data.pagination.currentPage)
                }
            } else {
                toast.error(data.message);
                setData()
            }
        } catch (err) {
            setData()
            console.error('Error fetching categories:', err);
        }
    };

    useEffect(() => {
        fetchAgents();
    }, [activeTab, currentPage]);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <>
            <section className="flat-section flat-agents" style={{ paddingTop: '0px' }}>
                <style>{`
                .tabs-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 15px;
                    margin: 20px 0;
                    flex-wrap: wrap;
                }

                .tab {
                    padding: 10px 20px;
                    border: 2px solid #008ff7;
                    border-radius: 0px;
                    font-size: 16px;
                    font-weight: 500;
                    color: #008ff7;
                    background-color: white;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    text-align: center;
                    min-width: 150px;
                }

                .tab.active {
                    background-color: #008ff7;
                    color: white;
                    border-color: #008ff7;
                    box-shadow: 0px 4px 8px rgba(0, 123, 255, 0.2);
                }

                .tab:hover {
                    background-color: #008ff7;
                    color: white;
                    border-color: #008ff7;
                }

                .custom-image-slide{
                    width:100%;
                    min-height:270px;
                    max-height:270px;
                }

                @media (max-width: 768px) {
                    .tabs-container {
                    flex-direction: column;
                    gap: 10px;
                    }

                    .tab {
                    width: 80%;
                    }
                }
                `}</style>
                <div style={{ background: '#f0f3f4', padding: '20px 0' }}>
                    <div style={{ width: '80%', margin: '50px auto' }}>
                        <h4>Events</h4>
                    </div>
                </div>
                <div className="tabs-container" style={{ padding: '30px 0' }}>
                    <div
                        className={`tab ${activeTab === 'upcoming' ? 'active' : ''}`}
                        onClick={() => handleChange('upcoming')}
                    >
                        Upcoming Events
                    </div>
                    <div
                        className={`tab ${activeTab === 'past' ? 'active' : ''}`}
                        onClick={() => handleChange('past')}
                    >
                        Past Events
                    </div>
                </div>
                {activeTab === 'upcoming' ? (
                    <>
                        <div className="container custom-container-header" style={{ padding: '30px 0 40px' }}>
                            <div className="swiper tf-sw-mobile-1 non-swiper-on-575" style={{ overflow: 'visible', padding: '0px 20px' }}>
                                <div className="tf-layout-mobile-sm xl-col-4 sm-col-2 swiper-wrapper">
                                    {data?.length  >= 1 && data.map((event) => (
                                        <SwiperSlide key={event.id} className="swiper-slide">
                                            <div
                                                className="box-agent hover-img wow fadeInUp"
                                                style={{ animationDelay: event.wowDelay, boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px", borderRadius: '3px' }} // WOW.js animation delay
                                            >
                                                  {/\.(mp4|webm|ogg|avi|mov|flv|mkv)$/i.test(event?.image[0]) ? (
                                                    <video
                                                        controls
                                                        className="custom-image-slide"
                                                    >
                                                        <source src={event?.image[0]} type="video/mp4" />
                                                        Your browser does not support the video tag.
                                                    </video>
                                                ) : /\.(jpeg|jpg|png|gif|bmp|webp|svg)$/i.test(event?.image[0]) ? (
                                                    <img src={event?.image[0] || ''} className="custom-image-slide" alt="sin" />
                                                ) : (
                                                    <></>
                                                )}
                                                
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </div>
                                <div className="sw-pagination spb3 sw-pagination-mb-1 text-center d-sm-none d-block" />
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
                    </>
                ) : (
                    <>
                        <div className="container custom-container-header" style={{ padding: '30px 0 40px' }}>
                            <div className="swiper tf-sw-mobile-1 non-swiper-on-575" style={{ overflow: 'visible', padding: '0px 20px' }}>
                                <div className="tf-layout-mobile-sm xl-col-4 sm-col-2 swiper-wrapper">
                                    {/* {data?.length && data.map((event) => (
                                        <SwiperSlide key={event.id} className="swiper-slide">
                                            <div
                                                className="box-agent hover-img wow fadeInUp"
                                                style={{ animationDelay: event.wowDelay, boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px", borderRadius: '3px' }} // WOW.js animation delay
                                            >
                                                <img src={event.images[0]} alt="sin" />
                                            </div>
                                        </SwiperSlide>
                                    ))} */}

                                    {/* {imageData.map((event) => (
                                        <SwiperSlide key={event.id} className="swiper-slide">
                                            <div
                                                className="box-agent hover-img wow fadeInUp"
                                                style={{ animationDelay: event.wowDelay, boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px", borderRadius: '3px' }} // WOW.js animation delay
                                            >
                                                <Gallery>
                                                    <img src={event.images[0].url || ''} alt="sin" />
                                                </Gallery>
                                            </div>
                                        </SwiperSlide>
                                    ))} */}
                                    {imagesData?.length  >= 1 && imagesData.map((event) => (
                                        <SwiperSlide key={event.id} className="swiper-slide">
                                            <div
                                                className="box-agent hover-img wow fadeInUp"
                                                onClick={() => handleImageClick(event.image, 0)}
                                                style={{ animationDelay: event.wowDelay, boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px", borderRadius: '3px' }} // WOW.js animation delay
                                            >
                                                {/\.(mp4|webm|ogg|avi|mov|flv|mkv)$/i.test(event?.image[0]) ? (
                                                    <video
                                                        controls
                                                        className="custom-image-slide"
                                                    >
                                                        <source src={event?.image[0]} type="video/mp4" />
                                                        Your browser does not support the video tag.
                                                    </video>
                                                ) : /\.(jpeg|jpg|png|gif|bmp|webp|svg)$/i.test(event?.image[0]) ? (
                                                    <img src={event?.image[0] || ''} className="custom-image-slide" alt="sin" />
                                                ) : (
                                                    <></>
                                                )}
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                    <Modal
                                        show={showModal}
                                        onHide={() => setShowModal(false)}
                                        centered
                                        dialogClassName="custom-modal"
                                    >
                                        <div className="modal-content-wrapper">
                                            {showModal && (
                                                <div
                                                    style={{
                                                        position: 'fixed',
                                                        top: 0,
                                                        left: 0,
                                                        width: '100%',
                                                        height: '100%',
                                                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        zIndex: 1000,
                                                    }}
                                                >
                                                    <IconButton
                                                        style={{
                                                            position: 'absolute',
                                                            top: 20,
                                                            right: 20,
                                                            color: 'white',
                                                            fontSize: '2rem',
                                                        }}
                                                        onClick={() => setShowModal(false)}
                                                    >
                                                        <CloseIcon fontSize="inherit" sx={{ color: "#008FF7" }} />
                                                    </IconButton>

                                                    <IconButton
                                                        style={{
                                                            position: 'absolute',
                                                            left: 20,
                                                            color: 'white',
                                                            fontSize: '3rem',
                                                            zIndex: 1,
                                                        }}
                                                        onClick={handlePrev}
                                                    >
                                                        <ArrowBackIosIcon fontSize="inherit" sx={{ color: "#008FF7" }} />
                                                    </IconButton>

                                                    {/\.(mp4|webm|ogg|avi|mov|flv|mkv)$/i.test(currentGroup[currentIndex]) ? (
                                                        <video
                                                            controls
                                                            style={{
                                                                maxWidth: '80%',
                                                                maxHeight: '80%',
                                                                minHeight: '55vh',
                                                                minWidth: '55vh',
                                                                borderRadius: '1%',
                                                            }}
                                                        >
                                                            <source src={currentGroup[currentIndex]} type="video/mp4" />
                                                            Your browser does not support the video tag.
                                                        </video>
                                                    ) : /\.(jpeg|jpg|png|gif|bmp|webp|svg)$/i.test(currentGroup[currentIndex]) ? (
                                                        <img
                                                            src={currentGroup[currentIndex]}
                                                            alt="Zoomed"
                                                            style={{
                                                                maxWidth: '80%',
                                                                maxHeight: '80%',
                                                                minHeight: '55vh',
                                                                minWidth: '55vh',
                                                                objectFit: 'contain',
                                                                borderRadius: '1%',
                                                            }}
                                                        />
                                                    ) : (
                                                        <div
                                                            style={{
                                                                color: 'white',
                                                                fontSize: '1.5rem',
                                                                textAlign: 'center',
                                                            }}
                                                        >
                                                            Unsupported file format
                                                        </div>
                                                    )}

                                                    <IconButton
                                                        style={{
                                                            position: 'absolute',
                                                            right: 20,
                                                            color: 'white',
                                                            fontSize: '3rem',
                                                            zIndex: 1,
                                                        }}
                                                        onClick={handleNext}
                                                    >
                                                        <ArrowForwardIosIcon fontSize="inherit" sx={{ color: "#008FF7" }} />
                                                    </IconButton>
                                                </div>
                                            )}
                                        </div>
                                    </Modal>

                                    {/* 

                                    <Modal
                                        show={showModal}
                                        onHide={() => setShowModal(false)}
                                        centered
                                        dialogClassName="custom-modal"
                                    >
                                        <div className="modal-content-wrapper">
                                            {showModal && (
                                                <div style={{
                                                    position: 'fixed',
                                                    top: 0,
                                                    left: 0,
                                                    width: '100%',
                                                    height: '100%',
                                                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    zIndex: 1000,
                                                }}
                                                >
                                                    <IconButton
                                                        style={{
                                                            position: 'absolute',
                                                            top: 20,
                                                            right: 20,
                                                            color: 'white',
                                                            fontSize: '2rem',
                                                        }}
                                                        onClick={() => setShowModal(false)}
                                                    >
                                                        <CloseIcon fontSize="inherit" sx={{ color: "#008FF7" }} />
                                                    </IconButton>

                                                    <IconButton
                                                        style={{
                                                            position: 'absolute',
                                                            left: 20,
                                                            color: 'white',
                                                            fontSize: '3rem',
                                                            zIndex: 1,
                                                        }}
                                                        onClick={handlePrev}
                                                    >
                                                        <ArrowBackIosIcon fontSize="inherit" sx={{ color: "#008FF7" }} />
                                                    </IconButton>

                                                    <img
                                                        src={currentGroup[currentIndex]}
                                                        alt="Zoomed"
                                                        style={{
                                                            maxWidth: '80%',
                                                            maxHeight: '80%',
                                                            minHeight: '55vh',
                                                            minWidth: '55vh',
                                                            objectFit: 'contain',
                                                            borderRadius: '1%',
                                                        }}
                                                    />

                                                    <IconButton
                                                        style={{
                                                            position: 'absolute',
                                                            right: 20,
                                                            color: 'white',
                                                            fontSize: '3rem',
                                                            zIndex: 1,
                                                        }}
                                                        onClick={handleNext}
                                                    >
                                                        <ArrowForwardIosIcon fontSize="inherit" sx={{ color: "#008FF7" }} />
                                                    </IconButton>
                                                </div>
                                            )}

                                        </div>
                                    </Modal> */}

                                </div>
                                <div className="sw-pagination spb3 sw-pagination-mb-1 text-center d-sm-none d-block" />
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
                    </>
                )}
            </section>
            <Footer2 />
        </>
    );
}
