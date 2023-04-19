import { useEffect, useState, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./Nav.js";
import Construct from "./Construct.js";
import { AuthContext } from "@galvanize-inc/jwtdown-for-react";
import LoginForm from "./LoginForm.js";
import CreateAccountForm from "./CreateAccountForm.js";
import ErrorNotification from "./ErrorNotification";
import "./App.css";
import Navbar from "./components/Navbar";
import Arts from "./components/Arts";

function App() {
  const { token } = useContext(AuthContext);
  console.log(token);
  return (
    <>
      <Navbar />
      <div className="sm:mx-6 md:mx-10 lg:mx-12 px-3">
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/accounts/new" element={<CreateAccountForm />} />
          <Route path="arts/" element={<Arts />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
