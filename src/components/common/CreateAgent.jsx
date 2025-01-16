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
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import { createAgent } from '@/apiCalls';
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

export default function CreateAgent({ open, handleClose }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        gender: '',
        phone_number: '',
        age: '',
        service: '',
        isActive: 'true',
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
            setFormData({
                name: landsUser.fullName || '',
                email: landsUser.email || '',
                phone_number: landsUser.phone || '',
                gender: '',
                age: '',
                service: '',
                isActive: 'true',
            });
        }
    }, []);

    const handleSubmit = async () => {
        if (!formData.name || !formData.email || !formData.gender || !formData.phone_number || !formData.age || !formData.service) {
            alert('Please fill in all fields.');
            return;
        }

        try {
            const data = await createAgent(formData);
            if (data.success) {
                toast.success("Submitted Successfully");
                setFormData({
                    name: '',
                    email: '',
                    gender: '',
                    phone_number: '',
                    age: '',
                    service: '',
                    isActive: 'true',
                });
                handleClose();
                window.location.href = "/";
            } else {
                toast.error(data.message || data.error || "Something Went Wrong");
            }
        } catch (err) {
            console.error('Error creating agent:', err);
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
                            Create Agent
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
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                select
                                label="Gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                variant="outlined"
                            >
                                <MenuItem value="male">Male</MenuItem>
                                <MenuItem value="female">Female</MenuItem>
                                <MenuItem value="other">Other</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Phone Number"
                                name="phone_number"
                                value={formData.phone_number}
                                onChange={handleChange}
                                variant="outlined"
                                type="tel"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Age"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                variant="outlined"
                                type="number"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Service"
                                name="service"
                                value={formData.service}
                                onChange={handleChange}
                                variant="outlined"
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
