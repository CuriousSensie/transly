import React, { useState, useRef, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenNib, faPen } from "@fortawesome/free-solid-svg-icons";

export default function AudioDisplay(props) {
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [audioChunks, setAudioChunks] = useState([]);
  const [duration, setDuration] = useState(0);

  const mediaRecorder = useRef(null);
  
  const { file, recording, setFile, setRecording} = props;
  return (
    <div>
      <main className="h-screen w-screen mt-12">
        <section className="flex-1 p-4 h-screen flex flex-col gap-3 text-center sm:gap-4 md:gap-5 justify-center pb-20 w-fit mx-auto max-w-full place-items-center place-content-center">
          <h1 className="font-bold text-5xl sm:text-6xl md::text-7xl">
            <span className="text-blue-950 bold">Your</span>
            <span className="text-blue-900 bold">A</span>
            <span className="text-blue-800 bold">U</span>
            <span className="text-blue-700 bold">D</span>
            <span className="text-blue-600 bold">I</span>
            <span className="text-blue-500 bold">O</span>
          </h1>
          <div className="flex flex-col mx-auto text-center">
            <h3 className="font-semibold">Name:</h3>
            <p className="">{file ? file?.name : "Recorded Audio"}</p>
            {file ? console.log(file.name) : console.log(recording)}
          </div>
          <div className="w-5/6 flex flex-row items-center justify-between gap-4">
            <button onClick={() => {file ? setFile(null) : setRecording(null)}} className="text-slate-600">Reset</button>
            <button className="flex flex-row gap-2 items-center special-btn py-2 rounded-lg px-4 text-blue-700">
              <FontAwesomeIcon icon={faPenNib} />
              <p>Transcribe</p>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
