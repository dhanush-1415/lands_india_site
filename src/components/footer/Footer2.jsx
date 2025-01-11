import React from 'react';
import { Box, Grid, Typography, Button, Link, IconButton, Divider } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const Footer2 = () => {
  return (
    <Grid sx={{backgroundColor: '#121212', color: '#fff'}}>
      <Box sx={{py: 5, width: { xs: '98%', sm: '98%', md: '90%' }, margin: '0px auto' }}>
        <Grid container sx={{ justifyContent: { xs: 'space-between' } }}>
          <Grid container sx={{ justifyContent: { xs: 'space-between' }, margin: '50px 0' }}>

            <Grid item xs={12} md={5.8} sx={{ margin: '20px 0' }}>
              <Grid container justifyContent='space-between' sx={{ backgroundColor: '#1E1E1E', borderRadius: '5px', padding: { xs: '20px', sm: '20px', md: '0px' } }}>
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
                <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Grid>
                    <Grid container justifyContent='space-between' flexDirection="row" sx={{ backgroundColor: '#1E1E1E', borderRadius: '5px', boxShadow: " rgba(99, 99, 99, 0.2) 0px 2px 8px 0px", marginBottom: '-20px', padding: '10px 20px' }} >
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
              <Grid container justifyContent='space-between' sx={{ backgroundColor: '#1E1E1E', borderRadius: '5px', padding: { xs: '20px', sm: '20px', md: '0px' } }}>
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
                <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Grid>
                    <Grid container justifyContent='space-between' flexDirection="row" sx={{ backgroundColor: '#1E1E1E', borderRadius: '5px', boxShadow: " rgba(99, 99, 99, 0.2) 0px 2px 8px 0px", marginBottom: '-20px', padding: '10px 20px' }} >
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
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom color='#ffffff' fontWeight='bold'>
              Office Address
            </Typography>
            <Typography variant="body2" fontWeight='bold' color='gray' sx={{mt:3}}>
              Head office:
            </Typography>
            <Typography variant="body2" fontWeight='bold'>
              2118 Thornridge Cir. Syracuse, Connecticut 35624
            </Typography>
            <Typography variant="body2" fontWeight='bold' color='gray' sx={{ mt: 1 }}>
              Branch:
            </Typography>
            <Typography variant="body2" fontWeight='bold' >
              3891 Ranchview Dr. Richardson, California 62639
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }} fontWeight='bold'>
              3517 W. Gray St. Utica, Pennsylvania 57867
            </Typography>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom color='#ffffff' fontWeight='bold'>
              Contact Our Team
            </Typography>
            <Typography variant="body2" fontWeight='bold' color='gray'  sx={{mt:3}}>
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

          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom color='#ffffff' fontWeight='bold'>
              Our Company
            </Typography>
            <Link href="#" color="inherit" underline="hover" variant="body2" display="block"  sx={{mt:3}}>
              <KeyboardArrowRightIcon sx={{ fontSize: '20px' }} />About Us
            </Link>
            <Link href="#" color="inherit" underline="hover" variant="body2" display="block">
              <KeyboardArrowRightIcon sx={{ fontSize: '20px' }} /> Career
            </Link>
            <Link href="#" color="inherit" underline="hover" variant="body2" display="block">
              <KeyboardArrowRightIcon sx={{ fontSize: '20px' }} />Our Agents
            </Link>
            <Link href="#" color="inherit" underline="hover" variant="body2" display="block">
              <KeyboardArrowRightIcon sx={{ fontSize: '20px' }} />Join Us
            </Link>
            <Link href="#" color="inherit" underline="hover" variant="body2" display="block">
              <KeyboardArrowRightIcon sx={{ fontSize: '20px' }} />Blogs
            </Link>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom color='#ffffff' fontWeight='bold'>
              Group Of Companies
            </Typography>
            <Link href="#" color="inherit" underline="hover" variant="body2" display="block"  sx={{mt:3}}>
              <KeyboardArrowRightIcon sx={{ fontSize: '20px' }} />About Us
            </Link>
            <Link href="#" color="inherit" underline="hover" variant="body2" display="block">
              <KeyboardArrowRightIcon sx={{ fontSize: '20px' }} />Career
            </Link>
            <Link href="#" color="inherit" underline="hover" variant="body2" display="block">
              <KeyboardArrowRightIcon sx={{ fontSize: '20px' }} />Our Agents
            </Link>
            <Link href="#" color="inherit" underline="hover" variant="body2" display="block">
              <KeyboardArrowRightIcon sx={{ fontSize: '20px' }} />Join Us
            </Link>
            <Link href="#" color="inherit" underline="hover" variant="body2" display="block">
              <KeyboardArrowRightIcon sx={{ fontSize: '20px' }} />Blogs
            </Link>
          </Grid>
        </Grid>

        {/* Footer2 Bottom */}
        <Box
          sx={{
            borderTop: '1px solid #333',
            mt: 4,
            pt: 2,
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
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
          <Box>
            <IconButton color="inherit">
              <FacebookIcon />
            </IconButton>
            <IconButton color="inherit">
              <LinkedInIcon />
            </IconButton>
            <IconButton color="inherit">
              <InstagramIcon />
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
