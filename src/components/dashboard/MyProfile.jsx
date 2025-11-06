
// import React, { useState, useEffect } from "react";
// import { getUserDetails, UpdateUserPassword, getAgentDetails, getB2BDetails } from "@/apiCalls";
// import { toast } from "react-toastify";
// import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import DropdownSelect from "../common/DropdownSelect";
// import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

// // Placeholder imports for agent/B2B updates - implement these in apiCalls.js if not present
// // import { updateAgentDetails, updateB2BDetails } from "@/apiCalls";

// export const UpdateUser = async (data) => {
//   const baseUrl = "https://api.i5propertystars.com";
//   const url = `${baseUrl}/registration/update-user`;
//   const formData = new FormData();

//   // Basic fields
//   formData.append("id", data.id);
//   formData.append("phone", data.phone);
//   formData.append("fullName", data.fullName.trim()); // Trim fullName
//   formData.append("email", data.email);
//   formData.append("type", (data.type || "User").toLowerCase()); // Normalize to lowercase
//   formData.append("isActive", data.isActive ? 1 : 0);

//   // Optional password
//   if (data.password && data.password.trim() !== "") {
//     formData.append("password", data.password);
//   }

//   // ✅ Existing saved files (keep them)
//   if (data.existingFiles && data.existingFiles.length > 0) {
//     formData.append("updatedFiles", data.existingFiles.join(","));
//   }

//   // ✅ Upload new profile image
//   if (data.image && data.image instanceof File) {
//     formData.append("image", data.image); // backend req.files.image[0]
//   }

//   // ✅ Upload new multiple files
//   if (data.files && data.files.length > 0) {
//     data.files.forEach((file) => {
//       if (file instanceof File) {
//         formData.append("files", file); // backend req.files.files[]
//       }
//     });
//   }

//   // Additional fields for Agent/B2B
//   if (data.age !== undefined) {
//     formData.append("age", data.age);
//   }
//   if (data.gender !== undefined) {
//     formData.append("gender", data.gender .toLowerCase());
//   }
//   if (data.location !== undefined) {
//     formData.append("location", data.location);
//   }
//   if (data.service !== undefined) {
//     formData.append("service", data.service);
//   }
//   if (data.professional !== undefined) {
//     formData.append("professional", data.professional);
//   }

//   try {
//     const response = await fetch(url, {
//       method: "PUT",
//       body: formData,
//     });

//     if (!response.ok) {
//       const errorData = await response.json().catch(() => ({}));
//       return {
//         success: false,
//         message: errorData.message || `HTTP error! status: ${response.status}`,
//         error: errorData,
//       };
//     }

//     const result = await response.json();
//     return result;
//   } catch (error) {
//     console.error("Update User Failed:", error);
//     return {
//       success: false,
//       message: "Network error",
//       error,
//     };
//   }
// };

// export default function MyProfile() {

//   const [avatar, setAvatar] = useState({
//     file: null,
//     preview: null,
//   });

//   const [imgUrl, setimgUrl] = useState("");
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [existingFiles, setExistingFiles] = useState([]);
//   const [fileErrors, setFileErrors] = useState([]);

//   const [userData, setUserData] = useState();
//   const [showOldPassword, setShowOldPassword] = useState(false);
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const [isAgent, setAgent] = useState(false);
//   const [isB2B, setIsB2B] = useState(false);
//   const [isNew, setIsNew] = useState(false);
//   const [isNewB2B, setIsNewB2B] = useState(false);
//   const [isUpdating, setIsUpdating] = useState(false);

//   const [B2BData, setB2BData] = useState({
//     id: '',
//     B2BAge: "",
//     B2BGender: "",
//     B2BService: "",
//     B2Blocation: "",
//   });

//   const [agentData, setAgentData] = useState({
//     id: '',
//     agentAge: "",
//     agentGender: "",
//     agentService: "",
//     agentLocation: "",
//   });

//   const AllServices = [
//     { id: 1, name: "Advocate & Auditor" },
//     { id: 2, name: "Investor (Project Invest)" },
//     { id: 3, name: "Reseller (Short Term Invest)" },
//     { id: 4, name: "Bankers/Loan Provider" },
//     { id: 5, name: "Builder/Construction" },
//     { id: 6, name: "Interior" },
//     { id: 7, name: "Civil Engineer/Architect" },
//     { id: 8, name: "Plumbing & Electrical" },
//     { id: 9, name: "Flooring" },
//     { id: 10, name: "Approval Services" },
//     { id: 11, name: "Building Valuation" },
//     { id: 12, name: "Digital Security System" },
//     { id: 13, name: "Landscaping" }
//   ];

//   const [validationAgentErrors, setValidationAgentErrors] = useState({});
//   const [validationB2BErrors, setValidationB2BErrors] = useState({});

//   const fieldLabelsAgent = {
//     agentAge: 'Age',
//     agentGender: 'Gender',
//     agentService: 'Service',
//     agentLocation: 'Location'
//   };

//   const fieldLabelsB2B = {
//     B2BAge: 'Age',
//     B2BGender: 'Gender',
//     B2BService: 'Professional',
//     B2Blocation: 'Location'
//   };

//   const validateAgentField = (field, value) => {
//     let error = "";
//     if (!value || value === "Select") {
//       const label = fieldLabelsAgent[field] || field;
//       error = `${label} is required`;
//     }
//     setValidationAgentErrors(prev => ({ ...prev, [field]: error }));
//   };

//   const validateB2BField = (field, value) => {
//     let error = "";
//     if (!value || value === "Select") {
//       const label = fieldLabelsB2B[field] || field;
//       error = `${label} is required`;
//     }
//     setValidationB2BErrors(prev => ({ ...prev, [field]: error }));
//   };

//   const validateAgentForm = () => {
//     let newErrors = {};
//     if (!agentData.agentAge) {
//       newErrors.agentAge = 'Age is required.';
//     }
//     if (!agentData.agentGender || agentData.agentGender === "Select") {
//       newErrors.agentGender = 'Gender is required.';
//     }
//     if (!agentData.agentService || agentData.agentService === "Select") {
//       newErrors.agentService = 'Service is required.';
//     }
//     if (!agentData.agentLocation.trim()) {
//       newErrors.agentLocation = 'Location is required.';
//     }
//     setValidationAgentErrors(newErrors);
//     return Object.values(newErrors).every(error => !error);
//   };

//   const validateB2BForm = () => {
//     let newErrors = {};
//     if (!B2BData.B2BAge) {
//       newErrors.B2BAge = 'Age is required.';
//     }
//     if (!B2BData.B2BGender || B2BData.B2BGender === "Select") {
//       newErrors.B2BGender = 'Gender is required.';
//     }
//     if (!B2BData.B2BService || B2BData.B2BService === "Select") {
//       newErrors.B2BService = 'Professional is required.';
//     }
//     if (!B2BData.B2Blocation.trim()) {
//       newErrors.B2Blocation = 'Location is required.';
//     }
//     setValidationB2BErrors(newErrors);
//     return Object.values(newErrors).every(error => !error);
//   };

//   const updateAgentField = (e) => {
//     const { name, value } = e.target;
//     setAgentData({ ...agentData, [name]: value });
//     validateAgentField(name, value);
//   };

//   const updateB2BField = (e) => {
//     const { name, value } = e.target;
//     setB2BData({ ...B2BData, [name]: value });
//     validateB2BField(name, value);
//   };

//   const updateDropdownValue = (field, value) => {
//     setAgentData({ ...agentData, [field]: value });
//     validateAgentField(field, value);
//   };

