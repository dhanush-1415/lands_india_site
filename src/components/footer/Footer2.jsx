import React from 'react';
import { Box, Grid, Typography, Button, Link, IconButton, Divider } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";


const Footer2 = () => {

  const handleNavigation = (path) => {
    if (path === "add-property") {
      const landsUser = JSON.parse(localStorage.getItem('LandsUser'));

      if (landsUser) {
        window.location.href = `/${path}`
      } else {
        toast.info("Please Login to Continue")
      }
    } else {

      window.location.href = `/${path}`
    }

  }


  return (
    <Grid sx={{ backgroundColor: '#1c1c1e', color: '#fff' }}>
      <style>{`
        .custom-icon-btn{
          border-radius: 50% !important 
        }
      `}</style>
      <Box sx={{ py: 5, width: { xs: '85%', sm: '85%', md: '90%' }, margin: '0px auto' }}>
        <Grid container sx={{ justifyContent: { xs: 'space-between' } }}>
          <Grid container sx={{ justifyContent: { xs: 'space-between' }, margin: '50px 0' }}>

            <Grid item xs={12} md={5.8} sx={{ margin: '20px 0' }}>
              <Grid container justifyContent='space-between' sx={{ backgroundColor: '#2e2e2e', borderRadius: '5px', padding: { xs: '20px', sm: '20px', md: '0px' } }}>
                <Grid item xs={12} md={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src="https://themesflat.co/html/dreamhomehtml/assets/images/icon/footer-icon-1.png" alt='logo' />
                </Grid>
                <Grid item xs={12} md={9}>
                  <Box
                    sx={{

                      borderRadius: 2,
                      p: 3,
                      textAlign: { xs: 'center', sm: 'center', md: 'left' },
                    }}
                  >
                    <Typography variant="h5" fontWeight='bold' gutterBottom color='#ffffff'>
                      Are you looking to Buy
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Tell us your needs, we will give you thousands of suggestions
                      {/* for the dream home. */}
                    </Typography>
                  </Box>
                </Grid>
                <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
                  <Grid>
                    <Grid onClick={() => { handleNavigation('support') }} container justifyContent='space-between' flexDirection="row" sx={{ backgroundColor: '#343434', borderRadius: '5px', boxShadow: " rgba(99, 99, 99, 0.2) 0px 2px 8px 0px", marginBottom: '-20px', padding: '10px 20px' }} >
                      <Grid>
                        <PhoneIcon />
                      </Grid>
                      <Grid>
                        <Divider orientation="vertical" flexItem sx={{ border: '1px solid #ffffff', height: '100%', margin: '0px 10px' }} />
                      </Grid>
                      <Grid>
                        <Typography variant='subtitle2' fontWeight='bold' color="#ffffff" >Contact Us</Typography>
                      </Grid>
                    </Grid>
                  </Grid>

                </Grid>
              </Grid>

            </Grid>
            <Grid item xs={12} md={5.8} sx={{ margin: '20px 0' }}>
              <Grid container justifyContent='space-between' sx={{ backgroundColor: '#2e2e2e', borderRadius: '5px', padding: { xs: '20px', sm: '20px', md: '0px' } }}>
                <Grid item xs={12} md={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src="https://themesflat.co/html/dreamhomehtml/assets/images/icon/footer-icon-2.png" alt='logo' />
                </Grid>
                <Grid item xs={12} md={9}>
                  <Box
                    sx={{
                      borderRadius: 2,
                      p: 3,
                      textAlign: { xs: 'center', sm: 'center', md: 'left' },
                    }}
                  >
                    <Typography variant="h5" fontWeight='bold' gutterBottom color='#ffffff'>
                      Sell your Property
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      We will connect you to thousands of people who need to buy a home.
                    </Typography>

                  </Box>
                </Grid>
                <Grid onClick={() => { handleNavigation('add-property') }} container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
                  <Grid>
                    <Grid container justifyContent='space-between' flexDirection="row" sx={{ backgroundColor: '#343434', borderRadius: '5px', boxShadow: " rgba(99, 99, 99, 0.2) 0px 2px 8px 0px", marginBottom: '-20px', padding: '10px 20px' }} >
                      <Grid>
                        <HomeWorkIcon />
                      </Grid>
                      <Grid>
                        <Divider orientation="vertical" flexItem sx={{ border: '1px solid #ffffff', height: '100%', margin: '0px 10px' }} />
                      </Grid>
                      <Grid>
                        <Typography variant='subtitle2' fontWeight='bold' color="#ffffff" >Sell Property</Typography>
                      </Grid>
                    </Grid>
                  </Grid>

                </Grid>

              </Grid>

            </Grid>
          </Grid>

          {/* Bottom Section */}
          <Grid item xs={12} md={4} style={{ paddingRight: '3%' }}>
            <Typography variant="h6" gutterBottom color='#ffffff' fontWeight='bold'>
              Office Address
            </Typography>
            <Typography variant="body2" fontWeight='bold' color='gray' sx={{ mt: 3 }}>
              Corporate office:
            </Typography>
            <Typography variant="body2" fontWeight='bold'>
              #59 Dharga Road, Zamin pallavaram, Chennai-600043
            </Typography>
            <Typography variant="body2" fontWeight='bold' color='gray' sx={{ mt: 3 }}>
              Dubai office:
            </Typography>
            <Typography variant="body2" fontWeight='bold'>
              No.12, Al Masraf Tower, Baniyas Square, Deira - Dubai
            </Typography>
            <Typography variant="body2" fontWeight='bold' color='gray' sx={{ mt: 1 }}>
              Branch office in India:
            </Typography>
            <Typography variant="body2" fontWeight='bold' >
              Chrompet, Kalpakkam, Thuvakudi, Melmaruvathur, Veppur, Pannadam, Ullundhurpet, Chidambaram, Trichy, Preambalur, Courtallam & More
            </Typography>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom color='#ffffff' fontWeight='bold'>
              Contact Our Team
            </Typography>
            <Typography variant="body2" fontWeight='bold' color='gray' sx={{ mt: 3 }}>
              Support Team:
            </Typography>
            <Typography variant="body2">
              <PhoneIcon fontSize="small" /> +91 93638 28393
            </Typography>
            <Typography variant="body2" fontWeight='bold' color='gray' sx={{ mt: 1 }}>
              Sales Team:
            </Typography>
            <Typography variant="body2" >
              <PhoneIcon fontSize="small" />  +91 93638 28393
            </Typography>
            <Typography variant="body2" fontWeight='bold' color='gray' sx={{ mt: 1 }}>
              Email:
            </Typography>
            <Typography variant="body2" >
              <EmailIcon fontSize="small" /> admin@propertystores.in
            </Typography>
          </Grid>

          <Grid item xs={12} md={2.5}>
            <Typography variant="h6" gutterBottom color='#ffffff' fontWeight='bold'>
              Our Company
            </Typography>
            <Link href="/about-us" color="inherit" underline="hover" variant="body2" display="block" sx={{ mt: 3 }}>
              <KeyboardArrowRightIcon sx={{ fontSize: '20px' }} />About Us
            </Link>
            <Link href="/" color="inherit" underline="hover" variant="body2" display="block">
              <KeyboardArrowRightIcon sx={{ fontSize: '20px' }} />Career
            </Link>
            <Link href="/agents" color="inherit" underline="hover" variant="body2" display="block">
              <KeyboardArrowRightIcon sx={{ fontSize: '20px' }} />Our Agents
            </Link>
            <Link href="/support" color="inherit" underline="hover" variant="body2" display="block">
              <KeyboardArrowRightIcon sx={{ fontSize: '20px' }} />Join Us
            </Link>
            <Link href="/blogs" color="inherit" underline="hover" variant="body2" display="block">
              <KeyboardArrowRightIcon sx={{ fontSize: '20px' }} />Blogs
            </Link>
          </Grid>

          <Grid item xs={12} md={2.5}>
            <Typography variant="h6" gutterBottom color='#ffffff' fontWeight='bold'>
              Group Of Companies
            </Typography>
            <Link href="#" color="inherit" underline="hover" variant="body2" display="block" sx={{ mt: 3 }}>
              <KeyboardArrowRightIcon sx={{ fontSize: '20px' }} />LIP Properties pvt ltd
            </Link>
            <Link href="#" color="inherit" underline="hover" variant="body2" display="block">
              <KeyboardArrowRightIcon sx={{ fontSize: '20px' }} />Modern Tourism Network
            </Link>
            <Link href="#" color="inherit" underline="hover" variant="body2" display="block">
              <KeyboardArrowRightIcon sx={{ fontSize: '20px' }} />Addsbazar Classifieds Pvt Ltd
            </Link>
            <Link href="#" color="inherit" underline="hover" variant="body2" display="block">
              <KeyboardArrowRightIcon sx={{ fontSize: '20px' }} />Wise Global Realestate LLC Dubai
            </Link>
            <Link href="#" color="inherit" underline="hover" variant="body2" display="block">
              <KeyboardArrowRightIcon sx={{ fontSize: '20px' }} />Signmedia Infotech
            </Link>
          </Grid>
        </Grid>

        <Box
          sx={{
            borderTop: '1px solid #333',
            mt: 4,
            mb: 4,
            pt: 2,
            pb: 2,
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            borderBottom: '1px solid #333'
          }}
        >
          <Box>
            <Link href="#" color="inherit" underline="hover" sx={{ mr: 2 }}>
              Terms and Conditions
            </Link>
            <Link href="#" color="inherit" underline="hover">
              Privacy Policy
            </Link>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }} >
            <IconButton
            onClick={() => window.open("https://www.facebook.com/Propertystoretamilnadu", "_blank")}
              color="inherit"
              className="custom-icon-btn"
              sx={{
                border: '1px solid gray',
                borderRadius: '50%',
                padding: 1,
                '&:hover': {
                  backgroundColor: '#3b5998',
                  '& svg': {
                    color: 'white',
                  },
                },
              }}
            >
              <FaFacebookF sx={{ fontSize: '20px', color: '#3b5998' }} />
            </IconButton>

            <IconButton
            onClick={() => window.open("https://www.instagram.com/propertystores.inn?igsh=MWJ6dGpyYjdkeW85MQ==", "_blank")}
              color="inherit"
              className="custom-icon-btn"
              sx={{
                border: '1px solid gray',
                borderRadius: '50%',
                padding: 1,
                '&:hover': {
                  backgroundColor: '#e4405f',
                  '& svg': {
                    color: 'white',
                  },
                },
              }}
            >
              <FaInstagram sx={{ fontSize: '20px', color: '#e4405f' }} />
            </IconButton>

            <IconButton
            onClick={() => window.open("https://youtube.com/@propertystores?si=MTo4RyhPr92IeOrF", "_blank")}
            className="custom-icon-btn"
              color="inherit"
              sx={{
                border: '1px solid gray',
                borderRadius: '50%',
                padding: 1,
                '&:hover': {
                  backgroundColor: '#ff0033',
                  '& svg': {
                    color: 'white',
                  },
                },
              }}
            >
              <FaYoutube sx={{ fontSize: '20px', color: '#0077b5' }} />
            </IconButton>

            <IconButton
            onClick={() => window.open("https://www.linkedin.com/company/propertystores-in/", "_blank")}
              color="inherit"
              className="custom-icon-btn"
              sx={{
                border: '1px solid gray',
                borderRadius: '50%',
                padding: 1,
                '&:hover': {
                  backgroundColor: '#0077b5',
                  '& svg': {
                    color: 'white',
                  },
                },
              }}
            >
              <FaLinkedinIn sx={{ fontSize: '20px', color: '#0077b5' }} />
            </IconButton>


          </Box>

        </Box>

        <Typography variant="body2" sx={{ textAlign: 'center', mt: 2 }}>
          Copyright © 2025 Property Store. All Rights Reserved. Developed by
        </Typography>
      </Box>
    </Grid>

  );
};

export default Footer2;
