// const baseUrl = "http://luxcycs.com:4400"

const baseUrl = "https://api.i5propertystars.com"

export const verifyMobileOtp = async (data) => {
  const url = `${baseUrl}/registration`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, options);
    // Always attempt to parse JSON body and return it so callers can show server messages
    const text = await response.text();
    try {
      const json = JSON.parse(text || '{}');
      return json;
    } catch (e) {
      return { success: response.ok, message: text };
    }
  } catch (error) {
    console.error('Error Verifying OTP:', error);
    // Return a consistent error shape for callers to toast
    return { success: false, message: error.message || 'Network error' };
  }
};


export const RegisterUser = async (data) => {
  const url = `${baseUrl}/registration/new-user`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json().catch(() => null);

    // If JSON parsed successfully
    if (result) {
      return {
        success: result.success ?? response.ok,
        message: result.message || "Registration completed",
        user: result.user || null,
      };
    }

    // If response isn't JSON
    const text = await response.text();
    return {
      success: response.ok,
      message: text || "Unknown response from server",
      user: null,
    };

  } catch (error) {
    console.error("Registration Failed:", error);
    return {
      success: false,
      message: error.message || "Network error",
      user: null,
    };
  }
};




export const getUserDetails = async (id) => {

  const url = `${baseUrl}/registration/user/${id}`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};


export const getAllLocation = async () => {

  const url = `${baseUrl}/property/get-properties-location`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const searchCity = async (query = "a") => {
  const url = `${baseUrl}/api/location/search-city?q=${encodeURIComponent(query)}`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Failed to fetch city data');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching city data:', error);
    throw error;
  }
};


export const UpdateUser = async (data) => {
  const url = `${baseUrl}/registration/update-user`;
  const formData = new FormData();
  
  formData.append('id', data.id);
  formData.append('phone', data.phone);
  formData.append('fullName', data.fullName);
  formData.append('email', data.email);
  formData.append('type', data.type);
  formData.append('isActive', data.isActive ? 1 : 0);

  // Only append password if updating
  if (data.password && data.password.trim() !== '') {
    formData.append('password', data.password);
  }

  // ✅ Single Image Upload
  if (data.image instanceof File) {
    formData.append('image', data.image);
  }

  // ✅ Handle existing files (send as comma-separated string)
  if (data.existingFiles && data.existingFiles.length > 0) {
    formData.append('updatedFiles', data.existingFiles.join(','));
  }

  // ✅ Multiple New Files Upload
  if (data.files && data.files.length > 0) {
    data.files.forEach((file) => {
      if (file instanceof File) {
        formData.append('files', file);
      }
    });
  }

  try {
    const response = await fetch(url, {
      method: "PUT",
      body: formData,
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Update User Failed:", error);
    throw error;
  }
};



// ["https://api.i5propertystars.com/uploads/1761448377219-portfolio image-1.jpeg","https://api.i5propertystars.com/uploads/1761448377219-portfolio image-2.jpeg","https://api.i5propertystars.com/uploads/1761448377219-portfolio image-3.jpeg" ]
// ["https://api.i5propertystars.com/uploads/1761448377219-portfolio image-2.jpeg","https://api.i5propertystars.com/uploads/1761448377219-portfolio image-3.jpeg" ]

export const UpdateUserPassword = async (data) => {
  const url = `${baseUrl}/registration/reset-password`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, options);
    const text = await response.text();
    try {
      const json = JSON.parse(text || '{}');
      return json;
    } catch (e) {
      return { success: response.ok, message: text };
    }
  } catch (error) {
    console.error('Registration Failed:', error);
    return { success: false, message: error.message || 'Network error' };
  }
};

export const UserLogin = async (data) => {
  const url = `${baseUrl}/login`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, options);
    const text = await response.text();
    try {
      const json = JSON.parse(text || '{}');
      return json;
    } catch (e) {
      return { success: response.ok, message: text };
    }
  } catch (error) {
    console.error('Login Failed:', error);
    return { success: false, message: error.message || 'Network error' };
  }
};