//   const updateB2BDropdownValue = (field, value) => {
//     setB2BData({ ...B2BData, [field]: value });
//     validateB2BField(field, value);
//   };

//   const loadAgentDetails = async () => {
//     const landsUser = JSON.parse(localStorage.getItem('LandsUser'));
//     const userType = (landsUser?.type || '').toLowerCase(); // Normalize for checks

//     if (userType === 'agent') {
//       setAgent(true);

//       try {
//         const data = await getAgentDetails(landsUser.phoneNumber);
//         if (data.success) {
//           if (data?.data?.length) {
//             setIsNew(false);
//             setAgentData({
//               id: data.data[0].id,
//               agentAge: data.data[0].age,
//               agentGender: data.data[0].gender,
//               agentService: data.data[0].service,
//               agentLocation: data.data[0].location,
//             });
            
//             try {
//               const parsedImage = JSON.parse(data?.data[0]?.image);
//               setimgUrl(parsedImage);
//             } catch {
//               setimgUrl(data?.data[0]?.image);
//             }
            
//             if (data.data[0].files) {
//               try {
//                 const files = JSON.parse(data.data[0].files);
//                 setExistingFiles(Array.isArray(files) ? files : []);
//               } catch {
//                 const files = typeof data.data[0].files === 'string' 
//                   ? data.data[0].files.split(',') 
//                   : [];
//                 setExistingFiles(files);
//               }
//             }
//           } else {
//             setIsNew(true);
//           }
//         } else {
//           toast.error(data.message || data.error || "Something Went Wrong");
//         }
//       } catch (error) {
//         toast.error("Error fetching agent details");
//       }
//     }
//   };

//   const loadB2BDetails = async () => {
//     const landsUser = JSON.parse(localStorage.getItem('LandsUser'));
//     const userType = (landsUser?.type || '').toLowerCase(); // Normalize for checks

//     if (userType === 'b2b') {
//       setIsB2B(true);

//       try {
//         const data = await getB2BDetails(landsUser.phoneNumber);
//         if (data.success) {
//           if (data.data.length) {
//             setIsNewB2B(false);
//             setB2BData({
//               id: data.data[0].id,
//               B2BAge: data.data[0].age,
//               B2BGender: data.data[0].gender,
//               B2BService: data.data[0].professional,
//               B2Blocation: data.data[0].location,
//             });
//             setimgUrl(data.data[0].image);
            
//             if (data.data[0].files) {
//               try {
//                 const files = JSON.parse(data.data[0].files);
//                 setExistingFiles(Array.isArray(files) ? files : []);
//               } catch {
//                 const files = typeof data.data[0].files === 'string' 
//                   ? data.data[0].files.split(',') 
//                   : [];
//                 setExistingFiles(files);
//               }
//             }
//           } else {
//             setIsNewB2B(true);
//           }
//         } else {
//           toast.error(data.message || data.error || "Something Went Wrong");
//         }
//       } catch (error) {
//         toast.error("Error fetching B2B details");
//       }
//     }
//   };

//   useEffect(() => {
//     const fetchDetails = async () => {
//       await getUser();
//       const landsUser = JSON.parse(localStorage.getItem('LandsUser'));
//       const userType = (landsUser?.type || '').toLowerCase();
//       if (userType === 'agent') {
//         await loadAgentDetails();
//       }
//       if (userType === 'b2b') {
//         await loadB2BDetails();
//       }
//     };
//     fetchDetails();
//   }, []);

//   const handleImageUpload = (event) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       setAvatar({
//         file: file,
//         preview: imageUrl,
//       });
//     }
//   };

//   const handleFileUpload = (event) => {
//     const files = Array.from(event.target.files);
//     const maxFileSize = 5 * 1024 * 1024; // 5MB
//     const allowedTypes = [
//       'application/pdf', 
//       'application/msword', 
//       'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
//       'image/jpeg', 
//       'image/png'
//     ];
//     const newErrors = [];
//     const validFiles = [];

//     files.forEach((file) => {
//       if (file.size > maxFileSize) {
//         newErrors.push(`${file.name}: File size exceeds 5MB.`);
//       } else if (!allowedTypes.includes(file.type)) {
//         newErrors.push(`${file.name}: Invalid file type. Only PDF, DOC, DOCX, JPG, PNG allowed.`);
//       } else {
//         validFiles.push(file);
//       }
//     });

//     setFileErrors(newErrors);
//     if (newErrors.length === 0) {
//       setFileErrors([]); // Clear previous errors on success
//     }
//     setSelectedFiles(prev => [...prev, ...validFiles]);
//   };

//   const removeFile = (index) => {
//     setSelectedFiles(prev => prev.filter((_, i) => i !== index));
//   };

//   const removeExistingFile = (index) => {
//     if (window.confirm('Are you sure you want to remove this file?')) {
//       setExistingFiles(prev => prev.filter((_, i) => i !== index));
//     }
//   };

//   const togglePasswordVisibility = (field) => {
//     if (field === 'oldPassword') {
//       setShowOldPassword(!showOldPassword);
//     } else if (field === 'newPassword') {
//       setShowNewPassword(!showNewPassword);
//     } else if (field === 'confirmPassword') {
//       setShowConfirmPassword(!showConfirmPassword);
//     }
//   };

//   const [formData, setFormData] = useState({
//     id: 0,
//     name: '',
//     mobileNumber: '',
//     email: '',
//   });

//   const [errors, setErrors] = useState({
//     name: '',
//     mobileNumber: '',
//     email: '',
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });

//     setErrors({
//       ...errors,
//       [name]: '',
//     });
//   };

//   const [passwordFields, setPasswordFields] = useState({
//     oldPassword: '',
//     newPassword: '',
//     confirmPassword: '',
//   });

//   const [validationErrors, setValidationErrors] = useState({
//     oldPassword: '',
//     newPassword: '',
//     confirmPassword: '',
//   });

//   const updatePasswordField = (e) => {
//     const { name, value } = e.target;
//     const prevNewPassword = passwordFields.newPassword; // Capture previous for confirm validation

//     setPasswordFields({
//       ...passwordFields,
//       [name]: value,
//     });

//     let updatedErrors = { ...validationErrors };

//     if (name === 'oldPassword') {
//       updatedErrors.oldPassword = '';
//     }

//     if (name === 'newPassword') {
//       if (value.length < 8) {
//         updatedErrors.newPassword = 'New password must be at least 8 characters long.';
//       } else {
//         updatedErrors.newPassword = '';
//       }
//       // Re-validate confirm if new password changed
//       if (passwordFields.confirmPassword && passwordFields.confirmPassword !== value) {
//         updatedErrors.confirmPassword = 'Confirm password does not match the new password.';
//       } else if (passwordFields.confirmPassword) {
//         updatedErrors.confirmPassword = '';
//       }
//     }

//     if (name === 'confirmPassword') {
//       if (value !== prevNewPassword) {
//         updatedErrors.confirmPassword = 'Confirm password does not match the new password.';
//       } else {
//         updatedErrors.confirmPassword = '';
//       }
//     }

//     setValidationErrors(updatedErrors);
//   };

//   const handleProfileUpdate = async () => {
//     let valid = true;
//     let newErrors = { ...errors };

//     // Validate Full name - ensure it's not an email
//     if (!formData.name.trim()) {
//       newErrors.name = 'Full name is required.';
//       valid = false;
//     } else if (/\S+@\S+\.\S+/.test(formData.name)) {
//       newErrors.name = 'Full name cannot be an email address.';
//       valid = false;
//     }

