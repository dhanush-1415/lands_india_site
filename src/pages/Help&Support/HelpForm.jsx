import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Divider } from '@mui/material';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";


const HelpForm = () => {
    return (
        <section className="flat-section" style={{ background: '#f0f3f4' }}>
            <style>
                {`
                    .custom-row {
                        display: flex;
                        gap: 20px; 
                    }
                    @media (max-width: 700px) {
                        .custom-row {
                            flex-direction: column;
                        }
                    }
                    `
                }
            </style>
            <div className="container" style={{backgroundColor: '#f0f3f4'}}>
                <div style={{ padding: '0px 0 30px' }}>
                    <h3>Help/Support</h3>
                </div>
                <div className="custom-row">
                    <div className="col-lg-8" style={{ background: "#ffffff", padding: "40px" }} >
                        <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Let's Make Your Dream Property a Reality</h3>
                        <p style={{ marginBottom: '1.5rem', color: '#6c757d' }}>
                            Reach out to us for all your real estate needs – we're here to help!
                        </p>
                        <Form>
                            <Row>
                                <Col md={6}>
                                    <Form.Group controlId="fullName" style={{ marginBottom: '1rem' }}>
                                        <Form.Label>Full Name:</Form.Label>
                                        <Form.Control type="text" placeholder="Your name" style={{ borderRadius: '0px' }} />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="emailAddress" style={{ marginBottom: '1rem' }}>
                                        <Form.Label>Email Address:</Form.Label>
                                        <Form.Control type="email" placeholder="Email" style={{ borderRadius: '0px' }} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Form.Group controlId="phoneNumber" style={{ marginBottom: '1rem' }}>
                                        <Form.Label>Phone Numbers:</Form.Label>
                                        <Form.Control type="text" placeholder="ex 012345678" style={{ borderRadius: '0px' }} />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="subject" style={{ marginBottom: '1rem' }}>
                                        <Form.Label>Subject:</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Keyword" style={{ borderRadius: '0px' }} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group controlId="message" style={{ marginBottom: '1rem' }}>
                                <Form.Label>Your Message:</Form.Label>
                                <Form.Control as="textarea" rows={4} placeholder="Message" style={{ borderRadius: '0px' }} />
                            </Form.Group>
                            <Button variant="primary" style={{ width: '100%', padding: '0.75rem' }}>
                                Send Message
                            </Button>
                        </Form>
                    </div>
                    <div className="col-lg-4" style={{ background: "#ffffff", padding: "40px" }} >
                        <h4 style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Contact Us</h4>
                        <p style={{ marginBottom: '0.5rem' }}>Call us</p>
                        <p style={{ fontWeight: 'bold', marginBottom: '0.2rem' }}>+91 93638 28393</p>
                        <p style={{ fontWeight: 'bold', marginBottom: '2px' }}>+91 93638 28393</p>
                        < Divider style={{backgroundColor: 'black', marginTop: '1rem'}} />
                        <p style={{ marginBottom: '0.5rem', marginTop: '1rem' }}>Whatsapp</p>
                        <p style={{ fontWeight: 'bold', marginBottom: '2px' }}>+91 93638 28393</p>
                        < Divider style={{backgroundColor: 'black', marginTop: '1rem'}} />
                        <p style={{ marginBottom: '0.5rem', marginTop: '1rem' }}>Email:</p>
                        <p style={{ fontWeight: 'bold', marginBottom: '2px' }}>
                            admin@propertystores.in <br /> info@propertystores.in
                        </p>
                        < Divider style={{backgroundColor: 'black', marginTop: '1rem'}} />
                        <h5 style={{ fontWeight: 'bold', marginTop: '1rem',marginBottom:'10px' }}>Follow Us:</h5>
                        <Row>
                            <Col xs="auto">
                                <Button
                                    variant="light"
                                    className="rounded-circle shadow-sm"
                                    style={{
                                        width: "50px",
                                        height: "50px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <FaFacebookF />
                                </Button>
                            </Col>
                            <Col xs="auto">
                                <Button
                                    variant="light"
                                    className="rounded-circle shadow-sm"
                                    style={{
                                        width: "50px",
                                        height: "50px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <FaInstagram />
                                </Button>
                            </Col>
                            <Col xs="auto">
                                <Button
                                    variant="light"
                                    className="rounded-circle shadow-sm"
                                    style={{
                                        width: "50px",
                                        height: "50px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <FaLinkedinIn />
                                </Button>
                            </Col>
                            <Col xs="auto">
                                <Button
                                    variant="light"
                                    className="rounded-circle shadow-sm"
                                    style={{
                                        width: "50px",
                                        height: "50px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <FaTwitter />  {/* Replaced FaInstagram with FaTwitter */}
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HelpForm;
