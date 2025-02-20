import React, { useEffect, useState } from "react";
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
import DraftsTwoToneIcon from '@mui/icons-material/DraftsTwoTone';
import DraftsIcon from '@mui/icons-material/Drafts';
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import { Grid } from "@mui/material";
import { getPremiumList } from "@/apiCalls";
import EnquiryForm from "@/components/common/Enquiry";


export default function Carousel() {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const [properties, setProperties] = useState([]);

    console.log(properties, "mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm")

    const fetchPremiumList = async () => {
        try {
            const data = await getPremiumList();
            if (data.success) {
                const combined = data.props.map((property) => {
                    const propertyInputs = data.propInputs.filter(input => input.properties_postId === property.id);

                    const inputsWithNames = propertyInputs.map((input) => {
                        const inputData = data.inputs.find(i => i.id === input.input_id);
                        return {
                            ...input,
                            input_name: inputData ? inputData.input_name : '',
                            input_type: inputData ? inputData.input_type : '',
                            options: inputData ? inputData.options : [],
                        };
                    });

                    return {
                        ...property,
                        inputs: inputsWithNames,
                    };
                });

                setProperties(combined);
            } else {
                // toast.error(data.message)
            }
        } catch (err) {
            console.error('Error fetching categories:', err);
        }
    };

    useEffect(() => {
        fetchPremiumList();
    }, []);


    // const properties = [
    //     {
    //         image:
    //             "https://images.unsplash.com/photo-1560518883-ce09059eeffa?fm=jpg&q=60&w=3000",
    //         title: "On-road New House Sale in Udumalpet",
    //         location: "Udumalpet, Tamil Nadu, India",
    //         price: "₹97,00,000",
    //         badges: ["Residential Property", "Posted On: Sep 25"],
    //         details: [
    //             { label: "Beds", value: "2", icon: <i style={{ fontSize: '30px' }} className="icon icon-bed" /> },
    //             { label: "Baths", value: "4", icon: <i style={{ fontSize: '30px' }} className="icon icon-bath" /> },
    //             { label: "Sqft", value: "1744", icon: <i style={{ fontSize: '30px' }} className="icon icon-sqft" /> },
    //             { label: "Furnished", value: "Semi", icon: <i style={{ fontSize: '30px' }} className="icon icon-house-fill" /> },
    //             { label: "Floors", value: "Ground + 1", icon: <StairsIcon style={{ fontSize: '35px' }} /> },
    //             { label: "Parking", value: "Open", icon: <LocalParkingIcon style={{ fontSize: '35px' }} /> },
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
    //             { label: "Beds", value: "3", icon: <i className="icon icon-bed" /> },
    //             { label: "Baths", value: "3", icon: <i className="icon icon-bath" /> },
    //             { label: "Sqft", value: "1200", icon: <i className="icon icon-sqft" /> },
    //             { label: "Furnished", value: "Fully", icon: <HomeIcon style={{ fontSize: '40px' }} /> },
    //             { label: "Floors", value: "5th Floor", icon: <StairsIcon style={{ fontSize: '40px' }} /> },
    //             { label: "Parking", value: "Covered", icon: <LocalParkingIcon style={{ fontSize: '40px' }} /> },
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
    //             { label: "Beds", value: "5", icon: <i className="icon icon-bed" /> },
    //             { label: "Baths", value: "6", icon: <i className="icon icon-bath" /> },
    //             { label: "Sqft", value: "3000", icon: <i className="icon icon-sqft" /> },
    //             { label: "Furnished", value: "Fully", icon: <HomeIcon style={{ fontSize: '40px' }} /> },
    //             { label: "Floors", value: "2", icon: <StairsIcon style={{ fontSize: '40px' }} /> },
    //             { label: "Parking", value: "Private Garage", icon: <LocalParkingIcon style={{ fontSize: '40px' }} /> },
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
                className="eastIconMediaSpace"
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
                className="icon-btn-right mediaTabSpace"
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
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
    };

    return (
        <section className="property-carousel" style={{ background: '#ffffff' }} >
            <EnquiryForm open={open} handleClose={handleClose} />
            <style>
                {`
                
                    .property-carousel {
                        padding: 60px 0;
                        background-color: #f9f9f9;
                    }
                    .slick-active{
                        color:#1563DF;
                    }
                    .custom-cont{
                        display: flex;
                        flex-direction: row;
                        min-height: 450px;
                        max-height: 450px;
                    }
                    .carousel-title {
                        text-align: left;
                        font-size: 2rem;
                        font-weight: bold;
                        margin-bottom: 7px;
                    }
                    @media (max-width: 428px){
                    .mediabtnGroupTabSpace{
                        display: flex;
                        justify-content: center;
                        }
                        .mediaGroupEnguiryBtn{
                        display: flex;
                        width: fit-content;
                        justify-content: center;
                        font-size: 14px !important;
                        padding: 5px;
                        }
                        .mediaCallBtnGroup{
                        display: none;
                        }
                        .callMediaBtnSpacebreak{
                        padding: 0px !important;
                        }
                        .call-btn{
                         display: flex;
                        }
                    }
                    @media (max-width: 768px) {
                    .property-carousel {
                        padding: 30px 0;
                        background-color: #f9f9f9;
                    }
                        .carousel-title {
                            font-size: 1.5rem; /* Smaller font size on tablets and below */
                        }
                        .custom-cont{
                            flex-direction: column;
                            min-height: 100%;
                            max-height: 100%;
                        }
                        .mediaTabSpace{
                        padding-right: 5%;
                        margin-top: 5%;
                        }
                        .eastIconMediaSpace{
                        margin-top: 5%;
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
                        background: #008ff7;
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
            <div className="container custom-container-header" style={{ background: '#ffffff !important', backgroundColor: '#ffffff !important' }}>
                <h3 className="carousel-title">
                    Exclusive <br /> Premium Properties
                </h3>
                <Slider {...settings}>
                    {properties.length && properties.map((elm, index) => (
                        <div key={index} className="property-slide">
                            <div className="custom-cont">
                                <Col lg={7} md={12} className="image-column" style={{ background: '#f8f9fa', display: 'flex', justifyContent: 'center', aligntems: 'center' }}>
                                    <img
                                        src={elm.file_path ? elm.file_path.split(',')[0] : ""}
                                        alt={elm.id}
                                        className="property-image"
                                    />
                                </Col>
                                <Col
                                    lg={5}
                                    md={12}
                                    style={{ background: '#008ff7' }}
                                    className="details-column d-flex flex-column justify-content-center"
                                >
                                    <h4 className="property-title text-white">{
                                        elm.inputs.find(item => item.input_name === "Title")?.input_value || ""
                                    }</h4>
                                    <p className="property-location text-white"><span className="icon icon-mapPin" style={{ marginRight: '10px' }} />{
                                        elm.inputs.find(item => item.input_name === "City")?.input_value || ""
                                    }</p>
                                    <div className="badges-container" style={{ display: 'flex' }}>
                                        <p
                                            style={{ color: '#161e2d', fontSize: '1rem', borderRadius: '0px', padding: '7px 10px', background: '#ffffff', fontWeight: 'bold' }}
                                            className="property-badge"
                                        >
                                            Premium Property
                                        </p>
                                        <p
                                            style={{
                                                backgroundColor: '#008ff7 !important',
                                                background: '#008ff7',
                                                color: '#ffffff',
                                                padding: '7px 10px',
                                                borderRadius: '0',
                                                fontSize: '1rem',
                                                fontWeight: 'bold',

                                                border: '2px dotted #ffffff'
                                            }}
                                            className="property-badge"
                                        >
                                            Posted On: {elm.createdAt.split('T')[0] || ""}
                                        </p>
                                        {/* 
                                        <Badge
                                            bg="light"
                                            style={{ color: '#161e2d', borderRadius: '0px', padding: '10px' }}
                                            className="property-badge"
                                        >
                                            {property.badges[1]}
                                        </Badge> */}
                                    </div>
                                    {elm.main_menuId === 8 ? (
                                        <Row className="property-details">
                                            <Col xs={6} sm={4}>
                                                <p className="detail-item" style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: '1.2rem' }}>
                                                    <span className="detail-icon" style={{ color: "#ffffff" }}>
                                                        <i style={{ fontSize: '30px' }} className="icon icon-sqft" />
                                                    </span>
                                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                        <span className="detail-label text-white" style={{ fontWeight: "bold" }}>
                                                            Sqft:
                                                        </span>
                                                        <span className="detail-value text-white" style={{ marginBottom: '3px' }}>
                                                            {
                                                                elm.inputs.find(item => item.input_name === "Total Sqft")?.input_value || ""
                                                            }
                                                        </span>
                                                    </div>
                                                </p>
                                            </Col>


                                            <Col xs={6} sm={4}>
                                                <p className="detail-item" style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: '1.2rem' }}>
                                                    <span className="detail-icon" style={{ color: "#ffffff" }}>
                                                        <i style={{ fontSize: '30px' }} className="icon icon-house-fill" />
                                                    </span>
                                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                        <span className="detail-label text-white" style={{ fontWeight: "bold" }}>
                                                            Furnished:
                                                        </span>
                                                        <span className="detail-value text-white" style={{ marginBottom: '3px' }}>
                                                            {
                                                                elm.inputs.find(item => item.input_name === "Furnishing")?.input_value || ""
                                                            }
                                                        </span>
                                                    </div>
                                                </p>
                                            </Col>

                                            <Col xs={6} sm={4}>
                                                <p className="detail-item" style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: '1.2rem' }}>
                                                    <span className="detail-icon" style={{ color: "#ffffff" }}>
                                                        <LocalParkingIcon style={{ fontSize: '35px' }} />
                                                    </span>
                                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                        <span className="detail-label text-white" style={{ fontWeight: "bold" }}>
                                                            Parking:
                                                        </span>
                                                        <span className="detail-value text-white" style={{ marginBottom: '3px' }}>
                                                            {
                                                                elm.inputs.find(item => item.input_name === "Car Parking")?.input_value || ""
                                                            }
                                                        </span>
                                                    </div>
                                                </p>
                                            </Col>
                                        </Row>
                                    ) : elm.main_menuId === 3 ? (
                                        <Row className="property-details">
                                            <Col xs={6} sm={4}>
                                                <p className="detail-item" style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: '1.2rem' }}>
                                                    <span className="detail-icon" style={{ color: "#ffffff" }}>
                                                        <i style={{ fontSize: '30px' }} className="icon icon-sqft" />
                                                    </span>
                                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                        <span className="detail-label text-white" style={{ fontWeight: "bold" }}>
                                                            Sqft:
                                                        </span>
                                                        <span className="detail-value text-white" style={{ marginBottom: '3px' }}>
                                                            {
                                                                elm.inputs.find(item => item.input_name === "Total Sqft")?.input_value || ""
                                                            }
                                                        </span>
                                                    </div>
                                                </p>
                                            </Col>
                                            <Col xs={6} sm={4}>
                                                <p className="detail-item" style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: '1.2rem' }}>
                                                    <span className="detail-icon" style={{ color: "#ffffff" }}>
                                                        <i style={{ fontSize: '30px' }} className="icon icon-sqft" />
                                                    </span>
                                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                        <span className="detail-label text-white" style={{ fontWeight: "bold" }}>
                                                            Length:
                                                        </span>
                                                        <span className="detail-value text-white" style={{ marginBottom: '3px' }}>
                                                            {
                                                                elm.inputs.find(item => item.input_name === "Length")?.input_value || ""
                                                            }
                                                        </span>
                                                    </div>
                                                </p>
                                            </Col>                                      <Col xs={6} sm={4}>
                                                <p className="detail-item" style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: '1.2rem' }}>
                                                    <span className="detail-icon" style={{ color: "#ffffff" }}>
                                                        <i style={{ fontSize: '30px' }} className="icon icon-sqft" />
                                                    </span>
                                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                        <span className="detail-label text-white" style={{ fontWeight: "bold" }}>
                                                            Bredth:
                                                        </span>
                                                        <span className="detail-value text-white" style={{ marginBottom: '3px' }}>
                                                            {
                                                                elm.inputs.find(item => item.input_name === "Breadth")?.input_value || ""
                                                            }
                                                        </span>
                                                    </div>
                                                </p>
                                            </Col>

                                        </Row>
                                    ) : elm.main_menuId === 1 ? (
                                        <Row className="property-details">
                                            <Col xs={6} sm={4}>
                                                <p className="detail-item" style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: '1.2rem' }}>
                                                    <span className="detail-icon" style={{ color: "#ffffff" }}>
                                                        <i style={{ fontSize: '30px' }} className="icon icon-sqft" />
                                                    </span>
                                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                        <span className="detail-label text-white" style={{ fontWeight: "bold" }}>
                                                            Sqft:
                                                        </span>
                                                        <span className="detail-value text-white" style={{ marginBottom: '3px' }}>
                                                            {
                                                                elm.inputs.find(item => item.input_name === "Total Sqft")?.input_value || ""
                                                            }
                                                        </span>
                                                    </div>
                                                </p>
                                            </Col>
                                            <Col xs={6} sm={4}>
                                                <p className="detail-item" style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: '1.2rem' }}>
                                                    <span className="detail-icon" style={{ color: "#ffffff" }}>
                                                        <i style={{ fontSize: '30px' }} className="icon icon-bed" />
                                                    </span>
                                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                        <span className="detail-label text-white" style={{ fontWeight: "bold" }}>
                                                            Bedrooms:
                                                        </span>
                                                        <span className="detail-value text-white" style={{ marginBottom: '3px' }}>
                                                            {
                                                                elm.inputs.find(item => item.input_name === "Bedrooms")?.input_value || ""
                                                            }
                                                        </span>
                                                    </div>
                                                </p>
                                            </Col>
                                            <Col xs={6} sm={4}>
                                                <p className="detail-item" style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: '1.2rem' }}>
                                                    <span className="detail-icon" style={{ color: "#ffffff" }}>
                                                        <i style={{ fontSize: '30px' }} className="icon icon-bath" />
                                                    </span>
                                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                        <span className="detail-label text-white" style={{ fontWeight: "bold" }}>
                                                            Bathrooms:
                                                        </span>
                                                        <span className="detail-value text-white" style={{ marginBottom: '3px' }}>
                                                            {
                                                                elm.inputs.find(item => item.input_name === "Bathrooms")?.input_value || ""
                                                            }
                                                        </span>
                                                    </div>
                                                </p>
                                            </Col>

                                            <Col xs={6} sm={4}>
                                                <p className="detail-item" style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: '1.2rem' }}>
                                                    <span className="detail-icon" style={{ color: "#ffffff" }}>
                                                        <i style={{ fontSize: '30px' }} className="icon icon-house-fill" />
                                                    </span>
                                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                        <span className="detail-label text-white" style={{ fontWeight: "bold" }}>
                                                            Furnished:
                                                        </span>
                                                        <span className="detail-value text-white" style={{ marginBottom: '3px' }}>
                                                            {
                                                                elm.inputs.find(item => item.input_name === "Furnishing")?.input_value || ""
                                                            }
                                                        </span>
                                                    </div>
                                                </p>
                                            </Col>
                                            <Col xs={6} sm={4}>
                                                <p className="detail-item" style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: '1.2rem' }}>
                                                    <span className="detail-icon" style={{ color: "#ffffff" }}>
                                                        <StairsIcon style={{ fontSize: '35px' }} />
                                                    </span>
                                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                        <span className="detail-label text-white" style={{ fontWeight: "bold" }}>
                                                            Total Floors:
                                                        </span>
                                                        <span className="detail-value text-white" style={{ marginBottom: '3px' }}>
                                                            {
                                                                elm.inputs.find(item => item.input_name === "Total Floors")?.input_value || ""
                                                            }
                                                        </span>
                                                    </div>
                                                </p>
                                            </Col>
                                            <Col xs={6} sm={4}>
                                                <p className="detail-item" style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: '1.2rem' }}>
                                                    <span className="detail-icon" style={{ color: "#ffffff" }}>
                                                        <LocalParkingIcon style={{ fontSize: '35px' }} />
                                                    </span>
                                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                        <span className="detail-label text-white" style={{ fontWeight: "bold" }}>
                                                            Parking:
                                                        </span>
                                                        <span className="detail-value text-white" style={{ marginBottom: '3px' }}>
                                                            {
                                                                elm.inputs.find(item => item.input_name === "Car Parking")?.input_value || ""
                                                            }
                                                        </span>
                                                    </div>
                                                </p>
                                            </Col>
                                        </Row>
                                    ) : (
                                        <Row className="property-details">
                                            <Col xs={6} sm={4}>
                                                <p className="detail-item" style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: '1.2rem' }}>
                                                    <span className="detail-icon" style={{ color: "#ffffff" }}>
                                                        <i style={{ fontSize: '30px' }} className="icon icon-sqft" />
                                                    </span>
                                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                        <span className="detail-label text-white" style={{ fontWeight: "bold" }}>
                                                            Sqft:
                                                        </span>
                                                        <span className="detail-value text-white" style={{ marginBottom: '3px' }}>
                                                            {
                                                                elm.inputs.find(item => item.input_name === "Total Sqft")?.input_value || ""
                                                            }
                                                        </span>
                                                    </div>
                                                </p>
                                            </Col>
                                        </Row>
                                    )}
                                    {/* <Row className="property-details">
                                        <Col xs={6} sm={4}>
                                            <p className="detail-item" style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: '1.2rem' }}>
                                                <span className="detail-icon" style={{ color: "#ffffff" }}>
                                                    <i style={{ fontSize: '30px' }} className="icon icon-bed" />
                                                </span>
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <span className="detail-label text-white" style={{ fontWeight: "bold" }}>
                                                        BHK:
                                                    </span>
                                                    <span className="detail-value text-white" style={{ marginBottom: '3px' }}>
                                                        {
                                                            elm.inputs.find(item => item.input_name === "BHK type")?.input_value || ""
                                                        }
                                                    </span>
                                                </div>
                                            </p>
                                        </Col>
                                        <Col xs={6} sm={4}>
                                            <p className="detail-item" style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: '1.2rem' }}>
                                                <span className="detail-icon" style={{ color: "#ffffff" }}>
                                                    <i style={{ fontSize: '30px' }} className="icon icon-bath" />
                                                </span>
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <span className="detail-label text-white" style={{ fontWeight: "bold" }}>
                                                        Baths:
                                                    </span>
                                                    <span className="detail-value text-white" style={{ marginBottom: '3px' }}>
                                                        {
                                                            elm.inputs.find(item => item.input_name === "Bathroom(s)")?.input_value || ""
                                                        }
                                                    </span>
                                                </div>
                                            </p>
                                        </Col>
                                        <Col xs={6} sm={4}>
                                            <p className="detail-item" style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: '1.2rem' }}>
                                                <span className="detail-icon" style={{ color: "#ffffff" }}>
                                                    <i style={{ fontSize: '30px' }} className="icon icon-sqft" />
                                                </span>
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <span className="detail-label text-white" style={{ fontWeight: "bold" }}>
                                                        Sqft:
                                                    </span>
                                                    <span className="detail-value text-white" style={{ marginBottom: '3px' }}>
                                                        {
                                                            elm.inputs.find(item => item.input_name === "Buildup Area")?.input_value || ""
                                                        }
                                                    </span>
                                                </div>
                                            </p>
                                        </Col>
                                        <Col xs={6} sm={4}>
                                            <p className="detail-item" style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: '1.2rem' }}>
                                                <span className="detail-icon" style={{ color: "#ffffff" }}>
                                                    <i style={{ fontSize: '30px' }} className="icon icon-house-fill" />
                                                </span>
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <span className="detail-label text-white" style={{ fontWeight: "bold" }}>
                                                        Furnished:
                                                    </span>
                                                    <span className="detail-value text-white" style={{ marginBottom: '3px' }}>
                                                        {
                                                            elm.inputs.find(item => item.input_name === "furnished")?.input_value || ""
                                                        }
                                                    </span>
                                                </div>
                                            </p>
                                        </Col>
                                        <Col xs={6} sm={4}>
                                            <p className="detail-item" style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: '1.2rem' }}>
                                                <span className="detail-icon" style={{ color: "#ffffff" }}>
                                                    <StairsIcon style={{ fontSize: '35px' }} />
                                                </span>
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <span className="detail-label text-white" style={{ fontWeight: "bold" }}>
                                                        Floor:
                                                    </span>
                                                    <span className="detail-value text-white" style={{ marginBottom: '3px' }}>
                                                        {
                                                            elm.inputs.find(item => item.input_name === "Floor")?.input_value || ""
                                                        }
                                                    </span>
                                                </div>
                                            </p>
                                        </Col>
                                        <Col xs={6} sm={4}>
                                            <p className="detail-item" style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: '1.2rem' }}>
                                                <span className="detail-icon" style={{ color: "#ffffff" }}>
                                                    <LocalParkingIcon style={{ fontSize: '35px' }} />
                                                </span>
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <span className="detail-label text-white" style={{ fontWeight: "bold" }}>
                                                        Parking:
                                                    </span>
                                                    <span className="detail-value text-white" style={{ marginBottom: '3px' }}>
                                                        {
                                                            elm.inputs.find(item => item.input_name === "parking")?.input_value || ""
                                                        }
                                                    </span>
                                                </div>
                                            </p>
                                        </Col>
                                    </Row> */}

                                    <h5 className="property-price text-white">
                                        ₹{
                                            Number(elm.inputs.find(item => item.input_name === "Price")?.input_value || 0)
                                                .toLocaleString('en-IN')
                                        }
                                    </h5>
                                    <div className="button-group mediabtnGroupTabSpace">
                                        <Button onClick={handleClickOpen} variant="primary" className="me-2 mediaGroupEnguiryBtn" style={{ borderRadius: '0px', fontWeight: 'bold', fontSize: '1rem', background: '#ffffff', color: '#161e2d' }}>
                                            <DraftsIcon sx={{ marginRight: '2px' }} />
                                            Enquiry now
                                        </Button>
                                        <Button variant="outline-secondary" className="me-2 call-btn mediaCallBtnGroupGrid" style={{ background: 'white', color: '#161e2d', borderRadius: '0px' }}>
                                            <Grid container direction="row" alignItems='center' justifyContent='center' spacing={1}>
                                                <Grid item md={3} className="callMediaBtnSpacebreak">
                                                    <CallIcon sx={{ marginRight: '2px' }} />
                                                </Grid>
                                                <Grid item md={9} >
                                                    <Grid>
                                                        <Grid container direction='column' alignItems='flex-start'>
                                                            <Grid item sx={{ lineHeight: '14px', textAlign: 'left' }} onClick={() => window.location.href = 'tel:+919363828393'} >
                                                                <p style={{ fontSize: 'smaller', width: 'max-content', marginBottom: '0px' }}><strong>  Call </strong><strong className="mediaCallBtnGroup">Us</strong> <br />  <strong className="mediaCallBtnGroup">+91 936 382 8393</strong></p>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Button>
                                        <Button variant="outline-success" className="whatsapp-btn" style={{ background: 'white', color: '#161e2d', fontWeight: 'bold', borderRadius: '0px' }}>
                                            <WhatsAppIcon sx={{ fontSize: '25px' }} onClick={() => window.open('https://wa.me/919363828393?text=Hi, I would like to know more.', '_blank')} />
                                        </Button>
                                    </div>

                                </Col>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
}
