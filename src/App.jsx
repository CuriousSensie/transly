import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/authentication/login/Login";
import Register from "./components/authentication/register/Register";
import Header from "./components/header/Header";
import { AuthProvider } from "./contexts/authcontext";
import Home from "./components/home/Home";
import AudioDisplay from "./components/home/AudioDisplay";
import Information from "./components/information/Information";
import Transcribing from "./components/transcribing/Transcribing";

function App() {
  const [file, setFile] = useState(null);
  const [recording, setRecording] = useState(null);
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const audio = !!(file || recording);

  return (
    <AuthProvider>
      <Router>
        <Header setFile={setFile} setRecording={setRecording} setOutput={setOutput} setLoading={setLoading}/>
        <div className="w-full h-screen flex flex-col">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/home"
              element={
                output ? <Information /> 
                : loading ? <Transcribing /> 
                : audio ? <AudioDisplay file={file} recording={recording} setFile={setFile} setRecording={setRecording}/> 
                : <Home setFile={setFile} setRecording={setRecording} />}
            />
            <Route path="*" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
