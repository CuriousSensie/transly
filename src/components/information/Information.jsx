import React, { useState } from "react";
import Transcription from "../transcription/Transcription";
import Translation from "../translation/Translation";

export default function Information() {
  const [tab, setTab] = useState('transcription');

  return (
    <main className="h-screen w-screen mt-12 flex flex-col justify-center">
      <section className="p-4 flex flex-col gap-3 text-center sm:gap-4 md:gap-5 justify-center pb-20 mx-auto max-w-prose w-full place-items-center place-content-center">
        <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl">
          <span className="text-blue-950 bold">Your</span>
          <span className="text-blue-900 bold">Tr</span>
          <span className="text-blue-800 bold">an</span>
          <span className="text-blue-700 bold">sc</span>
          <span className="text-blue-600 bold">ri</span>
          <span className="text-blue-500 bold">pt</span>
          <span className="text-blue-400 bold">ion</span>
        </h1>
      </section>
      <div className="grid grid-cols-2 items-center mx-auto bg-white border-2 border-solid border-blue-300 shadow rounded-full overflow-hidden">
        <button
          onClick={() => setTab('transcription')}
          className={
            'px-4 py-2 font-medium transition-colors duration-200 ' +
            (tab === 'transcription'
              ? 'bg-blue-400 text-white'
              : 'text-blue-400 hover:text-blue-600')
          }
        >
          Transcription
        </button>
        <button
          onClick={() => setTab('translation')}
          className={
            'px-4 py-2 font-medium transition-colors duration-200 ' +
            (tab === 'translation'
              ? 'bg-blue-400 text-white'
              : 'text-blue-400 hover:text-blue-600')
          }
        >
          Translation
        </button>
      </div>
      {tab === 'transcription' ? <Transcription/> : <Translation/> }
    </main>
  );
}
