import { useEffect, useState, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./Nav.js";
import Construct from "./Construct.js";
import { AuthContext } from "@galvanize-inc/jwtdown-for-react";
import LoginForm from "./LoginForm.js";
import CreateAccountForm from "./CreateAccountForm.js";
import ErrorNotification from "./ErrorNotification";
import "./App.css";

function App() {
  const { token } = useContext(AuthContext);
  console.log(token);
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/accounts" element={<CreateAccountForm />} />
      </Routes>
    </>
  );
}

export default App;