//     // Validate Mobile Number (10 digits)
//     if (!/^\d{10}$/.test(formData.mobileNumber)) {
//       newErrors.mobileNumber = 'Mobile number must be 10 digits.';
//       valid = false;
//     }

//     // Validate Email address
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       newErrors.email = 'Please enter a valid email address.';
//       valid = false;
//     }

//     setErrors(newErrors);

//     if (!valid) return;

//     // Validate agent or B2B fields if applicable (for completeness, though not sent to API)
//     if (isAgent && !validateAgentForm()) {
//       valid = false;
//     }
//     if (isB2B && !validateB2BForm()) {
//       valid = false;
//     }

//     if (!valid) return;

//     const landsUser = JSON.parse(localStorage.getItem('LandsUser'));

//     if (landsUser) {
//       setIsUpdating(true);
//       try {
//         const payload = {
//           id: formData.id, // Always use main user ID from formData (Registration table)
//           fullName: formData.name, // Trim handled in UpdateUser
//           email: formData.email,
//           phone: formData.mobileNumber,
//           type: (landsUser.type || 'User').toLowerCase(), // Normalize to lowercase
//           isActive: true,
//         };

//         // Add image if selected
//         if (avatar.file) {
//           payload.image = avatar.file;
//         }

//         // Add new files
//         if (selectedFiles.length > 0) {
//           payload.files = selectedFiles;
//         }

//         // Add existing files (files to keep)
//         if (existingFiles.length > 0) {
//           payload.existingFiles = existingFiles;
//         }

//         // Add Agent fields if applicable
//         if (isAgent) {
//           payload.age = agentData.agentAge;
//           payload.gender = agentData.agentGender;
//           payload.service = agentData.agentService;
//           payload.location = agentData.agentLocation;
//         }

//         // Add B2B fields if applicable
//         if (isB2B) {
//           payload.age = B2BData.B2BAge;
//           payload.gender = B2BData.B2BGender;
//           payload.professional = B2BData.B2BService;
//           payload.location = B2BData.B2Blocation;
//         }

//         // Do NOT add Agent or B2B specific fields here, as they are not expected by the API
//         // Agent/B2B updates should use separate APIs if available

//         console.log('Sending payload:', payload);

//         const data = await UpdateUser(payload);

//         if (data.success) {
//           toast.success("Profile updated successfully");
          
//           // Update localStorage with normalized type
//           if (data.data) {
//             const normalizedType = (data.data.type || landsUser.type || 'user').toLowerCase();
//             const updatedUser = {
//               ...landsUser,
//               type: normalizedType, // Ensure lowercase
//               full_name: data.data.fullName || formData.name,
//               email: data.data.email || formData.email,
//             };
//             localStorage.setItem('LandsUser', JSON.stringify(updatedUser));
//           }

//           // Clear new file selection after successful upload
//           setSelectedFiles([]);
          
//           // Update existing files from response if provided
//           if (data.data?.filePublicURLs) {
//             const urls = data.data.filePublicURLs;
//             setExistingFiles(Array.isArray(urls) ? urls : (typeof urls === 'string' ? urls.split(',').filter(Boolean) : []));
//           }

//           // Update image URL (prefer https if available)
//           if (data.data?.imagePublicURL) {
//             setimgUrl(data.data.imagePublicURL.startsWith('https') ? data.data.imagePublicURL : data.data.imagePublicURL.replace('http://', 'https://'));
//             setAvatar({ file: null, preview: null });
//           }

//           // Refetch user data to ensure UI is synced with backend (fixes remove not reflecting if backend handles it)
//           await getUser();

//           // Refetch Agent/B2B details if applicable to sync UI
//           if (isAgent) {
//             await loadAgentDetails();
//           }
//           if (isB2B) {
//             await loadB2BDetails();
//           }
//         } else {
//           toast.error(data.message || data.error || "Something Went Wrong");
//         }
//       } catch (err) {
//         console.error('Error updating user:', err);
//         toast.error(err.message || "Something Went Wrong");
//       } finally {
//         setIsUpdating(false);
//       }
//     } else {
//       toast.error("User Not Found");
//       setTimeout(() => {
//         window.location.href = "/";
//       }, 4000);
//     }
//   };

//   const getUser = async () => {
//     const landsUser = JSON.parse(localStorage.getItem('LandsUser'));

//     if (landsUser) {
//       try {
//         const data = await getUserDetails(landsUser.id);
//         if (data.success) {
//           setUserData(data.user);
//           setFormData({
//             id: data.user.id,
//             name: (data.user.full_name || '').trim(), // Trim full_name
//             mobileNumber: data.user.phone_number,
//             email: data.user.email || '',
//           });
//           // Prefer imageUrl if available, ensure https
//           const imageSrc = data.user.imageUrl || data.user.image || "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=";
//           setimgUrl(imageSrc.startsWith('https') ? imageSrc : imageSrc.replace('http://', 'https://'));
          
//           if (data.user.files) {
//             try {
//               const files = JSON.parse(data.user.files);
//               setExistingFiles(Array.isArray(files) ? files : []);
//             } catch {
//               const files = typeof data.user.files === 'string' 
//                 ? data.user.files.split(',') 
//                 : [];
//               setExistingFiles(files);
//             }
//           }

//           // Normalize type in localStorage to lowercase for consistency
//           const normalizedType = (data.user.type || landsUser.type || 'user').toLowerCase();
//           if (landsUser.type !== normalizedType) {
//             const updatedUser = { ...landsUser, type: normalizedType };
//             localStorage.setItem('LandsUser', JSON.stringify(updatedUser));
//           }
//         } else {
//           toast.error(data.message || data.error || "Something Went Wrong");
//         }
//       } catch (err) {
//         console.error('Error fetching user details:', err);
//       }
//     } else {
//       toast.error("User Not Found");
//       setTimeout(() => {
//         window.location.href = "/";
//       }, 4000);
//     }
//   };

//   const submitPasswordUpdate = async () => {
//     let isValid = true;
//     let updatedErrors = { ...validationErrors };

//     if (!passwordFields.oldPassword.trim()) {
//       updatedErrors.oldPassword = 'Old password is required.';
//       isValid = false;
//     }

//     if (passwordFields.newPassword.length < 8) {
//       updatedErrors.newPassword = 'New password must be at least 8 characters long.';
//       isValid = false;
//     }

//     if (passwordFields.newPassword !== passwordFields.confirmPassword) {
//       updatedErrors.confirmPassword = 'Confirm password does not match the new password.';
//       isValid = false;
//     }

//     setValidationErrors(updatedErrors);

//     if (isValid) {
//       const landsUser = JSON.parse(localStorage.getItem('LandsUser'));

//       if (landsUser) {
//         try {
//           const postData = {
//             id: landsUser.id,
//             oldPassword: passwordFields.oldPassword,
//             newPassword: passwordFields.newPassword,
//           };

//           const data = await UpdateUserPassword(postData);
//           if (data.success) {
//             setPasswordFields({
//               oldPassword: '',
//               newPassword: '',
//               confirmPassword: '',
//             });
//             toast.success("Password Updated Successfully");
//           } else {
//             toast.error(data.message || data.error || "Something Went Wrong");
//           }
//         } catch (err) {
//           console.error('Error updating password:', err);
//           toast.error("Error updating password");
//         }
//       } else {
//         toast.error("User Not Found");
//         setTimeout(() => {
//           window.location.href = "/";
//         }, 4000);
//       }
//     }
//   };

