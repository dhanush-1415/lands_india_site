import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Divider } from '@mui/material';
import { agents } from '@/data/agents';
import WifiCalling3Icon from '@mui/icons-material/WifiCalling3';
import PinDropIcon from '@mui/icons-material/PinDrop';
import Footer2 from '../footer/Footer2';
import Pagination from './Pagination';
import { getFranchiseList, createFranchise } from '@/apiCalls';
import { toast } from "react-toastify";

const Franchise = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sorted, setSorted] = useState();
  const [itemPerPage, setItemPerPage] = useState(9);

  const [data, setData] = useState();

  const fetchFranchise = async () => {
    try {
      const data = await getFranchiseList();
      if (data.success) {
        setData(data.data)
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  useEffect(() => {
    fetchFranchise();
  }, []);



  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    phoneNumber: '',
    email: '',
    district: '',
    files: null, // To store file data
  });

  const [errors, setErrors] = useState({
    fullName: '',
    gender: '',
    phoneNumber: '',
    email: '',
    district: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    setFormData({
      ...formData,
      files: files ? files[0] : null,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full Name is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone Number is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.district) newErrors.district = 'District is required';
    if (!formData.files) newErrors.files = 'File is required'; // File validation

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const data = await createFranchise(formData);
      if (data.success) {
        toast.success(data.message);
        setFormData({
          fullName: '',
          gender: '',
          phoneNumber: '',
          email: '',
          district: '',
          files: null,
        })
        setErrors({
          fullName: '',
          gender: '',
          phoneNumber: '',
          email: '',
          district: '',
        })
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };




  return (
    <>
      <section className="flat-section" style={{ paddingTop: '0px' }}>
        <div style={{ background: '#f0f3f4', padding: '40px 0' }}>
          <h3 style={{ width: '80%', margin: '0px auto' }} className="mb-4">Franchise</h3>
        </div>
        <div className="container custom-container-header py-5" style={{ background: '#ffffff' }}>

          <Row>
            {/* Agents Section */}
            <Col lg={8}>
              <Row>
                {data?.length && data.map((agent, index) => (
                  <Col md={6} className="mb-4" key={agent.id}>
                    <div
                      className="box-agent hover-img wow fadeInUp"
                      style={{ padding: '20px', boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px", }} // WOW.js animation delay
                    >
                      <a href="#" className="box-img img-style" style={{ borderRadius: '0px' }}>
                        <img
                          className="lazyload mh-100"
                          data-src={agent.image} // Access the first image URL
                          alt={`image-agent-${agent.name}`}
                          src={agent.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8d4F3Lf3kbFIFSGu6BSqqThC9vsueKd7a_w&s"}
                          style={{ minHeight: '140px', maxHeight: '140px' }}
                        />

                        {/* <ul className="agent-social">
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
                      </ul> */}
                      </a>
                      <div className="content justify-content-start">
                        <div className="info" style={{ textAlign: 'left' }}>
                          <h5 style={{ marginBottom: '7px' }}>
                            <a className="link" href="#">
                              {agent.name}
                            </a>
                          </h5>
                          <p style={{ marginBottom: '7px' }} className="text-variant-1">{agent.gender}</p>
                          <div style={{ marginBottom: '7px', alignItems: 'flex-end' }} className='d-flex'>
                            <WifiCalling3Icon />
                            <span style={{ fontWeight: 'bold' }}>+91 9363828393</span>
                          </div>
                          <div style={{ marginBottom: '7px', alignItems: 'flex-end' }} className='d-flex'>
                            <PinDropIcon />
                            <span style={{ fontWeight: 'bold' }}>{agent?.district}</span>
                          </div>
                        </div>

                      </div>
                    </div>
                  </Col>
                ))}
              </Row>


              {/* <ul className="wd-navigation mt-20" style={{ justifyContent: 'center' }} >
                <Pagination
                  currentPage={currentPage}
                  setPage={setCurrentPage}
                  itemLength={sorted?.length}
                  itemPerPage={itemPerPage}
                />
              </ul> */}
            </Col>

            {/* Form Section */}
            <Col lg={4}>
              <div
                style={{
                  background: '#ffffff',
                  boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px !important',
                }}
                className="p-4 bg-#ffffff shadow-sm rounded widget-sidebar fixed-sidebar"
              >
                <h5>Franchise with Us!</h5>
                <p>
                  Register now to start your journey toward successful franchise
                  ownership.
                </p>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3 mt-3" controlId="formFullName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your full name"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      style={{ borderRadius: '0px' }}
                    />
                    {errors.fullName && <div className="text-danger">{errors.fullName}</div>}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formGender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      style={{ borderRadius: '0px' }}
                    />
                    {errors.gender && <div className="text-danger">{errors.gender}</div>}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formPhoneNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your phone number"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      style={{ borderRadius: '0px' }}
                    />
                    {errors.phoneNumber && (
                      <div className="text-danger">{errors.phoneNumber}</div>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      style={{ borderRadius: '0px' }}
                    />
                    {errors.email && <div className="text-danger">{errors.email}</div>}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formDistrict">
                    <Form.Label>District</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your district"
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      style={{ borderRadius: '0px' }}
                    />
                    {errors.district && (
                      <div className="text-danger">{errors.district}</div>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formFiles">
                    <Form.Label>Upload Profile Image</Form.Label>
                    <Form.Control
                      type="file"
                      name="files"
                      onChange={handleFileChange}
                      style={{ borderRadius: '0px' }}
                    />
                    <Form.Label style={{color:'gray'}}>Size (100 x 100)</Form.Label>
                    {errors.files && <div className="text-danger">{errors.files}</div>}
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
      <Footer2 />
    </>
  );
};

export default Franchise;
