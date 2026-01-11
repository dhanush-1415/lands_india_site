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
  const [sorted, setSorted] = useState();
  const [itemPerPage, setItemPerPage] = useState(9);


  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState();

  const fetchFranchise = async () => {
    try {
      const data = await getFranchiseList(currentPage);
      if (data.success) {
        setData(data.data)
        if (data.pagination) {
          setTotalItems(data.pagination.totalItems)
          setCurrentPage(data.pagination.currentPage)
        }
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  useEffect(() => {
    fetchFranchise();
  }, [currentPage]);



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

  const [isSubmitting, setIsSubmitting] = useState(false);

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

    setIsSubmitting(true); // Start loader

    try {
      const data = await createFranchise(formData);
      if (data.success) {
        toast.success(data.message || 'Franchise application submitted successfully!');
        setFormData({
          fullName: '',
          gender: '',
          phoneNumber: '',
          email: '',
          district: '',
          files: null,
        });
        setErrors({
          fullName: '',
          gender: '',
          phoneNumber: '',
          email: '',
          district: '',
        });
      } else {
        toast.error(data.message || 'Failed to submit franchise application');
      }
    } catch (err) {
      console.error('Error submitting franchise:', err);
      toast.error('Email already exists');
    } finally {
      setIsSubmitting(false); // Stop loader
    }
  };




  return (
    <>
      <section className="flat-section" style={{ paddingTop: '0px' }}>
        <style>{`
          .custom-franch-img{
            width:100%;
            min-height:250px;
            max-height:250px;
          }
          .spinner-border-sm {
            width: 1rem;
            height: 1rem;
          }
          .me-2 {
            margin-right: 0.5rem !important;
          }
          .franchise-image-container {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 400px;
          }
          .franchise-image {
            max-width: 100%;
            height: auto;
            max-height: 400px;
            filter: drop-shadow(0px 4px 8px rgba(0,0,0,0.1));
            transition: transform 0.3s ease;
          }
          .franchise-image:hover {
            transform: scale(1.05);
          }
          @media (max-width: 991px) {
            .franchise-image-container {
              min-height: 300px;
              margin-bottom: 30px;
            }
            .franchise-image {
              max-height: 300px;
            }
          }
          @media (max-width: 768px) {
            .franchise-image-container {
              min-height: 250px;
              margin-bottom: 20px;
            }
            .franchise-image {
              max-height: 250px;
            }
          }
        `}</style>
        <div style={{ background: '#f0f3f4', padding: '40px 0' }}>
          <h3 style={{ width: '80%', margin: '0px auto' }} className="mb-4">Franchise</h3>
        </div>
        <div className="container custom-container-header py-5" style={{ background: '#ffffff' }}>
          {/* Image and Form Row */}
          <Row className="mb-5">
            {/* Franchise Image Section */}
            <Col lg={6}>
              <div className="franchise-image-container">
                <div className="text-center">
                  <img 
                    src="https://png.pngtree.com/png-vector/20220723/ourmid/pngtree-franchise-shop-business-brand-businessman-png-image_6043839.png" 
                    alt="Franchise Business" 
                    className="franchise-image"
                  />
                  <h4 className="mt-3" style={{ color: '#333', fontWeight: '600' }}>
                    Start Your Franchise Journey
                  </h4>
                  <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.6', maxWidth: '400px', margin: '0 auto' }}>
                    Join our network of successful franchise partners and build your business empire with proven models and comprehensive support.
                  </p>
                </div>
              </div>
            </Col>

            {/* Form Section */}
            <Col lg={6}>
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
                    <Form.Label style={{ color: 'gray' }}>Size (100 x 100)</Form.Label>
                    {errors.files && <div className="text-danger">{errors.files}</div>}
                  </Form.Group>

                  <Button 
                    variant="primary" 
                    type="submit" 
                    className="w-100" 
                    disabled={isSubmitting}
                    style={{ 
                      borderRadius: '0px',
                      position: 'relative',
                      minHeight: '48px'
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Submitting...
                      </>
                    ) : (
                      'Start Your Journey'
                    )}
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </div>
        <ul className="wd-navigation mt-20" style={{ justifyContent: 'center' }} >
          <Pagination
            currentPage={currentPage}
            setPage={setCurrentPage}
            itemLength={totalItems}
            itemPerPage={pageSize}
          />


        </ul>
      </section>
      <Footer2 />
    </>
  );
};

export default Franchise;
