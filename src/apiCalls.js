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