//   const handleNav = () => {
//     window.location.href = "/add-property";
//   };

//   return (
//     <div className="main-content">
//       <style>
//         {`
//         .error-message {
//             color: red;
//             font-size: 12px;
//             margin-top: 5px;
//           }
//         @media (min-width: 800px) {
//           .custom-mobile-class {
//             display: none !important;
//           }
//           .custom-desktop-class {
//             display: flex !important;
//           }
//         }
 
//         @media (min-width: 800px) {
//           .custom-header-text {
//             display: none !important;
//           }
//         }
//         .custom-header-text {
//           display: flex ;
//           justify-content:flex-start;
//           align-items: center;
//         }
//         @media (max-width: 799px) {
//           .custom-desktop-class {
//             display: none !important;
//           }
//           .custom-mobile-class {
//             display: flex !important;
//           }
//           .custom-bg-dark{
//             font-weight:bold;
//             background: #008FF7;
//             color:#ffffff !important;
//             padding: 7px 12px;
//             border-radius: 10%;
//             border:none;
//           }
//         }
//         .tf-btn.disabled {
//           opacity: 0.6;
//           cursor: not-allowed;
//         }
//         `}
//       </style>
//       <div className="main-content-inner wrap-dashboard-content-2">
//         <div className="d-flex justify-content-between">
//           <div className="button-show-hide custom-header-text">
//             <ArrowCircleLeftIcon sx={{ fontSize: '40px' }} />
//             <span className="body-1">Menu</span>
//           </div>
//           <div className="custom-header-text" onClick={handleNav}>
//             <span className="custom-bg-dark">Sell Property</span>
//           </div>
//         </div>
//         <div className="button-show-hide" style={{ marginTop: '0px', display: 'flex' }}>
//           <h3 className="body-1" style={{ color: '#000', padding: '20px 0', fontWeight: '600' }}>My Profile</h3>
//         </div>
//         <div className="widget-box-2">
//           <div className="box">
//             <h5 className="title">Avatar</h5>
//             <div className="box-agent-avt">
//               <div className="avatar">
//                 <img
//                   alt="avatar"
//                   loading="lazy"
//                   width={128}
//                   height={128}
//                   src={avatar.preview || imgUrl || "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="}
//                 />
//               </div>
//               <div className="content uploadfile">
//                 <p>Upload a new avatar</p>
//                 <div className="box-ip">
//                   <input
//                     type="file"
//                     className="ip-file"
//                     accept="image/*"
//                     onChange={handleImageUpload}
//                   />
//                 </div>
//                 <p>Image Size 100x100, format JPEG</p>
//               </div>
//             </div>
//           </div>
//           <div className="box">
//             <h5 className="title">Upload Additional Files</h5>
//             <div className="content uploadfile">
//               <p>Upload additional documents (PDF, DOC, DOCX, JPG, PNG)</p>
//               <div className="box-ip">
//                 <input
//                   type="file"
//                   className="ip-file"
//                   accept=".pdf,.doc,.docx,.jpg,.png"
//                   multiple
//                   onChange={handleFileUpload}
//                 />
//               </div>
//               <p>Max file size: 5MB per file</p>
//               {fileErrors.length > 0 && (
//                 <div className="error-message">
//                   {fileErrors.map((error, index) => (
//                     <p key={index}>{error}</p>
//                   ))}
//                 </div>
//               )}
//               {existingFiles.length > 0 && (
//                 <div className="selected-files" style={{ marginTop: '15px' }}>
//                   <h6>Existing Files:</h6>
//                   <ul style={{ listStyle: 'none', padding: 0 }}>
//                     {existingFiles.map((file, index) => (
//                       <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', padding: '8px', background: '#f5f5f5', borderRadius: '4px' }}>
//                         <span style={{ fontSize: '14px' }}>
//                           {typeof file === 'string' ? file.split('/').pop() : file}
//                         </span>
//                         <button 
//                           onClick={() => removeExistingFile(index)} 
//                           style={{ 
//                             marginLeft: '10px', 
//                             color: 'white',
//                             background: '#dc3545', 
//                             border: 'none', 
//                             padding: '4px 12px',
//                             borderRadius: '4px',
//                             cursor: 'pointer',
//                             fontSize: '12px'
//                           }}
//                         >
//                           Remove
//                         </button>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//               {selectedFiles.length > 0 && (
//                 <div className="selected-files" style={{ marginTop: '15px' }}>
//                   <h6>New Files to Upload:</h6>
//                   <ul style={{ listStyle: 'none', padding: 0 }}>
//                     {selectedFiles.map((file, index) => (
//                       <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', padding: '8px', background: '#e8f5e9', borderRadius: '4px' }}>
//                         <span style={{ fontSize: '14px' }}>
//                           {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
//                         </span>
//                         <button 
//                           onClick={() => removeFile(index)} 
//                           style={{ 
//                             marginLeft: '10px', 
//                             color: 'white',
//                             background: '#dc3545', 
//                             border: 'none', 
//                             padding: '4px 12px',
//                             borderRadius: '4px',
//                             cursor: 'pointer',
//                             fontSize: '12px'
//                           }}
//                         >
//                           Remove
//                         </button>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>
//           </div>
//           <h5 className="title">Information</h5>
//           <div className="box grid-2 gap-30" style={{ marginBottom: '10px' }}>
//             <div className="box box-fieldset">
//               <label htmlFor="name">
//                 Full name:<span>*</span>
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 className="form-control style-1"
//               />
//               {errors.name && <span className="error-message">{errors.name}</span>}
//             </div>
//             <div className="box-fieldset">
//               <label htmlFor="num">
//                 Mobile Number:<span>*</span>
//               </label>
//               <input
//                 type="number"
//                 name="mobileNumber"
//                 disabled
//                 value={formData.mobileNumber}
//                 onChange={handleInputChange}
//                 className="form-control style-1"
//               />
//               {errors.mobileNumber && (
//                 <span className="error-message">{errors.mobileNumber}</span>
//               )}
//             </div>
//           </div>
//           <div className="box grid-2 gap-30">
//             <div className="box-fieldset">
//               <label htmlFor="email">
//                 Email address:<span>*</span>
//               </label>
//               <input
//                 type="text"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 className="form-control style-1"
//               />
//               {errors.email && <span className="error-message">{errors.email}</span>}
//             </div>
//             {isAgent && (
//               <div className="box-fieldset">
//                 <label htmlFor="agentAge">
//                   Age:<span>*</span>
//                 </label>
//                 <input
//                   type="number"
//                   name="agentAge"
//                   min="18"
//                   value={agentData.agentAge}
//                   onChange={updateAgentField}
//                   className="form-control style-1"
//                 />
//                 {validationAgentErrors.agentAge && (
//                   <span className="error-message">{validationAgentErrors.agentAge}</span>
//                 )}
//               </div>
//             )}
//             {isB2B && (
//               <div className="box-fieldset">
//                 <label htmlFor="B2BAge">
//                   Age:<span>*</span>
//                 </label>
//                 <input
//                   type="number"
//                   name="B2BAge"
//                   min="18"
//                   value={B2BData.B2BAge}
//                   onChange={updateB2BField}
//                   className="form-control style-1"
//                 />
//                 {validationB2BErrors.B2BAge && (
//                   <span className="error-message">{validationB2BErrors.B2BAge}</span>
//                 )}
//               </div>
//             )}
//           </div>
//           {isB2B && (
//             <div className="box grid-2 gap-30">
//               <div className="box-fieldset">
//                 <label htmlFor="B2BGender">
//                   Gender:<span>*</span>
//                 </label>
//                 <DropdownSelect
//                   options={["Select", "Male", "Female", "Other"]}
//                   defaultOption={B2BData.B2BGender}
//                   onChange={(value) => updateB2BDropdownValue("B2BGender", value)}
//                 />
//                 {validationB2BErrors.B2BGender && (
//                   <span className="error-message">{validationB2BErrors.B2BGender}</span>
//                 )}
//               </div>

