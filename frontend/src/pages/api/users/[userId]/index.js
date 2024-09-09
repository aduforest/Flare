// frontend/src/services/user.js
export const getUserById = async (userId) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${userId}`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }

  return response.json();
};
