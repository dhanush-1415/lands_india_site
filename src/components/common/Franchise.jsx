import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Divider } from '@mui/material';
import { agents } from '@/data/agents';
import WifiCalling3Icon from '@mui/icons-material/WifiCalling3';
import PinDropIcon from '@mui/icons-material/PinDrop';

const Franchise = () => {
  return (
    <section className="flat-section" style={{paddingTop:'0px'}}>
         <div style={{background:'#f8f9fa',padding:'40px 0'}}>
          <h3 style={{width:'80%',margin:'0px auto'}} className="mb-4">Franchise</h3>
        </div>
      <div className="container py-5" style={{ background: '#ffffff' }}>
     
        <Row>
          {/* Agents Section */}
          <Col lg={8}>
            <Row>
              {agents.map((agent) => (
                <Col md={6} className="mb-4" key={agent.id}>
                  <div
                    className="box-agent hover-img wow fadeInUp"
                    style={{ animationDelay: agent.wowDelay, padding: '20px', boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px", }} // WOW.js animation delay
                  >
                    <a href="#" className="box-img img-style" style={{ borderRadius: '0px' }}>
                      <img
                        className="lazyload mh-100"
                        data-src={agent.imgSrc}
                        alt={`image-agent-${agent.name}`}
                        src={agent.imgSrc}
                        // width={450}
                        style={{ maxHeight: '40px !importent' }}
                        height={450}
                      />
                      <ul className="agent-social">
                        <li>
                          <span className="icon icon-facebook" />
                        </li>
                        <li>
                          <span className="icon icon-x" />
                        </li>
                        <li>
                          <span className="icon icon-linkedin" />
                        </li>
                        <li>
                          <span className="icon icon-instargram" />
                        </li>
                      </ul>
                    </a>
                    <div className="content justify-content-start">
                      <div className="info" style={{ textAlign: 'left' }}>
                        <h5 style={{ marginBottom: '7px' }}>
                          <a className="link" href="#">
                            {agent.name}
                          </a>
                        </h5>
                        <p style={{ marginBottom: '7px' }} className="text-variant-1">Male</p>
                        <div style={{ marginBottom: '7px', alignItems: 'flex-end' }} className='d-flex'>
                          <WifiCalling3Icon />
                          <span style={{ fontWeight: 'bold' }}>+91 9382937358</span>
                        </div>
                        <div style={{ marginBottom: '7px', alignItems: 'flex-end' }} className='d-flex'>
                          <PinDropIcon />
                          <span style={{ fontWeight: 'bold' }}>Chennai</span>
                        </div>
                      </div>

                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>

          {/* Form Section */}
          <Col lg={4} >
            <div style={{ background: '#f8f9fa' }} className="p-4 bg-#f8f9fa shadow-sm rounded">
              <h5>Franchise with Us!</h5>
              <p>
                Register now to start your journey toward successful franchise
                ownership.
              </p>
              <Form>
                <Form.Group className="mb-3 mt-3" controlId="formFullName">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter your full name" style={{ borderRadius: '0px' }} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGender">
                  <Form.Label>Gender</Form.Label>
                  <Form.Control type="text" placeholder="Enter your gender" style={{ borderRadius: '0px' }} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPhoneNumber">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control type="text" placeholder="Enter your phone number" style={{ borderRadius: '0px' }} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formDistrict">
                  <Form.Label>District</Form.Label>
                  <Form.Control type="text" placeholder="Enter your district" style={{ borderRadius: '0px' }} />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Start Your Journey
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default Franchise;
