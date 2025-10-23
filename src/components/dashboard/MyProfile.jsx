import React, { useState, useEffect } from "react";
import { UpdateUser, getUserDetails, UpdateUserPassword, createAgent, getAgentDetails, createB2B, updateB2B, updateAgent, getB2BDetails } from "@/apiCalls";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash, FaTrash } from 'react-icons/fa';
import DropdownSelect from "../common/DropdownSelect";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

export default function MyProfile() {

  const [avatar, setAvatar] = useState({
    file: null,
    preview: null,
  });

  const [imgUrl, setimgUrl] = useState("");
  
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [existingFiles, setExistingFiles] = useState([]);
  const [deletedFileIds, setDeletedFileIds] = useState([]);
  const [fileInputKey, setFileInputKey] = useState(0);

  const [userData, setUserData] = useState();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isAgent, setAgent] = useState(false);
  const [isB2B, setIsB2B] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [isNewB2B, setIsNewB2B] = useState(false);

  const [B2BData, setB2BData] = useState({
    id: '',
    B2BAge: "",
    B2BGender: "",
    B2BService: "",
    B2Blocation: "",
  });

  const [agentData, setAgentData] = useState({
    id: '',
    agentAge: "",
    agentGender: "",
    agentService: "",
    agentLocation: "",
  });

  const AllServices = [
    { id: 1, name: "Advocate & Auditor" },
    { id: 2, name: "Investor (Project Invest)" },
    { id: 3, name: "Reseller (Short Term Invest)" },
    { id: 4, name: "Bankers/Loan Provider" },
    { id: 5, name: "Builder/Construction" },
    { id: 6, name: "Interior" },
    { id: 7, name: "Civil Engineer/Architect" },
    { id: 8, name: "Plumbing & Electrical" },
    { id: 9, name: "Flooring" },
    { id: 10, name: "Approval Services" },
    { id: 11, name: "Building Valuation" },
    { id: 12, name: "Digital Security System" },
    { id: 13, name: "Landscaping" }
  ];

  // Helper function to check unique constraint errors
  const isUniqueConstraintError = (error) => {
    const errorMessage = error?.response?.data?.error?.errors?.[0]?.message || 
                         error?.message || 
                         error?.error?.errors?.[0]?.message || 
                         '';
    return errorMessage.toLowerCase().includes('unique') || 
           errorMessage.toLowerCase().includes('already exists');
  };

  useEffect(() => {
    const fetchAgentDetails = async () => {
      const landsUser = JSON.parse(localStorage.getItem('LandsUser'));

      if (landsUser?.type === 'Agent') {
        setAgent(true);

        const storedId = localStorage.getItem('agentId');
        if (storedId) {
          setAgentData(prev => ({ ...prev, id: storedId }));
          setIsNew(false);
        } else {
          setIsNew(true);
        }

        try {
          const data = await getAgentDetails(landsUser.phoneNumber);
          if (data.success) {
            if (data?.data?.length) {
              const agentId = data.data[0].id;
              setIsNew(false);
              setAgentData({
                id: agentId,
                agentAge: data.data[0].age,
                agentGender: data.data[0].gender,
                agentService: data.data[0].service,
                agentLocation: data.data[0].location,
              });
              localStorage.setItem('agentId', agentId.toString());
              
              // Parse and set image
              try {
                const imageData = JSON.parse(data?.data[0]?.image);
                setimgUrl(imageData);
              } catch (e) {
                setimgUrl(data?.data[0]?.image);
              }
              
              // Parse and set existing files
              try {
                const filesData = data.data[0].files ? JSON.parse(data.data[0].files) : [];
                setExistingFiles(Array.isArray(filesData) ? filesData : []);
              } catch (e) {
                setExistingFiles([]);
              }
            } else {
              setIsNew(true);
              localStorage.removeItem('agentId');
            }
          } else {
            console.error('Failed to fetch agent details:', data.message || data.error);
            if (!storedId) {
              setIsNew(true);
            }
          }
        } catch (error) {
          console.error('Error fetching agent details:', error);
          if (!storedId) {
            setIsNew(true);
          }
        }
      }

      if (landsUser?.type === 'B2B') {
        setIsB2B(true);

        const storedB2bId = localStorage.getItem('b2bId');
        if (storedB2bId) {
          setB2BData(prev => ({ ...prev, id: storedB2bId }));
          setIsNewB2B(false);
        } else {
          setIsNewB2B(true);
        }

        try {
          const data = await getB2BDetails(landsUser.phoneNumber);
          if (data.success) {
            if (data.data.length) {
              const b2bId = data.data[0].id;
              setIsNewB2B(false);
              setB2BData({
                id: b2bId,
                B2BAge: data.data[0].age,
                B2BGender: data.data[0].gender,
                B2BService: data.data[0].professional,
                B2Blocation: data.data[0].location,
              });
              localStorage.setItem('b2bId', b2bId.toString());
              
              // Parse and set image
              try {
                const imageData = JSON.parse(data.data[0].image);
                setimgUrl(imageData);
              } catch (e) {
                setimgUrl(data.data[0].image);
              }
              
              // Parse and set existing files
              try {
                const filesData = data.data[0].files ? JSON.parse(data.data[0].files) : [];
                setExistingFiles(Array.isArray(filesData) ? filesData : []);
              } catch (e) {
                setExistingFiles([]);
              }
            } else {
              setIsNewB2B(true);
              localStorage.removeItem('b2bId');
            }
          } else {
            console.error('Failed to fetch B2B details:', data.message || data.error);
            if (!storedB2bId) {
              setIsNewB2B(true);
            }
          }
        } catch (error) {
          console.error('Error fetching B2B details:', error);
          if (!storedB2bId) {
            setIsNewB2B(true);
          }
        }
      }
    };

    fetchAgentDetails();
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar({
        file: file,
        preview: imageUrl,
      });
    }
  };

  const handleFileUpload = (event) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      const totalFiles = uploadedFiles.length + existingFiles.length + newFiles.length;

      if (totalFiles > 10) {
        const remaining = 10 - uploadedFiles.length - existingFiles.length;
        toast.error(`Maximum 10 files allowed. You can add ${remaining} more file(s).`);
        return;
      }

      const processedFiles = newFiles.map(file => ({
        id: Date.now() + Math.random(),
        file: file,
        name: file.name,
        size: (file.size / 1024).toFixed(2),
        preview: URL.createObjectURL(file)
      }));

      setUploadedFiles([...uploadedFiles, ...processedFiles]);
      setFileInputKey(prev => prev + 1);
      toast.success(`${newFiles.length} file(s) added successfully`);
    }
  };

  const removeFile = (fileId, isExisting = false) => {
    if (isExisting) {
      // Mark existing file for deletion
      setExistingFiles(existingFiles.filter(f => f.id !== fileId));
      setDeletedFileIds([...deletedFileIds, fileId]);
      toast.info("Existing file marked for removal");
    } else {
      // Remove newly uploaded file
      setUploadedFiles(uploadedFiles.filter(f => f.id !== fileId));
      toast.info("File removed");
    }
  };

  const removeAllFiles = () => {
    // Mark all existing files for deletion
    if (existingFiles.length > 0) {
      setDeletedFileIds([...deletedFileIds, ...existingFiles.map(f => f.id)]);
      setExistingFiles([]);
    }
    // Clear new uploads
    setUploadedFiles([]);
    setFileInputKey(prev => prev + 1);
    toast.info("All files removed");
  };

  const togglePasswordVisibility = (field) => {
    if (field === 'oldPassword') {
      setShowOldPassword(!showOldPassword);
    } else if (field === 'newPassword') {
      setShowNewPassword(!showNewPassword);
    } else if (field === 'confirmPassword') {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const [formData, setFormData] = useState({
    id: 0,
    name: '',
    mobileNumber: '',
    email: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    mobileNumber: '',
    email: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const [passwordFields, setPasswordFields] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [validationErrors, setValidationErrors] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const updatePasswordField = (e) => {
    const { name, value } = e.target;

    setPasswordFields({
      ...passwordFields,
      [name]: value,
    });

    let updatedErrors = { ...validationErrors };

    if (name === 'newPassword' || name === 'confirmPassword') {
      if (name === 'newPassword' && value.length < 8) {
        updatedErrors.newPassword = 'New password must be at least 8 characters long.';
      } else if (name === 'newPassword') {
        updatedErrors.newPassword = '';
      }

      if (name === 'confirmPassword' && value !== passwordFields.newPassword) {
        updatedErrors.confirmPassword = 'Confirm password does not match the new password.';
      } else if (name === 'confirmPassword') {
        updatedErrors.confirmPassword = '';
      }
    }

    if (name === 'oldPassword') {
      updatedErrors.oldPassword = '';
    }

    setValidationErrors(updatedErrors);
  };

  const updateAgentField = (e) => {
    const { name, value } = e.target;
    setAgentData({ ...agentData, [name]: value });
    validateAgentField(name, value);
  };

  const updateB2BField = (e) => {
    const { name, value } = e.target;
    setB2BData({ ...B2BData, [name]: value });
    validateB2BField(name, value);
  };

  const updateDropdownValue = (field, value) => {
    setAgentData({ ...agentData, [field]: value });
    validateAgentField(field, value);
  };

  const updateB2BDropdownValue = (field, value) => {
    setB2BData({ ...B2BData, [field]: value });
    validateB2BField(field, value);
  };

  const validateAgentField = (field, value) => {
    let error = "";
    if (field === 'agentAge') {
      if (!value || value < 18) {
        error = 'Age must be 18 or above.';
      }
    } else if (!value || value === "Select") {
      error = `${field.replace(/([A-Z])/g, ' $1').trim()} is required`;
    }
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const validateB2BField = (field, value) => {
    let error = "";
    if (field === 'B2BAge') {
      if (!value || value < 18) {
        error = 'Age must be 18 or above.';
      }
    } else if (!value || value === "Select") {
      error = `${field.replace(/([A-Z])/g, ' $1').trim()} is required`;
    }
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  // Improved Agent Profile Handler
  const handleAgentProfileUpdate = async (agentPayload) => {
    const landsUser = JSON.parse(localStorage.getItem('LandsUser'));
    
    try {
      if (isNew) {
        // Attempt to create new profile
        const response = await updateAgent(agentPayload);
        
        if (response?.success) {
          const agentId = response.data?.id || response.id;
          if (agentId) {
            localStorage.setItem('agentId', agentId.toString());
            setIsNew(false);
            setAgentData(prev => ({ ...prev, id: agentId }));
            toast.success('Agent profile created successfully!');
            return { success: true };
          }
        }
        
        return response;
      } else {
        // Update existing profile
        agentPayload.id = agentData.id || localStorage.getItem('agentId');
        
        if (!agentPayload.id) {
          throw new Error('MISSING_ID');
        }
        
        const response = await updateAgent(agentPayload);
        
        if (response?.success) {
          toast.success('Agent profile updated successfully!');
        }
        
        return response;
      }
    } catch (error) {
      // Handle unique constraint - profile already exists
      if (isUniqueConstraintError(error) && isNew) {
        console.log('Profile exists, switching to update mode...');
        
        try {
          const data = await getAgentDetails(landsUser.phoneNumber);
          
          if (data.success && data?.data?.length) {
            const agentId = data.data[0].id;
            localStorage.setItem('agentId', agentId.toString());
            setIsNew(false);
            setAgentData(prev => ({ ...prev, id: agentId }));
            
            // Retry as update
            agentPayload.id = agentId;
            agentPayload.isVerified = 0;
            agentPayload.updatedFiles = existingFiles
              .filter(file => !deletedFileIds.includes(file.id))
              .map(file => file.id);
            
            const updateResponse = await updateAgent(agentPayload);
            
            if (updateResponse?.success) {
              toast.success('Profile updated successfully!');
              return { success: true };
            }
            
            return updateResponse;
          } else {
            toast.error('Unable to retrieve existing profile. Please refresh and try again.');
            return { success: false, error: 'Profile retrieval failed' };
          }
        } catch (fetchError) {
          console.error('Error fetching existing profile:', fetchError);
          toast.error('Failed to sync with existing profile. Please refresh the page.');
          return { success: false, error: fetchError };
        }
      } else if (error.message === 'MISSING_ID') {
        toast.error('Profile ID not found. Please refresh the page and try again.');
        return { success: false, error: 'Missing ID' };
      } else {
        console.error('Profile update error:', error);
        const errorMsg = error?.response?.data?.message || 
                         error?.message || 
                         'Failed to update profile';
        toast.error(errorMsg);
        return { success: false, error: errorMsg };
      }
    }
  };

  // Improved B2B Profile Handler
  const handleB2BProfileUpdate = async (b2bPayload) => {
    const landsUser = JSON.parse(localStorage.getItem('LandsUser'));
    
    try {
      if (isNewB2B) {
        const response = await updateB2B(b2bPayload);
        
        if (response?.success) {
          const b2bId = response.data?.id || response.id;
          if (b2bId) {
            localStorage.setItem('b2bId', b2bId.toString());
            setIsNewB2B(false);
            setB2BData(prev => ({ ...prev, id: b2bId }));
            toast.success('B2B profile created successfully!');
            return { success: true };
          }
        }
        
        return response;
      } else {
        b2bPayload.id = B2BData.id || localStorage.getItem('b2bId');
        
        if (!b2bPayload.id) {
          throw new Error('MISSING_ID');
        }
        
        const response = await updateB2B(b2bPayload);
        
        if (response?.success) {
          toast.success('B2B profile updated successfully!');
        }
        
        return response;
      }
    } catch (error) {
      if (isUniqueConstraintError(error) && isNewB2B) {
        console.log('B2B profile exists, switching to update mode...');
        
        try {
          const data = await getB2BDetails(landsUser.phoneNumber);
          
          if (data.success && data?.data?.length) {
            const b2bId = data.data[0].id;
            localStorage.setItem('b2bId', b2bId.toString());
            setIsNewB2B(false);
            setB2BData(prev => ({ ...prev, id: b2bId }));
            
            b2bPayload.id = b2bId;
            b2bPayload.isVerifyed = 0;
            b2bPayload.updatedFiles = existingFiles
              .filter(file => !deletedFileIds.includes(file.id))
              .map(file => file.id);
            
            const updateResponse = await updateB2B(b2bPayload);
            
            if (updateResponse?.success) {
              toast.success('B2B profile updated successfully!');
              return { success: true };
            }
            
            return updateResponse;
          } else {
            toast.error('Unable to retrieve existing B2B profile. Please refresh and try again.');
            return { success: false, error: 'Profile retrieval failed' };
          }
        } catch (fetchError) {
          console.error('Error fetching existing B2B profile:', fetchError);
          toast.error('Failed to sync with existing B2B profile. Please refresh the page.');
          return { success: false, error: fetchError };
        }
      } else if (error.message === 'MISSING_ID') {
        toast.error('B2B profile ID not found. Please refresh the page and try again.');
        return { success: false, error: 'Missing ID' };
      } else {
        console.error('B2B profile update error:', error);
        const errorMsg = error?.response?.data?.message || 
                         error?.message || 
                         'Failed to update B2B profile';
        toast.error(errorMsg);
        return { success: false, error: errorMsg };
      }
    }
  };

  const handleProfileUpdate = async () => {
    let newErrors = { ...errors };

    // Optional validations (no required fields)
    if (formData.name.trim() === '') {
      newErrors.name = '';
    } else {
      newErrors.name = '';
    }

    if (formData.mobileNumber && !/^\d{10}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Mobile number must be 10 digits.';
    } else {
      newErrors.mobileNumber = '';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    } else {
      newErrors.email = '';
    }

    // Optional agent-specific validations
    if (isAgent) {
      if (agentData.agentAge && agentData.agentAge < 18) {
        newErrors.agentAge = 'Age must be 18 or above.';
      } else {
        newErrors.agentAge = '';
      }
      if (agentData.agentGender === 'Select') {
        newErrors.agentGender = '';
      } else {
        newErrors.agentGender = '';
      }
      if (agentData.agentService === 'Select') {
        newErrors.agentService = '';
      } else {
        newErrors.agentService = '';
      }
      if (agentData.agentLocation.trim() === '') {
        newErrors.agentLocation = '';
      } else {
        newErrors.agentLocation = '';
      }
    }

    // Optional B2B-specific validations
    if (isB2B) {
      if (B2BData.B2BAge && B2BData.B2BAge < 18) {
        newErrors.B2BAge = 'Age must be 18 or above.';
      } else {
        newErrors.B2BAge = '';
      }
      if (B2BData.B2BGender === 'Select') {
        newErrors.B2BGender = '';
      } else {
        newErrors.B2BGender = '';
      }
      if (B2BData.B2BService === 'Select') {
        newErrors.B2BService = '';
      } else {
        newErrors.B2BService = '';
      }
      if (B2BData.B2Blocation.trim() === '') {
        newErrors.B2Blocation = '';
      } else {
        newErrors.B2Blocation = '';
      }
    }

    setErrors(newErrors);

    const landsUser = JSON.parse(localStorage.getItem('LandsUser'));

    if (!landsUser) {
      toast.error("User not found. Please login again.");
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
      return;
    }

    try {
      // Handle Agent profile
      if (isAgent) {
        const agentPayload = {
          name: formData.name,
          email: formData.email,
          phone_number: formData.mobileNumber,
          gender: agentData.agentGender,
          age: parseInt(agentData.agentAge),
          service: agentData.agentService,
          location: agentData.agentLocation,
          note: '',
          isActive: 1,
        };

        if (avatar?.file) {
          agentPayload.image = avatar;
        }

        if (uploadedFiles.length > 0) {
          agentPayload.files = uploadedFiles.map(f => f.file);
        }
        
        if (!isNew) {
          agentPayload.isVerified = 0;
          agentPayload.updatedFiles = existingFiles
            .filter(file => !deletedFileIds.includes(file.id))
            .map(file => file.id);
        }

        const result = await handleAgentProfileUpdate(agentPayload);
        
        if (result.success) {
          // Cleanup
          setUploadedFiles([]);
          setDeletedFileIds([]);
          setFileInputKey(prev => prev + 1);
          setAvatar({ file: null, preview: null });
          
          // Refresh data
          const refreshedData = await getAgentDetails(landsUser.phoneNumber);
          if (refreshedData.success && refreshedData.data.length) {
            const agentId = refreshedData.data[0].id;
            setAgentData({
              id: agentId,
              agentAge: refreshedData.data[0].age,
              agentGender: refreshedData.data[0].gender,
              agentService: refreshedData.data[0].service,
              agentLocation: refreshedData.data[0].location,
            });
            
            try {
              const imageData = JSON.parse(refreshedData?.data[0]?.image);
              setimgUrl(imageData);
            } catch (e) {
              setimgUrl(refreshedData?.data[0]?.image);
            }
            
            try {
              const filesData = refreshedData.data[0].files ? JSON.parse(refreshedData.data[0].files) : [];
              setExistingFiles(Array.isArray(filesData) ? filesData : []);
            } catch (e) {
              setExistingFiles([]);
            }
          }
        }
        
        return;
      }

      // Handle B2B profile
      if (isB2B) {
        const b2bPayload = {
          name: formData.name,
          age: parseInt(B2BData.B2BAge),
          gender: B2BData.B2BGender,
          phone_number: formData.mobileNumber,
          email: formData.email,
          location: B2BData.B2Blocation,
          professional: B2BData.B2BService,
          isActive: 1,
        };

        if (avatar?.file) {
          b2bPayload.image = avatar;
        }

        if (uploadedFiles.length > 0) {
          b2bPayload.files = uploadedFiles.map(f => f.file);
        }
        
        if (!isNewB2B) {
          b2bPayload.isVerifyed = 0;
          b2bPayload.updatedFiles = existingFiles
            .filter(file => !deletedFileIds.includes(file.id))
            .map(file => file.id);
        }

        const result = await handleB2BProfileUpdate(b2bPayload);
        
        if (result.success) {
          setUploadedFiles([]);
          setDeletedFileIds([]);
          setFileInputKey(prev => prev + 1);
          setAvatar({ file: null, preview: null });
          
          const refreshedData = await getB2BDetails(landsUser.phoneNumber);
          if (refreshedData.success && refreshedData.data.length) {
            const b2bId = refreshedData.data[0].id;
            setB2BData({
              id: b2bId,
              B2BAge: refreshedData.data[0].age,
              B2BGender: refreshedData.data[0].gender,
              B2BService: refreshedData.data[0].professional,
              B2Blocation: refreshedData.data[0].location,
            });
            
            // Parse and set image
            try {
              const imageData = JSON.parse(refreshedData.data[0].image);
              setimgUrl(imageData);
            } catch (e) {
              setimgUrl(refreshedData.data[0].image);
            }
            
            try {
              const filesData = refreshedData.data[0].files ? JSON.parse(refreshedData.data[0].files) : [];
              setExistingFiles(Array.isArray(filesData) ? filesData : []);
            } catch (e) {
              setExistingFiles([]);
            }
          }
        }
        
        return;
      }

      // Handle regular user profile (Buyer/Seller)
      const userPayload = {
        fullName: formData.name,
        email: formData.email,
        phone: formData.mobileNumber,
        id: formData.id,
      };

      if (avatar?.file) {
        userPayload.image = avatar;
      }

      if (uploadedFiles.length > 0) {
        userPayload.files = uploadedFiles.map(f => f.file);
      }

      const userResponse = await UpdateUser(userPayload);

      if (userResponse?.success) {
        toast.success('Profile updated successfully!');
        
        if (uploadedFiles.length > 0) {
          setUploadedFiles([]);
          setFileInputKey(prev => prev + 1);
        }
        
        setAvatar({ file: null, preview: null });
        await getUser();
      } else {
        toast.error(userResponse?.message || 'Failed to update profile');
      }

    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('An error occurred while updating profile');
    }
  };

  const getUser = async () => {
    const landsUser = JSON.parse(localStorage.getItem('LandsUser'));

    if (landsUser) {
      try {
        const data = await getUserDetails(landsUser.id);
        if (data.success) {
          setUserData(data.user);
          setFormData({
            id: data.user.id,
            name: data.user.full_name,
            mobileNumber: data.user.phone_number,
            email: data.user.email,
          });
          setimgUrl(data.user.image || "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=")
        } else {
          toast.error(data.message || data.error || "Something Went Wrong")
        }
      } catch (err) {
        console.error('Error fetching user details:', err);
      }
    } else {
      toast.error("User Not Found")
      setTimeout(() => {
        window.location.href = "/"
      }, 4000);
    }
  }

  useEffect(() => {
    getUser();
  }, [])

  const submitPasswordUpdate = async () => {
    let isValid = true;
    let updatedErrors = { ...validationErrors };

    if (!passwordFields.oldPassword.trim()) {
      updatedErrors.oldPassword = 'Old password is required.';
      isValid = false;
    }

    if (passwordFields.newPassword.length < 8) {
      updatedErrors.newPassword = 'New password must be at least 8 characters long.';
      isValid = false;
    }

    if (passwordFields.newPassword !== passwordFields.confirmPassword) {
      updatedErrors.confirmPassword = 'Confirm password does not match the new password.';
      isValid = false;
    }

    setValidationErrors(updatedErrors);

    if (isValid) {
      const landsUser = JSON.parse(localStorage.getItem('LandsUser'));

      if (landsUser) {
        try {
          const postData = {
            id: landsUser.id,
            oldPassword: passwordFields.oldPassword,
            newPassword: passwordFields.newPassword,
          }

          const data = await UpdateUserPassword(postData);
          if (data.success) {
            setPasswordFields({
              oldPassword: '',
              newPassword: '',
              confirmPassword: '',
            });
            toast.success("Password Updated Successfully");
          } else {
            toast.error(data.message || data.error || "Something Went Wrong")
          }
        } catch (err) {
          console.error('Error updating password:', err);
        }
      } else {
        toast.error("User Not Found")
        setTimeout(() => {
          window.location.href = "/"
        }, 4000);
      }
    }
  };

  const handleNav = () => {
    window.location.href = "/add-property"
  }

  const totalFiles = uploadedFiles.length + existingFiles.length;

  return (
    <div className="main-content">
      <style>
        {`
        .error-message {
            color: red;
            font-size: 12px;
            margin-top: 5px;
          }
        @media (min-width: 800px) {
          .custom-mobile-class {
            display: none !important;
          }
          .custom-desktop-class {
            display: flex !important;
          }
        }
 
             @media (min-width: 800px) {
          .custom-header-text {
            display: none !important;
          }
        }
          .custom-header-text {
            display: flex ;
            justify-content:flex-start;
            align-items: center;
          }
        @media (max-width: 799px) {
          .custom-desktop-class {
            display: none !important;
          }
          .custom-mobile-class {
            display: flex !important;
          }
                .custom-bg-dark{
            font-weight:bold;
            background: #008FF7;
            color:#ffffff !important;
            padding: 7px 12px;
            border-radius: 10%;
            border:none;
          }
        }
        .file-upload-container {
          border: 2px dashed #008FF7;
          border-radius: 8px;
          padding: 20px;
          text-align: center;
          background-color: #f9f9f9;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .file-upload-container:hover {
          background-color: #f0f7ff;
          border-color: #0066cc;
        }
        .file-upload-container.disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .file-list {
          margin-top: 20px;
          display: grid;
          gap: 10px;
        }
        .file-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px;
          background: #f5f5f5;
          border-radius: 6px;
          border-left: 4px solid #008FF7;
        }
        .file-item.existing {
          border-left-color: #28a745;
          background: #f0f8f4;
        }
        .file-info {
          flex: 1;
          text-align: left;
        }
        .file-name {
          font-weight: 500;
          color: #333;
          margin-bottom: 5px;
        }
        .file-size {
          font-size: 12px;
          color: #666;
        }
        .file-badge {
          display: inline-block;
          background: #28a745;
          color: white;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 10px;
          margin-left: 8px;
        }
        .file-remove-btn {
          background: #ff4444;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 6px 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          transition: background 0.3s;
        }
        .file-remove-btn:hover {
          background: #cc0000;
        }
        .file-count {
          display: inline-block;
          background: #008FF7;
          color: white;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 12px;
          margin-left: 10px;
        }
        .section-divider {
          border-top: 1px solid #e0e0e0;
          margin: 10px 0;
        }
        `}
      </style>
      <div className="main-content-inner wrap-dashboard-content-2">
        <div className="d-flex justify-content-between">
          <div className="button-show-hide custom-header-text">
            <ArrowCircleLeftIcon sx={{ fontSize: '40px' }} />
            <span className="body-1">Menu</span>
          </div>
          <div className="custom-header-text" onClick={handleNav}>
            <span className="custom-bg-dark">Sell Property</span>
          </div>
        </div>
        <div className="button-show-hide" style={{ marginTop: '0px', display: 'flex' }}>
          <h3 className="body-1" style={{ color: '#000', padding: '20px 0', fontWeight: '600' }}>My Profile</h3>
        </div>
        <div className="widget-box-2">
          <div className="box">
            <h5 className="title">Avatar</h5>
            <div className="box-agent-avt">
              <div className="avatar">
                <img
                  alt="avatar"
                  loading="lazy"
                  width={128}
                  height={128}
                  src={avatar.preview || imgUrl || "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="}
                />
              </div>
              <div className="content uploadfile">
                <p>Upload a new avatar</p>
                <div className="box-ip">
                  <input
                    type="file"
                    className="ip-file"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </div>
                <p>Image Size 100x100 , format JPEG</p>
              </div>
            </div>
          </div>

          <h5 className="title">Information</h5>
          <div className="box grid-2 gap-30" style={{ marginBottom: '10px' }}>
            <div className="box box-fieldset">
              <label htmlFor="name">
                Full name:<span>*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="form-control style-1"
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>
            <div className="box-fieldset">
              <label htmlFor="num">
                Mobile Number:<span>*</span>
              </label>
              <input
                type="number"
                name="mobileNumber"
                disabled
                value={formData.mobileNumber}
                onChange={handleInputChange}
                className="form-control style-1"
              />
              {errors.mobileNumber && (
                <span className="error-message">{errors.mobileNumber}</span>
              )}
            </div>
          </div>
          <div className="box grid-2 gap-30">
            <div className="box-fieldset">
              <label htmlFor="email">
                Email address:<span>*</span>
              </label>
              <input
                type="text"
                name="email"
                disabled
                value={formData.email}
                onChange={handleInputChange}
                className="form-control style-1"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            {isAgent && (
              <div className="box-fieldset">
                <label htmlFor="agentAge">
                  Age:
                </label>
                <input
                  type="number"
                  name="agentAge"
                  value={agentData.agentAge}
                  onChange={updateAgentField}
                  className="form-control style-1"
                />
                {errors.agentAge && (
                  <span className="error-message">{errors.agentAge}</span>
                )}
              </div>
            )}
            {isB2B && (
              <div className="box-fieldset">
                <label htmlFor="agentAge">
                  Age:
                </label>
                <input
                  type="number"
                  name="B2BAge"
                  value={B2BData.B2BAge}
                  onChange={updateB2BField}
                  className="form-control style-1"
                />
                {errors.B2BAge && (
                  <span className="error-message">{errors.B2BAge}</span>
                )}
              </div>
            )}
          </div>
          {isB2B && (
            <div className="box grid-2 gap-30">
              <div className="box-fieldset">
                <label htmlFor="B2BGender">
                  Gender:
                </label>
                <DropdownSelect
                  options={["Select", "Male", "Female", "Other"]}
                  defaultOption={B2BData.B2BGender}
                  onChange={(value) => updateB2BDropdownValue("B2BGender", value)}
                />
                {errors.B2BGender && (
                  <span className="error-message">{errors.B2BGender}</span>
                )}
              </div>

              <div className="box-fieldset">
                <label htmlFor="B2BService">
                  Professional:
                </label>
                <DropdownSelect
                  options={["Select", ...AllServices.map(service => service.name)]}
                  defaultOption={B2BData.B2BService}
                  onChange={(value) => updateB2BDropdownValue("B2BService", value)}
                />

                {errors.B2BService && (
                  <span className="error-message">{errors.B2BService}</span>
                )}
              </div>
              <div className="box-fieldset">
                <label htmlFor="B2Blocation">
                  City/Location:
                </label>
                <input
                  type="text"
                  name="B2Blocation"
                  value={B2BData.B2Blocation}
                  onChange={updateB2BField}
                  className="form-control style-1"
                />
                {errors.B2Blocation && (
                  <span className="error-message">{errors.B2Blocation}</span>
                )}
              </div>
            </div>
          )}
          {isAgent && (
            <div className="box grid-2 gap-30">
              <div className="box-fieldset">
                <label htmlFor="agentGender">
                  Gender:
                </label>
                <DropdownSelect
                  options={["Select", "Male", "Female", "Other"]}
                  defaultOption={agentData.agentGender}
                  onChange={(value) => updateDropdownValue("agentGender", value)}
                />
                {errors.agentGender && (
                  <span className="error-message">{errors.agentGender}</span>
                )}
              </div>

              <div className="box-fieldset">
                <label htmlFor="agentService">
                  Service:
                </label>
                <DropdownSelect
                  options={[
                    "Select",
                    "RealEstate Broker",
                    "RealEstate Promoter",
                    "RealEstate Marketer",
                  ]}
                  defaultOption={agentData.agentService}
                  onChange={(value) => updateDropdownValue("agentService", value)}
                />
                {errors.agentService && (
                  <span className="error-message">{errors.agentService}</span>
                )}
              </div>
              <div className="box-fieldset">
                <label htmlFor="agentLocation">
                  City/Location:
                </label>
                <input
                  type="text"
                  name="agentLocation"
                  value={agentData.agentLocation}
                  onChange={updateAgentField}
                  className="form-control style-1"
                />
                {errors.agentLocation && (
                  <span className="error-message">{errors.agentLocation}</span>
                )}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h5 className="title">Documents</h5>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <span className="file-count">{totalFiles}/10 Files</span>
              {totalFiles > 0 && (
                <button
                  type="button"
                  style={{
                    background: '#ff6b6b',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '6px 12px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: '500',
                    transition: 'background 0.3s'
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#cc0000'}
                  onMouseLeave={(e) => e.target.style.background = '#ff6b6b'}
                  onClick={removeAllFiles}
                >
                  Remove All
                </button>
              )}
            </div>
          </div>
          <div className="box">
            <div className={`file-upload-container ${totalFiles >= 10 ? 'disabled' : ''}`}>
              <input
                key={fileInputKey}
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.xls,.xlsx"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
                id="fileInput"
                disabled={totalFiles >= 10}
              />
              <label htmlFor="fileInput" style={{ cursor: totalFiles >= 10 ? 'not-allowed' : 'pointer', margin: 0 }}>
                <div>
                  <p style={{ fontSize: '16px', fontWeight: '500', color: '#333', margin: 0 }}>
                    📁 Click to upload documents
                  </p>
                  <p style={{ fontSize: '12px', color: '#666', margin: '8px 0 0 0' }}>
                    Maximum 10 files supported (including existing files)
                  </p>
                  <p style={{ fontSize: '11px', color: '#999', margin: '4px 0 0 0' }}>
                    Supported formats: PDF, DOC, DOCX, JPG, PNG, XLS, XLSX
                  </p>
                  {totalFiles >= 10 && (
                    <p style={{ fontSize: '12px', color: '#ff4444', margin: '8px 0 0 0', fontWeight: 'bold' }}>
                      Maximum files reached
                    </p>
                  )}
                </div>
              </label>
            </div>

            {existingFiles.length > 0 && (
              <>
                <div className="section-divider"></div>
                <h6 style={{ marginTop: '20px', marginBottom: '10px', color: '#28a745', fontSize: '14px', fontWeight: '600' }}>
                  Existing Files ({existingFiles.length})
                </h6>
                <div className="file-list">
                  {existingFiles.map((file) => (
                    <div key={file.id} className="file-item existing">
                      <div className="file-info">
                        <div className="file-name">
                          {file.name || file.filename || 'Document'}
                          <span className="file-badge">Saved</span>
                        </div>
                        <div className="file-size">
                          {file.size ? `${file.size} KB` : 'Uploaded'}
                        </div>
                      </div>
                      <button
                        type="button"
                        className="file-remove-btn"
                        onClick={() => removeFile(file.id, true)}
                      >
                        <FaTrash /> Remove
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}

            {uploadedFiles.length > 0 && (
              <>
                {existingFiles.length > 0 && <div className="section-divider"></div>}
                <h6 style={{ marginTop: '20px', marginBottom: '10px', color: '#008FF7', fontSize: '14px', fontWeight: '600' }}>
                  New Files ({uploadedFiles.length})
                </h6>
                <div className="file-list">
                  {uploadedFiles.map((fileObj) => (
                    <div key={fileObj.id} className="file-item">
                      <div className="file-info">
                        <div className="file-name">{fileObj.name}</div>
                        <div className="file-size">{fileObj.size} KB</div>
                      </div>
                      <button
                        type="button"
                        className="file-remove-btn"
                        onClick={() => removeFile(fileObj.id, false)}
                      >
                        <FaTrash /> Remove
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="box" onClick={handleProfileUpdate}>
            <a className="tf-btn primary">Save &amp; Update</a>
          </div>

          <h5 className="title">Change password</h5>
          <div className="box grid-3 gap-30">
            <div className="box-fieldset">
              <label htmlFor="old-pass">
                Old Password:<span>*</span>
              </label>
              <div className="box-password">
                <input
                  type={showOldPassword ? 'text' : 'password'}
                  name="oldPassword"
                  value={passwordFields.oldPassword}
                  onChange={updatePasswordField}
                  className="form-contact style-1 password-field"
                  placeholder="Password"
                />
                {validationErrors.oldPassword && <span className="error-message">{validationErrors.oldPassword}</span>}
                <span className="show-pass" onClick={() => togglePasswordVisibility('oldPassword')}>
                  {showOldPassword ? <FaEyeSlash style={{ marginBottom: '5px' }} /> : <FaEye style={{ marginBottom: '5px' }} />}
                </span>
              </div>
            </div>
            <div className="box-fieldset">
              <label htmlFor="new-pass">
                New Password:<span>*</span>
              </label>
              <div className="box-password">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  name="newPassword"
                  value={passwordFields.newPassword}
                  onChange={updatePasswordField}
                  className="form-contact style-1 password-field2"
                  placeholder="Password"
                />
                {validationErrors.newPassword && <span className="error-message">{validationErrors.newPassword}</span>}
                <span className="show-pass2" onClick={() => togglePasswordVisibility('newPassword')}>
                  {showNewPassword ? <FaEyeSlash style={{ marginBottom: '5px' }} /> : <FaEye style={{ marginBottom: '5px' }} />}
                </span>
              </div>
            </div>
            <div className="box-fieldset">
              <label htmlFor="confirm-pass">
                Confirm Password:<span>*</span>
              </label>
              <div className="box-password">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={passwordFields.confirmPassword}
                  onChange={updatePasswordField}
                  className="form-contact style-1 password-field3"
                  placeholder="Password"
                />
                {validationErrors.confirmPassword && <span className="error-message">{validationErrors.confirmPassword}</span>}
                <span className="show-pass3" onClick={() => togglePasswordVisibility('confirmPassword')}>
                  {showConfirmPassword ? <FaEyeSlash style={{ marginBottom: '5px' }} /> : <FaEye style={{ marginBottom: '5px' }} />}
                </span>
              </div>
            </div>
          </div>
          <div className="box" onClick={submitPasswordUpdate}>
            <a className="tf-btn primary">Update Password</a>
          </div>
        </div>
      </div>
      <div className="footer-dashboard">
        <p>Copyright © 2024 Lands India</p>
      </div>
    </div>
  );
}