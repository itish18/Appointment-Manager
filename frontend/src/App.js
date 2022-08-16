import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// Components
import Header from "./components/Header.jsx";

// Pages
const Calender = React.lazy(() => import("./pages/Calender.jsx"));
const Login = React.lazy(() => import("./pages/Login.jsx"));
const Signup = React.lazy(() => import("./pages/Signup.jsx"));
const Home = React.lazy(() => import("./pages/Home.jsx"));

function App() {
  return (
    <>
      <main>
        <Suspense>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calender" element={<Calender />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<p>There's nothing here: 404!</p>} />
          </Routes>
        </Suspense>
      </main>
    </>
  );
}

export default App;
