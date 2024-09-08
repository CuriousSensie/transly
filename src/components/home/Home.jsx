import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faPlus,
  faMicrophone,
} from "@fortawesome/free-solid-svg-icons";

const Home = (props) => {
  const { file, setFile } = props;

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
          <button className="special-btn rounded-xl px-4 py-2 flex items-center text-base justify-between gap-4 mx-auto w-72 max-w-full my-4">
            <p className="text-blue-700">Record</p>
            <FontAwesomeIcon icon={faMicrophone} />
          </button>
          <p className="text-base">
            or {}
            <label className="text-blue-700 cursor-pointer hover:text-blue-600 duration-200">
              upload
              <input
                onChange={(e) => {
                  const tempFile = e.target.files[0];
                  // console.log(tempFile);
                  // console.log(file);
                  setFile(tempFile);
                  // console.log(file);
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
