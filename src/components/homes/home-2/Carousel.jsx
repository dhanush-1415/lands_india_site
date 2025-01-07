import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import { IconButton } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import ChairIcon from '@mui/icons-material/Chair';
import StairsIcon from '@mui/icons-material/Stairs';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import HomeIcon from "@mui/icons-material/Home";
import CallIcon from '@mui/icons-material/Call';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';

export default function Carousel() {


    const properties = [
        {
            image:
                "https://images.unsplash.com/photo-1560518883-ce09059eeffa?fm=jpg&q=60&w=3000",
            title: "On-road New House Sale in Udumalpet",
            location: "Udumalpet, Tamil Nadu, India",
            price: "₹97,00,000",
            badges: ["Residential Property", "Posted On: Sep 25"],
            details: [
                { label: "Beds", value: "2", icon: <BedIcon /> },
                { label: "Baths", value: "4", icon: <BathtubIcon /> },
                { label: "Sqft", value: "1744", icon: <SquareFootIcon /> },
                { label: "Furnished", value: "Semi", icon: <HomeIcon /> },
                { label: "Floors", value: "Ground + 1", icon: <StairsIcon /> },
                { label: "Parking", value: "Open", icon: <LocalParkingIcon /> },
            ],
        },
        {
            image:
                "https://images.unsplash.com/photo-1570129477492-45c003edd2be?fm=jpg&q=60&w=3000",
            title: "Modern Apartment in Coimbatore",
            location: "Coimbatore, Tamil Nadu, India",
            price: "₹85,00,000",
            badges: ["Apartment", "Posted On: Sep 22"],
            details: [
                { label: "Beds", value: "3", icon: <BedIcon /> },
                { label: "Baths", value: "3", icon: <BathtubIcon /> },
                { label: "Sqft", value: "1200", icon: <SquareFootIcon /> },
                { label: "Furnished", value: "Fully", icon: <HomeIcon /> },
                { label: "Floors", value: "5th Floor", icon: <StairsIcon /> },
                { label: "Parking", value: "Covered", icon: <LocalParkingIcon /> },
            ],
        },
        {
            image:
                "https://images.unsplash.com/photo-1600585154340-be6161b89bf8?fm=jpg&q=60&w=3000",
            title: "Luxury Villa in Ooty",
            location: "Ooty, Tamil Nadu, India",
            price: "₹1,50,00,000",
            badges: ["Villa", "Posted On: Sep 20"],
            details: [
                { label: "Beds", value: "5", icon: <BedIcon /> },
                { label: "Baths", value: "6", icon: <BathtubIcon /> },
                { label: "Sqft", value: "3000", icon: <SquareFootIcon /> },
                { label: "Furnished", value: "Fully", icon: <HomeIcon /> },
                { label: "Floors", value: "2", icon: <StairsIcon /> },
                { label: "Parking", value: "Private Garage", icon: <LocalParkingIcon /> },
            ],
        },
    ];

    // const properties = [
    //     {
    //         image:
    //             "https://images.unsplash.com/photo-1560518883-ce09059eeffa?fm=jpg&q=60&w=3000",
    //         title: "On-road New House Sale in Udumalpet",
    //         location: "Udumalpet, Tamil Nadu, India",
    //         price: "₹97,00,000",
    //         badges: ["Residential Property", "Posted On: Sep 25"],
    //         details: [
    //             { label: "Beds", value: "2" },
    //             { label: "Baths", value: "4" },
    //             { label: "Sqft", value: "1744" },
    //             { label: "Furnished", value: "Semi" },
    //             { label: "Floors", value: "Ground + 1" },
    //             { label: "Parking", value: "Open" },
    //         ],
    //     },
    //     {
    //         image:
    //             "https://images.unsplash.com/photo-1570129477492-45c003edd2be?fm=jpg&q=60&w=3000",
    //         title: "Modern Apartment in Coimbatore",
    //         location: "Coimbatore, Tamil Nadu, India",
    //         price: "₹85,00,000",
    //         badges: ["Apartment", "Posted On: Sep 22"],
    //         details: [
    //             { label: "Beds", value: "3" },
    //             { label: "Baths", value: "3" },
    //             { label: "Sqft", value: "1200" },
    //             { label: "Furnished", value: "Fully" },
    //             { label: "Floors", value: "5th Floor" },
    //             { label: "Parking", value: "Covered" },
    //         ],
    //     },
    //     {
    //         image:
    //             "https://images.unsplash.com/photo-1600585154340-be6161b89bf8?fm=jpg&q=60&w=3000",
    //         title: "Luxury Villa in Ooty",
    //         location: "Ooty, Tamil Nadu, India",
    //         price: "₹1,50,00,000",
    //         badges: ["Villa", "Posted On: Sep 20"],
    //         details: [
    //             { label: "Beds", value: "5" },
    //             { label: "Baths", value: "6" },
    //             { label: "Sqft", value: "3000" },
    //             { label: "Furnished", value: "Fully" },
    //             { label: "Floors", value: "2" },
    //             { label: "Parking", value: "Private Garage" },
    //         ],
    //     },
    // ];

    const CustomNextArrow = (props) => {
        const { onClick } = props;
        return (
            <IconButton
                onClick={onClick}
                style={{
                    position: "absolute",
                    top: "-8%",
                    right: "3%",
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
                    top: "-8%",
                    right: "7%",
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
        speed: 500,
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
    };

    return (
        <section className="property-carousel">
            <style>
                {`
                
                    .property-carousel {
                        padding: 60px 0;
                        background-color: #f9f9f9;
                    }
                    .custom-cont{
                        display: flex;
                        flex-direction: row;
                        min-height: 395px;
                        max-height: 400px;
                    }
                    .carousel-title {
                        text-align: left;
                        font-size: 2rem;
                        font-weight: bold;
                        margin-bottom: 7px;
                    }
                    @media (max-width: 768px) {
                        .carousel-title {
                            font-size: 1.5rem; /* Smaller font size on tablets and below */
                        }

                    }

                    @media (max-width: 480px) {
                        .carousel-title {
                            font-size: 1.4rem; /* Even smaller font size on mobile */
                        }

                    }
                    .carousel-title .MuiSvgIcon-root {
                        margin-left: 10px;
                    }
                    .property-slide {
                        padding: 20px;
                    }
                    .image-column {
                        position: relative;
                        padding:0;
                        display:flex;
                    }
                    .property-image {
                        width: 100%;
                        height: auto;
                        object-fit: cover;
                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    }
                    .details-column {
                        padding: 20px;
                        background: white;
                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    }
                    .property-title {
                        font-size: 1.5rem;
                        font-weight: bold;
                        margin-bottom: 10px;
                    }
                    .property-location {
                        font-size: 1rem;
                        color: #555;
                        margin-bottom: 20px;
                    }
                    .badges-container {
                        margin-bottom: 20px;
                    }
                    .property-badge {
                        margin-right: 10px;
                        padding: 5px 10px;
                        font-size: 0.8rem;
                        border-radius: 20px;
                    }
                    .property-details {
                        margin-bottom: 20px;
                    }
                    .detail-item {
                        font-size: 0.9rem;
                        color: #333;
                    }
                    .detail-label {
                        font-weight: bold;
                    }
                    .property-price {
                        font-size: 1.3rem;
                        font-weight: bold;
                        margin-bottom: 20px;
                    }
                    .button-group .btn {
                        font-size: 0.9rem;
                    }
                    .custom-arrow {
                        z-index: 10;
                        background: white;
                        border-radius: 50%;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                    }
                    .next-arrow {
                        right: -30px;
                    }
                    .prev-arrow {
                        left: -30px;
                    }
                        /* Styling for Call button */
                    .call-btn {
                        background-color: #007bff; /* Blue color for call button */
                        color: white;
                        border: 1px solid #007bff;
                    }

                    .call-btn:hover {
                        background-color: #0056b3; /* Darker blue on hover */
                        border-color: #0056b3;
                    }

                    /* Styling for WhatsApp button */
                    .whatsapp-btn {
                        background-color: #25d366; /* WhatsApp green color */
                        color: white;
                        border: 1px solid #25d366;
                    }

                    .whatsapp-btn:hover {
                        background-color: #128c7e; /* Darker green on hover */
                        border-color: #128c7e;
                    }

                    /* Media query for mobile devices (max-width: 480px) */
                    @media (max-width: 480px) {
                        .button-group .btn {
                            font-size: 0.8rem; /* Smaller font size on mobile */
                            width: 100%; /* Full width for buttons on mobile */
                            margin-bottom: 10px; /* Space between buttons */
                        }
                    }

                `}
            </style>
            <Container>
                <h3 className="carousel-title">
                    Exclusive Premium Properties
                </h3>
                <Slider {...settings}>
                    {properties.map((property, index) => (
                        <div key={index} className="property-slide">
                            <div className="custom-cont">
                                <Col lg={6} md={12} className="image-column">
                                    <img
                                        src={property.image}
                                        alt={property.title}
                                        className="property-image"
                                    />
                                </Col>
                                <Col
                                    lg={6}
                                    md={12}
                                    className="details-column d-flex flex-column justify-content-center"
                                >
                                    <h4 className="property-title">{property.title}</h4>
                                    <p className="property-location">{property.location}</p>
                                    <div className="badges-container">
                                        {property.badges.map((badge, i) => (
                                            <Badge
                                                key={i}
                                                bg="secondary"
                                                className="property-badge"
                                            >
                                                {badge}
                                            </Badge>
                                        ))}
                                    </div>
                                    <Row className="property-details">
                                        {property.details.map((detail, i) => (
                                            <Col xs={6} sm={4} key={i}>
                                                <p className="detail-item" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                                    <span className="detail-icon" style={{ color: "#1976d2" }}>
                                                        {detail.icon}
                                                    </span>
                                                    <span className="detail-label" style={{ fontWeight: "bold" }}>
                                                        {detail.label}:
                                                    </span>
                                                    <span className="detail-value">{detail.value}</span>
                                                </p>
                                            </Col>
                                        ))}
                                    </Row>

                                    <h5 className="property-price">{property.price}</h5>
                                    <div className="button-group">
                                        <Button variant="primary" className="me-3" style={{ fontSize: '1rem' }}>
                                            Enquiry now
                                        </Button>
                                        <Button variant="outline-secondary" className="me-2 call-btn">
                                            <CallIcon />
                                            Call us
                                        </Button>
                                        <Button variant="outline-success" className="whatsapp-btn">
                                            <WhatsAppIcon />
                                            <a href="https://wa.me/phoneNumber" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                                                WhatsApp
                                            </a>
                                        </Button>
                                    </div>

                                </Col>
                            </div>
                        </div>
                    ))}
                </Slider>
            </Container>
        </section>
    );
}
