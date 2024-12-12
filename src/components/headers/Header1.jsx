import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import { AppBar, Toolbar, Typography, Box, Grid, TextField,Card,CardContent, Menu, MenuItem,Switch, IconButton, Drawer, List, ListItem, ListItemText, Button, useMediaQuery, useTheme, Dialog, DialogTitle, DialogContent, DialogActions, FormHelperText, Divider  } from '@mui/material';
import { Link } from "react-router-dom";
import Slide from '@mui/material/Slide';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl'
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import logo from './logo.jpeg';
import addedValue from './added-value.png';
import individual from './individual.png';
import projects from './projects.png';
import CloseIcon from '@mui/icons-material/Close';
import InputAdornment from '@mui/material/InputAdornment';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';



const buttonStyle = {
  background: 'linear-gradient(to right, #0d7ae3 50%, white 50%)',
  backgroundSize: '200% 100%',
  backgroundPosition: '0% 50%',
  transition: 'background-position 1s',
  '&:hover': {
    backgroundPosition: '100% 50%',
    color: '#0d7ae3', // Ensure text remains visible on both backgrounds
  },
  color: 'white', // Ensure text remains visible on both backgrounds
};



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

import MobileNav from "./MobileNav";
export default function Header1({
  parentClass = "main-header header-fixed fixed-header",
}) {
  const [isFixed, setIsFixed] = useState(false);

  // individual , project , value-added service
  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [loginActive , setLoginActive] = useState(true);
  const [verifyBar , setVerifyBar] = useState(false);

  const [otp , setOtp] = useState("");

  const [resOtp , setResOtp] = useState("");

  const [is_login , setIsLogin] = useState(false);


  useEffect(()=>{
    const phone = localStorage.getItem("phone");
    const type = localStorage.getItem("type");
    const isLogin = localStorage.getItem("is_login");

    if(isLogin){
      setIsLogin(isLogin)
    }

  },[])




  const [registerData, setRegisterData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    role:''
  });

  const [loginData, setLoginData] = useState({
    phone: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Validate phone number
  useEffect(() => {
    if (!loginActive && registerData.phone !== '') {
      const phoneRegex = /^\d{10}$/;
      setErrors(prevErrors => ({
        ...prevErrors,
        phone: phoneRegex.test(registerData.phone) ? '' : 'Phone number must be 10 digits'
      }));
    }
  }, [registerData.phone, loginActive]);

  // Validate email
  useEffect(() => {
    if (!loginActive && registerData.email !== '') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setErrors(prevErrors => ({
        ...prevErrors,
        email: emailRegex.test(registerData.email) ? '' : 'Invalid email address'
      }));
    }
  }, [registerData.email, loginActive]);

  // Validate password
  useEffect(() => {
    if (!loginActive && registerData.password !== '') {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      setErrors(prevErrors => ({
        ...prevErrors,
        password: passwordRegex.test(registerData.password)
          ? ''
          : 'Password must be at least 8 characters long and include 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character'
      }));
    }
  }, [registerData.password, loginActive]);

  useEffect(() => {
    if (!loginActive && registerData.confirmPassword !== '') {
      setErrors(prevErrors => ({
        ...prevErrors,
        confirmPassword: registerData.password === registerData.confirmPassword
          ? ''
          : 'Passwords do not match'
      }));
    }
  }, [registerData.confirmPassword, registerData.password, loginActive]);

  const [inputDisable , setInputDisable] = useState(false);

  const handlePhoneChange =async (phoneValue) => {

    setInputDisable(true)

    const data = {
      phone:phoneValue
    }

    const response = await verifyMobileOtp(data);  
    if (response.success === true) {
      setVerifyBar(true);
      setResOtp(response.otp)
      toast.success('OTP sent successfully');
    } else {
      toast.error('Failed to Verify OTP');
    }
  };

  const handleRegisterChange = (event) => {
    const { id, value } = event.target;
  
    setRegisterData(prevData => {
      const updatedData = {
        ...prevData,
        [id]: value
      };
  
      if (id === 'phone' && value.length === 10) {
        handlePhoneChange(value);
      }
  
      return updatedData;
    });
  };

  const handleRoleChange = (role) => {
    setRegisterData(prevData => ({
      ...prevData,
      role
    }));
  };
  

  const handleLoginChange = (event) => {
    const { id, value } = event.target;
    setLoginData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };


  const verifyOtp = () =>{
      if(otp === resOtp){
        toast.success("OTP Verified Successfully");
        setVerifyBar(false);
      }else{
        toast.error("Incorrect OTP");
      }
  }


  const handleSignup = async() => {
    const { name, phone, password, email, role } = registerData;
  
    if (!name || !phone || !password || !email || !role) {
      toast.error('All fields are required.');
      return;
    }
  
    const data = {
      fullName: name,
      phone: phone,
      password: password,
      email: email,
      type: role
    }

    const response = await RegisterUser(data);  
    if (response.success === true) {
      setLoginActive(true);
      setRegisterData({
        name: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: ''
      });
      toast.success('Registred Successfully');
    } else {
      toast.error('Failed to Register');
    }
  
    console.log(data);
  }
  

  const handleLogin = async() => {
    const {phone, password } = loginData;
  
    if (!phone || !password) {
      toast.error('All fields are required.');
      return;
    }
  
    const data = {
      phone: phone,
      password: password,
    }

    const response = await UserLogin(data);  
    if (response.success === true) {
      setLoginData({
        phone: '',
        password: '',
      });
      setDialogOpen(false); 
      localStorage.setItem("phone" , response.phone);
      localStorage.setItem("type" , response.type);
      localStorage.setItem("is_login" , true);
      setLoginActive(true);
      toast.success('Login Successful');
    } else {
      toast.error('Failed to Login');
    }
    }
  

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };


  const [openMenu, setOpenMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  

  const handleDialogOpen = () => {
    // const is_login = localStorage.getItem("is_login") === 'true';
    // if(is_login){
    //   // window.location.href = "/dashboard";
    //   setOpenMenu(true);
    // } else {
    //   setDialogOpen(true);
    // }
    setDialogOpen(true);

  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'Individual', path: '/about' },
    { text: 'Projects', path: '/about' },
    { text: 'Added Value Service', path: '/about' },
    { text: 'Rent/Lease', path: '/about' },
    { text: 'Sell Property', path: '/about' },
    { text: 'Login/Register', path: '/login-register' },
  ];


  const [profileOpen , setProfileOpen] = useState(false);

  const handleProfileOpen = () => {
    setProfileOpen(true);
    handleMenuClose();
  }

  const handleProfileClose = () => {
    setProfileOpen(false)
  }



  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  
  // const items = [
  //   {
  //     img:'https://static.vecteezy.com/system/resources/previews/028/900/473/non_2x/agent-icon-design-free-png.png',
  //     title: 'Individual',
  //     description:
  //       'Discover personalized living spaces crafted to reflect your unique style, preferences, and lifestyle. Our individual property options include state-of-the-art apartments and luxurious villas, offering a range of modern amenities such as 24/7 security, cutting-edge smart home systems, and eco-friendly green energy solutions. Designed for ultimate comfort and convenience, these properties are perfect for families, professionals, and individuals who seek a harmonious blend of luxury, privacy, and practicality. Whether you’re looking for a cozy apartment or an expansive villa, we have the ideal space for you.',
  //   },
  //   {
  //     img:'https://static.vecteezy.com/system/resources/previews/028/900/473/non_2x/agent-icon-design-free-png.png',
  //     title: 'Project',
  //     description:
  //       'Explore our diverse range of real estate projects, thoughtfully designed to meet the dynamic needs of businesses, communities, and future generations. From sleek commercial complexes to large-scale mixed-use developments, our projects emphasize innovation, sustainability, and prime locations. Each property is designed to offer flexible, customizable spaces that cater to the evolving demands of modern enterprises. With long-term value in mind, we provide end-to-end solutions that cater to investors, developers, and end-users alike. Our projects are meticulously planned to create vibrant, sustainable communities that foster growth, connection, and prosperity.',
  //   },
  //   {
  //     img:'https://static.vecteezy.com/system/resources/previews/028/900/473/non_2x/agent-icon-design-free-png.png',
  //     title: 'Value-Added Services',
  //     description:
  //       'Maximize the potential of your real estate investments with our premium suite of value-added services, designed to elevate your experience every step of the way. Whether you require expert property staging to showcase your property’s full potential, high-resolution photography to capture stunning visuals, or in-depth legal and financial guidance to navigate complex transactions, we have you covered. Our comprehensive services also include relocation support, tailored maintenance plans, and personalized strategies designed to ensure a smooth, efficient, and rewarding property experience. We take pride in offering bespoke solutions that align with your unique needs, helping you achieve success in every aspect of your real estate journey.',
  //   },
  // ];
  
  
  const items = [
    {
      img: individual,
      title: 'Individual Property',
      description: 'Find tailored living spaces, from cozy apartments to elegant villas, featuring modern conveniences such as smart technology, green solutions, and round-the-clock security for a fulfilling lifestyle.',
    },
    {
      img: projects,
      title: 'Projects',
      description: 'Discover an array of projects, from dynamic commercial hubs to versatile mixed-use spaces, designed to cater to the demands of businesses, entrepreneurs, and investors alike.',
    },
    {
      img: addedValue,
      title: 'Added Value Services',
      description: 'Experience seamless real estate journeys with specialized services, including legal, financial, and customized guidance to simplify processes and maximize your outcomes.',
    },
];


  

  return (
    <>
    <Dialog fullScreen open={dialogOpen} TransitionComponent={Transition} onClose={handleDialogClose}>
     <DialogContent sx={{padding:'0px'}}>
        <IconButton
          onClick={handleDialogClose}
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            color: '#000000',
          }}
        >
        <CloseIcon />
        <Typography sx={{marginLeft:'5px'}}>
          Close
        </Typography>
          
        </IconButton>
          <Grid height='100vh' 
            sx={{
              display: 'flex',
              alignItems: 'center',
              // backgroundImage: 'url()',
              backgroundColor:'#F3F6FB',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              color: '#fff',
            }}
          >
            <Grid container justifyContent='space-between' alignItems='center' sx={{width:'90%',margin:'0px auto'}}>
              <Grid item xs={12} md={5} sx={{display:{xs:'none',sm:'none',md:'block'}}}>
                <Carousel
                  responsive={responsive}
                  autoPlay
                  autoPlaySpeed={5000}
                  infinite
                  showDots
                  arrows={false}
                >
                  {/* {items.map((item, index) => (
                    <div key={index}>
                      <Typography variant='h4' fontWeight="bold">{item.title}</Typography>
                      <nav aria-label="secondary mailbox folders">
                        <List>
                          {item.points.map((point, idx) => (
                            <ListItem disablePadding key={idx}>
                              <ListItemButton>
                                <ListItemIcon>
                                  <CloseIcon sx={{ color: '#fff' }} />
                                </ListItemIcon>
                                <ListItemText primary={
                                      <Typography variant="h6"> 
                                      {point}
                                    </Typography>
                                } />
                              </ListItemButton>
                            </ListItem>
                          ))}
                        </List>
                      </nav>
                    </div>
                  ))} */}
                  {items.map((item, index) => (
                    <div key={index} style={{ marginBottom: '2rem' }}>
                      <div className="d-flex flex-column justify-content-center align-items-center">
                        <img src={item.img} alt="icon" style={{
                                                    width: "200px",
                                                    height: "200px",
                                                    objectFit: "cover"
                                                  }}/>
                        <Typography variant="h4" fontWeight="bold" px={3}>
                          {item.title}
                        </Typography>
                      </div>
                    
                      <Typography variant="body1" color="#000000"  sx={{ marginTop: '1rem', textAlign:'center' }}>
                        {item.description}
                      </Typography>
                    </div>
                  ))}
                </Carousel>
              </Grid>
              <Grid item xs={12} md={5.9}>
                <Card sx={{borderRadius:'20px',width:{xs:'100%',sm:'100%',md:'85%',margin:'0px auto'},boxShadow:' rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px'}} >
                  <CardContent>
                    <Grid>
                      {loginActive ? (
                        <>
                          <Grid item md={12}>
                            <Grid container justifyContent='space-between' direction='column' spacing={1.7} sx={{padding:{xs:'none',sm:'none',md:'35px'}}} >
                              <Grid item xs={12} sm={12} md={12}>
                                <Typography variant='h5' sx={{fontWeight:'bold'}}>Login to Continue</Typography>
                              </Grid>
                              <Grid item xs={12} sm={12} md={12}>
                                <TextField
                                  id="phone"
                                  label="Phone"
                                  variant="outlined"
                                  fullWidth
                                  value={loginData.phone}
                                  error={!!errors.phone}
                                  helperText={errors.phone}
                                  onChange={handleLoginChange}
                                  InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <IconButton>
                                          <LocalPhoneIcon />
                                        </IconButton>
                                      </InputAdornment>
                                    ),
                                  }}
                                  sx={{
                                    "& .MuiOutlinedInput-root": {
                                      "& input": {
                                        border: "none", // Removes the border
                                      },
                                    },
                                  }}
                                />                          
                              </Grid>
                              <Grid item xs={12} sm={12} md={12}>
                                <TextField
                                  id="password"
                                  label="Password"
                                  variant="outlined"
                                  fullWidth
                                  type="password"
                                  value={loginData.password}
                                  onChange={handleLoginChange}
                                  error={!!errors.password}
                                  helperText={errors.password}
                                  InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <IconButton>
                                          <PasswordIcon />
                                        </IconButton>
                                      </InputAdornment>
                                    ),
                                  }}
                                  sx={{
                                    "& .MuiOutlinedInput-root": {
                                      "& input": {
                                        border: "none", // Removes the border
                                      },
                                    },
                                  }}
                                />    
                              </Grid>
                              <Grid item xs={12} sm={12} md={12} sx={{display:'flex',justifyContent:'flex-end'}}>
                                <Button sx={buttonStyle} variant='contained' size="large" fullWidth >Login</Button>
                              </Grid>
                              <Grid item md={12} sx={{display:'flex',justifyContent:'center'}}>
                                <Typography variant='subtitle1'>Create new account? <span onClick={() => {setLoginActive(false)}} style={{cursor:'pointer',color:'#0d7ae3'}} >Create</span></Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </>
                      ):(
                    <>
                      <Grid item md={12} sx={{margin:'20px 0'}}>
                        <Grid container justifyContent='space-between' direction='column' gap={1.7} sx={{padding:{xs:'none',sm:'none',md:' 0px 20px'}}} >
                          <Grid item md={12}>
                            <Typography variant='h5' sx={{fontWeight:'bold'}}>Register to Continue</Typography>
                          </Grid>
                          <Grid item xs={12} sm={12} md={12}>
                            <TextField
                              id="name"
                              label="Name"
                              variant="outlined"
                              fullWidth
                              value={registerData.name}
                              onChange={handleRegisterChange}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton>
                                      <PersonIcon />
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  "& input": {
                                    border: "none", // Removes the border
                                  },
                                },
                              }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={12} md={12}>
                            {/* <TextField
                              id="phone"
                              label="Phone"
                              variant="outlined"
                              fullWidth
                              disabled={inputDisable}
                              value={registerData.phone}
                              onChange={handleRegisterChange}
                              error={!!errors.phone}
                              helperText={errors.phone}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton>
                                      <LocalPhoneIcon />
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                            /> */}
                            <TextField
                              id="phone"
                              label="Phone"
                              variant="outlined"
                              fullWidth
                              disabled={inputDisable}
                              value={registerData.phone}
                              onChange={handleRegisterChange}
                              error={!!errors.phone}
                              helperText={errors.phone}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton>
                                      <LocalPhoneIcon />
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  "& input": {
                                    border: "none", // Removes the border
                                  },
                                },
                              }}
                            />
                          </Grid>
                          {verifyBar && (
                            <Grid item xs={12} sm={12} md={12}>
                              <Grid container direction="row">
                                <Grid item xs={6} sm={6} md={6}>
                                  <TextField id="outlined-basic" label="OTP" variant="outlined" fullWidth size='small' value={otp} onChange={(e)=>{setOtp(e.target.value)}} />
                                </Grid>
                                <Grid item xs={6} sm={6} md={6}>
                                  <Button sx={{marginLeft:'20px'}} variant='contained' disabled={!otp.length} onClick={verifyOtp}>Verify</Button>
                                </Grid>
                              </Grid>
                            </Grid>
                          )}
                          <Grid item xs={12} sm={12} md={12}>
                            <TextField
                              id="email"
                              label="Email"
                              variant="outlined"
                              fullWidth
                              value={registerData.email}
                              onChange={handleRegisterChange}
                              error={!!errors.email}
                              helperText={errors.email}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton>
                                      <EmailIcon />
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  "& input": {
                                    border: "none", // Removes the border
                                  },
                                },
                              }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={12} md={12}>
                            <TextField
                              id="password"
                              label="Password"
                              variant="outlined"
                              fullWidth
                              type="password"
                              value={registerData.password}
                              onChange={handleRegisterChange}
                              error={!!errors.password}
                              helperText={errors.password}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton>
                                      <PasswordIcon />
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  "& input": {
                                    border: "none", // Removes the border
                                  },
                                },
                              }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={12} md={12}>
                            <TextField
                              id="confirmPassword"
                              label="Confirm Password"
                              variant="outlined"
                              fullWidth
                              type="password"
                              value={registerData.confirmPassword}
                              onChange={handleRegisterChange}
                              error={!!errors.confirmPassword}
                              helperText={errors.confirmPassword}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton>
                                      <PasswordIcon />
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  "& input": {
                                    border: "none", // Removes the border
                                  },
                                },
                              }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={12} ms={12}>
                             <FormControl component="fieldset" error={!!errors.role}>
                              {/* <FormLabel component="legend">Role</FormLabel> */}
                              <Grid container spacing={2}>
                                <Grid item>
                                  <FormControlLabel
                                    control={
                                      <Switch
                                        checked={registerData.role === 'Buyer'}
                                        onChange={() => handleRoleChange('Buyer')}
                                      />
                                    }
                                    label="Buyer"
                                  />
                                </Grid>
                                <Grid item>
                                  <FormControlLabel
                                    control={
                                      <Switch
                                        checked={registerData.role === 'Seller'}
                                        onChange={() => handleRoleChange('Seller')}
                                      />
                                    }
                                    label="Seller"
                                  />
                                </Grid>
                                <Grid item>
                                  <FormControlLabel
                                    control={
                                      <Switch
                                        checked={registerData.role === 'Agent'}
                                        onChange={() => handleRoleChange('Agent')}
                                      />
                                    }
                                    label="Agent"
                                  />
                                </Grid>
                                <Grid item>
                                  <FormControlLabel
                                    control={
                                      <Switch
                                        checked={registerData.role === 'B2B'}
                                        onChange={() => handleRoleChange('B2B')}
                                      />
                                    }
                                    label="B2B"
                                  />
                                </Grid>
                              </Grid>
                              {errors.role && <FormHelperText>{errors.role}</FormHelperText>}
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} sm={12} md={12} sx={{display:'flex',justifyContent:'flex-end'}}>
                            <Button
                              variant="contained"
                              size="large"
                              fullWidth
                              // onClick={handleSignup}
                              sx={buttonStyle}
                            >
                              Submit
                            </Button>
                          </Grid>
                          <Grid item md={12} sx={{display:'flex',justifyContent:'center'}}>
                            <Typography variant='subtitle1'>Already have an account? <span onClick={() => {setLoginActive(true)}} style={{cursor:'pointer',color:'#0d7ae3'}} >Login</span></Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </>
                  )}
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    <header
      id="header"
      className={`${parentClass} ${isFixed ? "is-fixed" : ""}`}
    >
      {/* Header Lower */}
      <div className="header-lower">
        <div className="row">
          <div className="col-lg-12">
            <div className="inner-header">
              <div className="inner-header-left">
                <div className="logo-box flex">
                  <div className="logo">
                    <Link to={`/`}>
                      <img
                        alt="logo"
                        width={isMobile ? 60 : 75}
                        className="logo-1"
                        // height={48}
                        src={logo}
                      />
                      <img
                        alt="logo"
                        width={70}
                        className="logo-2"
                        // height={48}
                        src={logo}
                      />
                    </Link>
                    {/* <h6 className="fw-bold">Lands India</h6> */}
                  </div>
                </div>
              </div>
       
              <div className="inner-header-right header-account">
              <div className="nav-outer flex align-center">
                {/* Main Menu */}
                <nav className="main-menu show navbar-expand-md">
                  <div
                    className="navbar-collapse collapse clearfix"
                    id="navbarSupportedContent"
                  >
                    <ul className="navigation clearfix">
                      <Nav />
                      <a
                        onClick={handleDialogOpen}
                        style={{
                          textAlign: 'center',
                          fontWeight: 600,
                          padding: '27px 20px 27px 0px',
                          letterSpacing: '0px',
                          color: '#000000',
                          fontSize: '16px',
                          lineHeight: '21.86px',
                          textTransform: 'capitalize',
                        }}
                      
                        >
                          <svg
                            style={{marginBottom:'3px', marginRight:'4px'}}
                            width={20}
                            height={20}
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13.1251 5C13.1251 5.8288 12.7959 6.62366 12.2099 7.20971C11.6238 7.79576 10.8289 8.125 10.0001 8.125C9.17134 8.125 8.37649 7.79576 7.79043 7.20971C7.20438 6.62366 6.87514 5.8288 6.87514 5C6.87514 4.1712 7.20438 3.37634 7.79043 2.79029C8.37649 2.20424 9.17134 1.875 10.0001 1.875C10.8289 1.875 11.6238 2.20424 12.2099 2.79029C12.7959 3.37634 13.1251 4.1712 13.1251 5ZM3.75098 16.765C3.77776 15.1253 4.44792 13.5618 5.61696 12.4117C6.78599 11.2616 8.36022 10.6171 10.0001 10.6171C11.6401 10.6171 13.2143 11.2616 14.3833 12.4117C15.5524 13.5618 16.2225 15.1253 16.2493 16.765C14.2888 17.664 12.1569 18.1279 10.0001 18.125C7.77014 18.125 5.65348 17.6383 3.75098 16.765Z"
                              stroke="black"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          Login/Register
                        </a>
                    </ul>
                  </div>
                </nav>
                {/* Main Menu End*/}
              </div>
               
              </div>
              <div
                className="mobile-nav-toggler mobile-button"
                onClick={() => {
                  document.body.classList.add("mobile-menu-visible");
                }}
              >
                <span />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Header Lower */}
      {/* Mobile Menu  */}
      <div
        className="close-btn"
        onClick={() => {
          document.body.classList.remove("mobile-menu-visible");
        }}
      >
        <span className="icon flaticon-cancel-1" />
      </div>
      <div className="mobile-menu">
        <div className="menu-backdrop" />
        <nav className="menu-box">
          <div className="nav-logo">
            <Link to={`/`}>
              <img
                alt="nav-logo"
                width={70}
                src={logo}
              />
            </Link>
            {/* <h4>Lands India</h4> */}
          </div>
          <div className="bottom-canvas">
            <div className="login-box flex align-center">
              <a onClick={handleDialogOpen}>
                Login
              </a>
              <span>/</span>
              <a onClick={handleDialogOpen}>
                Register
              </a>
            </div>
            <div className="menu-outer">
              <MobileNav />
            </div>
            {/* <div className="button-mobi-sell">
              <Link className="tf-btn primary" to={`/add-property`}>
                Submit Property
              </Link>
            </div> */}
            <div className="mobi-icon-box">
              <div className="box d-flex align-items-center">
                <span className="icon icon-phone2" />
                <div>1-333-345-6868</div>
              </div>
              <div className="box d-flex align-items-center">
                <span className="icon icon-mail" />
                <div>landsindia@gmail.com</div>
              </div>
            </div>
          </div>
        </nav>
      </div>
      {/* End Mobile Menu */}
    </header>
    </>
  );
}
