import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { SubmitEnquiry } from '@/apiCalls';
import { toast } from 'react-toastify';

const buttonStyle = {
    background: 'linear-gradient(to right, #0d7ae3 50%, white 50%)',
    backgroundSize: '200% 100%',
    backgroundPosition: '0% 50%',
    transition: 'background-position 1s',
    '&:hover': {
        backgroundPosition: '100% 50%',
        color: '#0d7ae3',
    },
    color: 'white',
};

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function EnquiryForm({ open, handleClose }) {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: '',
        userType: '',
        status: 'active',
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

        console.log(landsUser, "pppppppppppppp")

        if (landsUser) {
            setFormData({
                name: landsUser.fullName,
                phone: landsUser.phone || '',
                email: landsUser.email || '',
                userType: landsUser.type,
            })
        }
    }, [])

    const handleSubmit = async () => {
        // Perform form validation if needed
        if (!formData.name || !formData.phone || !formData.email || !formData.message) {
            alert('Please fill in all fields.');
            return;
        }

        try {
            const data = await SubmitEnquiry(formData);
            if (data.success) {
                toast.success("Submitted Successfully");
                setFormData({
                    name: '',
                    phone: '',
                    email: '',
                    message: '',
                    userType: '',
                    status: 'active',
                })
                handleClose();
            } else {
                toast.error(data.message || data.error || "Something Went Wrong")
            }
        } catch (err) {
            console.error('Error fetching categories:', err);
        }

    
    };

    return (
        <React.Fragment>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar
                    sx={{
                        position: 'sticky',
                        background: '#f5f5f5',
                        boxShadow: 'none',
                        borderBottom: '1px solid #ddd',
                    }}
                >
                    <Toolbar>
                        <Typography
                            variant="h6"
                            sx={{ flexGrow: 1, color: '#333', textAlign: 'center', fontWeight: 'bold' }}
                        >
                            Enquiry Form
                        </Typography>
                        <IconButton
                            edge="end"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        backgroundColor: '#fafafa',
                        padding: '20px',
                    }}
                >
                    <Grid
                        container
                        spacing={3}
                        sx={{
                            maxWidth: '600px',
                            backgroundColor: '#fff',
                            padding: '20px',
                            borderRadius: '8px',
                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                variant="outlined"
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        "& input": {
                                            border: "none", // Removes the border
                                        },
                                    },
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                variant="outlined"
                                type="tel"
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        "& input": {
                                            border: "none", // Removes the border
                                        },
                                    },
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                variant="outlined"
                                type="email"
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        "& input": {
                                            border: "none", // Removes the border
                                        },
                                    },
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                variant="outlined"
                                multiline
                                rows={4}
                                sx={{ borderRadius: '8px' }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                sx={buttonStyle}
                                variant="contained"
                                size="large"
                                fullWidth
                                onClick={handleSubmit}
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Dialog>
        </React.Fragment>
    );
}
