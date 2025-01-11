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

    const searchParArr = [];

    if (data.page) {
      searchParArr.push(`page=${data.page}`);
    }
    if (data.location) {
      searchParArr.push(`location=${data.location}`);
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
      searchParArr.push(`category=${data.category}`);
    }
    if (data.subCategory) {
      searchParArr.push(`subCategory=${data.subCategory}`);
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


  export const createNewProperty = async (data) => {
    const url = `${baseUrl}/property/add-property`;
  
    const formData = new FormData();
    
    formData.append('sellerId', data.propertiesPost.sellerId);
    formData.append('subMenuId', data.propertiesPost.subMenuId);
    formData.append('PropertiesInput' , JSON.stringify(data.PropertiesInput))


     // Append images
  if (data?.propertiesPost?.images?.length > 0) {
    data.propertiesPost.images.forEach((image, index) => {
      if (image.file) {
        formData.append(`files`, image.file); 
      }
    
    });
  }
  
    const options = {
      method: 'POST',
      body: formData, 
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
  

  export const getAgents = async () => {

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