// Send OTP for login using email and name (name is optional on some backends)
export const loginSendOtp = async (email, name = '') => {
  const url = `${baseUrl}/login/send-otp`;
  const payload = { email, name };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };

  try {
    const response = await fetch(url, options);
    const text = await response.text();
    try {
      const json = JSON.parse(text || '{}');
      return json;
    } catch (e) {
      return { success: response.ok, message: text };
    }
  } catch (error) {
    console.error('Send OTP Failed:', error);
    return { success: false, message: error.message || 'Network error' };
  }
};

// Verify OTP for login using email and otp
export const loginVerifyOtp = async (email, otp) => {
  const url = `${baseUrl}/login/verify-otp`;
  const payload = { email, otp };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };

  try {
    const response = await fetch(url, options);
    const text = await response.text();
    try {
      const json = JSON.parse(text || '{}');
      return json;
    } catch (e) {
      return { success: response.ok, message: text };
    }
  } catch (error) {
    console.error('Verify OTP Failed:', error);
    return { success: false, message: error.message || 'Network error' };
  }
};

// Reset password using token and new password
export const loginResetPassword = async (token, newPassword) => {
  const url = `${baseUrl}/login/reset-password`;
  const payload = { token, newPassword };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };

  try {
    const response = await fetch(url, options);
    const text = await response.text();
    try {
      const json = JSON.parse(text || '{}');
      return json;
    } catch (e) {
      return { success: response.ok, message: text };
    }
  } catch (error) {
    console.error('Reset Password Failed:', error);
    return { success: false, message: error.message || 'Network error' };
  }
};

export const getCategories = async () => {

  const url = `${baseUrl}/dashboard/menus`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};


