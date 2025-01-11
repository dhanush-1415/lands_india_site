import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import { IconButton } from "@mui/material";
import NorthEastIcon from '@mui/icons-material/NorthEast';
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';

export default function BottomCarousel() {
    const properties = [
        {
            id: 1,
            img: 'https://st4.depositphotos.com/14327976/26436/v/1600/depositphotos_264361400-stock-illustration-modern-square-banner-design-social.jpg'
        },
        {
            id: 2,
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbBP9hP7Jm_4huGfkP_uxcU9ruAa22fOqimg&s'
        },
        {
            id: 3,
            img: 'https://st4.depositphotos.com/14327976/26436/v/1600/depositphotos_264361400-stock-illustration-modern-square-banner-design-social.jpg'
        },
        {
            id: 4,
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbBP9hP7Jm_4huGfkP_uxcU9ruAa22fOqimg&s'
        },
        {
            id: 5,
            img: 'https://st4.depositphotos.com/14327976/26436/v/1600/depositphotos_264361400-stock-illustration-modern-square-banner-design-social.jpg'
        },
        {
            id: 6,
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbBP9hP7Jm_4huGfkP_uxcU9ruAa22fOqimg&s'
        }
    ];

    const CustomNextArrow = (props) => {
        const { onClick } = props;
        return (
            <IconButton
                onClick={onClick}
                style={{
                    position: "absolute",
                    bottom: "-25%",
                    left: "53%",
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
                    right: "52%",
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
        infinite: true,
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

    return (
        <section className="property-carousel" style={{background:'#ffffff'}}>
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
            <div className="container custom-container-header mx-3">
                <div className="list-header-custom">
                    <div>
                        <h3 className="carousel-title">
                            Property Stores <br />
                            Upcoming Events
                        </h3>
                    </div>
                    <div className="d-flex gap-3 filter-list" style={{ fontWeight: 'bold', fontSize: '1rem' }}>
                        <div className="custom-two">
                            <p>Upcoming Events</p>
                        </div>
                        <div className="custom-last-two">
                            <p>Post Events</p>
                            < NorthEastIcon sx={{ margin: ' -5px 0px 0px 5px' }} />
                        </div>
                    </div>
                </div>
                <div className="custom-multi-banner">
                    <Slider {...settings}>
                        {properties.map((property, index) => (
                            <div style={{ margin: '0 10px' }} key={property.id}>
                                <img style={{ width: '90%', borderRadius: '8px', margin: '0px auto' }} src={property.img || ""} alt="banner" />
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </section>
    );
}
