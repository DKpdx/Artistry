import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthContext } from "@galvanize-inc/jwtdown-for-react";
import LoginForm from "./components/LoginForm.js";
import CreateAccountForm from "./components/CreateAccountForm.js";
import AccountDetails from "./components/AccountDetails.js";
import UpdateAccountForm from "./components/UpdateAccountForm.js";
import "./App.css";
import Navbar from "./components/Navbar";
import Arts from "./components/Arts";
<<<<<<< HEAD
import CreateArtForm from "./CreateArtForm.js";
import AllMyLikes from "./components/AllMyLikes.js";
=======
import CreateArtForm from "./components/CreateArtForm.js";
import UpdateArtForm from "./components/UpdateArtForm.js";
import ArtDetail from "./components/ArtDetail.js";
import CreateLikeForm from "./components/CreateLikeForm.js";
import LikesList from "./components/LikesList.js";
>>>>>>> main

function App() {
  const { token } = useContext(AuthContext);
  console.log(token);
  return (
    <>
      <Navbar />
      <div className="sm:mx-6 md:mx-10 lg:mx-12 px-3">
        <Routes>
          <Route path="/arts/:art_id/detail" element={<ArtDetail />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/accounts" element={<CreateAccountForm />} />
          <Route path="/accounts/me" element={<AccountDetails />} />
          <Route path="/accounts/id" element={<UpdateAccountForm />} />
          <Route path="" element={<Arts />} />
<<<<<<< HEAD
          <Route path="/likes" element={<AllMyLikes />} />
          <Route path="arts" element={<CreateArtForm />} />
=======
          <Route path="/arts/new" element={<CreateArtForm />} />
          <Route path="/arts/:art_id/update" element={<UpdateArtForm />} />
          <Route path="/likes" element={<CreateLikeForm />} />
          <Route path="/likes/list" element={<LikesList />} />
>>>>>>> main
        </Routes>
      </div>
    </>
  );
}

export default App;
