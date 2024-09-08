import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/authentication/login/Login";
import Register from "./components/authentication/register/Register";
import Header from "./components/header/Header";
import { AuthProvider } from "./contexts/authcontext";
import Home from "./components/home/Home";
import AudioDisplay from "./components/home/AudioDisplay";

function App() {
  const [file, setFile] = useState(null);
  const [recording, setRecording] = useState(null);
  const audio = !!(file || recording);

  return (
    <AuthProvider>
      <Router>
        <Header />
        <div className="w-full h-screen flex flex-col">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/home"
              element={audio ? <AudioDisplay file={file} /> : <Home setFile={setFile} />}
            />
            <Route path="*" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
