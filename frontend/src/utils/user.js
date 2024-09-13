// frontend/src/utils/user.js

export const getUser = async () => {
    const response = await fetch('/api/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }
  
    return await response.json();
  };
  
  export const updateUser = async (userData) => {
    const response = await fetch('/api/user', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  
    if (!response.ok) {
      throw new Error('Failed to update user');
    }
  
    return await response.json();
  };
  