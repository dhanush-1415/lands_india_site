const baseUrl = "http://luxcycs.com:4400"

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
    if (!response.ok) {
      throw new Error('Failed to verify OTP');
    }
    return response.json();
  } catch (error) {
    console.error('Error Verifying OTP:', error);
    throw error;
  }
};


export const RegisterUser = async (data) => {
  const url = `${baseUrl}/registration/new-user`;
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


export const UpdateUser = async (data) => {
  const url = `${baseUrl}/registration/update-user`;

  const formData = new FormData();
  formData.append('id', data.id);
  formData.append('fullName', data.fullName);
  formData.append('email', data.email);
  formData.append('phone', data.phone);

  // Check if an image is provided and append it
  if (data.image && data.image.file) {
    formData.append('image', data.image.file);
  }

  // Do not set Content-Type manually when sending FormData
  const options = {
    method: 'PUT',
    body: formData, // Send formData directly, it will handle the Content-Type header automatically
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Failed to update user');
    }
    return response.json();
  } catch (error) {
    console.error('Update Failed:', error);
    throw error;
  }
};


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
    if (!response.ok) {
      throw new Error('Failed to Register');
    }
    return response.json();
  } catch (error) {
    console.error('Registration Failed:', error);
    throw error;
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
    if (!response.ok) {
      throw new Error('Failed to Login');
    }
    return response.json();
  } catch (error) {
    console.error('Login Failed:', error);
    throw error;
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
        form.append('location', item.input_value); // Assuming form is a FormData or similar structure
      }
    });
  }

  if (data.PropertiesInput?.length > 0) {
    data.PropertiesInput.forEach(item => {
      if (item.input_name === 'price') {
        form.append('price', item.input_value); // Assuming form is a FormData or similar structure
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
    method: 'POST',
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
        form.append('state', item.input_value); // Assuming form is a FormData or similar structure
      }
    });
  }

  if (data.PropertiesInput?.length > 0) {
    data.PropertiesInput.forEach(item => {
      if (item.input_name === 'Area') {
        form.append('area', item.input_value); // Assuming form is a FormData or similar structure
      }
    });
  }
  if (data.PropertiesInput?.length > 0) {
    data.PropertiesInput.forEach(item => {
      if (item.input_name === 'Country') {
        form.append('country', 'India'); // Assuming form is a FormData or similar structure
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
    method: 'POST',
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


export const getEventsList = async (flag) => {

  const url = `${baseUrl}/event/get-event?isUpcoming=${flag}`;

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

  const url = `${baseUrl}/legalAdviser`;

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



export const getSellerProperties = async (id) => {

  const url = `${baseUrl}/property/${id}`;

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


export const getBlogsList = async () => {

  const url = `${baseUrl}/blogs`;

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


export const getFranchiseList = async () => {

  const url = `${baseUrl}/franchaise?isVerifyed=1`;

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


export const updateAgent = async (data) => {
  const url = `${baseUrl}/agent/update-agent`;

  const formData = new FormData();

  formData.append('id', data.id);
  formData.append('name', data.fullName);
  formData.append('gender', data.gender);
  formData.append('email', data.email);
  formData.append('phone_number', data.phone);
  formData.append('location', data.location);
  formData.append('age', data.age);
  formData.append('service', data.service); // Changed from 'name' to 'service'

  if (data.image && data.image.file) {
    formData.append('image', data.image.file);
  }

  const options = {
    method: 'PUT',
    body: formData, // Removed the Content-Type header
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


export const createAgent = async (data) => {
  const url = `${baseUrl}/agent/create-agent`;

  const formData = new FormData();

  formData.append('name', data.fullName);
  formData.append('gender', data.gender);
  formData.append('email', data.email);
  formData.append('phone_number', data.phone);
  formData.append('age', data.age);
  formData.append('location', data.location);
  formData.append('service', data.service); // Changed from 'name' to 'service'

  if (data.image && data.image.file) {
    formData.append('image', data.image.file);
  }

  const options = {
    method: 'POST',
    body: formData, // Removed the Content-Type header
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


export const createB2B = async (data) => {
  const url = `${baseUrl}/value-added-service/create-value-added-service`;

  const formData = new FormData();

  formData.append('name', data.fullName);
  formData.append('gender', data.gender);
  formData.append('email', data.email);
  formData.append('phone_number', data.phone);
  formData.append('age', data.age);
  formData.append('location', data.location);
  formData.append('professional', data.professional);

  if (data.image && data.image.file) {
    formData.append('image', data.image.file);
  }

  const options = {
    method: 'POST',
    body: formData, // Removed the Content-Type header
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

export const updateB2B = async (data) => {
  const url = `${baseUrl}/value-added-service/update-value-added-service`;

  const formData = new FormData();

  formData.append('id', data.id);
  formData.append('name', data.fullName);
  formData.append('gender', data.gender);
  formData.append('email', data.email);
  formData.append('phone_number', data.phone);
  formData.append('location', data.location);
  formData.append('age', data.age);
  formData.append('professional', data.professional);

  if (data.image && data.image.file) {
    formData.append('image', data.image.file);
  }

  const options = {
    method: 'PUT',
    body: formData, // Removed the Content-Type header
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

export const getWishListProperties = async (ids) => {

  const propertyIds = ids.join(',');

  const url = `${baseUrl}/property/get-properties?propertyId=${propertyIds}`;


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

  let url = `${baseUrl}/value-added-service?`;

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

export const getUserQueries = async (id) => {

  const url = `${baseUrl}/query/list/${id}?isProperty=1`;


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

  // if (data?.images?.length > 0) {
  //   data.images.forEach((image) => {
  //     if (image.file) {
  //       formData.append(`files`, image.file);
  //     }
  //   });
  // }

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


export const getAgentDetails = async (phone) => {

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
      throw new Error('Failed to fetch data');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};


export const getB2BDetails = async (phone) => {

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
      throw new Error('Failed to fetch data');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
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
    if (!response.ok) {
      throw new Error('Failed to Register');
    }
    return response.json();
  } catch (error) {
    console.error('Registration Failed:', error);
    throw error;
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
