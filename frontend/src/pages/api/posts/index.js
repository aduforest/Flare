export const fetchPosts = async (before, by, limit) => {
  const queryParams = new URLSearchParams({ before, by, limit });
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts?${queryParams}`);

  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }

  return response.json();
};

export const createPost = async (content) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  });

  if (!response.ok) {
    throw new Error('Failed to create a post');
  }

  return response.json();
};