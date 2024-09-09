
export const createUser = async (userData) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error('Failed to create an account');
  }

  return response.json();
};
