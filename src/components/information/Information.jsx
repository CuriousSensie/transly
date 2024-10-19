import React, { useEffect, useRef, useState } from "react";
import Transcription from "../transcription/Transcription";
import Translation from "../translation/Translation";
import { faCopy, faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { text } from "@fortawesome/fontawesome-svg-core";
import Swal from 'sweetalert2';

export default function Information(props) {
  const {output}= props
  console.log("OUtput int he Information", output)
  const [tab, setTab] = useState('transcription');
  const [translation, setTranslation] = useState(null);
  const [toLang, setToLang] = useState("Select language");
  const [translating, setTranslating] = useState(null);

  const worker = useRef();


  useEffect(() => {
      if (!worker.current) {
          worker.current = new Worker(new URL('../../utils/translate.worker.js', import.meta.url), {
              type: 'module'
          })
      }
      const onMessageReceived = async (e) => {
          switch (e.data.status) {
              case 'initiate':
                  console.log('DOWNLOADING')
                  break;
              case 'progress':
                  console.log('LOADING')
                  break;
              case 'update':
                  setTranslation(e.data.output)
                  console.log(e.data.output)
                  break;
              case 'complete':
                  setTranslating(false)
                  console.log("DONE")
                  break;
          }
      }
      worker.current.addEventListener('message', onMessageReceived)
      return () => worker.current.removeEventListener('message', onMessageReceived)
  })

  const textElement = tab === "transcription" ? (Array.isArray(output) ? output.map(val => val.text) : '') : translation || "Translation Unavailable";
  // const textElement = output;
  

  // handle the actions for download and copy buttons
  function handleCopy() {
    navigator.clipboard.writeText(textElement);
    Swal.fire({
      title: 'Copy',
      text: 'The text has been copied to the clipboard.',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }

  function handleDownload() {
    Swal.fire({
      title: "Download this transcription?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Confirm",
      denyButtonText: `Cancel`
    }).then((result) => {
      if (result.isConfirmed) {
          console.log("Downloading text file");
          // create a new element (anchor tag)
        const element = document.createElement('a')
        //create a new file 
        const file = new Blob([textElement], {type: 'text/plain'})
        // set the url and download 
        element.href= URL.createObjectURL(file)
        element.download = `Transly_${new Date().toDateString()}.txt`
        // add to the document call it
        document.body.appendChild(element)
        element.click()

        Swal.fire({
          title: 'Download',
          text: 'The text has been downloaded as a .txt file.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        

      } else if (result.isDismissed) {
          // do nothing
      }
    });
    
  }


  function generateTranslation() {
    console.log("Inside the generateTranslation func")
    if (translating || toLang === 'Select language') {
        return
    }

    setTranslating(true)

    worker.current.postMessage({
        text: output.map(val => val.text),
        // text: output,
        src_lang: 'eng_Latn',
        tgt_lang: toLang
    }).catch(error => {
      console.error("Error in worker:", error);
      Swal.fire({
          title: 'Translation Error',
          text: 'There was an error while translating the text. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
      });
  });
}

  


  return (
    <main className="h-screen w-screen mt-12  flex flex-col justify-center text-center">
      <section className="p-4 flex flex-col gap-3 text-center sm:gap-4 md:gap-5 justify-center pb-5 mx-auto max-w-prose w-full place-items-center place-content-center">
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
            'px-4 py-2 transition-colors duration-200 ' +
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
            'px-4 py-2 transition-colors duration-200 ' +
            (tab === 'translation'
              ? 'bg-blue-400 text-white'
              : 'text-blue-400 hover:text-blue-600')
          }
        >
          Translation
        </button>
      </div>
      <div className="flex flex-col my-8">
        {tab === 'transcription' ? <Transcription {...props} textElement={textElement}/> : <Translation {...props} textElement={textElement} toLang={toLang} translating={translating} setTranslating={setTranslating} translation={translation} generateTranslation={generateTranslation} setToLang={setToLang}/> }
      </div>
      <div className="flex items-center gap-4 mx-auto text-base">
        <button onClick={handleCopy} title="copy" className="text-blue-700 bg-slate-150 px-2 aspect-square grid place-items-center rounded-full hover:text-blue-950 duration-200 ">
          <FontAwesomeIcon icon={faCopy} />
        </button>
        <button onClick={handleDownload} title="download" className="text-blue-700 bg-slate-150 px-2 aspect-square grid place-items-center rounded-full hover:text-blue-950 duration-200">
          <FontAwesomeIcon icon={faDownload} />
        </button>
      </div>
    </main>
  );
}
