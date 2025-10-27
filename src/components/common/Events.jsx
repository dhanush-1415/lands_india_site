import { agents } from "@/data/agents";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination as SwiperPagination } from "swiper/modules";
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

    const [imagesData, setImageData] = useState([]);

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

    const [data, setData] = useState([]);
    const [sorted, setSorted] = useState();
    const [itemPerPage, setItemPerPage] = useState(9);
    const [activeTab, setActiveTab] = useState('upcoming');
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [loading, setLoading] = useState(false);

    const handleChange = (name) => {
        setActiveTab(name)
        setCurrentPage(1)
    }

    const fetchAgents = async () => {
        // Changed: Pass boolean true/false instead of 1/0
        const flag = activeTab === 'upcoming' ? true : false;
        setLoading(true);
        
        try {
            const response = await getEventsList(flag, currentPage);
            
            if (response.success) {
                // Process the data
                const processedData = response.data.map(event => {
                    let parsedImages = [];
                    
                    // Handle different image formats
                    if (typeof event.image === 'string') {
                        try {
                            parsedImages = JSON.parse(event.image);
                        } catch (e) {
                            console.error('Error parsing image:', e);
                            parsedImages = [];
                        }
                    } else if (Array.isArray(event.image)) {
                        parsedImages = event.image;
                    }
                    
                    return {
                        ...event,
                        image: parsedImages
                    };
                });
                
                setData(processedData);
                
                // Set image data for past events
                if (activeTab === 'past') {
                    setImageData(processedData);
                } else {
                    setImageData([]);
                }
                
                // Handle pagination - with defaults
                if (response.pagination) {
                    setTotalItems(response.pagination.totalItems || 0);
                    setCurrentPage(response.pagination.currentPage || 1);
                    setPageSize(response.pagination.pageSize || 10);
                    setTotalPages(response.pagination.totalPages || 0);
                }
            } else {
                // Reset all data if response is not successful
                setData([]);
                setImageData([]);
                setTotalItems(0);
                setTotalPages(0);
            }
        } catch (err) {
            console.error('Error fetching events:', err);
            // Reset all data on error
            setData([]);
            setImageData([]);
            setTotalItems(0);
            setTotalPages(0);
        } finally {
            setLoading(false);
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
                    object-fit: cover;
                }

                .no-events-message {
                    text-align: center;
                    padding: 40px 20px;
                    font-size: 18px;
                    color: #666;
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
                
                {loading ? (
                    <div className="no-events-message">Loading events...</div>
                ) : activeTab === 'upcoming' ? (
                    <>
                        <div className="container custom-container-header" style={{ padding: '30px 0 40px' }}>
                            {data?.length > 0 ? (
                                <Swiper
                                    modules={[SwiperPagination]}
                                    spaceBetween={20}
                                    slidesPerView={1}
                                    breakpoints={{
                                        575: {
                                            slidesPerView: 2,
                                        },
                                        768: {
                                            slidesPerView: 3,
                                        },
                                        1024: {
                                            slidesPerView: 4,
                                        },
                                    }}
                                    pagination={{
                                        clickable: true,
                                        dynamicBullets: true,
                                    }}
                                    style={{ padding: '0px 20px', overflow: 'visible' }}
                                >
                                    {data.map((event) => (
                                        <SwiperSlide key={event.id}>
                                            <div
                                                className="box-agent hover-img wow fadeInUp"
                                                style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px", borderRadius: '3px' }}
                                            >
                                                {event.image && event.image.length > 0 && (
                                                    <>
                                                        {/\.(mp4|webm|ogg|avi|mov|flv|mkv)$/i.test(event.image[0]) ? (
                                                            <video
                                                                controls
                                                                className="custom-image-slide"
                                                            >
                                                                <source src={event.image[0]} type="video/mp4" />
                                                                Your browser does not support the video tag.
                                                            </video>
                                                        ) : /\.(jpeg|jpg|png|gif|bmp|webp|svg)$/i.test(event.image[0]) ? (
                                                            <img src={event.image[0] || ''} className="custom-image-slide" alt={event.title || 'event'} />
                                                        ) : null}
                                                    </>
                                                )}
                                                {(!event.image || event.image.length === 0) && (
                                                    <div className="custom-image-slide" style={{ 
                                                        display: 'flex', 
                                                        alignItems: 'center', 
                                                        justifyContent: 'center',
                                                        background: '#f0f0f0',
                                                        color: '#999'
                                                    }}>
                                                        No Image Available
                                                    </div>
                                                )}
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            ) : (
                                <div className="no-events-message">
                                    No upcoming events available at the moment.
                                </div>
                            )}
                        </div>

                        {totalItems > 0 && (
                            <ul className="wd-navigation mt-20" style={{ justifyContent: 'center' }} >
                                <Pagination
                                    currentPage={currentPage}
                                    setPage={setCurrentPage}
                                    itemLength={totalItems}
                                    itemPerPage={pageSize}
                                />
                            </ul>
                        )}
                    </>
                ) : (
                    <>
                        <div className="container custom-container-header" style={{ padding: '30px 0 40px' }}>
                            {imagesData?.length > 0 ? (
                                <Swiper
                                    modules={[SwiperPagination]}
                                    spaceBetween={20}
                                    slidesPerView={1}
                                    breakpoints={{
                                        575: {
                                            slidesPerView: 2,
                                        },
                                        768: {
                                            slidesPerView: 3,
                                        },
                                        1024: {
                                            slidesPerView: 4,
                                        },
                                    }}
                                    pagination={{
                                        clickable: true,
                                        dynamicBullets: true,
                                    }}
                                    style={{ padding: '0px 20px', overflow: 'visible' }}
                                >
                                    {imagesData.map((event) => (
                                        <SwiperSlide key={event.id}>
                                            <div
                                                className="box-agent hover-img wow fadeInUp"
                                                onClick={() => event.image && event.image.length > 0 && handleImageClick(event.image, 0)}
                                                style={{ 
                                                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px", 
                                                    borderRadius: '3px',
                                                    cursor: event.image && event.image.length > 0 ? 'pointer' : 'default'
                                                }}
                                            >
                                                {event.image && event.image.length > 0 && (
                                                    <>
                                                        {/\.(mp4|webm|ogg|avi|mov|flv|mkv)$/i.test(event.image[0]) ? (
                                                            <video
                                                                controls
                                                                className="custom-image-slide"
                                                            >
                                                                <source src={event.image[0]} type="video/mp4" />
                                                                Your browser does not support the video tag.
                                                            </video>
                                                        ) : /\.(jpeg|jpg|png|gif|bmp|webp|svg)$/i.test(event.image[0]) ? (
                                                            <img src={event.image[0] || ''} className="custom-image-slide" alt={event.title || 'event'} />
                                                        ) : null}
                                                    </>
                                                )}
                                                {(!event.image || event.image.length === 0) && (
                                                    <div className="custom-image-slide" style={{ 
                                                        display: 'flex', 
                                                        alignItems: 'center', 
                                                        justifyContent: 'center',
                                                        background: '#f0f0f0',
                                                        color: '#999'
                                                    }}>
                                                        No Image Available
                                                    </div>
                                                )}
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            ) : (
                                <div className="no-events-message">
                                    No past events available at the moment.
                                </div>
                            )}

                            <Modal
                                show={showModal}
                                onHide={() => setShowModal(false)}
                                centered
                                dialogClassName="custom-modal"
                                backdropClassName="custom-backdrop"
                                style={{ display: 'block' }}
                            >
                                <Modal.Body style={{ padding: 0, background: 'transparent' }}>
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
                                            zIndex: 1050,
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
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                color: 'white',
                                                fontSize: '3rem',
                                                zIndex: 1,
                                            }}
                                            onClick={handlePrev}
                                            disabled={currentGroup.length <= 1}
                                        >
                                            <ArrowBackIosIcon fontSize="inherit" sx={{ color: "#008FF7" }} />
                                        </IconButton>

                                        {currentGroup.length > 0 && currentIndex < currentGroup.length ? (
                                            <>
                                                {/\.(mp4|webm|ogg|avi|mov|flv|mkv)$/i.test(currentGroup[currentIndex]) ? (
                                                    <video
                                                        controls
                                                        autoPlay
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
                                            </>
                                        ) : (
                                            <div
                                                style={{
                                                    color: 'white',
                                                    fontSize: '1.5rem',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                No images available
                                            </div>
                                        )}

                                        <IconButton
                                            style={{
                                                position: 'absolute',
                                                right: 20,
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                color: 'white',
                                                fontSize: '3rem',
                                                zIndex: 1,
                                            }}
                                            onClick={handleNext}
                                            disabled={currentGroup.length <= 1}
                                        >
                                            <ArrowForwardIosIcon fontSize="inherit" sx={{ color: "#008FF7" }} />
                                        </IconButton>
                                    </div>
                                </Modal.Body>
                            </Modal>
                        </div>

                        {totalItems > 0 && (
                            <ul className="wd-navigation mt-20" style={{ justifyContent: 'center' }} >
                                <Pagination
                                    currentPage={currentPage}
                                    setPage={setCurrentPage}
                                    itemLength={totalItems}
                                    itemPerPage={pageSize}
                                />
                            </ul>
                        )}
                    </>
                )}
            </section>
            <Footer2 />
        </>
    );
}