//               <div className="box-fieldset">
//                 <label htmlFor="B2BService">
//                   Professional:<span>*</span>
//                 </label>
//                 <DropdownSelect
//                   options={["Select", ...AllServices.map(service => service.name)]}
//                   defaultOption={B2BData.B2BService}
//                   onChange={(value) => updateB2BDropdownValue("B2BService", value)}
//                 />
//                 {validationB2BErrors.B2BService && (
//                   <span className="error-message">{validationB2BErrors.B2BService}</span>
//                 )}
//               </div>
//               <div className="box-fieldset">
//                 <label htmlFor="B2Blocation">
//                   City/Location:<span>*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="B2Blocation"
//                   value={B2BData.B2Blocation}
//                   onChange={updateB2BField}
//                   className="form-control style-1"
//                 />
//                 {validationB2BErrors.B2Blocation && (
//                   <span className="error-message">{validationB2BErrors.B2Blocation}</span>
//                 )}
//               </div>
//             </div>
//           )}
//           {isAgent && (
//             <div className="box grid-2 gap-30">
//               <div className="box-fieldset">
//                 <label htmlFor="agentGender">
//                   Gender:<span>*</span>
//                 </label>
//                 <DropdownSelect
//                   options={["Select", "Male", "Female", "Other"]}
//                   defaultOption={agentData.agentGender}
//                   onChange={(value) => updateDropdownValue("agentGender", value)}
//                 />
//                 {validationAgentErrors.agentGender && (
//                   <span className="error-message">{validationAgentErrors.agentGender}</span>
//                 )}
//               </div>

//               <div className="box-fieldset">
//                 <label htmlFor="agentService">
//                   Service:<span>*</span>
//                 </label>
//                 <DropdownSelect
//                   options={[
//                     "Select",
//                     "RealEstate Broker",
//                     "RealEstate Promoter",
//                     "RealEstate Marketer",
//                   ]}
//                   defaultOption={agentData.agentService}
//                   onChange={(value) => updateDropdownValue("agentService", value)}
//                 />
//                 {validationAgentErrors.agentService && (
//                   <span className="error-message">{validationAgentErrors.agentService}</span>
//                 )}
//               </div>
//               <div className="box-fieldset">
//                 <label htmlFor="agentLocation">
//                   City/Location:<span>*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="agentLocation"
//                   value={agentData.agentLocation}
//                   onChange={updateAgentField}
//                   className="form-control style-1"
//                 />
//                 {validationAgentErrors.agentLocation && (
//                   <span className="error-message">{validationAgentErrors.agentLocation}</span>
//                 )}
//               </div>
//             </div>
//           )}
//           <div className="box">
//             <a 
//               className={`tf-btn primary ${isUpdating ? 'disabled' : ''}`}
//               onClick={!isUpdating ? handleProfileUpdate : undefined}
//               style={isUpdating ? { opacity: 0.6, cursor: 'not-allowed' } : {}}
//             >
//               {isUpdating ? 'Updating...' : 'Save & Update'}
//             </a>
//           </div>
//           <h5 className="title">Change password</h5>
//           <div className="box grid-3 gap-30">
//             <div className="box-fieldset">
//               <label htmlFor="old-pass">
//                 Old Password:<span>*</span>
//               </label>
//               <div className="box-password">
//                 <input
//                   type={showOldPassword ? 'text' : 'password'}
//                   name="oldPassword"
//                   value={passwordFields.oldPassword}
//                   onChange={updatePasswordField}
//                   className="form-contact style-1 password-field"
//                   placeholder="Password"
//                 />
//                 {validationErrors.oldPassword && <span className="error-message">{validationErrors.oldPassword}</span>}
//                 <span className="show-pass" onClick={() => togglePasswordVisibility('oldPassword')}>
//                   {showOldPassword ? <FaEyeSlash style={{ marginBottom: '5px' }} /> : <FaEye style={{ marginBottom: '5px' }} />}
//                 </span>
//               </div>
//             </div>
//             <div className="box-fieldset">
//               <label htmlFor="new-pass">
//                 New Password:<span>*</span>
//               </label>
//               <div className="box-password">
//                 <input
//                   type={showNewPassword ? 'text' : 'password'}
//                   name="newPassword"
//                   value={passwordFields.newPassword}
//                   onChange={updatePasswordField}
//                   className="form-contact style-1 password-field2"
//                   placeholder="Password"
//                 />
//                 {validationErrors.newPassword && <span className="error-message">{validationErrors.newPassword}</span>}
//                 <span className="show-pass2" onClick={() => togglePasswordVisibility('newPassword')}>
//                   {showNewPassword ? <FaEyeSlash style={{ marginBottom: '5px' }} /> : <FaEye style={{ marginBottom: '5px' }} />}
//                 </span>
//               </div>
//             </div>
//             <div className="box-fieldset">
//               <label htmlFor="confirm-pass">
//                 Confirm Password:<span>*</span>
//               </label>
//               <div className="box-password">
//                 <input
//                   type={showConfirmPassword ? 'text' : 'password'}
//                   name="confirmPassword"
//                   value={passwordFields.confirmPassword}
//                   onChange={updatePasswordField}
//                   className="form-contact style-1 password-field3"
//                   placeholder="Password"
//                 />
//                 {validationErrors.confirmPassword && <span className="error-message">{validationErrors.confirmPassword}</span>}
//                 <span className="show-pass3" onClick={() => togglePasswordVisibility('confirmPassword')}>
//                   {showConfirmPassword ? <FaEyeSlash style={{ marginBottom: '5px' }} /> : <FaEye style={{ marginBottom: '5px' }} />}
//                 </span>
//               </div>
//             </div>
//           </div>
//           <div className="box">
//             <a className="tf-btn primary" onClick={submitPasswordUpdate}>
//               Update Password
//             </a>
//           </div>
//         </div>
//       </div>
//       <div className="footer-dashboard">
//         <p>Copyright © 2024 Lands India</p>
//       </div>
//     </div>
//   );
// }export const UpdateUserPassword = async (data) => {
import React, { useState, useEffect } from "react";
import { getUserDetails, UpdateUserPassword, getAgentDetails, getB2BDetails } from "@/apiCalls";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import DropdownSelect from "../common/DropdownSelect";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

// Placeholder imports for agent/B2B updates - implement these in apiCalls.js if not present
// import { updateAgentDetails, updateB2BDetails } from "@/apiCalls";

