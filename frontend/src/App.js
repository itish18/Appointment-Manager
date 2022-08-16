import React from "react";
import { Routes, Route } from "react-router-dom";

// Components
import Header from "./components/Header.jsx";

// Pages
import Calender from "./pages/Calender.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Home from "./pages/Home.jsx";

function App() {
  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calender" element={<Calender />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
      </main>
    </>
  );
}

export default App;
