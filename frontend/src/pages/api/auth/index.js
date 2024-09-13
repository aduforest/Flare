export const loginUser = async (loginData) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });
  
    if (!response.ok) {
      throw new Error('Failed to log in');
    }
  
    return response.json();
  };

export const logoutUser = async () => {
  console.log("logoutuser")
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to log out');
  }

  return response.json();
};
  
  