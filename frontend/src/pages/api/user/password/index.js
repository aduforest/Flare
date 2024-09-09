export const updatePassword = async (oldPassword, newPassword) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ oldPassword, newPassword }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to update password');
    }
  };