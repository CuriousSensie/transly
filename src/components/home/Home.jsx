import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faMicrophone } from "@fortawesome/free-solid-svg-icons";

const Home = (props) => {
  const { file, setFile, setRecording} = props; 

  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [audioChunks, setAudioChunks] = useState([]);
  const [duration, setDuration] = useState(0);

  const mediaRecorder = useRef(null);
  const mimeType = "audio/webm"; // Correct MIME type

  async function startRecording() {
    console.log("Recording started");

    // get access to the user's microphone
    try {
      const tempStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });

      setRecordingStatus("recording");

      // start recording
      const media = new MediaRecorder(tempStream, { mimeType });
      mediaRecorder.current = media;

      mediaRecorder.current.start();

      let localAudioChunks = [];
      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          localAudioChunks.push(event.data);
        }
      };

      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(localAudioChunks, { type: mimeType });
        setRecording(audioBlob);
        setAudioChunks([]);
        setDuration(0);
      };
    } catch (error) {
      console.error("Error while recording: " + error.message);
    }
  }

  async function stopRecording() {
    setRecordingStatus("inactive");
    console.log("Recording stopped");

    mediaRecorder.current.stop();
  }

  useEffect(() => {
    if (recordingStatus === "inactive") return;

    const interval = setInterval(() => {
      setDuration((curr) => curr + 1); // Functional update for duration
    }, 1000);

    return () => clearInterval(interval);
  }, [recordingStatus]);

  return (
    <div>
      <main className="w-full h-screen mt-12">
        <section className="flex-1 p-4 flex h-screen flex-col gap-3 text-center sm:gap-4 md:gap-5 justify-center pb-12 w-fit mx-auto max-w-full place-items-center place-content-center">
          <h1 className="font-bold text-5xl sm:text-6xl md::text-7xl">
            <span className="text-blue-950 bold">T</span>
            <span className="text-blue-900 bold">R</span>
            <span className="text-blue-800 bold">A</span>
            <span className="text-blue-700 bold">N</span>
            <span className="text-blue-600 bold">S</span>
            <span className="text-blue-500 bold">L</span>
            <span className="text-blue-400 bold">Y</span>
          </h1>
          <h3 className="font-medium md:text-lg">
            Record
            <FontAwesomeIcon className="mr-1 ml-1" icon={faArrowRight} />
            Transcribe
            <FontAwesomeIcon className="mr-1 ml-1" icon={faArrowRight} />
            Translate
          </h3>
          <button
            onClick={recordingStatus === "recording" ? stopRecording : startRecording}
            className="special-btn rounded-xl px-4 py-2 flex items-center text-base justify-between gap-4 mx-auto w-72 max-w-full my-4"
          >
            <p className="text-blue-700">
              {recordingStatus === "inactive" ? `Record` : `Stop Recording`}
            </p>
            <div className="flex items-center gap-2">
              {duration != 0 && <p className="text-sm">{duration}s</p>}
              <FontAwesomeIcon
                icon={faMicrophone}
                className={recordingStatus === "recording" ? "text-rose-400" : ""}
              />
            </div>
          </button>
          <p className="text-base">
            or {}
            <label className="text-blue-700 cursor-pointer hover:text-blue-600 duration-200">
              upload
              <input
                onChange={(e) => {
                  const tempFile = e.target.files[0];
                  setFile(tempFile);
                }}
                type="file"
                className="hidden"
                accept=".mp3, .wave"
              />
            </label>
            {} an mp3 file
          </p>
        </section>
      </main>
    </div>
  );
};

export default Home;
