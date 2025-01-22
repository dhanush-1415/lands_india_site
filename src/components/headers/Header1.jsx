import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import NavTwo from './Nav2';
import { AppBar, Toolbar, Tooltip, Typography, Box, Grid, TextField, Card, CardContent, Menu, MenuItem, Switch, IconButton, Drawer, List, ListItem, ListItemText, Button, useMediaQuery, useTheme, Dialog, DialogTitle, DialogContent, DialogActions, FormHelperText, Divider } from '@mui/material';
import { Link } from "react-router-dom";
import Slide from '@mui/material/Slide';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl'
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
// import logo from './logo-light.png';
import logo from './logo-new.png';
import addedValue from './added-value-1.png';
import individual from './individual-1.png';
import projects from './projects-1.png';
import CloseIcon from '@mui/icons-material/Close';
import InputAdornment from '@mui/material/InputAdornment';
import PersonIcon from '@mui/icons-material/Person';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import Carousel from 'react-multi-carousel';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import 'react-multi-carousel/lib/styles.css';
import { UserLogin, RegisterUser, verifyMobileOtp } from "@/apiCalls";
import { toast } from "react-toastify";
import InfoIcon from '@mui/icons-material/Info';
import Avatar from '@mui/material/Avatar';
import { Home, Person, PostAdd, Favorite, AddCircle, RequestPage } from '@mui/icons-material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';


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

  const [anchorTwoEl, setTwoAnchorEl] = useState(null);

  const [userDetails, setUserDetails] = useState(null);

  console.log(userDetails, "ppppppppppppppppppppppppppppppppp")

  const open = (anchorTwoEl);

  const handleClick = (event) => {
    setTwoAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setTwoAnchorEl(null);
  };

  const handleNavigation = (path) => {
    window.location.href = `/${path}`
  }



  const handleLogout = () => {
    console.log("logout")
    localStorage.removeItem("LandsUser");
    setTimeout(() => {
      window.location.href = "/";
    }, 2400);
    toast.success("Logout Successful");

  };

  const [isFixed, setIsFixed] = useState(false);

  // individual , project , value-added service
  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("LandsUser");
    setUserDetails(JSON.parse(user))
    if (user) {
      setIsLogin(true);
    }
  }, [isLogin]);


  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [loginActive, setLoginActive] = useState(true);
  const [verifyBar, setVerifyBar] = useState(false);

  const [otp, setOtp] = useState("");

  const [resOtp, setResOtp] = useState("");


  // useEffect(()=>{
  //   const phone = localStorage.getItem("phone");
  //   const type = localStorage.getItem("type");
  //   const isLogin = localStorage.getItem("is_login");

  //   if(isLogin){
  //     setIsLogin(isLogin)
  //   }

  // },[])


  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const togglePasswordVisibility = (field) => {
    if (field === 'oldPassword') {
      setShowOldPassword(!showOldPassword);
    } else if (field === 'newPassword') {
      setShowNewPassword(!showNewPassword);
    } else if (field === 'confirmPassword') {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };


  const [registerData, setRegisterData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
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

  const [inputDisable, setInputDisable] = useState(false);

  const handlePhoneChange = async (phoneValue) => {

    // setInputDisable(true)

    if (phoneValue.length === 10) {

      const data = {
        phone: phoneValue
      }

      const response = await verifyMobileOtp(data);
      if (response.success === true) {
        setVerifyBar(true);
        setResOtp(response.otp);
        setInputDisable(true);
        toast.success('OTP sent successfully');
      } else {
        toast.error('Failed to Verify OTP');
      }
    }
  };

  const handleRegisterChange = (event) => {
    const { id, value } = event.target;

    setRegisterData(prevData => {
      const updatedData = {
        ...prevData,
        [id]: value
      };

      // if (id === 'phone' && value.length === 10) {
      //   handlePhoneChange(value);
      // }

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


  const [isVerified, setIsVerified] = useState(false);

  const verifyOtp = () => {
    if (otp === resOtp) {
      toast.success("OTP Verified Successfully");
      setVerifyBar(false);
      setIsVerified(true);
    } else {
      toast.error("Incorrect OTP");
    }
  }

  const handleSignup = async () => {
    console.log("Signup function triggered");  // Debugging
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
    };

    const response = await RegisterUser(data);
    if (response.success) {
      setLoginActive(true);
      setRegisterData({
        name: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: ''
      });
      toast.success('Registered Successfully');
    } else {
      toast.error(response.message);
    }

    console.log(data);
  }


  // const handleSignup = async () => {
  //   const { name, phone, password, email, role } = registerData;

  //   if (!name || !phone || !password || !email || !role) {
  //     toast.error('All fields are required.');
  //     return;
  //   }

  //   const data = {
  //     fullName: name,
  //     phone: phone,
  //     password: password,
  //     email: email,
  //     type: role
  //   }

  //   const response = await RegisterUser(data);
  //   if (response.success) {
  //     setLoginActive(true);
  //     setRegisterData({
  //       name: '',
  //       phone: '',
  //       email: '',
  //       password: '',
  //       confirmPassword: '',
  //       role: ''
  //     });
  //     toast.success('Registred Successfully');
  //   } else {
  //     toast.error(response.message);
  //   }

  //   console.log(data);
  // }

  const handleLogin = async () => {
    const { phone, password } = loginData;

    if (!phone || !password) {
      toast.error('All fields are required.');
      return;
    }

    const data = {
      phone: phone,
      password: password,
    };

    try {
      const response = await UserLogin(data);

      if (response.success) {
        setLoginData({
          phone: '',
          password: '',
        });
        setDialogOpen(false);
        if (response.user) {
          localStorage.setItem("LandsUser", JSON.stringify(response.user));
        }
        setIsLogin(true)
        // Uncomment and use these if required for your application
        // localStorage.setItem("phone", response.phone);
        // localStorage.setItem("type", response.type);
        // localStorage.setItem("is_login", true);
        setLoginActive(true);
        toast.success('Login Successful');
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error('An error occurred during login. Please try again.');
      console.error('Login error:', error); // Optional: Log the error for debugging
    }
  };


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


  const [profileOpen, setProfileOpen] = useState(false);

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
        <DialogContent sx={{ padding: '0px' }}>
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
            <Typography sx={{ marginLeft: '5px' }}>
              Close
            </Typography>

          </IconButton>
          <Grid height='100vh'
            sx={{
              display: 'flex',
              alignItems: 'center',
              // backgroundImage: 'url()',
              backgroundColor: '#F3F6FB',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              color: '#fff',
            }}
          >
            <Grid container justifyContent='space-between' alignItems='center' sx={{ width: '90%', margin: '0px auto' }}>
              <Grid item xs={12} md={5} sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
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
                        }} />
                        <Typography variant="h4" color="#000000" fontWeight="bold" px={3}>
                          {item.title}
                        </Typography>
                      </div>

                      <Typography variant="body1" color="#000000" sx={{ marginTop: '1rem', textAlign: 'center' }}>
                        {item.description}
                      </Typography>
                    </div>
                  ))}
                </Carousel>
              </Grid>
              <Grid item xs={12} md={5.9}>
                <Card sx={{ borderRadius: '20px', width: { xs: '100%', sm: '100%', md: '85%', margin: '0px auto' }, boxShadow: ' rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px' }} >
                  <CardContent>
                    <Grid>
                      {loginActive ? (
                        <>
                          <Grid item md={12}>
                            <Grid container justifyContent='space-between' direction='column' spacing={1.7} sx={{ padding: { xs: 'none', sm: 'none', md: '35px' } }} >
                              <Grid item xs={12} sm={12} md={12}>
                                <Typography variant='h5' sx={{ fontWeight: 'bold' }}>Login to Continue</Typography>
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
                                  type={showOldPassword ? 'text' : 'password'}
                                  value={loginData.password}
                                  onChange={handleLoginChange}
                                  error={!!errors.password}
                                  helperText={errors.password}
                                  InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <IconButton onClick={() => togglePasswordVisibility('oldPassword')}>
                                          {showOldPassword ? <FaEyeSlash /> : <FaEye />}
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
                              <Grid item xs={12} sm={12} md={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button sx={buttonStyle} variant='contained' size="large" fullWidth onClick={handleLogin} >Login</Button>
                              </Grid>
                              <Grid item md={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Typography variant='subtitle1'>Create new account? <span onClick={() => { setLoginActive(false) }} style={{ cursor: 'pointer', color: '#0d7ae3' }} >Create</span></Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </>
                      ) : (
                        <>
                          <Grid item md={12} sx={{ margin: '20px 0', overflow: 'auto' }}>
                            <Grid container justifyContent='space-between' direction='column' gap={1.7} sx={{ padding: { xs: 'none', sm: 'none', md: ' 0px 20px' } }} >
                              <Grid item md={12}>
                                <Typography variant='h5' sx={{ fontWeight: 'bold' }}>Register to Continue</Typography>
                              </Grid>
                              <Grid item xs={12} sm={12} md={12}>
                                <TextField
                                  id="name"
                                  label="Name"
                                  variant="outlined"
                                  fullWidth
                                  size="small"
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
                                <Grid container justifyContent='space-between'>
                                  <Grid item xs={12} sm={12} md={12}>
                                    <TextField
                                      id="phone"
                                      label="Phone"
                                      variant="outlined"
                                      fullWidth
                                      size="small"
                                      disabled={isVerified}
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
                                  {/* <Grid item xs={4} sm={2.9} md={2.5} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                    <Button variant='contained' size="large" disabled={registerData.phone.length !== 10 || isVerified} onClick={() => { handlePhoneChange(registerData.phone) }}>
                                      {inputDisable ? isVerified ? "Verified" : "Resend" : "Verify"}
                                    </Button>
                                  </Grid> */}
                                </Grid>

                              </Grid>
                              {verifyBar && (
                                <Grid item xs={12} sm={12} md={12}>
                                  <Grid container direction="row" justifyContent='space-between'>
                                    <Grid item xs={8} sm={9} md={9}>
                                      <TextField
                                        label="OTP"
                                        id="outlined-size-small"
                                        fullWidth
                                        defaultValue="Small"
                                        size="small"
                                        value={otp} onChange={(e) => { setOtp(e.target.value) }}
                                        sx={{
                                          "& .MuiOutlinedInput-root": {
                                            "& input": {
                                              border: "none",
                                              padding: '8.5px 14px'
                                            },
                                          },
                                        }}
                                      />
                                    </Grid>
                                    <Grid item xs={4} sm={2.9} md={2.5} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                      <Button sx={{ marginLeft: '20px' }} variant='contained' disabled={!otp.length} onClick={verifyOtp}>Submit</Button>
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
                                  size="small"
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
                                  size="small"
                                  type={showNewPassword ? 'text' : 'password'}
                                  value={registerData.password}
                                  onChange={handleRegisterChange}
                                  error={!!errors.password}
                                  // helperText={errors.password}
                                  InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <IconButton>
                                          {showNewPassword ? <FaEyeSlash onClick={() => togglePasswordVisibility('newPassword')} sx={{ marginRight: '3px' }} /> : <FaEye onClick={() => togglePasswordVisibility('newPassword')} sx={{ marginRight: '3px' }} />}
                                          <Tooltip title={errors.password} placement="left-start">
                                            <InfoIcon />
                                          </Tooltip>
                                        </IconButton>
                                      </InputAdornment>
                                    ),
                                  }}
                                  sx={{
                                    "& .MuiOutlinedInput-root": {
                                      "& input": {
                                        border: "none",
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
                                  size="small"
                                  type={showConfirmPassword ? 'text' : 'password'}
                                  value={registerData.confirmPassword}
                                  onChange={handleRegisterChange}
                                  error={!!errors.confirmPassword}
                                  helperText={errors.confirmPassword}
                                  InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <IconButton onClick={() => togglePasswordVisibility('confirmPassword')}>
                                          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
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
                                  <Grid container >
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
                              <Grid item xs={12} sm={12} md={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button
                                  variant="contained"
                                  size="large"
                                  fullWidth
                                  onClick={handleSignup}
                                  sx={buttonStyle}
                                >
                                  Submit
                                </Button>
                              </Grid>
                              <Grid item md={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Typography variant='subtitle1'>Already have an account? <span onClick={() => { setLoginActive(true) }} style={{ cursor: 'pointer', color: '#0d7ae3' }} >Login</span></Typography>
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
          <style>{`
            .custom-image{
              border-radius:50% !important;
            }
          `}</style>
          <div className="row">
            <div className="col-lg-12">
              <div className="inner-header">
                <div className="inner-header-left">
                  <div className="logo-box flex">
                    <div className="logo">
                      <Link to={`/`}>
                        <img
                          alt="logo"
                          style={{ width: '65px' }}
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
                          </ul>
                        </div>
                      </nav>
                      {/* Main Menu End*/}
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
                          <NavTwo />{isLogin ? (

                            <a
                              href="/add-property"
                              style={{
                                textAlign: 'center',
                                fontWeight: 600,
                                padding: '9px 12px',
                                color: '#161e2d',
                                fontSize: '15px',
                                marginRight:'30px',
                                lineHeight: '21.86px',
                                textTransform: 'capitalize',
                                backgroundColor:'#008FF7',
                                background:'#008FF7',
                                color:'#ffffff',
                              }}
                              className="custom-desk-bar"

                            >
                              Sell Property
                            </a>
                          ) : (
                            <a
                              onClick={handleDialogOpen}
                              style={{
                                textAlign: 'center',
                                fontWeight: 600,
                                padding: '27px 20px 27px 0px',
                                letterSpacing: '0px',
                                color: '#161e2d',
                                fontSize: '15px',
                                lineHeight: '21.86px',
                                textTransform: 'capitalize',
                              }}

                            >


                              Sell Property
                            </a>
                          )}
                          {isLogin ? (
                            <>

                              <a
                                aria-controls={open ? 'account-menu' : 'undefined'}
                                aria-haspopup="true"
                                onClick={handleClick}
                                aria-expanded={open ? 'true' : undefined}
                                className="custom-desk-bar"
                                style={{
                                  textAlign: 'center',
                                  fontWeight: 600,
                                  padding: '5px 12px 3px',
                                  color: '#161e2d',
                                  fontSize: '15px',
                                  lineHeight: '21.86px',
                                  textTransform: 'capitalize',
                                  backgroundColor:'#161e2d',
                                  background:'#161e2d',
                                  color:'#ffffff'
                                }}

                              >
                                {/* <AccountCircleOutlinedIcon sx={{ fontSize: 28, marginBottom: 0.45, color: '#161e2d', marginRight: '5px' }} /> */}
                                {userDetails?.image ? (
                                  <img src={userDetails?.image || ""} alt='profile' width="30px" style={{ marginRight: '5px' }} className="custom-image" />
                                ):(<AccountCircleOutlinedIcon sx={{ fontSize: 28, marginBottom: 0.45, color: '#ffffff', marginRight: '5px' }} />)}
                                {userDetails?.fullName}
                              </a>
                              <Menu
                                anchorEl={anchorTwoEl}
                                id="account-menu"
                                open={open}
                                onClose={handleClose}
                                onClick={handleClose}
                                slotProps={{
                                  paper: {
                                    elevation: 0,
                                    sx: {
                                      overflow: 'visible',
                                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                      mt: 1.5,
                                      top: '50px !important',
                                      '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                      },
                                      '&::before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                      },
                                    },
                                  },
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                              >

                                <MenuItem onClick={() => { handleNavigation("Dashboard") }}>
                                  <Home style={{ fontSize: '20px' }} />
                                  <span style={{ fontSize: '15px', marginLeft: '9px' }}>My Dashboard </span>
                                </MenuItem>
                                <MenuItem onClick={() => { handleNavigation("my-profile") }}>
                                  <Person style={{ fontSize: '20px' }} />
                                  <span style={{ fontSize: '15px', marginLeft: '9px' }}>My Profile</span>
                                </MenuItem>
                                <MenuItem onClick={() => { handleNavigation("my-property") }}>
                                  <PostAdd style={{ fontSize: '20px' }} />
                                  <span style={{ fontSize: '15px', marginLeft: '9px' }}>My Post</span>
                                </MenuItem>
                                <MenuItem onClick={() => { handleNavigation("add-property") }}>
                                  <AddCircle style={{ fontSize: '20px' }} />
                                  <span style={{ fontSize: '15px', marginLeft: '9px' }}>Add Property </span>

                                </MenuItem>
                                <MenuItem onClick={() => { handleNavigation("my-favourites") }}>
                                  <Favorite style={{ fontSize: '20px' }} />
                                  <span style={{ fontSize: '15px', marginLeft: '9px' }}>My Favourites </span>
                                </MenuItem>
                                <MenuItem onClick={() => { handleNavigation("my-requests") }}>
                                  <RequestPage style={{ fontSize: '20px' }} />
                                  <span style={{ fontSize: '15px', marginLeft: '9px' }}>My Requests </span>
                                </MenuItem>
                                <MenuItem onClick={handleLogout}>
                                  <ExitToAppIcon style={{ fontSize: '20px' }} />
                                  <span style={{ fontSize: '15px', marginLeft: '9px' }}>Logout </span>
                                </MenuItem>
                              </Menu>
                            </>
                          ) : (
                            <a
                              onClick={handleDialogOpen}
                              className="custom-desk-bar"
                              style={{
                                textAlign: 'center',
                                fontWeight: 600,
                                padding: '5px 12px 3px',
                                color: '#161e2d',
                                fontSize: '15px',
                                lineHeight: '21.86px',
                                textTransform: 'capitalize',
                                backgroundColor:'#161e2d',
                                background:'#161e2d',
                                color:'#ffffff'
                              }}

                            >

                              <AccountCircleOutlinedIcon sx={{ fontSize: 28, marginBottom: 0.45, color: '#ffffff', marginRight: '5px' }} />
                              Login/Register
                            </a>
                          )}

                        </ul>
                      </div>
                    </nav>
                    {/* Main Menu End*/}
                  </div>

                </div>
                {!isLogin ? (
                  <div className="custom-mob-bar" onClick={handleDialogOpen}>
                    <h6 style={{ marginBottom: '0' }}><AccountCircleOutlinedIcon sx={{ fontSize: 28, marginBottom: 0.45, color: '#161e2d', marginRight: '5px' }} />Signup</h6>
                  </div>
                ) : (
                  <div className="custom-mob-bar" onClick={()=>{window.location.href = "/dashboard"}}>
                    <h6 style={{ marginBottom: '0' }}>{userDetails?.image ? (
                      <img src={userDetails?.image || ""} alt='profile' width="30px" style={{ marginRight: '5px' }} className="custom-image" />
                    ) : (<AccountCircleOutlinedIcon sx={{ fontSize: 28, marginBottom: 0.45, color: '#ffffff', marginRight: '5px' }} />)}{userDetails?.fullName}</h6>
                  </div>
                )}
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
              {/* <div className="login-box flex align-center">
                <a onClick={handleDialogOpen}>
                  Login
                </a>
                <span>/</span>
                <a onClick={handleDialogOpen}>
                  Register
                </a>
              </div> */}
              <div className="menu-outer">
                <div
                  className="navbar-collapse collapse clearfix"
                  id="navbarSupportedContent"
                >
                  <ul className="navigation clearfix mobile-nav">
                    {/* {isLogin ? (

                      <a
                        href="/dashboard"
                        style={{
                          textAlign: 'center',
                          fontWeight: 600,
                          padding: '27px 20px 27px 0px',
                          letterSpacing: '0px',
                          color: '#161e2d',
                          fontSize: '15px',
                          lineHeight: '21.86px',
                          textTransform: 'capitalize',
                        }}

                      >
                        Dashboard
                      </a>
                    ) : (
                      <a
                        onClick={handleDialogOpen}
                        style={{
                          textAlign: 'center',
                          fontWeight: 600,
                          padding: '27px 20px 27px 0px',
                          letterSpacing: '0px',
                          color: '#161e2d',
                          fontSize: '15px',
                          lineHeight: '21.86px',
                          textTransform: 'capitalize',
                        }}

                      >
                        <AccountCircleOutlinedIcon sx={{ fontSize: 28, marginBottom: 0.45, color: '#161e2d', marginRight: '5px' }} />
                        Login/Register
                      </a>
                    )} */}
                  </ul>
                </div>
                <Divider />
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
                  <div>+91 9363828393</div>
                </div>
                <div className="box d-flex align-items-center">
                  <span className="icon icon-mail" />
                  <div>admin@propertystores.in</div>
                </div>
              </div>
            </div>
          </nav>
        </div>

        <style>
          {`
            .custom-desk-bar {
              background: #161e2d;
              padding: 2px 10px;
              border-radius: 17px !important;
            }
            .custom-mob-bar {
              position: absolute;
              right: 50px;
              background: #161e2d;
              color:#ffffff;
              padding: 5px 10px 3px;
              border-radius: 17px !important;
            }
             @media (min-width: 991px) {
              .custom-mob-bar {
                display: none;
              }
            }
          `}
        </style>
        {/* End Mobile Menu */}
      </header>
    </>
  );
}
