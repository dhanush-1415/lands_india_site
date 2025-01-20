import React, { useState, useEffect } from "react";
import { UpdateUser, getUserDetails, UpdateUserPassword, createAgent, getAgentDetails, createB2B, updateB2B, updateAgent, getB2BDetails } from "@/apiCalls";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import DropdownSelect from "../common/DropdownSelect";

export default function MyProfile() {

  const [avatar, setAvatar] = useState({
    file: null,
    preview: null,
  });

  const [imgUrl, setimgUrl] = useState("");

  const [userData, setUserData] = useState();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isAgent, setAgent] = useState(false);

  const [isB2B, setIsB2B] = useState(false);

  const [isNew, setIsNew] = useState(false);

  const [isNewB2B, setIsNewB2B] = useState(false);

  console.log(isAgent, isB2B, isNew, isNewB2B)

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


  useEffect(() => {
    const fetchAgentDetails = async () => {
      const landsUser = JSON.parse(localStorage.getItem('LandsUser'));

      if (landsUser?.type === 'Agent') {
        setAgent(true);

        try {
          const data = await getAgentDetails(landsUser.phoneNumber);
          if (data.success) {
            if (data?.data?.length) {
              setIsNew(false);
              setAgentData({
                id: data.data[0].id,
                agentAge: data.data[0].age,
                agentGender: data.data[0].gender,
                agentService: data.data[0].service,
                agentLocation: data.data[0].location,
              })
              setimgUrl(data.data[0].image)
            } else {
              setIsNew(true)
            }
          } else {
            toast.error(data.message || data.error || "Something Went Wrong");
          }
        } catch (error) {
          toast.error("Error fetching agent details");
        }
      }

      if (landsUser?.type === 'B2B') {
        setIsB2B(true);

        try {
          const data = await getB2BDetails(landsUser.phoneNumber);
          if (data.success) {
            if (data.data.length) {
              setIsNewB2B(false);
              setB2BData({
                id: data.data[0].id,
                B2BAge: data.data[0].age,
                B2BGender: data.data[0].gender,
                B2BService: data.data[0].professional,
                B2Blocation: data.data[0].location,
              })
              setimgUrl(data.data[0].image)
            } else {
              setIsNewB2B(true)
            }
          } else {
            toast.error(data.message || data.error || "Something Went Wrong");
          }
        } catch (error) {
          toast.error(error, "Error fetching B2B details");
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
        preview: imageUrl, // Set the preview URL
      });
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

    // Reset error for the field when the user starts typing
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

  // Handle input changes and validate in real-time
  const updatePasswordField = (e) => {
    const { name, value } = e.target;

    // Update the corresponding password field value
    setPasswordFields({
      ...passwordFields,
      [name]: value,
    });

    // Real-time validation for new password and confirm password
    let updatedErrors = { ...validationErrors };

    if (name === 'newPassword' || name === 'confirmPassword') {
      // Validate new password (at least 8 characters)
      if (name === 'newPassword' && value.length < 8) {
        updatedErrors.newPassword = 'New password must be at least 8 characters long.';
      } else if (name === 'newPassword') {
        updatedErrors.newPassword = ''; // Clear error if valid
      }

      // Validate confirm password (should match new password)
      if (name === 'confirmPassword' && value !== passwordFields.newPassword) {
        updatedErrors.confirmPassword = 'Confirm password does not match the new password.';
      } else if (name === 'confirmPassword') {
        updatedErrors.confirmPassword = ''; // Clear error if valid
      }
    }

    // Reset error for old password if the user starts typing
    if (name === 'oldPassword') {
      updatedErrors.oldPassword = '';
    }

    setValidationErrors(updatedErrors);
  };


  const [validationAgentErrors, setValidationAgentErrors] = useState({});

  const updateAgentField = (e) => {
    const { name, value } = e.target;
    setAgentData({ ...agentData, [name]: value });
    validateAgentField(name, value);
  };

  const updateB2BField = (e) => {
    const { name, value } = e.target;
    setB2BData({ ...B2BData, [name]: value });
    // validateAgentField(name, value);
  };

  const updateDropdownValue = (field, value) => {
    setAgentData({ ...agentData, [field]: value });
    validateAgentField(field, value);
  };


  const updateB2BDropdownValue = (field, value) => {
    setB2BData({ ...B2BData, [field]: value });
    // validateAgentField(field, value);
  };
  const validateAgentField = (field, value) => {
    let error = "";
    if (!value || value === "Select") {
      error = `${field} is required`;
    }
    setValidationAgentErrors({ ...validationAgentErrors, [field]: error });
  };

  // const handleProfileUpdate = async () => {
  //   const validateForm = () => {
  //     let valid = true;
  //     const newErrors = {};

  //     if (!formData.name.trim()) {
  //       newErrors.name = "Full name is required.";
  //       valid = false;
  //     }

  //     if (!/^\d{10}$/.test(formData.mobileNumber)) {
  //       newErrors.mobileNumber = "Mobile number must be 10 digits.";
  //       valid = false;
  //     }

  //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //     if (!emailRegex.test(formData.email)) {
  //       newErrors.email = "Please enter a valid email address.";
  //       valid = false;
  //     }

  //     setErrors(newErrors);
  //     return valid;
  //   };

  //   if (!validateForm()) return;

  //   const landsUser = JSON.parse(localStorage.getItem("LandsUser"));

  //   if (!landsUser) {
  //     toast.error("Seller Not Found");
  //     setTimeout(() => (window.location.href = "/"), 4000);
  //     return;
  //   }

  //   const createPayload = () => {
  //     const basePayload = {
  //       ...(avatar?.file ? { image: avatar } : {}),
  //       id: formData.id,
  //       fullName: formData.name,
  //       email: formData.email,
  //       phone: formData.mobileNumber,
  //     };

  //     if (isNew) {
  //       return {
  //         ...basePayload,
  //         gender: agentData.agentGender,
  //         age: agentData.agentAge,
  //         service: agentData.agentService,
  //       };
  //     }

  //     if (isNewB2B) {
  //       return {
  //         ...basePayload,
  //         gender: B2BData.B2BGender,
  //         age: B2BData.B2BAge,
  //         professional: B2BData.B2BService,
  //       };
  //     }

  //     return basePayload;
  //   };

  //   const payload = createPayload();

  //   console.log(payload , "pppppppppppppppppppppppppppppp")

  //   try {
  //     let data;
  //     if (isAgent) {
  //       data = isNew ? await createAgent(payload) : await updateAgent(payload);
  //     } else if (isB2B) {
  //       data = isNewB2B ? await createB2B(payload) : await updateAgent(payload);
  //     } else {
  //       data = await UpdateUser(payload);
  //     }

  //     if (data.success) {
  //       console.log(data);
  //       toast.success("User updated successfully");
  //     } else {
  //       throw new Error(data.message || data.error || "Something Went Wrong");
  //     }
  //   } catch (err) {
  //     console.error("Error updating user:", err);
  //     toast.error(err.message || "Something Went Wrong");
  //   }
  // };


  const handleProfileUpdate = async () => {
    let valid = true;
    let newErrors = { ...errors };

    // Validate Full name
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required.';
      valid = false;
    }

    // Validate Mobile Number (10 digits)
    if (!/^\d{10}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Mobile number must be 10 digits.';
      valid = false;
    }

    // Validate Email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
      valid = false;
    }

    // Update the errors state
    setErrors(newErrors);

    // Proceed with form submission if valid
    if (valid) {
      const landsUser = JSON.parse(localStorage.getItem('LandsUser'));

      if (landsUser) {
        try {
          // const payload = {
          //   ...(avatar?.file ? { image: avatar } : {}),
          //   id: formData.id,
          //   fullName: formData.name,
          //   email: formData.email,
          //   phone: formData.mobileNumber,
          // };

          // const payload2 = {
          //   ...(avatar?.file ? { image: avatar } : {}),
          //   ...(!isAgent ? { id: agentData.id } : {}),
          //   ...(!isNewB2B ? { id: B2BData.id } : {}),
          //   fullName: formData.name,
          //   email: formData.email,
          //   phone: formData.mobileNumber,
          //   ...(isNew ? {
          //     gender: agentData.agentGender,
          //     age: agentData.agentAge,
          //     service: agentData.agentService,
          //   } : {}),
          //   ...(isNewB2B ? {
          //     gender: B2BData.B2BGender,
          //     age: B2BData.B2BAge,
          //     professional: B2BData.B2BService,
          //   } : {}),
          // };

          const createPayload = () => {
            const basePayload = {
              ...(avatar?.file ? { image: avatar } : {}),
              fullName: formData.name,
              email: formData.email,
              phone: formData.mobileNumber,
            };

            if (isNew || isNewB2B) {
              if (isNew) {
                return {
                  ...basePayload,
                  gender: agentData.agentGender,
                  age: agentData.agentAge,
                  service: agentData.agentService,
                  service: agentData.agentService,
                  location: agentData.agentLocation,
                };
              }

              if (isNewB2B) {
                return {
                  ...basePayload,
                  gender: B2BData.B2BGender,
                  age: B2BData.B2BAge,
                  professional: B2BData.B2BService,
                  professional: B2BData.B2BService,
                  location: B2BData.B2Blocation,
                };
              }
            }

            if (isAgent || isB2B) {
              // Include respective ids for isAgent or isB2B
              if (isAgent) {
                return {
                  ...basePayload,
                  id: agentData.id,
                  gender: agentData.agentGender,
                  age: agentData.agentAge,
                  service: agentData.agentService,
                  location: agentData.agentLocation,
                };
              }

              if (isB2B) {
                return {
                  ...basePayload,
                  id: B2BData.id,
                  gender: B2BData.B2BGender,
                  age: B2BData.B2BAge,
                  professional: B2BData.B2BService,
                  location: B2BData.B2Blocation,
                };
              }
            }

            return {
              ...basePayload,
              id: formData.id,
            };
          };


          const payload = createPayload();


          if (isAgent === true) {

            if (isNew) {
              const data = await createAgent(payload);
              if (data.success) {
                console.log(data);
                toast.success("User updated successfully");
              } else {
                toast.error(data.message || data.error || "Something Went Wrong");
              }
            } else {
              const data = await updateAgent(payload);
              if (data.success) {
                console.log(data);
                toast.success("User updated successfully");
              } else {
                toast.error(data.message || data.error || "Something Went Wrong");
              }
            }
          } else {

            if (isB2B) {
              if (isNewB2B) {
                const data = await createB2B(payload);
                if (data.success) {
                  console.log(data);
                  toast.success("User updated successfully");
                } else {
                  toast.error(data.message || data.error || "Something Went Wrong");
                }
              } else {
                const data = await updateB2B(payload);
                if (data.success) {
                  console.log(data);
                  toast.success("User updated successfully");
                } else {
                  toast.error(data.message || data.error || "Something Went Wrong");
                }
              }
            } else {
              const data = await UpdateUser(payload);

              if (data.success) {
                console.log(data);
                toast.success("User updated successfully");
              } else {
                toast.error(data.message || data.error || "Something Went Wrong");
              }
            }
          }

        } catch (err) {
          console.error('Error updating user:', err);
        }

      } else {
        toast.error("Seller Not Found")
        setTimeout(() => {
          window.location.href = "/"
        }, 4000);
      }
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
        console.error('Error fetching categories:', err);
      }
    } else {
      toast.error("Seller Not Found")
      setTimeout(() => {
        window.location.href = "/"
      }, 4000);
    }

  }

  useEffect(() => {
    getUser();
  }, [])



  // Handle password update submission
  const submitPasswordUpdate = async () => {
    let isValid = true;
    let updatedErrors = { ...validationErrors };

    // Validate Old Password
    if (!passwordFields.oldPassword.trim()) {
      updatedErrors.oldPassword = 'Old password is required.';
      isValid = false;
    }

    // Validate New Password (at least 8 characters)
    if (passwordFields.newPassword.length < 8) {
      updatedErrors.newPassword = 'New password must be at least 8 characters long.';
      isValid = false;
    }

    // Validate Confirm Password (should match New Password)
    if (passwordFields.newPassword !== passwordFields.confirmPassword) {
      updatedErrors.confirmPassword = 'Confirm password does not match the new password.';
      isValid = false;
    }

    setValidationErrors(updatedErrors);

    // Proceed with password update if valid
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
          console.error('Error fetching categories:', err);
        }
      } else {
        toast.error("Seller Not Found")
        setTimeout(() => {
          window.location.href = "/"
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
        @media (max-width: 799px) {
          .custom-desktop-class {
            display: none !important;
          }
          .custom-mobile-class {
            display: flex !important;
          }
        }`}
      </style>
      <div className="main-content-inner wrap-dashboard-content-2">
        <div className="button-show-hide show-mb">
          <span className="body-1">Show Menu</span>
        </div>
        <div className="widget-box-2">
          {/* <div className="box">
            <h5 className="title">Account Settings</h5>
            <div className="box-agent-account">
              <h6>Agent Account</h6>
              <p className="note">
                Your current account type is set to agent, if you want to remove
                your agent account, and return to normal account, you must click
                the button below
              </p>
              <a href="#" className="tf-btn primary">
                Remove Agent Account
              </a>
            </div>
          </div> */}
          <div className="box">
            <h5 className="title">Avatar</h5>
            <div className="box-agent-avt">
              <div className="avatar">
                <img
                  alt="avatar"
                  loading="lazy"
                  width={128}
                  height={128}
                  src={avatar.preview || imgUrl || "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="} // Fallback to default avatar if no image is selected
                />
              </div>
              <div className="content uploadfile">
                <p>Upload a new avatar</p>
                <div className="box-ip">
                  <input
                    type="file"
                    className="ip-file"
                    accept="image/*"
                    onChange={handleImageUpload} // Handle the file selection
                  />
                </div>
                <p>JPEG 100x100</p>
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
                {validationErrors.agentAge && (
                  <span className="error-message">{validationErrors.agentAge}</span>
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
                {validationErrors.B2BAge && (
                  <span className="error-message">{validationErrors.B2BAge}</span>
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
                {validationErrors.B2BGender && (
                  <span className="error-message">{validationErrors.B2BGender}</span>
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

                {validationErrors.B2BService && (
                  <span className="error-message">{validationErrors.B2BService}</span>
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
                {validationErrors.B2Blocation && (
                  <span className="error-message">{validationErrors.B2Blocation}</span>
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
                {validationErrors.agentGender && (
                  <span className="error-message">{validationErrors.agentGender}</span>
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
                {validationErrors.agentService && (
                  <span className="error-message">{validationErrors.agentService}</span>
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
                {validationErrors.agentLocation && (
                  <span className="error-message">{validationErrors.agentLocation}</span>
                )}
              </div>
            </div>
          )}
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
                <span className="show-pass2" onClick={() => togglePasswordVisibility('newPassword')}                >
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
                <span className="show-pass3" onClick={() => togglePasswordVisibility('confirmPassword')} >
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
