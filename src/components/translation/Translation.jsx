import React from "react";
import { LANGUAGES } from "../../utils/presets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { generatePath } from "react-router-dom";

export default function Translation(props) {
  const {
    translation,
    textElement,
    toLang,
    setToLang,
    translating,
    setTranslating,
    generateTranslation
  } = props;

  return (
    <div className="max-w-[400px] w-full mx-auto flex flex-col gap-2">
      {!translating && (<div className="flex flex-col ">
        <p className="text-xs sm:text-sm font-medium text-slate-500 mr-auto"></p>
        <div className="flex items-stretch gap-2 ">
          <select
            className="flex-1 outline-none bg-white focus:outline-none border border-solid border-transparent hover:border-blue-300 duration-200 p-2 rounded"
            value={toLang}
            onChange={(event) => {
              setToLang(event.target.value);
            }}
          >
            <option value={"Select language"}>Select Language</option>
            {Object.entries(LANGUAGES).map(([key, value]) => {
              return (
                <option value={value} key={key}>
                  {key}
                </option>
              );
            })}
          </select>
          <button onClick={generateTranslation} className="special-btn px-3 py-2 rounded-lg text-blue-400 hover:text-blue-600 duration-200">
            Translate
          </button>
        </div>
      </div>)}
      {translation && !translating && (
        <p>{translation}</p>
      )}
      {translating && (
        <div className="grid place-items-center">
          <FontAwesomeIcon className="animate-spin" icon={faSpinner}/>
        </div>
      )}
    </div>
  );
}
