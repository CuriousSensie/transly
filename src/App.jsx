import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./components/authentication/login/Login";
import Register from "./components/authentication/register/Register";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import { AuthProvider } from "./contexts/authcontext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <div className="w-full h-screen flex flex-col">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<Login />} /> {/* Catch-all route */}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