export const UpdateUser = async (data) => {
  const baseUrl = "https://api.i5propertystars.com";
  const url = `${baseUrl}/registration/update-user`;
  const formData = new FormData();

  // Basic fields
  formData.append("id", data.id);
  formData.append("phone", data.phone);
  formData.append("fullName", data.fullName.trim()); // Trim fullName
  formData.append("email", data.email);
  formData.append("type", (data.type || "User").toLowerCase()); // Normalize to lowercase
  formData.append("isActive", data.isActive ? 1 : 0);

  // Optional password
  if (data.password && data.password.trim() !== "") {
    formData.append("password", data.password);
  }

  // ✅ Existing saved files (keep them)
  if (data.existingFiles && data.existingFiles.length > 0) {
    formData.append("updatedFiles", data.existingFiles.join(","));
  }

  // ✅ Upload new profile image
  if (data.image && data.image instanceof File) {
    formData.append("image", data.image); // backend req.files.image[0]
  }

  // ✅ Upload new multiple files
  if (data.files && data.files.length > 0) {
    data.files.forEach((file) => {
      if (file instanceof File) {
        formData.append("files", file); // backend req.files.files[]
      }
    });
  }

  // Additional fields for Agent/B2B
  if (data.age !== undefined) {
    formData.append("age", data.age);
  }
  if (data.gender !== undefined && data.gender !== null && data.gender.trim() !== '') {
    formData.append("gender", data.gender.toLowerCase().trim());
  }
  if (data.location !== undefined) {
    formData.append("location", data.location);
  }
  if (data.service !== undefined) {
    formData.append("service", data.service);
  }
  if (data.professional !== undefined) {
    formData.append("professional", data.professional);
  }

  try {
    const response = await fetch(url, {
      method: "PUT",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        message: errorData.message || `HTTP error! status: ${response.status}`,
        error: errorData,
      };
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Update User Failed:", error);
    return {
      success: false,
      message: "Network error",
      error,
    };
  }
};

export default function MyProfile() {

  const [avatar, setAvatar] = useState({
    file: null,
    preview: null,
  });

  const [imgUrl, setimgUrl] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [existingFiles, setExistingFiles] = useState([]);
  const [fileErrors, setFileErrors] = useState([]);

  const [userData, setUserData] = useState();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isAgent, setAgent] = useState(false);
  const [isB2B, setIsB2B] = useState(false);
  const [isVAS, setIsVAS] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

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

  const [vasData, setVasData] = useState({
    professional: "",
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

  const [validationAgentErrors, setValidationAgentErrors] = useState({});
  const [validationB2BErrors, setValidationB2BErrors] = useState({});
  const [validationVASErrors, setValidationVASErrors] = useState({});

  const fieldLabelsAgent = {
    agentAge: 'Age',
    agentGender: 'Gender',
    agentService: 'Service',
    agentLocation: 'Location'
  };

  const fieldLabelsB2B = {
    B2BAge: 'Age',
    B2BGender: 'Gender',
    B2BService: 'Professional',
    B2Blocation: 'Location'
  };

  const validateAgentField = (field, value) => {
    let error = "";
    if (!value || value === "Select") {
      const label = fieldLabelsAgent[field] || field;
      error = `${label} is required`;
    }
    setValidationAgentErrors(prev => ({ ...prev, [field]: error }));
  };

  const validateB2BField = (field, value) => {
    let error = "";
    if (!value || value === "Select") {
      const label = fieldLabelsB2B[field] || field;
      error = `${label} is required`;
    }
    setValidationB2BErrors(prev => ({ ...prev, [field]: error }));
  };

  const validateVASField = (field, value) => {
    let error = "";
    if (!value || value === "Select") {
      error = 'Professional is required';
    }
    setValidationVASErrors(prev => ({ ...prev, [field]: error }));
  };

  const validateAgentForm = () => {
    let newErrors = {};
    if (!agentData.agentAge) {
      newErrors.agentAge = 'Age is required.';
    }
    if (!agentData.agentGender || agentData.agentGender === "Select") {
      newErrors.agentGender = 'Gender is required.';
    }
    if (!agentData.agentService || agentData.agentService === "Select") {
      newErrors.agentService = 'Service is required.';
    }
    if (!agentData.agentLocation.trim()) {
      newErrors.agentLocation = 'Location is required.';
    }
    setValidationAgentErrors(newErrors);
    return Object.values(newErrors).every(error => !error);
  };

  const validateB2BForm = () => {
    let newErrors = {};
    if (!B2BData.B2BAge) {
      newErrors.B2BAge = 'Age is required.';
    }
    if (!B2BData.B2BGender || B2BData.B2BGender === "Select") {
      newErrors.B2BGender = 'Gender is required.';
    }
    if (!B2BData.B2BService || B2BData.B2BService === "Select") {
      newErrors.B2BService = 'Professional is required.';
    }
    if (!B2BData.B2Blocation.trim()) {
      newErrors.B2Blocation = 'Location is required.';
    }
    setValidationB2BErrors(newErrors);
    return Object.values(newErrors).every(error => !error);
  };

  const validateVASForm = () => {
    let newErrors = {};
    if (!vasData.professional || vasData.professional === "Select") {
      newErrors.professional = 'Professional is required.';
    }
    setValidationVASErrors(newErrors);
    return Object.values(newErrors).every(error => !error);
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

  const updateVASTDropdownValue = (field, value) => {
    setVasData({ ...vasData, [field]: value });
    validateVASField(field, value);
  };

  useEffect(() => {
    const fetchDetails = async () => {
      await getUser();
    };
    fetchDetails();
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
    const files = Array.from(event.target.files);
    const maxFileSize = 40 * 1024 * 1024; // 40MB
    const allowedTypes = [
      'application/pdf', 
      'application/msword', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
      'image/jpeg', 
      'image/png'
    ];
    const newErrors = [];
    const validFiles = [];

    files.forEach((file) => {
      if (file.size > maxFileSize) {
        newErrors.push(`${file.name}: File size exceeds 40MB.`);
      } else if (!allowedTypes.includes(file.type)) {
        newErrors.push(`${file.name}: Invalid file type. Only PDF, DOC, DOCX, JPG, PNG allowed.`);
      } else {
        validFiles.push(file);
      }
    });

    setFileErrors(newErrors);
    if (newErrors.length === 0) {
      setFileErrors([]); // Clear previous errors on success
    }
    setSelectedFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const removeExistingFile = (index) => {
    if (window.confirm('Are you sure you want to remove this file?')) {
      setExistingFiles(prev => prev.filter((_, i) => i !== index));
    }
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

    const newPasswordFields = {
      ...passwordFields,
      [name]: value,
    };

    // If changing newPassword, clear confirm to avoid stale mismatch
    if (name === 'newPassword') {
      newPasswordFields.confirmPassword = '';
    }

    setPasswordFields(newPasswordFields);

    let updatedErrors = { ...validationErrors };

    if (name === 'oldPassword') {
      updatedErrors.oldPassword = '';
    }

    if (name === 'newPassword') {
      if (value.length < 8) {
        updatedErrors.newPassword = 'New password must be at least 8 characters long.';
      } else {
        updatedErrors.newPassword = '';
      }
      // Clear confirm error since confirm is now empty
      updatedErrors.confirmPassword = '';
    }

    if (name === 'confirmPassword') {
      if (!value.trim()) {
        updatedErrors.confirmPassword = 'Confirm password is required.';
      } else if (value !== newPasswordFields.newPassword) {
        updatedErrors.confirmPassword = 'Confirm password does not match the new password.';
      } else {
        updatedErrors.confirmPassword = '';
      }
    }

    setValidationErrors(updatedErrors);
  };

  const handleProfileUpdate = async () => {
    let valid = true;
    let newErrors = { ...errors };

    // Validate Full name - ensure it's not an email
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required.';
      valid = false;
    } else if (/\S+@\S+\.\S+/.test(formData.name)) {
      newErrors.name = 'Full name cannot be an email address.';
      valid = false;
    }

    // Skip mobile number validation since it's disabled and pre-filled from backend
    // Validate Email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
      valid = false;
    }

    setErrors(newErrors);

    if (!valid) return;

    // Validate agent or B2B or VAS fields if applicable (for completeness, though not sent to API)
    if (isAgent && !validateAgentForm()) {
      valid = false;
    }
    if (isB2B && !validateB2BForm()) {
      valid = false;
    }
    if (isVAS && !validateVASForm()) {
      valid = false;
    }

    if (!valid) return;

    const landsUser = JSON.parse(localStorage.getItem('LandsUser'));

    if (landsUser) {
      setIsUpdating(true);
      try {
        const payload = {
          id: formData.id, // Always use main user ID from formData (Registration table)
          fullName: formData.name, // Trim handled in UpdateUser
          email: formData.email,
          phone: formData.mobileNumber,
          type: (landsUser.type || 'User').toLowerCase(), // Normalize to lowercase
          isActive: true,
        };

        // Add image if selected
        if (avatar.file) {
          payload.image = avatar.file;
        }

        // Add new files only if agent or b2b or VAS
        if ((isAgent || isB2B || isVAS) && selectedFiles.length > 0) {
          payload.files = selectedFiles;
        }

        // Add existing files (files to keep) only if agent or b2b or VAS
        if ((isAgent || isB2B || isVAS) && existingFiles.length > 0) {
          payload.existingFiles = existingFiles;
        }

        // Add Agent fields if applicable
        if (isAgent) {
          payload.age = agentData.agentAge;
          payload.gender = agentData.agentGender;
          payload.service = agentData.agentService;
          payload.location = agentData.agentLocation;
        }

        // Add B2B fields if applicable
        if (isB2B) {
          payload.age = B2BData.B2BAge;
          payload.gender = B2BData.B2BGender;
          payload.professional = B2BData.B2BService;
          payload.location = B2BData.B2Blocation;
        }

        // Add VAS fields if applicable
        if (isVAS) {
          payload.professional = vasData.professional;
        }

        console.log('Sending payload:', payload);

        const data = await UpdateUser(payload);

        if (data.success) {
          toast.success("Profile updated successfully");
          
          // Update localStorage with normalized type
          if (data.data) {
            const normalizedType = (data.data.type || landsUser.type || 'user').toLowerCase();
            const updatedUser = {
              ...landsUser,
              type: normalizedType, // Ensure lowercase
              full_name: data.data.full_name || formData.name,
              email: data.data.email || formData.email,
            };
            localStorage.setItem('LandsUser', JSON.stringify(updatedUser));
          }

          // Clear new file selection after successful upload only if agent/b2b/VAS
          if (isAgent || isB2B || isVAS) {
            setSelectedFiles([]);
          }
          
          // Update existing files from response if provided and agent/b2b/VAS
          if ((isAgent || isB2B || isVAS) && data.data?.files) {
            try {
              const files = JSON.parse(data.data.files);
              setExistingFiles(Array.isArray(files) ? files : []);
            } catch {
              const files = typeof data.data.files === 'string' 
                ? data.data.files.split(',') 
                : [];
              setExistingFiles(files);
            }
          }

          // Update image URL (prefer https if available)
          if (data.data?.imageUrl || data.data?.image) {
            const imageSrc = data.data.imageUrl || data.data.image;
            setimgUrl(imageSrc.startsWith('https') ? imageSrc : imageSrc.replace('http://', 'https://'));
            setAvatar({ file: null, preview: null });
          }

          // Refetch user data to ensure UI is synced with backend (fixes remove not reflecting if backend handles it)
          await getUser();
        } else {
          toast.error(data.message || data.error || "Something Went Wrong");
        }
      } catch (err) {
        console.error('Error updating user:', err);
        toast.error(err.message || "Something Went Wrong");
      } finally {
        setIsUpdating(false);
      }
    } else {
      toast.error("User Not Found");
      setTimeout(() => {
        window.location.href = "/";
      }, 4000);
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
            name: (data.user.full_name || '').trim(), // Trim full_name
            mobileNumber: data.user.phone_number,
            email: data.user.email || '',
          });
          // Prefer imageUrl if available, ensure https
          const imageSrc = data.user.imageUrl || data.user.image || "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=";
          setimgUrl(imageSrc.startsWith('https') ? imageSrc : imageSrc.replace('http://', 'https://'));
          
          if (data.user.files) {
            try {
              const files = JSON.parse(data.user.files);
              setExistingFiles(Array.isArray(files) ? files : []);
            } catch {
              const files = typeof data.user.files === 'string' 
                ? data.user.files.split(',') 
                : [];
              setExistingFiles(files);
            }
          }

          // Set agent or B2B or VAS specific flags from user data
          const userType = (data.user.type || '').toLowerCase();
          if (userType === 'agent') {
            setAgent(true);
            setAgentData({
              id: data.user.id,
              agentAge: data.user.age || "",
              agentGender: data.user.gender || "",
              agentService: data.user.service || "",
              agentLocation: data.user.location || "",
            });
          } else if (userType === 'b2b') {
            setIsB2B(true);
            setB2BData({
              id: data.user.id,
              B2BAge: data.user.age || "",
              B2BGender: data.user.gender || "",
              B2BService: data.user.professional || data.user.service || "",
              B2Blocation: data.user.location || "",
            });
          } else if (userType === 'value-added-services') {
            setIsVAS(true);
            setVasData({
              professional: data.user.professional || data.user.service || "",
            });
          }

          // Normalize type in localStorage to lowercase for consistency
          const normalizedType = (data.user.type || landsUser.type || 'user').toLowerCase();
          if (landsUser.type !== normalizedType) {
            const updatedUser = { ...landsUser, type: normalizedType };
            localStorage.setItem('LandsUser', JSON.stringify(updatedUser));
          }
        } else {
          toast.error(data.message || data.error || "Something Went Wrong");
        }
      } catch (err) {
        console.error('Error fetching user details:', err);
      }
    } else {
      toast.error("User Not Found");
      setTimeout(() => {
        window.location.href = "/";
      }, 4000);
    }
  };

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

    if (!passwordFields.confirmPassword.trim()) {
      updatedErrors.confirmPassword = 'Confirm password is required.';
      isValid = false;
    } else if (passwordFields.newPassword !== passwordFields.confirmPassword) {
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
          };

          console.log('Password update payload:', postData);

          const data = await UpdateUserPassword(postData);
          if (data.success) {
            // Clear fields immediately
            setPasswordFields({
              oldPassword: '',
              newPassword: '',
              confirmPassword: '',
            });
            // Reset visibility
            setShowOldPassword(false);
            setShowNewPassword(false);
            setShowConfirmPassword(false);
            // Clear validation errors
            setValidationErrors({
              oldPassword: '',
              newPassword: '',
              confirmPassword: '',
            });
            toast.success("Password Updated Successfully. Please use your new password for future logins.");
          } else {
            toast.error(data.message || data.error || "Something Went Wrong");
          }
        } catch (err) {
          console.error('Error updating password:', err);
          toast.error("Error updating password");
        }
      } else {
        toast.error("User Not Found");
        setTimeout(() => {
          window.location.href = "/";
        }, 4000);
      }
    }
  };

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
        .tf-btn.disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        `}
      </style>
      <div className="main-content-inner wrap-dashboard-content-2">
        <div className="d-flex justify-content-between">
          <div className="button-show-hide custom-header-text">
            <ArrowCircleLeftIcon sx={{ fontSize: '40px' }} />
            <span className="body-1">Menu</span>
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
                <p>Image Size 100x100, format JPEG</p>
              </div>
            </div>
          </div>
          {(isAgent || isB2B || isVAS) && (
            <div className="box">
              <h5 className="title">Upload Additional Files</h5>
              <div className="content uploadfile">
                <p>Upload additional documents (PDF, DOC, DOCX, JPG, PNG)</p>
                <div className="box-ip">
                  <input
                    type="file"
                    className="ip-file"
                    accept=".pdf,.doc,.docx,.jpg,.png"
                    multiple
                    onChange={handleFileUpload}
                  />
                </div>
                <p>Max file size: 40MB per file</p>
                {fileErrors.length > 0 && (
                  <div className="error-message">
                    {fileErrors.map((error, index) => (
                      <p key={index}>{error}</p>
                    ))}
                  </div>
                )}
                {existingFiles.length > 0 && (
                  <div className="selected-files" style={{ marginTop: '15px' }}>
                    <h6>Existing Files:</h6>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {existingFiles.map((file, index) => (
                        <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', padding: '8px', background: '#f5f5f5', borderRadius: '4px' }}>
                          <span style={{ fontSize: '14px' }}>
                            {typeof file === 'string' ? file.split('/').pop() : file.name || file}
                          </span>
                          <button 
                            onClick={() => removeExistingFile(index)} 
                            style={{ 
                              marginLeft: '10px', 
                              color: 'white',
                              background: '#dc3545', 
                              border: 'none', 
                              padding: '4px 12px',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontSize: '12px'
                            }}
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {selectedFiles.length > 0 && (
                  <div className="selected-files" style={{ marginTop: '15px' }}>
                    <h6>New Files to Upload:</h6>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {selectedFiles.map((file, index) => (
                        <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', padding: '8px', background: '#e8f5e9', borderRadius: '4px' }}>
                          <span style={{ fontSize: '14px' }}>
                            {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                          </span>
                          <button 
                            onClick={() => removeFile(index)} 
                            style={{ 
                              marginLeft: '10px', 
                              color: 'white',
                              background: '#dc3545', 
                              border: 'none', 
                              padding: '4px 12px',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontSize: '12px'
                            }}
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
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
                className="form-control style-1"
              />
            </div>
          </div>
          <div className="box grid-2 gap-30">
            <div className="box-fieldset">
              <label htmlFor="email">
                Email address:<span>*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-control style-1"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            {isAgent && (
              <div className="box-fieldset">
                <label htmlFor="agentAge">
                  Age:<span>*</span>
                </label>
                <input
                  type="number"
                  name="agentAge"
                  min="18"
                  value={agentData.agentAge}
                  onChange={updateAgentField}
                  className="form-control style-1"
                />
                {validationAgentErrors.agentAge && (
                  <span className="error-message">{validationAgentErrors.agentAge}</span>
                )}
              </div>
            )}
            {isB2B && (
              <div className="box-fieldset">
                <label htmlFor="B2BAge">
                  Age:<span>*</span>
                </label>
                <input
                  type="number"
                  name="B2BAge"
                  min="18"
                  value={B2BData.B2BAge}
                  onChange={updateB2BField}
                  className="form-control style-1"
                />
                {validationB2BErrors.B2BAge && (
                  <span className="error-message">{validationB2BErrors.B2BAge}</span>
                )}
              </div>
            )}
          </div>
          {isB2B && (
            <div className="box grid-2 gap-30">
              <div className="box-fieldset">
                <label htmlFor="B2BGender">
                  Gender:<span>*</span>
                </label>
                <DropdownSelect
                  options={["Select", "Male", "Female", "Other"]}
                  defaultOption={B2BData.B2BGender || "Select"}
                  onChange={(value) => updateB2BDropdownValue("B2BGender", value)}
                />
                {validationB2BErrors.B2BGender && (
                  <span className="error-message">{validationB2BErrors.B2BGender}</span>
                )}
              </div>

              <div className="box-fieldset">
                <label htmlFor="B2BService">
                  Professional:<span>*</span>
                </label>
                <DropdownSelect
                  options={["Select", ...AllServices.map(service => service.name)]}
                  defaultOption={B2BData.B2BService || "Select"}
                  onChange={(value) => updateB2BDropdownValue("B2BService", value)}
                />
                {validationB2BErrors.B2BService && (
                  <span className="error-message">{validationB2BErrors.B2BService}</span>
                )}
              </div>
              <div className="box-fieldset">
                <label htmlFor="B2Blocation">
                  City/Location:<span>*</span>
                </label>
                <input
                  type="text"
                  name="B2Blocation"
                  value={B2BData.B2Blocation}
                  onChange={updateB2BField}
                  className="form-control style-1"
                />
                {validationB2BErrors.B2Blocation && (
                  <span className="error-message">{validationB2BErrors.B2Blocation}</span>
                )}
              </div>
            </div>
          )}
          {isAgent && (
            <div className="box grid-2 gap-30">
              <div className="box-fieldset">
                <label htmlFor="agentGender">
                  Gender:<span>*</span>
                </label>
                <DropdownSelect
                  options={["Select", "Male", "Female", "Other"]}
                  defaultOption={agentData.agentGender || "Select"}
                  onChange={(value) => updateDropdownValue("agentGender", value)}
                />
                {validationAgentErrors.agentGender && (
                  <span className="error-message">{validationAgentErrors.agentGender}</span>
                )}
              </div>

              <div className="box-fieldset">
                <label htmlFor="agentService">
                  Service:<span>*</span>
                </label>
                <DropdownSelect
                  options={[
                    "Select",
                    "RealEstate Broker",
                    "RealEstate Promoter",
                    "RealEstate Marketer",
                  ]}
                  defaultOption={agentData.agentService || "Select"}
                  onChange={(value) => updateDropdownValue("agentService", value)}
                />
                {validationAgentErrors.agentService && (
                  <span className="error-message">{validationAgentErrors.agentService}</span>
                )}
              </div>
              <div className="box-fieldset">
                <label htmlFor="agentLocation">
                  City/Location:<span>*</span>
                </label>
                <input
                  type="text"
                  name="agentLocation"
                  value={agentData.agentLocation}
                  onChange={updateAgentField}
                  className="form-control style-1"
                />
                {validationAgentErrors.agentLocation && (
                  <span className="error-message">{validationAgentErrors.agentLocation}</span>
                )}
              </div>
            </div>
          )}
          {isVAS && (
            <div className="box grid-2 gap-30">
              <div className="box-fieldset">
                <label htmlFor="vasProfessional">
                  Professional:<span>*</span>
                </label>
                <DropdownSelect
                  options={["Select", ...AllServices.map(service => service.name)]}
                  defaultOption={vasData.professional || "Select"}
                  onChange={(value) => updateVASTDropdownValue("professional", value)}
                />
                {validationVASErrors.professional && (
                  <span className="error-message">{validationVASErrors.professional}</span>
                )}
              </div>
            </div>
          )}
          <div className="box">
            <a 
              className={`tf-btn primary ${isUpdating ? 'disabled' : ''}`}
              onClick={!isUpdating ? handleProfileUpdate : undefined}
              style={isUpdating ? { opacity: 0.6, cursor: 'not-allowed' } : {}}
            >
              {isUpdating ? 'Updating...' : 'Save & Update'}
            </a>
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
          <div className="box">
            <a className="tf-btn primary" onClick={submitPasswordUpdate}>
              Update Password
            </a>
          </div>
        </div>
      </div>
      <div className="footer-dashboard">
        <p>Copyright © 2025 i5property stars</p>
      </div>
    </div>
  );
}