export const getInputs = async (id) => {

  const url = `${baseUrl}/inputs/get-inputs/${id}`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const getProperties = async (data) => {

  let url = `${baseUrl}/property/get-properties?`;

  const status = 'Verified';

  const searchParArr = [];

  if (data.page) {
    searchParArr.push(`page=${data.page}`);
  }
  if (status) {
    searchParArr.push(`status=${status}`);
  }
  if (data.location) {
    searchParArr.push(`city=${data.location}`);
  }
  if (data.minPrice) {
    searchParArr.push(`minPrice=${data.minPrice}`);
  }
  if (data.maxPrice) {
    searchParArr.push(`maxPrice=${data.maxPrice}`);
  }
  if (data.keyword) {
    searchParArr.push(`search=${data.keyword}`);
  }
  if (data.category) {
    searchParArr.push(`menu=${data.category}`);
  }
  if (data.subCategory) {
    searchParArr.push(`submenu=${data.subCategory}`);
  }

  url += searchParArr.join('&');

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const createNewPropertyq = async (data) => {
  const url = `${baseUrl}/property/add-property`;

  const formData = new FormData();

  // Append sellerId and subMenuId
  formData.append('sellerId', data.propertiesPost.sellerId);
  formData.append('subMenuId', data.propertiesPost.subMenuId);


  if (data.PropertiesInput?.length > 0) {
    data.PropertiesInput.forEach(item => {
      if (item.input_name === 'location') {
        formData.append('location', item.input_value);
      }
    });
  }

  if (data.PropertiesInput?.length > 0) {
    data.PropertiesInput.forEach(item => {
      if (item.input_name === 'price') {
        formData.append('price', item.input_value);
      }
    });
  }

  if (data.PropertiesInput?.length > 0) {
    data.PropertiesInput.forEach((item, index) => {
      formData.append(`PropertyInput[${index}][inputId]`, item.input_id);
      formData.append(`PropertyInput[${index}][value]`, item.input_value);
    });
  }

  // Append Images
  if (data?.propertiesPost?.images?.length > 0) {
    data.propertiesPost.images.forEach((image) => {
      if (image.file) {
        formData.append(`files`, image.file);
      }
    });
  }

  // Fetch options
  const options = {
    method: 'PUT',
    body: formData,
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorText = await response.text(); // Capture response error message
      throw new Error(`Failed to Register: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error during property creation:', error);
    throw error;
  }
};

export const createNewProperty = async (data) => {
  const url = `${baseUrl}/property/add-property`;

  const formData = new FormData();

  formData.append('sellerId', data.propertiesPost.sellerId);
  formData.append('price', data.propertiesPost.price);
  formData.append('city', data.propertiesPost.location);
  formData.append('subMenuId', data.propertiesPost.subMenuId);
  formData.append('mainMenuId',data.propertiesPost.mainMenuId)
  formData.append('PropertyInput', JSON.stringify(data.PropertiesInput));
  formData.append('status', "Pending");


  // if (data.PropertiesInput?.length > 0) {
  //   data.PropertiesInput.forEach(item => {
  //     if (item.input_name === 'City') {
  //       form.append('city', item.input_value); // Assuming form is a FormData or similar structure
  //     }
  //   });
  // }

  if (data.PropertiesInput?.length > 0) {
    data.PropertiesInput.forEach(item => {
      if (item.input_name === 'State') {
        formData.append('state', item.input_value);
      }
    });
  }

  if (data.PropertiesInput?.length > 0) {
    data.PropertiesInput.forEach(item => {
      if (item.input_name === 'Area') {
        formData.append('area', item.input_value);
      }
    });
  }
  if (data.PropertiesInput?.length > 0) {
    data.PropertiesInput.forEach(item => {
      if (item.input_name === 'Country') {
        formData.append('country', 'India');
      }
    });
  }
  // if (data.PropertiesInput?.length > 0) {
  //   data.PropertiesInput.forEach((item, index) => {
  //     formData.append(`PropertyInput[${index}][inputId]`, item.input_id);
  //     formData.append(`PropertyInput[${index}][value]`, item.input_value);
  //   });
  // }

  // // Append uploaded files
  // if (data.files?.length > 0) {
  //   data.files.forEach((file) => {
  //     if (file instanceof File) {
  //       formData.append('files', file);
  //     }
  //   });
  // }

  if (data?.propertiesPost?.images?.length > 0) {
    data.propertiesPost.images.forEach((image) => {
      if (image.file) {
        formData.append(`files`, image.file);
      }
    });
  }

  // Fetch options
  const options = {
    method: 'PUT',
    body: formData,
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorText = await response.text(); // Capture response error message
      throw new Error(`Failed to create property: ${errorText}`);
    }

    return await response.json(); // Parse and return the JSON response
  } catch (error) {
    console.error('Error during property creation:', error);
    throw error;
  }
};


export const getAgents = async (filter) => {

  let url = `${baseUrl}/agent?`;

  const searchParArr = [];

  const verified = 1;

  if (verified) {
    searchParArr.push(`isVerifyed=${verified}`);
  }
  if (filter.page) {
    searchParArr.push(`page=${filter.page}`);
  }
  if (filter.service) {
    searchParArr.push(`service=${filter.service}`);
  }
  if (filter.location) {
    searchParArr.push(`location=${filter.location}`);
  }

  url += searchParArr.join('&');


  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};


export const getEventsList = async (flag , currentPage) => {

  const url = `${baseUrl}/event/get-event?isUpcoming=${flag}&page=${currentPage}`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const getLegalAdvisersList = async () => {

  const url = `${baseUrl}/legal-adviser`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};



export const getSellerProperties = async (id, page) => {

  const url = `${baseUrl}/property/${id}?page=${page}`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};


export const SubmitEnquiry = async (data) => {
  const url = `${baseUrl}/query/create-query`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Failed to Register');
    }
    return response.json();
  } catch (error) {
    console.error('Registration Failed:', error);
    throw error;
  }
};


export const getBlogsList = async (currentPage) => {

  const url = `${baseUrl}/blogs?page=${currentPage}`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};


export const getFranchiseList = async (currentPage) => {

  const url = `${baseUrl}/franchaise?page=${currentPage}&isVerifyed=1`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};


export const getPremiumList = async () => {

  const url = `${baseUrl}/property/get-premium-properties?page=1&pageSize=10`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};


export const updateWishlist = async (data) => {
  const url = `${baseUrl}/registration/wishlist`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Failed to Register');
    }
    return response.json();
  } catch (error) {
    console.error('Registration Failed:', error);
    throw error;
  }
};



// ==================== GET AGENT DETAILS ====================
export const getAgentDetails = async (phone) => {
  if (!phone) {
    console.error('❌ Phone number is required');
    return { success: false, message: 'Phone number is required', data: [] };
  }

  // ✅ CORRECT ENDPOINT - matches Postman working request
  const url = `${baseUrl}/agent?phone=${phone}`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Failed to fetch agent details');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching agent details:', error);
    return { success: false, message: error.message, data: [] };
  }
};

// ==================== GET B2B DETAILS ====================
export const getB2BDetails = async (phone) => {
  if (!phone) {
    console.error('❌ Phone number is required');
    return { success: false, message: 'Phone number is required', data: [] };
  }

  // ✅ CORRECT ENDPOINT - matches API structure
  const url = `${baseUrl}/value-added-service?phone=${phone}`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Failed to fetch B2B details');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching B2B details:', error);
    return { success: false, message: error.message, data: [] };
  }
};


export const getUserWishList = async (id) => {

  const url = `${baseUrl}/registration/get-user-wishlist/${id}`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const getWishListProperties = async (ids , page) => {

  const propertyIds = ids.join(',');

  const url = `${baseUrl}/property/get-properties?propertyId=${propertyIds}&page=${page}`;


  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};


export const getValueAddedServiceList = async (filter) => {

  let url = `${baseUrl}/registration/get-user-by-type/${filter.type}?`;

  const searchParArr = [];

  const verified = 1; // Always Verified

  if (verified) {
    searchParArr.push(`isVerified=${verified}`);
  }

  if (filter.page) {
    searchParArr.push(`page=${filter.page}`);
  }
  if (filter.service) {
    searchParArr.push(`service=${filter.service}`);
  }
  if (filter.location) {
    searchParArr.push(`location=${filter.location}`);
  }

  url += searchParArr.join("&");

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};


export const getUserQueries = async (id , page) => {

  const url = `${baseUrl}/query/list/${id}?isProperty=1&page=${page}`;


  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const getReviews = async () => {

  const url = `${baseUrl}/testimonial?page=1`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const updatePropertyStatus = async (data) => {
  const url = `${baseUrl}/property/update-status`;
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Failed to Register');
    }
    return response.json();
  } catch (error) {
    console.error('Registration Failed:', error);
    throw error;
  }
};

export const deleteProperty = async (id) => {

  const url = `${baseUrl}/property/delete-property/${id}`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Failed to Register');
    }
    return response.json();
  } catch (error) {
    console.error('Registration Failed:', error);
    throw error;
  }
};

export const getPropertyEdit = async (id) => {

  const url = `${baseUrl}/property/get-properties?propertyId=${id}`;


  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};


export const updateProperty = async (data) => {

  const url = `${baseUrl}/property/update-property`;

  const formData = new FormData();

  console.log("ddddd", data);

  formData.append('properties', JSON.stringify(data.data.properties));
  formData.append('propertyInputs', JSON.stringify(data.data.propertyInputs));

  if (data?.images?.length > 0) {
    data.images.forEach((image) => {
      if (image.file) {
        formData.append(`files`, image.file);
      }
    });
  }

  // Fetch options
  const options = {
    method: 'PUT',
    body: formData,
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorText = await response.text(); // Capture response error message
      throw new Error(`Failed to create property: ${errorText}`);
    }

    return await response.json(); // Parse and return the JSON response
  } catch (error) {
    console.error('Error during property creation:', error);
    throw error;
  }
};





export const getUserCount = async (id) => {

  const url = `${baseUrl}/registration/dashboard/${id}`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const createFranchise = async (data) => {
  const url = `${baseUrl}/franchaise/create-franchaise`;

  const formData = new FormData();
  formData.append('name', data.fullName);
  formData.append('gender', data.gender);
  formData.append('email', data.email);
  formData.append('phone_number', data.phoneNumber);
  formData.append('district', data.district);

  // Assuming data.files is the file object
  if (data.files) {
    formData.append('image', data.files);
  }

  const options = {
    method: 'POST',
    body: formData, // FormData will set the correct Content-Type automatically
  };

  try {
    const response = await fetch(url, options);
    const text = await response.text();

    try {
      const json = JSON.parse(text || '{}');
      const result = {
        success: response.ok && (json.success === true || json.success === undefined),
        ...json
      };

      // Store the franchise ID in localStorage if data.id exists
      if (json.data && json.data.id) {
        localStorage.setItem('franchiseId', json.data.id.toString());
      }

      return result;
    } catch (e) {
      return {
        success: response.ok,
        message: text || 'Invalid response format'
      };
    }
  } catch (error) {
    console.error('Create Franchise Failed:', error);
    return {
      success: false,
      message: error.message || 'Network error'
    };
  }
};



export const getBlogDetail = async (id) => {

  const url = `${baseUrl}/blogs/get-blog/${id}`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const GoogleAuth = async (data) => {
  const url = `${baseUrl}/login`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Failed to authenticate with Google');
    }
    return response.json();
  } catch (error) {
    console.error('Google Auth Failed:', error);
    throw error;
  }
};


export const GoogleRegister = async (data) => {
  const url = `${baseUrl}/registration/new-user`;

  // Transform the data to match the expected payload format
  const payload = {
    fullName: '', // Empty as requested
    phone: '', // Empty as requested
    email: '', // Empty as requested
    password: '', // Empty as requested
    type: data.role, // Use the role as type
    credential: data.credential // Google token
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Failed to register with Google');
    }
    return response.json();
  } catch (error) {
    console.error('Google Registration Failed:', error);
    throw error;
  }
};

export const createAgent = async (data) => {
  const url = `${baseUrl}/agent`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, options);
    const text = await response.text();
    try {
      const json = JSON.parse(text || '{}');
      return json;
    } catch (e) {
      return { success: response.ok, message: text };
    }
  } catch (error) {
    console.error('Create Agent Failed:', error);
    return { success: false, message: error.message || 'Network error' };
  }
};

export const updateAgent = async (data) => {
  const url = `${baseUrl}/agent`;
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, options);
    const text = await response.text();
    try {
      const json = JSON.parse(text || '{}');
      return json;
    } catch (e) {
      return { success: response.ok, message: text };
    }
  } catch (error) {
    console.error('Update Agent Failed:', error);
    return { success: false, message: error.message || 'Network error' };
  }
};

export const createB2B = async (data) => {
  const url = `${baseUrl}/value-added-service`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, options);
    const text = await response.text();
    try {
      const json = JSON.parse(text || '{}');
      return json;
    } catch (e) {
      return { success: response.ok, message: text };
    }
  } catch (error) {
    console.error('Create B2B Failed:', error);
    return { success: false, message: error.message || 'Network error' };
  }
};

export const updateB2B = async (data) => {
  const url = `${baseUrl}/value-added-service`;
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, options);
    const text = await response.text();
    try {
      const json = JSON.parse(text || '{}');
      return json;
    } catch (e) {
      return { success: response.ok, message: text };
    }
  } catch (error) {
    console.error('Update B2B Failed:', error);
    return { success: false, message: error.message || 'Network error' };
  }
};



export { baseUrl };



