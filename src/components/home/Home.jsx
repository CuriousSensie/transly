import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faPlus,
  faMicrophone,
} from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  return (
    <div>
      <main className="w-full h-screen">
        <section className="mt-16 flex self-center justify-self-center place-content-center">
          <button className="special-btn flex items-center text-blue-400 rounded gap-2 px-4 py-2 ">
            <FontAwesomeIcon icon={faPlus} />
            Add
          </button>
        </section>
        <section className="flex flex-col mt-4 self-center h-full place-content-center place-items-center ">
          <h1 className="pb-6 font-bold text-5xl sm:text-6xl md::text-7xl">
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
            or { }
            < label className="text-blue-700 cursor-pointer hover:text-blue-600 duration-200"> 
              upload
              <input type="file" className="hidden"  accept=".mp3, .wave"/>
            </label>
            { } an mp3 file
          </p>
        </section>
      </main>
    </div>
  );
};

export default Home;
