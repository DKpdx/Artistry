import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthContext } from "@galvanize-inc/jwtdown-for-react";
import LoginForm from "./LoginForm.js";
import CreateAccountForm from "./CreateAccountForm.js";
import AccountDetails from "./AccountDetails.js";
import UpdateAccountForm from "./Accounts/UpdateAccountForm.js";
import "./App.css";
import Navbar from "./components/Navbar";
import Arts from "./components/Arts";
import CreateArtForm from "./CreateArtForm.js";
import UpdateArtForm from "./UpdateArtForm.js";
import ArtDetail from "./ArtDetail.js";
import CreateLikeForm from "./CreateLikeForm.js";

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
          <Route path="/arts/new" element={<CreateArtForm />} />
          <Route path="/arts/:art_id/update" element={<UpdateArtForm />} />
          <Route path="/likes" element={<CreateLikeForm />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
