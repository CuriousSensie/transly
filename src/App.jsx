import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/authentication/login/Login";
import Register from "./components/authentication/register/Register";
import Header from "./components/header/Header";
import { AuthProvider } from "./contexts/authcontext";
import Home from "./components/home/Home";
import AudioDisplay from "./components/home/AudioDisplay";
import Information from "./components/information/Information";
import Transcribing from "./components/transcribing/Transcribing";
import { reauthenticateWithCredential } from "firebase/auth";
import { MessageTypes } from "./util/presets";

function App() {
  const [file, setFile] = useState(null);
  const [recording, setRecording] = useState(null);
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const audio = !!(file || recording);

  function handleAudioReset() {
    setFile(null);
    setOutput(null);
    setRecording(null);
    setLoading(false);
    setFinished(false);
    setDownloading(false);
  }

  const worker = useRef(null)

  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(new URL('./util/whisper.worker.js', import.meta.url), {
        type: 'module'
      })
    }

    const onMessageReceived = async (e) => {
      switch (e.data.type) {
        case 'DOWNLOADING':
          setDownloading(true)
          console.log('DOWNLOADING')
          break;
        case 'LOADING':
          setLoading(true)
          console.log('LOADING')
          break;
        case 'RESULT':
          setOutput(e.data.results)
          console.log("Results received in App", e.data.results)
          break;
        case 'INFERENCE_DONE':
          setFinished(true)
          console.log("DONE")
          break;
      }
    }

    worker.current.addEventListener('message', onMessageReceived)

    return () => worker.current.removeEventListener('message', onMessageReceived)
  })


  async function readAudioFrom(file) {
    const sampling_rate = 16000;
    const audioContext = new AudioContext({ sampleRate: sampling_rate });

    const response = await file.arrayBuffer();
    const decoded = await audioContext.decodeAudioData(response);

    const audioBuffer = decoded.getChannelData(0);
    return audioBuffer;
  }

  async function handleFormSubmission() {
    console.log("handleFormSubmission function");
    if (!audio) {
      return
    }

    let audioBuffer = await readAudioFrom(file ? file : recording);

    const model_name = `openai/whisper-tiny.en`
    worker.current.postMessage({
      type: MessageTypes.INFERENCE_REQUEST,
      audioBuffer,
      model_name
    })

  }
  return (
    <AuthProvider>
      <Router>
        <Header handleAudioReset={handleAudioReset} />
        <div className="w-full h-screen flex flex-col">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/home"
              element={
                output ? (
                  <Information output={output} />
                ) : loading ? (
                  <Transcribing />
                ) : audio ? (
                  <AudioDisplay
                    handleFormSubmission={handleFormSubmission}
                    file={file}
                    recording={recording}
                    setFile={setFile}
                    setRecording={setRecording}
                  />
                ) : (
                  <Home setFile={setFile} setRecording={setRecording} />
                )
              }
            />
            <Route path="*" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
