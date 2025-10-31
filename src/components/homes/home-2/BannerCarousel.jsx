import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import { IconButton } from "@mui/material";
import NorthEastIcon from '@mui/icons-material/NorthEast';
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import { getEventsList } from "@/apiCalls";

export default function BottomCarousel() {
    const [events, setEvents] = useState([]);
    const [activeTab, setActiveTab] = useState('upcoming'); // State for active tab

    const fetchEvents = async () => {
        try {
            const flag = activeTab === 'upcoming' ? true : false;
            const currentPage = 1;
            const data = await getEventsList(flag, currentPage);
            if (data.success) {
                // Parse image strings to arrays for each event
                const parsedEvents = data.data.map(event => ({
                    ...event,
                    image: JSON.parse(event.image || '[]')
                }));
                setEvents(parsedEvents);
            } else {
                // toast.error(data.message)
            }
        } catch (err) {
            console.error('Error fetching categories:', err);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, [activeTab]);

    const CustomNextArrow = (props) => {
        const { onClick } = props;
        return (
            <IconButton
                onClick={onClick}
                style={{
                    position: "absolute",
                    bottom: "-25%",
                    right: "10%", // Fixed: Position next arrow on the right
                    transform: "translateY(-50%)",
                    zIndex: 10,
                    color: "#000",
                }}
            >
                <EastIcon />
            </IconButton>
        );
    };

    const CustomPrevArrow = (props) => {
        const { onClick } = props;
        return (
            <IconButton
                onClick={onClick}
                className="icon-btn-right"
                style={{
                    position: "absolute",
                    bottom: "-25%",
                    left: "10%", // Fixed: Position prev arrow on the left
                    transform: "translateY(-50%)",
                    zIndex: 10,
                    color: "#000",
                }}
            >
                <WestIcon />
            </IconButton>
        );
    };

    const settings = {
        dots: false,
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    const getTabTitle = () => {
        return activeTab === 'upcoming' ? 'Upcoming Events' : 'Past Events';
    };

    return (
        <section className="property-carousel custom-container" style={{ background: '#ffffff', marginBottom: '50px' }}>
            <style>
                {`
                .list-header-custom {
                    display:flex;
                    flex-direction: row;
                    justify-content:space-between;
                    align-items:center;
                }
                .custom-last-two{
                        width:100%;
                    display:flex;
                    flex-direction:row;
                }
                @media (max-width: 768px) {
                    .list-header-custom {
                        flex-direction: column;
                        align-items: flex-start;
                    }
                    .filter-list{
                    width:100%;
                    overflow:auto;
                    padding:10px 0 20px;
                    }
                    .custom-two{
                    width:100%;
                    }
                    .custom-last-two{
                    width:100%;
                    display:flex;
                    flex-direction:row;
                    }
                    .custom-two > p {
                    width: max-content;
                    }
                }
                `}
            </style>
            <div className="container custom-container-header ">
                <div className="list-header-custom">
                    <div>
                        <h3 className="carousel-title">
                            i5 Property Stars <br />
                            {getTabTitle()}
                        </h3>
                    </div>
                    <div className="d-flex gap-3 filter-list" style={{ fontWeight: 'bold', fontSize: '1rem' }}>
                        <div className="custom-two">
                            <p 
                                onClick={() => setActiveTab('upcoming')} 
                                style={{ cursor: 'pointer', color: activeTab === 'upcoming' ? '#007bff' : 'inherit' }}
                            >
                                Upcoming Events
                            </p>
                        </div>
                        <div className="custom-last-two">
                            <p 
                                onClick={() => setActiveTab('past')} 
                                style={{ cursor: 'pointer', color: activeTab === 'past' ? '#007bff' : 'inherit' }}
                            >
                                Past Events
                            </p>
                            <NorthEastIcon sx={{ margin: ' -5px 0px 0px 5px' }} />
                        </div>
                    </div>
                </div>
                <div className="custom-multi-banner">
                    <Slider {...settings}>
                        {events.length > 0 && events.map((elm, index) => (
                            <div style={{ margin: '0 10px' }} key={index}>
                                {elm.image.length > 0 ? (
                                    <img 
                                        style={{ width: '90%', borderRadius: '8px', margin: '0px auto', maxHeight: '350px', minHeight: '350px' }} 
                                        src={elm.image[0]} 
                                        alt={elm.title || "banner"} 
                                    />
                                ) : (
                                    <div 
                                        style={{ 
                                            width: '90%', 
                                            height: '350px', 
                                            backgroundColor: '#f0f0f0', 
                                            borderRadius: '8px', 
                                            margin: '0px auto', 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            justifyContent: 'center',
                                            color: '#999'
                                        }}
                                    >
                                        No Image Available
                                    </div>
                                )}
                            </div>
                        ))}
                    </Slider>
                        {events.length === 0 && (
                            <div style={{width: "100%", padding: '100px 0', display: "flex", justifyContent: "center" }}>
                                No events available.
                            </div>
                        )}
                </div>
            </div>
        </section>
    );
}