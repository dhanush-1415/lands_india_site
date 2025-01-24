import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Divider } from '@mui/material';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { toast } from 'react-toastify';
import { SubmitEnquiry } from '@/apiCalls';


const HelpForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: '',
        userType: 'common',
        status: 'Pending',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    useEffect(() => {
        const landsUser = JSON.parse(localStorage.getItem('LandsUser'));

        if (landsUser) {
            setFormData((prevData) => ({
                ...prevData,
                name: landsUser.fullName || '',
                phone: landsUser.phone || '',
                email: landsUser.email || '',
            }));
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.phone || !formData.email || !formData.message) {
            toast.error('Please fill in all fields.');
            return;
        }

        try {
            const data = await SubmitEnquiry(formData);
            if (data.success) {
                toast.success('Submitted Successfully');
                setFormData({
                    name: '',
                    phone: '',
                    email: '',
                    message: '',
                    userType: 'common',
                    status: 'active',
                });
            } else {
                toast.error(data.message || data.error || 'Something went wrong.');
            }
        } catch (err) {
            console.error('Error submitting form:', err);
            toast.error('An error occurred. Please try again.');
        }
    };

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
                `}
            </style>
            <div className="container" style={{ backgroundColor: '#f0f3f4' }}>
                <div style={{ padding: '0px 0 30px' }}>
                    <h3>Help/Support</h3>
                </div>
                <div className="custom-row">
                    <div className="col-lg-8" style={{ background: '#ffffff', padding: '40px' }}>
                        <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                            Let's Make Your Dream Property a Reality
                        </h3>
                        <p style={{ marginBottom: '1.5rem', color: '#6c757d' }}>
                            Reach out to us for all your real estate needs – we're here to help!
                        </p>
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col xs={12} md={12}>
                                    <Form.Group controlId="fullName" style={{ marginBottom: '1rem' }}>
                                        <Form.Label>Full Name:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Your name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            style={{ borderRadius: '0px' }}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} md={6}>
                                    <Form.Group controlId="emailAddress" style={{ marginBottom: '1rem' }}>
                                        <Form.Label>Email Address:</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            style={{ borderRadius: '0px' }}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={6}>
                                    <Form.Group controlId="phoneNumber" style={{ marginBottom: '1rem' }}>
                                        <Form.Label>Phone Number:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="e.g., 0123456789"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            style={{ borderRadius: '0px' }}
                                        />
                                    </Form.Group>
                                </Col>
                                {/* <Col md={6}>
                                    <Form.Group controlId="subject" style={{ marginBottom: '1rem' }}>
                                        <Form.Label>Subject:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter Keyword"
                                            name="subject"
                                            onChange={handleChange}
                                            style={{ borderRadius: '0px' }}
                                        />
                                    </Form.Group>
                                </Col> */}
                            </Row>
                            <Form.Group controlId="message" style={{ marginBottom: '1rem' }}>
                                <Form.Label>Your Message:</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={4}
                                    placeholder="Message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    style={{ borderRadius: '0px' }}
                                />
                            </Form.Group>
                            <Button
                                variant="primary"
                                type="submit"
                                style={{ width: '100%', padding: '0.75rem' }}
                            >
                                Send Message
                            </Button>
                        </Form>
                    </div>
                    <div className="col-lg-4" style={{ background: '#ffffff', padding: '40px' }}>
                        <h4 style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Contact Us</h4>
                        <p style={{ marginBottom: '0.5rem' }}>Call us</p>
                        <p style={{ fontWeight: 'bold', marginBottom: '0.2rem' }}>+91 93638 28393</p>
                        <Divider style={{ backgroundColor: 'black', marginTop: '1rem' }} />
                        <p style={{ marginBottom: '0.5rem', marginTop: '1rem' }}>WhatsApp</p>
                        <p style={{ fontWeight: 'bold', marginBottom: '2px' }}>+91 93638 28393</p>
                        <Divider style={{ backgroundColor: 'black', marginTop: '1rem' }} />
                        <p style={{ marginBottom: '0.5rem', marginTop: '1rem' }}>Email:</p>
                        <p style={{ fontWeight: 'bold', marginBottom: '2px' }}>
                            admin@propertystores.in <br /> info@propertystores.in
                        </p>
                        <Divider style={{ backgroundColor: 'black', marginTop: '1rem' }} />
                        <h5 style={{ fontWeight: 'bold', marginTop: '1rem', marginBottom: '10px' }}>Follow Us:</h5>
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
                                    <FaFacebookF sx={{margin:'0',padding:'0'}}/>
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
                                    <FaYoutube />
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
                                    <FaLinkedinIn />  {/* Replaced FaInstagram with FaTwitter */}
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
