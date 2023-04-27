import React, { useEffect, useState } from 'react';
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';

function LikesList() {
  const [likes, setLikes] = useState([]);
  const { token } = useAuthContext();

  const fetchLikes = async () => {
    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/likes`;

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      setLikes(data);
    }
  };

  useEffect(() => {
    if (token) {
    fetchLikes();
  }
  }, [fetchLikes, token]);

return (
  <div className="min-h-screen w-full flex items-center justify-center bg-cream-50 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-3xl w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
      <div>
        <h2 className="text-center text-2xl font-bold text-gray-900">All Likes</h2>
      </div>
      <div className="rounded-md shadow-sm -space-y-px mb-3">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="bg-gray-100 py-2 px-4 rounded-t-md font-semibold">User ID</th>
              <th className="bg-gray-100 py-2 px-4 rounded-t-md font-semibold">Art ID</th>
              <th className="bg-gray-100 py-2 px-4 rounded-t-md font-semibold">Liked By</th>
              <th className="bg-gray-100 py-2 px-4 rounded-t-md font-semibold">Created At</th>
            </tr>
          </thead>
          <tbody>
            {likes.map((like) => (
              <tr key={like.id} value={like.id}>
                <td className="border-t border-gray-200 py-2 px-4">{like.user_id}</td>
                <td className="border-t border-gray-200 py-2 px-4">{like.art_id}</td>
                <td className="border-t border-gray-200 py-2 px-4">{like.liked_by}</td>
                <td className="border-t border-gray-200 py-2 px-4">{new Date(like.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  );
}

export default LikesList;
