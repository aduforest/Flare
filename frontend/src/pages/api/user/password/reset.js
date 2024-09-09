export default async function handler(req, res) {
    const { method } = req;
  
    if (method === 'POST') {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/password/reset`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(req.body),
        });
  
        if (!response.ok) {
          const error = await response.json();
          return res.status(response.status).json({ error: error.message });
        }
  
        return res.status(200).json({ message: 'Password reset request successful' });
      } catch (error) {
        return res.status(500).json({ error: 'Failed to request password reset' });
      }
    }
  
    if (method === 'PUT') {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/password/reset`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(req.body),
        });
  
        if (!response.ok) {
          const error = await response.json();
          return res.status(response.status).json({ error: error.message });
        }
  
        return res.status(200).json({ message: 'Password reset successful' });
      } catch (error) {
        return res.status(500).json({ error: 'Failed to reset password' });
      }
    }
  
    // Handle other HTTP methods if needed
    res.setHeader('Allow', ['POST', 'PUT']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
  