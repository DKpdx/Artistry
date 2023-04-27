import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [account, setAccount] = useState({});
  const [art, setArt] = useState([]);

  const fetchArtAndAccount = async () => {
    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/arts?user_id=${id}`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      const filteredArt = data.filter(
        (artPiece) => artPiece.user_id === parseInt(id)
      );
      setArt(filteredArt);

      if (filteredArt.length > 0) {
        setAccount(filteredArt[0].user);
      }
    } else {
      console.log("Error fetching art:", response.status);
    }
  };

  const handleOnClick = (art_id) => {
    navigate(`/arts/${art_id}/detail`);
  };

  useEffect(() => {
    fetchArtAndAccount();
  }, [id]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-cream-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div>
          <h5 className="text-center text-2xl font-bold text-gray-900">
            {account.username}'s Profile
          </h5>
        </div>
        {account && (
          <div className="rounded-md shadow-sm -space-y-px mb-3">
            <div className="bg-gray-100 py-2 px-4 rounded-t-md font-semibold">
              User Picture
            </div>
            <div className="py-2 px-4">
              <img
                src={account.user_pic_url}
                alt="User"
                className="w-48 h-32 object-cover rounded"
              />
            </div>
            {[
              { label: "Username", value: account.username },
              { label: "Bio", value: account.bio },
              { label: "Location", value: account.zipcode },
            ].map(({ label, value }) => (
              <React.Fragment key={label}>
                <div className="bg-gray-100 py-2 px-4 font-semibold">
                  {label}
                </div>
                <div className="py-2 px-4">{value}</div>
              </React.Fragment>
            ))}
          </div>
        )}
        <div>
          <h5 className="text-center text-2xl font-bold text-gray-900">
            {account.username}'s Art
          </h5>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {art.map((artPiece) => (
            <div key={artPiece.id} onClick={() => handleOnClick(artPiece.id)}>
              <img
                src={artPiece.art_pic_url}
                alt={artPiece.title}
                className="w-full h-48 object-cover rounded-lg cursor-pointer"
              />
              <p className="font-semibold text-gray-900 mt-2">
                {artPiece.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;



// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// function ProfilePage() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [account, setAccount] = useState({});
//   const [art, setArt] = useState([]);

//   const fetchAccount = async () => {
//     const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/accounts/${id}`;
//     const response = await fetch(url, {
//       method: "GET",
//     });
//     if (response.ok) {
//       const data = await response.json();
//       setAccount(data);
//     } else {
//       console.log("Error fetching account:", response.status);
//     }
//   };

//   const fetchArt = async () => {
//     const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/arts?user_id=${id}`;
//     const response = await fetch(url);
//     if (response.ok) {
//       const data = await response.json();
//       setArt(data.filter(artPiece => artPiece.user_id === parseInt(id)));
//     } else {
//       console.log("Error fetching art:", response.status);
//     }
//   };

//   const handleOnClick = (art_id) => {
//     navigate(`/art/${art_id}/detail`);
//   };

//   useEffect(() => {
//     fetchAccount();
//     fetchArt();
//   }, [id]);

// return (
// <div className="min-h-screen w-full flex items-center justify-center bg-cream-50 py-12 px-4 sm:px-6 lg:px-8">
//     <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
//     <div>
//         <h5 className="text-center text-2xl font-bold text-gray-900">
//         {account.username}'s Profile
//         </h5>
//     </div>
//     {account && (
//         <div className="rounded-md shadow-sm -space-y-px mb-3">
//         <div className="bg-gray-100 py-2 px-4 rounded-t-md font-semibold">
//             User Picture
//         </div>
//         <div className="py-2 px-4">
//             <img
//             src={account.user_pic_url}
//             alt="User"
//             className="w-48 h-32 object-cover rounded"
//             />
//         </div>
//         {[
//             { label: "Username", value: account.username },
//             { label: "Bio", value: account.bio },
//             { label: "Location", value: account.zipcode },
//         ].map(({ label, value }) => (
//             <React.Fragment key={label}>
//             <div className="bg-gray-100 py-2 px-4 font-semibold">
//                 {label}
//             </div>
//             <div className="py-2 px-4">{value}</div>
//             </React.Fragment>
//         ))}
//         </div>
//     )}
//     <div>
//         <h5 className="text-center text-2xl font-bold text-gray-900">
//         {account.username}'s Art
//         </h5>
//         </div>
//         <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
//     {art.map((artPiece) => (
//     <div key={artPiece.id} onClick={() => handleOnClick(artPiece.id)}>
//         <img
//         src={artPiece.art_pic_url}
//         alt={artPiece.title}
//         className="w-full h-48 object-cover rounded-lg cursor-pointer"
//         />
//         <p className="font-semibold text-gray-900 mt-2">{artPiece.title}</p>
//     </div>
// ))}
// </div>
// </div>
// </div>
// )
// }

// export default ProfilePage;
